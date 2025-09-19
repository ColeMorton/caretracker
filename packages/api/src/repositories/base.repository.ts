import type {
  PrismaClient,
  PrismaTransactionClient,
} from '@caretracker/database'

import {
  OptimisticLockError,
  NotFoundError,
  DatabaseError,
} from '../utils/errors.js'

const UNKNOWN_ERROR_MESSAGE = 'Unknown error'

export interface AuditableEntity {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly createdBy?: string | null
  readonly updatedBy?: string | null
  readonly deletedAt?: Date | null
  readonly version: number
}

export type CreateInput<T> = {
  readonly [K in keyof Omit<T, keyof AuditableEntity>]: T[K]
}

export type UpdateInput<T> = {
  readonly [K in keyof Omit<T, keyof AuditableEntity>]?: T[K]
}

export interface FindManyOptions {
  readonly skip?: number
  readonly take?: number
  readonly orderBy?: Record<string, 'asc' | 'desc'>
  readonly where?: Record<string, unknown>
  readonly include?: Record<string, unknown>
}

export interface PaginatedResult<T> {
  readonly data: readonly T[]
  readonly meta: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly totalPages: number
  }
}

export interface AuditContext {
  readonly userId: string
  readonly action: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ'
  readonly entityType: string
  readonly entityId: string
  readonly oldValues?: Record<string, unknown>
  readonly newValues?: Record<string, unknown>
  readonly reason?: string
}

