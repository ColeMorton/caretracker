import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@caretracker/database'
import { AuditService, type AuditLogEntry } from '../../../src/services/audit.service.js'

// Mock Fastify instance
const mockFastify = {
  log: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
} as unknown as FastifyInstance

// Mock Prisma client
const mockPrisma = {
  auditLog: {
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    count: vi.fn(),
    groupBy: vi.fn(),
  }
} as unknown as PrismaClient

describe('AuditService', () => {
  let auditService: AuditService
  const userId = 'user-123'
  const entityId = 'entity-123'

  beforeEach(() => {
    vi.clearAllMocks()
    auditService = new AuditService(mockPrisma, mockFastify)
  })

  describe('logEvent', () => {
    it('should log audit event to database and application log', async () => {
      const auditEntry: AuditLogEntry = {
        userId,
        entityType: 'User',
        entityId,
        action: 'CREATE',
        newValues: { email: 'test@example.com' },
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        sessionId: 'session-123',
        requestId: 'req-123',
        endpoint: '/api/users',
        reason: 'User registration',
        dataAccessed: 'PII'
      }

      const mockCreatedLog = {
        id: 'audit-log-123',
        ...auditEntry,
        createdAt: new Date()
      }

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue(mockCreatedLog)

      await auditService.logEvent(auditEntry)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: {
          userId,
          entityType: 'User',
          entityId,
          action: 'CREATE',
          oldValues: undefined,
          newValues: auditEntry.newValues,
          ipAddress: '192.168.1.1',
          userAgent: 'Mozilla/5.0',
          sessionId: 'session-123',
          requestId: 'req-123',
          endpoint: '/api/users',
          reason: 'User registration',
          approvalRequired: false,
          approvedBy: undefined,
          dataAccessed: 'PII'
        }
      })

      expect(mockFastify.log.info).toHaveBeenCalledWith(
        {
          auditEvent: {
            userId,
            entityType: 'User',
            entityId,
            action: 'CREATE',
            dataClassification: 'PII',
            timestamp: expect.any(String)
          }
        },
        'Audit event logged'
      )
    })

    it('should not log audit events for audit log reads to prevent infinite loops', async () => {
      const auditEntry: AuditLogEntry = {
        userId,
        entityType: 'AuditLog',
        entityId,
        action: 'READ'
      }

      await auditService.logEvent(auditEntry)

      expect(mockPrisma.auditLog.create).not.toHaveBeenCalled()
      expect(mockFastify.log.info).not.toHaveBeenCalled()
    })

    it('should handle audit logging failures gracefully', async () => {
      const auditEntry: AuditLogEntry = {
        userId,
        entityType: 'User',
        entityId,
        action: 'CREATE'
      }

      const error = new Error('Database connection failed')
      mockPrisma.auditLog.create = vi.fn().mockRejectedValue(error)

      // Should not throw error
      await expect(auditService.logEvent(auditEntry)).resolves.not.toThrow()

      expect(mockFastify.log.error).toHaveBeenCalledWith(
        {
          error,
          auditEntry
        },
        'CRITICAL: Audit logging failed'
      )
    })

    it('should set default values for optional fields', async () => {
      const minimalEntry: AuditLogEntry = {
        userId,
        entityType: 'User',
        entityId,
        action: 'READ'
      }

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logEvent(minimalEntry)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          approvalRequired: false,
          oldValues: undefined,
          newValues: undefined
        })
      })
    })
  })

  describe('logAuthentication', () => {
    it('should log successful login', async () => {
      const ipAddress = '192.168.1.1'
      const userAgent = 'Mozilla/5.0'

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logAuthentication(userId, 'LOGIN_SUCCESS', ipAddress, userAgent)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          entityType: 'Authentication',
          entityId: userId,
          action: 'CREATE',
          newValues: {
            authAction: 'LOGIN_SUCCESS',
            timestamp: expect.any(String)
          },
          ipAddress,
          userAgent,
          dataAccessed: 'PII'
        })
      })
    })

    it('should log failed login attempt', async () => {
      const reason = 'Invalid password'

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logAuthentication(userId, 'LOGIN_FAILURE', undefined, undefined, reason)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'CREATE',
          newValues: {
            authAction: 'LOGIN_FAILURE',
            timestamp: expect.any(String)
          },
          reason
        })
      })
    })

    it('should log logout as DELETE action', async () => {
      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logAuthentication(userId, 'LOGOUT')

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'DELETE',
          newValues: {
            authAction: 'LOGOUT',
            timestamp: expect.any(String)
          }
        })
      })
    })
  })

  describe('logUnauthorizedAccess', () => {
    it('should log unauthorized access attempt', async () => {
      const permission = 'users:create'
      const ipAddress = '192.168.1.1'
      const userAgent = 'Mozilla/5.0'
      const endpoint = '/api/users'

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logUnauthorizedAccess(userId, permission, ipAddress, userAgent, endpoint)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          entityType: 'SecurityViolation',
          entityId: expect.stringMatching(/^unauthorized_\d+$/),
          action: 'READ',
          newValues: {
            violationType: 'UNAUTHORIZED_ACCESS',
            permission,
            endpoint,
            timestamp: expect.any(String)
          },
          ipAddress,
          userAgent,
          endpoint,
          dataAccessed: 'INTERNAL'
        })
      })

      expect(mockFastify.log.warn).toHaveBeenCalledWith(
        {
          securityEvent: {
            type: 'UNAUTHORIZED_ACCESS',
            userId,
            permission,
            endpoint,
            ipAddress,
            userAgent
          }
        },
        'Security violation: Unauthorized access attempt'
      )
    })

    it('should handle undefined userId for anonymous access attempts', async () => {
      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logUnauthorizedAccess(undefined, 'users:read', '192.168.1.1')

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: undefined,
          entityType: 'SecurityViolation'
        })
      })
    })
  })

  describe('logDataAccess', () => {
    it('should log PHI access', async () => {
      const clientId = 'client-123'
      const reason = 'Scheduled visit review'

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logDataAccess(userId, 'User', clientId, 'PHI', reason)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          entityType: 'User',
          entityId: clientId,
          action: 'READ',
          reason,
          dataAccessed: 'PHI'
        })
      })
    })

    it('should log PII access', async () => {
      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logDataAccess(userId, 'User', entityId, 'PII')

      expect(mockPrisma.auditLog.create).toHaveBeenCalled()
    })

    it('should not log access for non-sensitive data', async () => {
      await auditService.logDataAccess(userId, 'User', entityId, 'PUBLIC')

      expect(mockPrisma.auditLog.create).not.toHaveBeenCalled()
    })

    it('should not log access for internal data', async () => {
      await auditService.logDataAccess(userId, 'User', entityId, 'INTERNAL')

      expect(mockPrisma.auditLog.create).not.toHaveBeenCalled()
    })
  })

  describe('logEntityCreation', () => {
    it('should log entity creation with sanitized data', async () => {
      const entityData = {
        email: 'test@example.com',
        password: 'secret123',
        ssn: '123-45-6789',
        name: 'John Doe'
      }

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logEntityCreation('User', entityId, userId, entityData, 'PII')

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'CREATE',
          newValues: {
            email: 'test@example.com',
            password: '[REDACTED]',
            ssn: '[REDACTED]',
            name: 'John Doe'
          },
          dataAccessed: 'PII'
        })
      })
    })

    it('should handle nested objects in sanitization', async () => {
      const entityData = {
        profile: {
          name: 'John Doe',
          creditCard: '1234-5678-9012-3456'
        }
      }

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logEntityCreation('User', entityId, userId, entityData)

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          newValues: {
            profile: {
              name: 'John Doe',
              creditCard: '[REDACTED]'
            }
          }
        })
      })
    })
  })

  describe('logEntityUpdate', () => {
    it('should log entity update with old and new values', async () => {
      const oldData = {
        email: 'old@example.com',
        name: 'Old Name'
      }
      const newData = {
        email: 'new@example.com',
        name: 'New Name',
        password: 'newsecret'
      }

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logEntityUpdate('User', entityId, userId, newData, oldData, 'PII')

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'UPDATE',
          oldValues: oldData,
          newValues: {
            email: 'new@example.com',
            name: 'New Name',
            password: '[REDACTED]'
          },
          dataAccessed: 'PII'
        })
      })
    })
  })

  describe('logEntityDeletion', () => {
    it('should log entity deletion with reason', async () => {
      const oldData = {
        email: 'deleted@example.com',
        password: 'secret'
      }
      const reason = 'User requested account deletion'

      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      await auditService.logEntityDeletion('User', entityId, userId, oldData, reason, 'PII')

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: 'DELETE',
          oldValues: {
            email: 'deleted@example.com',
            password: '[REDACTED]'
          },
          reason,
          dataAccessed: 'PII'
        })
      })
    })
  })

  describe('queryAuditLogs', () => {
    it('should query audit logs with filters and pagination', async () => {
      const query = {
        userId,
        entityType: 'User',
        action: 'CREATE',
        page: 1,
        limit: 20
      }

      const mockAuditLogs = [
        {
          id: 'log-1',
          userId,
          entityType: 'User',
          action: 'CREATE',
          user: {
            email: 'user@example.com',
            role: 'CLIENT',
            profile: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        }
      ]

      mockPrisma.auditLog.findMany = vi.fn().mockResolvedValue(mockAuditLogs)
      mockPrisma.auditLog.count = vi.fn().mockResolvedValue(1)

      const result = await auditService.queryAuditLogs(query)

      expect(mockPrisma.auditLog.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          entityType: 'User',
          action: 'CREATE'
        },
        skip: 0,
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
              role: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      })

      expect(result).toEqual({
        data: expect.arrayContaining([
          expect.objectContaining({
            userId,
            entityType: 'User',
            action: 'CREATE'
          })
        ]),
        total: 1,
        page: 1,
        limit: 20
      })
    })

    it('should apply date range filters', async () => {
      const query = {
        dateFrom: new Date('2024-01-01'),
        dateTo: new Date('2024-01-31'),
        page: 1,
        limit: 50
      }

      mockPrisma.auditLog.findMany = vi.fn().mockResolvedValue([])
      mockPrisma.auditLog.count = vi.fn().mockResolvedValue(0)

      await auditService.queryAuditLogs(query)

      expect(mockPrisma.auditLog.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: query.dateFrom,
            lte: query.dateTo
          }
        },
        skip: 0,
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object)
      })
    })

    it('should apply data classification filter', async () => {
      const query = {
        dataClassification: 'PHI' as const,
        page: 1,
        limit: 50
      }

      mockPrisma.auditLog.findMany = vi.fn().mockResolvedValue([])
      mockPrisma.auditLog.count = vi.fn().mockResolvedValue(0)

      await auditService.queryAuditLogs(query)

      expect(mockPrisma.auditLog.findMany).toHaveBeenCalledWith({
        where: {
          dataAccessed: 'PHI'
        },
        skip: 0,
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object)
      })
    })
  })

  describe('getAuditStatistics', () => {
    it('should return comprehensive audit statistics', async () => {
      const dateFrom = new Date('2024-01-01')
      const dateTo = new Date('2024-01-31')

      const mockEventsByAction = [
        { action: 'CREATE', _count: 50 },
        { action: 'READ', _count: 200 },
        { action: 'UPDATE', _count: 30 }
      ]

      const mockEventsByEntityType = [
        { entityType: 'User', _count: 100 },
        { entityType: 'Visit', _count: 150 }
      ]

      const mockEventsByDataClassification = [
        { dataAccessed: 'PHI', _count: 80 },
        { dataAccessed: 'PII', _count: 120 }
      ]

      const mockTopUsers = [
        { userId: 'user-1', _count: 50 },
        { userId: 'user-2', _count: 30 }
      ]

      const mockRecentActivity = [
        {
          id: 'log-1',
          userId: 'user-1',
          entityType: 'User',
          action: 'CREATE',
          user: { email: 'user@example.com', role: 'CLIENT' }
        }
      ]

      mockPrisma.auditLog.count = vi.fn().mockResolvedValue(280)
      mockPrisma.auditLog.groupBy = vi.fn()
        .mockResolvedValueOnce(mockEventsByAction)
        .mockResolvedValueOnce(mockEventsByEntityType)
        .mockResolvedValueOnce(mockEventsByDataClassification)
        .mockResolvedValueOnce(mockTopUsers)
      mockPrisma.auditLog.findMany = vi.fn().mockResolvedValue(mockRecentActivity)

      const result = await auditService.getAuditStatistics(dateFrom, dateTo)

      expect(result).toEqual({
        totalEvents: 280,
        eventsByAction: {
          CREATE: 50,
          READ: 200,
          UPDATE: 30
        },
        eventsByEntityType: {
          User: 100,
          Visit: 150
        },
        eventsByDataClassification: {
          PHI: 80,
          PII: 120
        },
        topUsers: [
          { userId: 'user-1', eventCount: 50 },
          { userId: 'user-2', eventCount: 30 }
        ],
        recentActivity: expect.arrayContaining([
          expect.objectContaining({
            userId: 'user-1',
            entityType: 'User',
            action: 'CREATE'
          })
        ])
      })
    })

    it('should handle null data classification values', async () => {
      const mockEventsByDataClassification = [
        { dataAccessed: 'PHI', _count: 50 },
        { dataAccessed: null, _count: 30 }
      ]

      mockPrisma.auditLog.count = vi.fn().mockResolvedValue(100)
      mockPrisma.auditLog.groupBy = vi.fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(mockEventsByDataClassification)
        .mockResolvedValueOnce([])
      mockPrisma.auditLog.findMany = vi.fn().mockResolvedValue([])

      const result = await auditService.getAuditStatistics()

      expect(result.eventsByDataClassification).toEqual({
        PHI: 50,
        UNCLASSIFIED: 30
      })
    })
  })

  describe('createAuditLogger', () => {
    it('should create audit logger function with data classification inference', async () => {
      mockPrisma.auditLog.create = vi.fn().mockResolvedValue({})

      const auditLogger = auditService.createAuditLogger()

      await auditLogger({
        userId,
        action: 'CREATE',
        entityType: 'Visit',
        entityId,
        newValues: { clientId: 'client-123' }
      })

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          dataAccessed: 'PHI' // Visit should be classified as PHI
        })
      })
    })
  })

  describe('inferDataClassification', () => {
    it('should classify healthcare entities as PHI', () => {
      expect((auditService as any).inferDataClassification('Visit')).toBe('PHI')
      expect((auditService as any).inferDataClassification('CarePlan')).toBe('PHI')
      expect((auditService as any).inferDataClassification('Profile')).toBe('PHI')
    })

    it('should classify user entities as PII', () => {
      expect((auditService as any).inferDataClassification('User')).toBe('PII')
      expect((auditService as any).inferDataClassification('Authentication')).toBe('PII')
    })

    it('should classify financial entities as PII', () => {
      expect((auditService as any).inferDataClassification('Budget')).toBe('PII')
      expect((auditService as any).inferDataClassification('BudgetExpense')).toBe('PII')
    })

    it('should default to INTERNAL for unknown entities', () => {
      expect((auditService as any).inferDataClassification('UnknownEntity')).toBe('INTERNAL')
    })
  })

  describe('sanitizeAuditData', () => {
    it('should redact sensitive fields', () => {
      const data = {
        email: 'test@example.com',
        password: 'secret123',
        token: 'jwt-token',
        ssn: '123-45-6789',
        name: 'John Doe'
      }

      const result = (auditService as any).sanitizeAuditData(data)

      expect(result).toEqual({
        email: 'test@example.com',
        password: '[REDACTED]',
        token: '[REDACTED]',
        ssn: '[REDACTED]',
        name: 'John Doe'
      })
    })

    it('should handle nested objects', async () => {
      const data = {
        user: {
          email: 'test@example.com',
          creditCard: '1234-5678-9012-3456'
        },
        metadata: {
          key: 'value',
          secret: 'sensitive'
        }
      }

      const result = (auditService as any).sanitizeAuditData(data)

      expect(result).toEqual({
        user: {
          email: 'test@example.com',
          creditCard: '[REDACTED]'
        },
        metadata: {
          key: 'value',
          secret: '[REDACTED]'
        }
      })
    })

    it('should handle case-insensitive field matching', () => {
      const data = {
        PASSWORD: 'secret',
        CreditCard: '1234-5678',
        normalField: 'value'
      }

      const result = (auditService as any).sanitizeAuditData(data)

      expect(result).toEqual({
        PASSWORD: '[REDACTED]',
        CreditCard: '[REDACTED]',
        normalField: 'value'
      })
    })
  })
})