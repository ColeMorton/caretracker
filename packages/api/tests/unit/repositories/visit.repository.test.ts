import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { PrismaClient } from '@caretracker/database'
import { VisitRepository } from '../../../src/repositories/visit.repository.js'
import { NotFoundError, ConflictError, BusinessRuleError } from '../../../src/utils/errors.js'
import { VisitFactory } from '../../fixtures/factories/visit.factory.js'

// Mock Prisma client
const mockPrisma = {
  visit: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
    groupBy: vi.fn(),
    aggregate: vi.fn(),
  },
  $transaction: vi.fn(),
} as unknown as PrismaClient

// Create transaction mock that mimics the real Prisma transaction behavior
const createTransactionMock = (operations: Record<string, any> = {}) => {
  const mockTx = {
    visit: {
      findUnique: vi.fn().mockResolvedValue(null),
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
      groupBy: vi.fn(),
      aggregate: vi.fn(),
      ...operations.visit
    },
    user: {
      findUnique: vi.fn().mockResolvedValue(null),
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
      ...operations.user
    },
    carePlan: {
      findUnique: vi.fn().mockResolvedValue(null),
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
      ...operations.carePlan
    }
  }

  mockPrisma.$transaction = vi.fn().mockImplementation(async (callback) => {
    return await callback(mockTx)
  })

  return mockTx
}

// Mock audit logger
const mockAuditLogger = vi.fn()

