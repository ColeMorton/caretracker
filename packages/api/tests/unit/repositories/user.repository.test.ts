import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { PrismaClient } from '@caretracker/database'
import { UserRepository } from '../../../src/repositories/user.repository.js'
import { NotFoundError, ConflictError } from '../../../src/utils/errors.js'
import { UserFactory, ProfileFactory } from '../../fixtures/factories/user.factory.js'

// Mock Prisma client
const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
  },
  profile: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  $transaction: vi.fn(),
} as unknown as PrismaClient

// Create transaction mock that mimics the real Prisma transaction behavior
const createTransactionMock = (operations: Record<string, any> = {}) => {
  const mockTx = {
    user: {
      findUnique: vi.fn().mockResolvedValue(null),
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
      ...operations.user
    },
    profile: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
      ...operations.profile
    }
  }

  mockPrisma.$transaction = vi.fn().mockImplementation(async (callback) => {
    return await callback(mockTx)
  })

  return mockTx
}

// Mock audit logger
const mockAuditLogger = vi.fn()

describe('UserRepository', () => {
  let repository: UserRepository
  const userId = 'current-user-id'
  const targetUserId = 'target-user-id'

  beforeEach(() => {
    vi.clearAllMocks()
    // Set up default transaction mock
    createTransactionMock()
    repository = new UserRepository(mockPrisma, mockAuditLogger)
  })

  describe('findByEmail', () => {
    it('should find user by email and log audit event', async () => {
      const email = 'test@example.com'
      const user = {
        id: targetUserId,
        email,
        role: 'CLIENT',
        profile: { firstName: 'John', lastName: 'Doe' }
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)

      const result = await repository.findByEmail(email, userId)

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email, deletedAt: null },
        include: { profile: true }
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'User',
        entityId: targetUserId,
        newValues: { searchType: 'email', email }
      })
      expect(result).toEqual(user)
    })

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(null)

      const result = await repository.findByEmail('nonexistent@example.com', userId)

      expect(result).toBeNull()
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })

    it('should not log audit when no userId provided', async () => {
      const user = { id: targetUserId, email: 'test@example.com' }
      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)

      const result = await repository.findByEmail('test@example.com')

      expect(result).toEqual(user)
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })

    it('should handle database errors', async () => {
      mockPrisma.user.findUnique = vi.fn().mockRejectedValue(new Error('Database error'))

      await expect(repository.findByEmail('test@example.com', userId))
        .rejects.toThrow(NotFoundError)
    })
  })

  describe('findByMedicalRecordNumber', () => {
    it('should find user by medical record number and log PHI access', async () => {
      const mrn = 'MRN12345678'
      const user = {
        id: targetUserId,
        email: 'patient@example.com',
        role: 'CLIENT',
        profile: {
          firstName: 'Jane',
          lastName: 'Smith',
          medicalRecordNumber: mrn
        }
      }

      mockPrisma.user.findFirst = vi.fn().mockResolvedValue(user)

      const result = await repository.findByMedicalRecordNumber(mrn, userId)

      expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
        where: {
          profile: { medicalRecordNumber: mrn },
          deletedAt: null
        },
        include: { profile: true }
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'User',
        entityId: targetUserId,
        newValues: { searchType: 'medicalRecordNumber', medicalRecordNumber: mrn }
      })
      expect(result).toEqual(user)
    })

    it('should return null when user not found by MRN', async () => {
      mockPrisma.user.findFirst = vi.fn().mockResolvedValue(null)

      const result = await repository.findByMedicalRecordNumber('NONEXISTENT', userId)

      expect(result).toBeNull()
      expect(mockAuditLogger).not.toHaveBeenCalled()
    })
  })

  describe('findActiveUsers', () => {
    it('should find active users with filters and pagination', async () => {
      const filters = { role: 'CLIENT', search: 'john' }
      const users = [
        { id: '1', email: 'john1@example.com', role: 'CLIENT', profile: { firstName: 'John' } },
        { id: '2', email: 'john2@example.com', role: 'CLIENT', profile: { firstName: 'Johnny' } }
      ]
      const totalCount = 2

      mockPrisma.user.findMany = vi.fn().mockResolvedValue(users)
      mockPrisma.user.count = vi.fn().mockResolvedValue(totalCount)

      const result = await repository.findActiveUsers(filters, 1, 10, userId)

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          deletedAt: null,
          role: 'CLIENT',
          OR: [
            { email: { contains: 'john', mode: 'insensitive' } },
            {
              profile: {
                OR: [
                  { firstName: { contains: 'john', mode: 'insensitive' } },
                  { lastName: { contains: 'john', mode: 'insensitive' } },
                  { preferredName: { contains: 'john', mode: 'insensitive' } }
                ]
              }
            }
          ]
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { profile: true }
      })

      expect(result.data).toEqual(users)
      expect(result.meta).toEqual({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1
      })
    })

    it('should filter by supervisor when provided', async () => {
      const supervisorId = 'supervisor-123'
      mockPrisma.user.findMany = vi.fn().mockResolvedValue([])
      mockPrisma.user.count = vi.fn().mockResolvedValue(0)

      await repository.findActiveUsers({ supervisorId }, 1, 10, userId)

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          supervisorId
        }),
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { profile: true }
      })
    })

    it('should filter by email verification status', async () => {
      mockPrisma.user.findMany = vi.fn().mockResolvedValue([])
      mockPrisma.user.count = vi.fn().mockResolvedValue(0)

      await repository.findActiveUsers({ emailVerified: true }, 1, 10, userId)

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          emailVerified: true
        }),
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { profile: true }
      })
    })
  })

  describe('createWithProfile', () => {
    it('should create user with profile in transaction', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'hashedpassword',
        role: 'CLIENT' as const,
        profile: {
          firstName: 'New',
          lastName: 'User',
          medicalRecordNumber: 'MRN87654321',
          dateOfBirth: new Date('1990-01-01')
        }
      }

      const createdUser = {
        id: 'new-user-id',
        ...userData,
        isActive: true,
        createdBy: userId,
        updatedBy: userId,
        version: 1
      }

      const createdProfile = {
        id: 'new-profile-id',
        userId: 'new-user-id',
        ...userData.profile,
        createdBy: userId,
        updatedBy: userId,
        version: 1
      }

      const mockTx = {
        user: {
          findUnique: vi.fn().mockResolvedValue(null), // No existing user
          create: vi.fn().mockResolvedValue(createdUser)
        },
        profile: {
          findUnique: vi.fn().mockResolvedValue(null), // No existing MRN
          create: vi.fn().mockResolvedValue(createdProfile)
        }
      }

      mockPrisma.$transaction = vi.fn().mockImplementation(callback => callback(mockTx))

      const result = await repository.createWithProfile(userData, userId)

      expect(mockTx.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email }
      })
      expect(mockTx.profile.findUnique).toHaveBeenCalledWith({
        where: { medicalRecordNumber: userData.profile.medicalRecordNumber }
      })
      expect(mockTx.user.create).toHaveBeenCalledWith({
        data: {
          email: userData.email,
          password: userData.password,
          role: userData.role,
          isActive: true,
          createdBy: userId,
          updatedBy: userId,
          version: 1
        }
      })
      expect(mockTx.profile.create).toHaveBeenCalledWith({
        data: {
          userId: 'new-user-id',
          ...userData.profile,
          dateOfBirth: userData.profile.dateOfBirth,
          createdBy: userId,
          updatedBy: userId,
          version: 1
        }
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'CREATE',
        entityType: 'User',
        entityId: 'new-user-id',
        newValues: { ...userData, password: '[REDACTED]' }
      })
    })

    it('should throw ConflictError when email already exists', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'hashedpassword',
        role: 'CLIENT' as const
      }

      // Mock existing user in transaction
      createTransactionMock({
        user: {
          findUnique: vi.fn().mockResolvedValue({ id: 'existing-user' })
        }
      })

      await expect(repository.createWithProfile(userData, userId))
        .rejects.toThrow('User with this email already exists')
    })

    it('should throw ConflictError when medical record number already exists', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'hashedpassword',
        role: 'CLIENT' as const,
        profile: {
          firstName: 'New',
          lastName: 'User',
          medicalRecordNumber: 'EXISTING_MRN'
        }
      }

      // Mock existing MRN in transaction
      createTransactionMock({
        user: {
          findUnique: vi.fn().mockResolvedValue(null)
        },
        profile: {
          findUnique: vi.fn().mockResolvedValue({ id: 'existing-profile' })
        }
      })

      await expect(repository.createWithProfile(userData, userId))
        .rejects.toThrow('Medical record number already exists')
    })

    it('should create user without profile when profile not provided', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'hashedpassword',
        role: 'WORKER' as const
      }

      const createdUser = {
        id: 'new-user-id',
        ...userData,
        isActive: true,
        profile: null
      }

      const mockTx = createTransactionMock({
        user: {
          findUnique: vi.fn().mockResolvedValue(null),
          create: vi.fn().mockResolvedValue(createdUser)
        }
      })

      const result = await repository.createWithProfile(userData, userId)

      expect(result.profile).toBeNull()
      expect(mockTx.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: userData.email,
          role: userData.role
        })
      })
    })
  })

  describe('updateWithProfile', () => {
    it('should update user and profile with version control', async () => {
      const updateData = {
        email: 'updated@example.com',
        role: 'WORKER' as const,
        profile: {
          firstName: 'Updated',
          lastName: 'Name'
        }
      }

      const currentUser = {
        id: targetUserId,
        email: 'original@example.com',
        role: 'CLIENT',
        version: 1,
        profile: {
          id: 'profile-id',
          firstName: 'Original',
          lastName: 'Name',
          version: 1
        }
      }

      const updatedUser = {
        ...currentUser,
        ...updateData,
        version: 2,
        updatedAt: new Date()
      }

      const updatedProfile = {
        ...currentUser.profile,
        ...updateData.profile,
        version: 2,
        updatedAt: new Date()
      }

      const mockTx = createTransactionMock({
        user: {
          findUnique: vi.fn()
            .mockResolvedValueOnce(currentUser) // First call: get current user
            .mockResolvedValueOnce(null),       // Second call: check email uniqueness
          update: vi.fn().mockResolvedValue(updatedUser)
        },
        profile: {
          update: vi.fn().mockResolvedValue(updatedProfile)
        }
      })

      const result = await repository.updateWithProfile(targetUserId, updateData, userId)

      expect(mockTx.user.findUnique).toHaveBeenCalledWith({
        where: { id: targetUserId, deletedAt: null },
        include: { profile: true }
      })
      expect(mockTx.user.update).toHaveBeenCalledWith({
        where: {
          id: targetUserId,
          version: 1
        },
        data: expect.objectContaining({
          email: updateData.email,
          role: updateData.role,
          updatedBy: userId,
          version: 2
        })
      })
      expect(mockTx.profile.update).toHaveBeenCalledWith({
        where: { userId: targetUserId },
        data: expect.objectContaining({
          ...updateData.profile,
          updatedBy: userId,
          version: 2
        })
      })
      expect(result.profile).toEqual(updatedProfile)
    })

    it('should throw NotFoundError when user does not exist', async () => {
      createTransactionMock({
        user: {
          findUnique: vi.fn().mockResolvedValue(null)
        }
      })

      await expect(repository.updateWithProfile(targetUserId, { email: 'new@example.com' }, userId))
        .rejects.toThrow(NotFoundError)
    })

    it('should create profile if it does not exist', async () => {
      const updateData = {
        profile: {
          firstName: 'New',
          lastName: 'Profile'
        }
      }

      const currentUser = {
        id: targetUserId,
        email: 'user@example.com',
        version: 1,
        profile: null
      }

      const newProfile = {
        id: 'new-profile-id',
        userId: targetUserId,
        ...updateData.profile,
        version: 1
      }

      const mockTx = createTransactionMock({
        user: {
          findUnique: vi.fn().mockResolvedValue(currentUser),
          update: vi.fn().mockResolvedValue(currentUser)
        },
        profile: {
          create: vi.fn().mockResolvedValue(newProfile)
        }
      })

      const result = await repository.updateWithProfile(targetUserId, updateData, userId)

      expect(mockTx.profile.create).toHaveBeenCalledWith({
        data: {
          userId: targetUserId,
          ...updateData.profile,
          createdBy: userId,
          updatedBy: userId,
          version: 1
        }
      })
      expect(result.profile).toEqual(newProfile)
    })
  })

  describe('findWorkersByClient', () => {
    it('should find workers assigned to client through visits', async () => {
      const clientId = 'client-123'
      const workers = [
        { id: 'worker-1', role: 'WORKER', profile: { firstName: 'Alice', lastName: 'Worker' } },
        { id: 'worker-2', role: 'WORKER', profile: { firstName: 'Bob', lastName: 'Worker' } }
      ]

      mockPrisma.user.findMany = vi.fn().mockResolvedValue(workers)

      const result = await repository.findWorkersByClient(clientId, userId)

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: {
          role: 'WORKER',
          isActive: true,
          deletedAt: null,
          workerVisits: {
            some: {
              clientId,
              deletedAt: null
            }
          }
        },
        include: { profile: true },
        distinct: ['id']
      })
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'User',
        entityId: 'WORKERS_BY_CLIENT',
        newValues: { clientId, workersFound: 2 }
      })
      expect(result).toEqual(workers)
    })

    it('should handle case when no workers found', async () => {
      mockPrisma.user.findMany = vi.fn().mockResolvedValue([])

      const result = await repository.findWorkersByClient('client-123', userId)

      expect(result).toEqual([])
      expect(mockAuditLogger).toHaveBeenCalledWith({
        userId,
        action: 'READ',
        entityType: 'User',
        entityId: 'WORKERS_BY_CLIENT',
        newValues: { clientId: 'client-123', workersFound: 0 }
      })
    })
  })

  describe('findClientsByWorker', () => {
    it('should find clients assigned to worker through visits', async () => {
      const workerId = 'worker-123'
      const clients = [
        { id: 'client-1', role: 'CLIENT', profile: { firstName: 'John', lastName: 'Client' } }
      ]

      mockPrisma.user.findMany = vi.fn().mockResolvedValue(clients)

      const result = await repository.findClientsByWorker(workerId, userId)

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: {
          role: 'CLIENT',
          isActive: true,
          deletedAt: null,
          clientVisits: {
            some: {
              workerId,
              deletedAt: null
            }
          }
        },
        include: { profile: true },
        distinct: ['id']
      })
      expect(result).toEqual(clients)
    })
  })

  describe('findBySupervisor', () => {
    it('should find workers supervised by supervisor', async () => {
      const supervisorId = 'supervisor-123'
      const workers = [
        { id: 'worker-1', supervisorId, profile: { firstName: 'Worker', lastName: 'One' } }
      ]

      mockPrisma.user.findMany = vi.fn().mockResolvedValue(workers)

      const result = await repository.findBySupervisor(supervisorId, userId)

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({
        where: {
          supervisorId,
          isActive: true,
          deletedAt: null
        },
        include: { profile: true },
        orderBy: { createdAt: 'desc' }
      })
      expect(result).toEqual(workers)
    })
  })

  describe('updateLastLogin', () => {
    it('should update last login timestamp', async () => {
      mockPrisma.user.update = vi.fn().mockResolvedValue({})

      await repository.updateLastLogin(targetUserId)

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: targetUserId },
        data: { lastLoginAt: expect.any(Date) }
      })
    })

    it('should not throw error when update fails', async () => {
      mockPrisma.user.update = vi.fn().mockRejectedValue(new Error('Update failed'))

      await expect(repository.updateLastLogin(targetUserId)).resolves.not.toThrow()
    })
  })

  describe('updateLoginAttempts', () => {
    it('should update login attempts and locked until', async () => {
      const attempts = 3
      const lockedUntil = new Date(Date.now() + 900000) // 15 minutes

      mockPrisma.user.update = vi.fn().mockResolvedValue({})

      await repository.updateLoginAttempts(targetUserId, attempts, lockedUntil)

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: targetUserId },
        data: {
          loginAttempts: attempts,
          lockedUntil
        }
      })
    })

    it('should not throw error when update fails', async () => {
      mockPrisma.user.update = vi.fn().mockRejectedValue(new Error('Update failed'))

      await expect(repository.updateLoginAttempts(targetUserId, 1)).resolves.not.toThrow()
    })
  })
})