import { describe, it, expect, beforeEach, vi, beforeAll, afterAll } from 'vitest'
import type { PrismaClient } from '@caretracker/database'
import { BaseRepository, type AuditableEntity, type AuditContext } from '../../../src/repositories/base.repository.js'
import { NotFoundError, OptimisticLockError, DatabaseError } from '../../../src/utils/errors.js'

// Mock entity for testing
interface TestEntity extends AuditableEntity {
  readonly name: string
  readonly description?: string | null
}

// Concrete implementation for testing
class TestRepository extends BaseRepository<TestEntity> {
  protected readonly tableName = 'testEntity'
  protected readonly entityName = 'TestEntity'
}

// Mock Prisma client
const mockPrisma = {
  testEntity: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    update: vi.fn(),
  },
  $transaction: vi.fn()
} as unknown as PrismaClient

// Mock audit logger
const mockAuditLogger = vi.fn()

describe('BaseRepository', () => {
  let repository: TestRepository
  const userId = 'test-user-id'
  const testEntityId = 'test-entity-id'

  beforeEach(() => {
    vi.clearAllMocks()
    repository = new TestRepository(mockPrisma, mockAuditLogger)
  })

  describe('create', () => {
    it('should create entity with audit fields', async () => {
      const inputData = { name: 'Test Entity', description: 'Test description' }
      const expectedData = {
        ...inputData,
        createdBy: userId,
        updatedBy: userId,
        version: 1
      }
      const createdEntity = {
        id: testEntityId,
        ...expectedData,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }

      mockPrisma.testEntity.create = vi.fn().mockResolvedValue(createdEntity)

      const result = await repository.create(inputData, userId)

      expect(mockPrisma.testEntity.create).toHaveBeenCalledWith({
        data: expectedData
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'CREATE',
        entityType: 'TestEntity',
        entityId: testEntityId,
        newValues: expectedData
      })
      expect(result).toEqual(createdEntity)
    })

    it('should handle creation errors', async () => {
      const inputData = { name: 'Test Entity' }
      const error = new Error('Database constraint violation')

      mockPrisma.testEntity.create = vi.fn().mockRejectedValue(error)

      await expect(repository.create(inputData, userId)).rejects.toThrow(DatabaseError)
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })

    it('should work within a transaction', async () => {
      const inputData = { name: 'Test Entity' }
      const mockTx = { testEntity: { create: vi.fn().mockResolvedValue({ id: testEntityId }) } }

      await repository.create(inputData, userId, mockTx as any)

      expect(mockTx.testEntity.create).toHaveBeenCalled()
      expect(mockPrisma.testEntity.create).not.toHaveBeenCalled()
    })
  })

  describe('findById', () => {
    it('should find entity by id and log audit event', async () => {
      const entity = {
        id: testEntityId,
        name: 'Test Entity',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        version: 1
      }

      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(entity)

      const result = await repository.findById(testEntityId, userId)

      expect(mockPrisma.testEntity.findUnique).toHaveBeenCalledWith({
        where: { id: testEntityId, deletedAt: null },
        include: undefined
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'TestEntity',
        entityId: testEntityId
      })
      expect(result).toEqual(entity)
    })

    it('should return null when entity not found', async () => {
      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(null)

      const result = await repository.findById(testEntityId, userId)

      expect(result).toBeNull()
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })

    it('should not log audit event when no userId provided', async () => {
      const entity = { id: testEntityId, name: 'Test Entity' }
      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(entity)

      const result = await repository.findById(testEntityId)

      expect(result).toEqual(entity)
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })

    it('should handle database errors', async () => {
      mockPrisma.testEntity.findUnique = vi.fn().mockRejectedValue(new Error('Database error'))

      await expect(repository.findById(testEntityId, userId)).rejects.toThrow(DatabaseError)
    })

    it('should support include option', async () => {
      const includeOption = { profile: true }
      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(null)

      await repository.findById(testEntityId, userId, includeOption)

      expect(mockPrisma.testEntity.findUnique).toHaveBeenCalledWith({
        where: { id: testEntityId, deletedAt: null },
        include: includeOption
      })
    })
  })

  describe('findMany', () => {
    it('should find entities with default options', async () => {
      const entities = [
        { id: '1', name: 'Entity 1' },
        { id: '2', name: 'Entity 2' }
      ]

      mockPrisma.testEntity.findMany = vi.fn().mockResolvedValue(entities)

      const result = await repository.findMany({}, userId)

      expect(mockPrisma.testEntity.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: undefined
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'TestEntity',
        entityId: 'BULK_READ',
        newValues: { count: 2, filters: {} }
      })
      expect(result).toEqual(entities)
    })

    it('should apply filters and options', async () => {
      const options = {
        skip: 20,
        take: 5,
        orderBy: { name: 'asc' as const },
        where: { name: 'Test' },
        include: { profile: true }
      }

      mockPrisma.testEntity.findMany = vi.fn().mockResolvedValue([])

      await repository.findMany(options, userId)

      expect(mockPrisma.testEntity.findMany).toHaveBeenCalledWith({
        where: { ...options.where, deletedAt: null },
        skip: 20,
        take: 5,
        orderBy: { name: 'asc' },
        include: { profile: true }
      })
    })

    it('should not log audit when no entities found', async () => {
      mockPrisma.testEntity.findMany = vi.fn().mockResolvedValue([])

      await repository.findMany({}, userId)

      expect(mockAuditLogger).not.toHaveBeenCalled()
    })
  })

  describe('findManyPaginated', () => {
    it('should return paginated results with metadata', async () => {
      const entities = [{ id: '1', name: 'Entity 1' }]
      const totalCount = 25

      mockPrisma.testEntity.findMany = vi.fn().mockResolvedValue(entities)
      mockPrisma.testEntity.count = vi.fn().mockResolvedValue(totalCount)

      const result = await repository.findManyPaginated(2, 10, {}, { name: 'asc' }, undefined, userId)

      expect(mockPrisma.testEntity.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        skip: 10,
        take: 10,
        orderBy: { name: 'asc' },
        include: undefined
      })
      expect(mockPrisma.testEntity.count).toHaveBeenCalledWith({
        where: { deletedAt: null }
      })
      expect(result).toEqual({
        data: entities,
        meta: {
          page: 2,
          limit: 10,
          total: 25,
          totalPages: 3
        }
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'TestEntity',
        entityId: 'PAGINATED_READ',
        newValues: {
          page: 2,
          limit: 10,
          total: 25,
          count: 1,
          filters: {}
        }
      })
    })
  })

  describe('update', () => {
    it('should update entity with optimistic locking', async () => {
      const currentEntity = {
        id: testEntityId,
        name: 'Old Name',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
      const updateData = { name: 'New Name' }
      const updatedEntity = {
        ...currentEntity,
        ...updateData,
        version: 2,
        updatedAt: new Date(),
        updatedBy: userId
      }

      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(currentEntity)
      mockPrisma.testEntity.update = vi.fn().mockResolvedValue(updatedEntity)

      const result = await repository.update(testEntityId, updateData, userId)

      expect(mockPrisma.testEntity.findUnique).toHaveBeenCalledWith({
        where: { id: testEntityId, deletedAt: null }
      })
      expect(mockPrisma.testEntity.update).toHaveBeenCalledWith({
        where: {
          id: testEntityId,
          version: 1,
          deletedAt: null
        },
        data: {
          ...updateData,
          updatedBy: userId,
          version: 2,
          updatedAt: expect.any(Date)
        }
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'UPDATE',
        entityType: 'TestEntity',
        entityId: testEntityId,
        oldValues: currentEntity,
        newValues: expect.objectContaining(updateData)
      })
      expect(result).toEqual(updatedEntity)
    })

    it('should throw NotFoundError when entity not found', async () => {
      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(null)

      await expect(repository.update(testEntityId, { name: 'New Name' }, userId))
        .rejects.toThrow(NotFoundError)

      expect(mockPrisma.testEntity.update).not.toHaveBeenCalled()
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })

    it('should throw OptimisticLockError on version conflict', async () => {
      const currentEntity = { id: testEntityId, version: 1 }
      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(currentEntity)
      mockPrisma.testEntity.update = vi.fn().mockRejectedValue(
        new Error('Record to update not found')
      )

      await expect(repository.update(testEntityId, { name: 'New Name' }, userId))
        .rejects.toThrow(OptimisticLockError)
    })
  })

  describe('softDelete', () => {
    it('should soft delete entity', async () => {
      const currentEntity = {
        id: testEntityId,
        name: 'Entity to delete',
        version: 1,
        deletedAt: null
      }

      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(currentEntity)
      mockPrisma.testEntity.update = vi.fn().mockResolvedValue({ ...currentEntity, deletedAt: new Date() })

      await repository.softDelete(testEntityId, userId, 'Test deletion')

      expect(mockPrisma.testEntity.update).toHaveBeenCalledWith({
        where: { id: testEntityId },
        data: {
          deletedAt: expect.any(Date),
          updatedBy: userId,
          version: 2,
          updatedAt: expect.any(Date)
        }
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'DELETE',
        entityType: 'TestEntity',
        entityId: testEntityId,
        oldValues: currentEntity,
        reason: 'Test deletion'
      })
    })

    it('should throw NotFoundError when entity not found', async () => {
      mockPrisma.testEntity.findUnique = vi.fn().mockResolvedValue(null)

      await expect(repository.softDelete(testEntityId, userId))
        .rejects.toThrow(NotFoundError)
    })
  })

  describe('exists', () => {
    it('should return true when entity exists', async () => {
      mockPrisma.testEntity.count = vi.fn().mockResolvedValue(1)

      const result = await repository.exists(testEntityId)

      expect(mockPrisma.testEntity.count).toHaveBeenCalledWith({
        where: { id: testEntityId, deletedAt: null }
      })
      expect(result).toBe(true)
    })

    it('should return false when entity does not exist', async () => {
      mockPrisma.testEntity.count = vi.fn().mockResolvedValue(0)

      const result = await repository.exists(testEntityId)

      expect(result).toBe(false)
    })
  })

  describe('count', () => {
    it('should count entities with filters', async () => {
      const filters = { name: 'Test' }
      mockPrisma.testEntity.count = vi.fn().mockResolvedValue(5)

      const result = await repository.count(filters)

      expect(mockPrisma.testEntity.count).toHaveBeenCalledWith({
        where: { ...filters, deletedAt: null }
      })
      expect(result).toBe(5)
    })
  })

  describe('executeInTransaction', () => {
    it('should execute callback within transaction', async () => {
      const mockCallback = vi.fn().mockResolvedValue('transaction result')
      mockPrisma.$transaction = vi.fn().mockImplementation(callback => callback())

      const result = await repository.executeInTransaction(mockCallback)

      expect(mockPrisma.$transaction).toHaveBeenCalledWith(mockCallback)
      expect(result).toBe('transaction result')
    })

    it('should handle transaction errors', async () => {
      const mockCallback = vi.fn().mockRejectedValue(new Error('Transaction failed'))
      mockPrisma.$transaction = vi.fn().mockImplementation(callback => callback())

      await expect(repository.executeInTransaction(mockCallback))
        .rejects.toThrow(DatabaseError)
    })
  })
})