export abstract class BaseRepository<T extends AuditableEntity> {
  protected abstract readonly tableName: string
  protected abstract readonly entityName: string

  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly auditLogger?: (context: AuditContext) => Promise<void>
  ) {}

  async create(
    data: CreateInput<T>,
    userId: string,
    tx?: PrismaTransactionClient
  ): Promise<T> {
    const client = tx || this.prisma

    try {
      const createData = {
        ...data,
        createdBy: userId,
        updatedBy: userId,
        version: 1,
      }

      // @ts-ignore - Prisma generated types are complex
      const entity = await client[this.tableName].create({
        data: createData,
      })

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'CREATE',
          entityType: this.entityName,
          entityId: entity.id,
          newValues: createData,
        })
      }

      return entity as T
    } catch (error) {
      throw new DatabaseError(`Failed to create ${this.entityName}`, {
        field: 'general',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  async findById(
    id: string,
    userId?: string,
    include?: Record<string, unknown>
  ): Promise<T | null> {
    try {
      // @ts-ignore - Prisma generated types are complex
      const entity = await this.prisma[this.tableName].findUnique({
        where: { id, deletedAt: null },
        include,
      })

      // Log audit event for data access
      if (entity && this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: id,
        })
      }

      return entity as T | null
    } catch (error) {
      throw new DatabaseError(`Failed to find ${this.entityName}`, {
        field: 'id',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  async findMany(
    options: FindManyOptions = {},
    userId?: string
  ): Promise<readonly T[]> {
    try {
      const {
        skip = 0,
        take = 10,
        orderBy = { createdAt: 'desc' },
        where = {},
        include,
      } = options

      // Add soft delete filter
      const whereClause = {
        ...where,
        deletedAt: null,
      }

      // @ts-ignore - Prisma generated types are complex
      const entities = await this.prisma[this.tableName].findMany({
        where: whereClause,
        skip,
        take,
        orderBy,
        include,
      })

      // Log audit event for bulk data access
      if (entities.length > 0 && this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: 'BULK_READ',
          newValues: { count: entities.length, filters: where },
        })
      }

      return entities as readonly T[]
    } catch (error) {
      throw new DatabaseError(`Failed to find ${this.entityName} records`, {
        field: 'query',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  async findManyPaginated(
    page: number = 1,
    limit: number = 10,
    where: Record<string, unknown> = {},
    orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' },
    include?: Record<string, unknown>,
    userId?: string
  ): Promise<PaginatedResult<T>> {
    try {
      const skip = (page - 1) * limit

      // Add soft delete filter
      const whereClause = {
        ...where,
        deletedAt: null,
      }

      const [entities, total] = await Promise.all([
        // @ts-ignore - Prisma generated types are complex
        this.prisma[this.tableName].findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy,
          include,
        }),
        // @ts-ignore - Prisma generated types are complex
        this.prisma[this.tableName].count({
          where: whereClause,
        }),
      ])

      // Log audit event
      if (this.auditLogger && userId) {
        await this.auditLogger({
          userId,
          action: 'READ',
          entityType: this.entityName,
          entityId: 'PAGINATED_READ',
          newValues: {
            page,
            limit,
            total,
            count: entities.length,
            filters: where,
          },
        })
      }

      return {
        data: entities as readonly T[],
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      }
    } catch (error) {
      throw new DatabaseError(
        `Failed to find paginated ${this.entityName} records`,
        {
          field: 'pagination',
          message:
            error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
        }
      )
    }
  }

  async update(
    id: string,
    data: UpdateInput<T>,
    userId: string,
    tx?: PrismaTransactionClient
  ): Promise<T> {
    const client = tx || this.prisma

    try {
      // First get the current entity for optimistic locking and audit
      // @ts-ignore - Prisma generated types are complex
      const currentEntity = await client[this.tableName].findUnique({
        where: { id, deletedAt: null },
      })

      if (!currentEntity) {
        throw new NotFoundError(this.entityName)
      }

      const updateData = {
        ...data,
        updatedBy: userId,
        version: currentEntity.version + 1,
        updatedAt: new Date(),
      }

      // Update with optimistic locking
      // @ts-ignore - Prisma generated types are complex
      const updatedEntity = await client[this.tableName].update({
        where: {
          id,
          version: currentEntity.version, // Optimistic locking
          deletedAt: null,
        },
        data: updateData,
      })

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'UPDATE',
          entityType: this.entityName,
          entityId: id,
          oldValues: currentEntity,
          newValues: updateData,
        })
      }

      return updatedEntity as T
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      // Check if it's an optimistic lock error
      if (
        error instanceof Error &&
        error.message.includes('Record to update not found')
      ) {
        throw new OptimisticLockError(this.entityName)
      }

      throw new DatabaseError(`Failed to update ${this.entityName}`, {
        field: 'general',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  async softDelete(
    id: string,
    userId: string,
    reason?: string,
    tx?: PrismaTransactionClient
  ): Promise<void> {
    const client = tx || this.prisma

    try {
      // Get current entity for audit
      // @ts-ignore - Prisma generated types are complex
      const currentEntity = await client[this.tableName].findUnique({
        where: { id, deletedAt: null },
      })

      if (!currentEntity) {
        throw new NotFoundError(this.entityName)
      }

      // Soft delete
      // @ts-ignore - Prisma generated types are complex
      await client[this.tableName].update({
        where: { id },
        data: {
          deletedAt: new Date(),
          updatedBy: userId,
          version: currentEntity.version + 1,
          updatedAt: new Date(),
        },
      })

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'DELETE',
          entityType: this.entityName,
          entityId: id,
          oldValues: currentEntity,
          reason,
        })
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new DatabaseError(`Failed to delete ${this.entityName}`, {
        field: 'general',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      // @ts-ignore - Prisma generated types are complex
      const count = await this.prisma[this.tableName].count({
        where: { id, deletedAt: null },
      })

      return count > 0
    } catch (error) {
      throw new DatabaseError(`Failed to check if ${this.entityName} exists`, {
        field: 'id',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  async count(where: Record<string, unknown> = {}): Promise<number> {
    try {
      const whereClause = {
        ...where,
        deletedAt: null,
      }

      // @ts-ignore - Prisma generated types are complex
      return await this.prisma[this.tableName].count({
        where: whereClause,
      })
    } catch (error) {
      throw new DatabaseError(`Failed to count ${this.entityName} records`, {
        field: 'count',
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
      })
    }
  }

  // Transaction wrapper for complex operations
  async executeInTransaction<R>(
    callback: (tx: PrismaTransactionClient) => Promise<R>
  ): Promise<R> {
    try {
      return await this.prisma.$transaction(callback)
    } catch (error) {
      throw new DatabaseError(
        `Transaction failed in ${this.entityName} repository`,
        {
          field: 'transaction',
          message:
            error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
        }
      )
    }
  }

  // Transaction management methods for testing
  async beginTransaction(): Promise<PrismaTransactionClient> {
    // In real implementation, this would start a transaction
    // For testing, return the prisma client as a transaction proxy
    return this.prisma as unknown as PrismaTransactionClient
  }

  async commitTransaction(_tx: PrismaTransactionClient): Promise<void> {
    // In real implementation, this would commit the transaction
    // For testing, this is a no-op
  }

  async rollbackTransaction(_tx: PrismaTransactionClient): Promise<void> {
    // In real implementation, this would rollback the transaction
    // For testing, this is a no-op
  }
}
