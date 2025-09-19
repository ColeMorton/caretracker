import type { User, Profile, PrismaClient } from '@caretracker/database'

import { NotFoundError, ConflictError } from '../utils/errors.js'

import type { AuditContext, PaginatedResult } from './base.repository.js';
import { BaseRepository } from './base.repository.js'


export interface UserWithProfile extends User {
  readonly profile?: Profile | null
}

export interface UserFilters {
  readonly email?: string
  readonly role?: string
  readonly isActive?: boolean
  readonly emailVerified?: boolean
  readonly supervisorId?: string
  readonly search?: string
}

export interface CreateUserData {
  readonly email: string
  readonly password: string
  readonly role: 'CLIENT' | 'WORKER' | 'ADMIN' | 'SUPERVISOR'
  readonly isActive?: boolean
  readonly profile?: {
    readonly firstName: string
    readonly lastName: string
    readonly middleName?: string
    readonly preferredName?: string
    readonly phone?: string
    readonly alternatePhone?: string
    readonly email?: string
    readonly streetAddress?: string
    readonly city?: string
    readonly state?: string
    readonly zipCode?: string
    readonly country?: string
    readonly dateOfBirth?: Date
    readonly gender?: string
    readonly medicalRecordNumber?: string
    readonly insuranceNumber?: string
    readonly insuranceProvider?: string
    readonly primaryCarePhysician?: string
    readonly emergencyContactName?: string
    readonly emergencyContactPhone?: string
    readonly emergencyContactRelation?: string
    readonly emergencyContactAddress?: string
    readonly allergies?: readonly string[]
    readonly medications?: readonly string[]
    readonly medicalConditions?: readonly string[]
    readonly specialNeeds?: string
    readonly preferredLanguage?: string
    readonly timezone?: string
    readonly photoUrl?: string
  }
}

export interface UpdateUserData {
  readonly email?: string
  readonly role?: 'CLIENT' | 'WORKER' | 'ADMIN' | 'SUPERVISOR'
  readonly isActive?: boolean
  readonly emailVerified?: boolean
  readonly supervisorId?: string
  readonly profile?: Partial<CreateUserData['profile']>
}

export class UserRepository extends BaseRepository<UserWithProfile> {
  protected readonly tableName = 'user'
  protected readonly entityName = 'User'

  constructor(
    prisma: PrismaClient,
    auditLogger?: (context: AuditContext) => Promise<void>
  ) {
    super(prisma, auditLogger)
  }