describe('VisitRepository', () => {
  let repository: VisitRepository
  const userId = 'current-user-id'
  const visitId = 'visit-123'
  const clientId = 'client-123'
  const workerId = 'worker-123'

  beforeEach(() => {
    vi.clearAllMocks()
    // Set up default transaction mock
    createTransactionMock()
    repository = new VisitRepository(mockPrisma, mockAuditLogger)
  })

  describe('findWithRelations', () => {
    it('should find visits with filters and pagination', async () => {
      const filters = { clientId, status: 'SCHEDULED' as const }
      const visits = [
        {
          id: 'visit-1',
          clientId,
          workerId,
          status: 'SCHEDULED',
          client: { profile: { firstName: 'John', lastName: 'Doe' } },
          worker: { profile: { firstName: 'Jane', lastName: 'Worker' } }
        }
      ]
      const totalCount = 1

      mockPrisma.visit.findMany = vi.fn().mockResolvedValue(visits)
      mockPrisma.visit.count = vi.fn().mockResolvedValue(totalCount)

      const result = await repository.findWithRelations(filters, 1, 10, userId)

      expect(mockPrisma.visit.findMany).toHaveBeenCalled()
      expect(result.data).toEqual(visits)
      expect(result.meta).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1
      })
    })
  })

  describe('create', () => {
    it('should create visit with audit logging', async () => {
      const visitData = {
        clientId,
        workerId,
        scheduledAt: new Date('2024-01-01T10:00:00Z'),
        duration: 120,
        activities: ['Personal care', 'Medication reminder']
      }

      const createdVisit = {
        id: visitId,
        ...visitData,
        status: 'SCHEDULED',
        createdBy: userId,
        updatedBy: userId,
        version: 1
      }

      const mockTx = createTransactionMock({
        visit: {
          create: vi.fn().mockResolvedValue(createdVisit),
          findUnique: vi.fn(),
          findFirst: vi.fn(),
          update: vi.fn()
        },
        user: {
          findUnique: vi.fn().mockResolvedValue({
            id: clientId,
            role: 'CLIENT',
            isActive: true,
            deletedAt: null
          })
        }
      })

      const result = await repository.create(visitData, userId)

      expect(mockTx.visit.create).toHaveBeenCalled()
      expect(result).toEqual(createdVisit)
    })
  })

  describe('checkin', () => {
    it('should check in worker to scheduled visit', async () => {
      const checkinData = {
        location: 'Client home',
        notes: 'Arrived on time'
      }

      const scheduledVisit = {
        id: visitId,
        workerId,
        clientId,
        status: 'SCHEDULED',
        scheduledAt: new Date(),
        version: 1
      }

      const checkedInVisit = {
        ...scheduledVisit,
        status: 'IN_PROGRESS',
        actualStartTime: expect.any(Date),
        version: 2
      }

      const mockTx = createTransactionMock({
        visit: {
          findUnique: vi.fn().mockResolvedValue(scheduledVisit),
          findFirst: vi.fn(),
          update: vi.fn().mockResolvedValue(checkedInVisit),
          create: vi.fn()
        }
      })

      const result = await repository.checkin(visitId, workerId, checkinData, userId)

      expect(mockTx.visit.findUnique).toHaveBeenCalledWith({
        where: { id: visitId, deletedAt: null },
        include: {
          client: {
            include: {
              profile: true
            }
          },
          worker: {
            include: {
              profile: true
            }
          }
        }
      })
      expect(result).toEqual(checkedInVisit)
    })
  })

  describe('checkout', () => {
    it('should check out worker from in-progress visit', async () => {
      const checkoutData = {
        completedActivities: ['Personal care', 'Medication reminder'],
        notes: 'Visit completed successfully'
      }

      const actualStartTime = new Date(Date.now() - 7200000) // 2 hours ago
      const inProgressVisit = {
        id: visitId,
        workerId,
        status: 'IN_PROGRESS',
        actualStartTime,
        version: 2
      }

      const completedVisit = {
        ...inProgressVisit,
        status: 'COMPLETED',
        actualEndTime: expect.any(Date),
        actualDuration: expect.any(Number),
        version: 3
      }

      const mockTx = createTransactionMock({
        visit: {
          findUnique: vi.fn().mockResolvedValue(inProgressVisit),
          findFirst: vi.fn(),
          update: vi.fn().mockResolvedValue(completedVisit),
          create: vi.fn()
        }
      })

      const result = await repository.checkout(visitId, workerId, checkoutData, userId)

      expect(mockTx.visit.findUnique).toHaveBeenCalledWith({
        where: { id: visitId, deletedAt: null }
      })
      expect(result).toEqual(completedVisit)
    })
  })

  describe('reschedule', () => {
    it('should reschedule visit to new time', async () => {
      const newScheduledAt = new Date('2024-01-02T10:00:00Z')
      const reason = 'Client requested time change'

      const originalVisit = {
        id: visitId,
        workerId,
        status: 'SCHEDULED',
        scheduledAt: new Date('2024-01-01T10:00:00Z'),
        version: 1
      }

      const rescheduledVisit = {
        ...originalVisit,
        scheduledAt: newScheduledAt,
        version: 2
      }

      const mockTx = createTransactionMock({
        visit: {
          findUnique: vi.fn().mockResolvedValue(originalVisit),
          findFirst: vi.fn(),
          update: vi.fn().mockResolvedValue(rescheduledVisit),
          create: vi.fn()
        }
      })

      const result = await repository.reschedule(visitId, newScheduledAt, new Date('2024-01-02T12:00:00Z'), reason, userId)

      expect(mockTx.visit.findUnique).toHaveBeenCalledWith({
        where: { id: visitId, deletedAt: null }
      })
      expect(result).toEqual(rescheduledVisit)
    })
  })

  describe('getStatistics', () => {
    it('should return visit statistics', async () => {
      const dateFrom = new Date('2024-01-01')
      const dateTo = new Date('2024-01-31')

      const mockStats = {
        totalVisits: 150,
        completedVisits: 100,
        cancelledVisits: 20
      }

      mockPrisma.visit.count = vi.fn()
        .mockResolvedValueOnce(150) // totalVisits
        .mockResolvedValueOnce(100) // completedVisits
        .mockResolvedValueOnce(20) // cancelledVisits

      mockPrisma.visit.groupBy = vi.fn().mockResolvedValue([])
      mockPrisma.visit.aggregate = vi.fn().mockResolvedValue({
        _avg: {
          actualDuration: 120,
          clientSatisfaction: 4.5
        }
      })

      const result = await repository.getStatistics(dateFrom, dateTo)

      expect(mockPrisma.visit.count).toHaveBeenCalledTimes(5)
      expect(result).toHaveProperty('totalVisits')
      expect(result).toHaveProperty('completedVisits')
      expect(result).toHaveProperty('cancelledVisits')
    })
  })

  describe('findOverdueVisits', () => {
    it('should find overdue visits', async () => {
      const overdueVisits = [
        {
          id: 'overdue-visit',
          scheduledAt: new Date(Date.now() - 3600000), // 1 hour ago
          status: 'SCHEDULED'
        }
      ]

      mockPrisma.visit.findMany = vi.fn().mockResolvedValue(overdueVisits)

      const result = await repository.findOverdueVisits(userId)

      expect(mockPrisma.visit.findMany).toHaveBeenCalled()
      expect(result).toEqual(overdueVisits)
    })
  })
})