  async findByEmail(email: string, userId?: string): Promise<UserWithProfile | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email, deletedAt: null },
        include: { profile: true }
      })

      // Log audit event for email-based lookup
      if (user && this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: user.id,
          newValues: { searchType: 'email', email }
        })
      }

      return user as UserWithProfile | null

    } catch (error) {
      throw new NotFoundError('User not found')
    }
  }

  async findByMedicalRecordNumber(
    medicalRecordNumber: string,
    userId?: string
  ): Promise<UserWithProfile | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          profile: {
            medicalRecordNumber
          },
          deletedAt: null
        },
        include: { profile: true }
      })

      // Log audit event for PHI access
      if (user && this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: user.id,
          newValues: { searchType: 'medicalRecordNumber', medicalRecordNumber }
        })
      }

      return user as UserWithProfile | null

    } catch (error) {
      throw new NotFoundError('User not found')
    }
  }

  async findActiveUsers(
    filters: UserFilters = {},
    page: number = 1,
    limit: number = 10,
    userId?: string
  ): Promise<PaginatedResult<UserWithProfile>> {
    const {
      email,
      role,
      isActive = true,
      emailVerified,
      supervisorId,
      search
    } = filters

    const where: Record<string, unknown> = {
      isActive,
      deletedAt: null
    }

    if (email) {
      where.email = { contains: email, mode: 'insensitive' }
    }

    if (role) {
      where.role = role
    }

    if (typeof emailVerified === 'boolean') {
      where.emailVerified = emailVerified
    }

    if (supervisorId) {
      where.supervisorId = supervisorId
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        {
          profile: {
            OR: [
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { preferredName: { contains: search, mode: 'insensitive' } }
            ]
          }
        }
      ]
    }

    return this.findManyPaginated(
      page,
      limit,
      where,
      { createdAt: 'desc' },
      { profile: true },
      userId
    )
  }

  async createWithProfile(data: CreateUserData, createdByUserId: string): Promise<UserWithProfile> {
    return this.executeInTransaction(async (tx) => {
      // Check for email uniqueness
      const existingUser = await tx.user.findUnique({
        where: { email: data.email }
      })

      if (existingUser) {
        throw new ConflictError('User with this email already exists')
      }

      // Check for medical record number uniqueness if provided
      if (data.profile?.medicalRecordNumber) {
        const existingMRN = await tx.profile.findUnique({
          where: { medicalRecordNumber: data.profile.medicalRecordNumber }
        })

        if (existingMRN) {
          throw new ConflictError('Medical record number already exists')
        }
      }

      // Create user
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: data.password,
          role: data.role,
          isActive: data.isActive ?? true,
          createdBy: createdByUserId,
          updatedBy: createdByUserId,
          version: 1
        }
      })

      // Create profile if provided
      const profile = data.profile ? await tx.profile.create({
        data: {
          userId: user.id,
          ...data.profile,
          dateOfBirth: data.profile.dateOfBirth || undefined,
          createdBy: createdByUserId,
          updatedBy: createdByUserId,
          version: 1
        }
      }) : null

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId: createdByUserId,
          action: 'CREATE',
          entityType: this.entityName,
          entityId: user.id,
          newValues: { ...data, password: '[REDACTED]' }
        })
      }

      return { ...user, profile } as UserWithProfile
    })
  }

  async updateWithProfile(
    id: string,
    data: UpdateUserData,
    updatedByUserId: string
  ): Promise<UserWithProfile> {
    return this.executeInTransaction(async (tx) => {
      // Get current user for optimistic locking
      const currentUser = await tx.user.findUnique({
        where: { id, deletedAt: null },
        include: { profile: true }
      })

      if (!currentUser) {
        throw new NotFoundError('User')
      }

      // Check email uniqueness if changing email
      if (data.email && data.email !== currentUser.email) {
        const existingUser = await tx.user.findUnique({
          where: { email: data.email }
        })

        if (existingUser) {
          throw new ConflictError('User with this email already exists')
        }
      }

      // Update user
      const updatedUser = await tx.user.update({
        where: {
          id,
          version: currentUser.version
        },
        data: {
          email: data.email,
          role: data.role,
          isActive: data.isActive,
          emailVerified: data.emailVerified,
          supervisorId: data.supervisorId,
          updatedBy: updatedByUserId,
          version: currentUser.version + 1,
          updatedAt: new Date()
        }
      })

      // Update profile if provided and exists
      const updatedProfile = await (async () => {
        if (data.profile && currentUser.profile) {
          return await tx.profile.update({
            where: { userId: id },
            data: {
              ...data.profile,
              updatedBy: updatedByUserId,
              version: currentUser.profile.version + 1,
              updatedAt: new Date()
            }
          })
        } else if (data.profile && !currentUser.profile) {
          // Create profile if it doesn't exist
          return await tx.profile.create({
            data: {
              userId: id,
              ...data.profile,
              createdBy: updatedByUserId,
              updatedBy: updatedByUserId,
              version: 1
            }
          })
        }
        return currentUser.profile
      })()

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId: updatedByUserId,
          action: 'UPDATE',
          entityType: this.entityName,
          entityId: id,
          oldValues: currentUser,
          newValues: data
        })
      }

      return { ...updatedUser, profile: updatedProfile } as UserWithProfile
    })
  }

  async findWorkersByClient(clientId: string, userId?: string): Promise<readonly UserWithProfile[]> {
    try {
      // Find workers assigned to this client through visits
      const workers = await this.prisma.user.findMany({
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

      // Log audit event
      if (this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: 'WORKERS_BY_CLIENT',
          newValues: { clientId, workersFound: workers.length }
        })
      }

      return workers as readonly UserWithProfile[]

    } catch (error) {
      throw new NotFoundError('Workers not found for client')
    }
  }

  async findClientsByWorker(workerId: string, userId?: string): Promise<readonly UserWithProfile[]> {
    try {
      // Find clients assigned to this worker through visits
      const clients = await this.prisma.user.findMany({
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

      // Log audit event
      if (this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: 'CLIENTS_BY_WORKER',
          newValues: { workerId, clientsFound: clients.length }
        })
      }

      return clients as readonly UserWithProfile[]

    } catch (error) {
      throw new NotFoundError('Clients not found for worker')
    }
  }

  async findBySupervisor(supervisorId: string, userId?: string): Promise<readonly UserWithProfile[]> {
    try {
      const workers = await this.prisma.user.findMany({
        where: {
          supervisorId,
          isActive: true,
          deletedAt: null
        },
        include: { profile: true },
        orderBy: { createdAt: 'desc' }
      })

      // Log audit event
      if (this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: 'WORKERS_BY_SUPERVISOR',
          newValues: { supervisorId, workersFound: workers.length }
        })
      }

      return workers as readonly UserWithProfile[]

    } catch (error) {
      throw new NotFoundError('Workers not found for supervisor')
    }
  }

  async updateLastLogin(userId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { lastLoginAt: new Date() }
      })
    } catch (error) {
      // Don't throw error for login timestamp update failures
      // Silently continue - login timestamp is non-critical
    }
  }

  async updateLoginAttempts(userId: string, attempts: number, lockedUntil?: Date): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          loginAttempts: attempts,
          lockedUntil
        }
      })
    } catch (error) {
      // Don't throw error for login attempt tracking failures
      // Silently continue - login attempt tracking is non-critical
    }
  }
}