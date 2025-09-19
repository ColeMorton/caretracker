import type { PrismaClient, DataClassification } from '@caretracker/database'
import type { FastifyInstance } from 'fastify'

export interface AuditLogEntry {
  readonly userId?: string
  readonly entityType: string
  readonly entityId: string
  readonly action: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ'
  readonly oldValues?: Record<string, unknown>
  readonly newValues?: Record<string, unknown>
  readonly ipAddress?: string
  readonly userAgent?: string
  readonly sessionId?: string
  readonly requestId?: string
  readonly endpoint?: string
  readonly reason?: string
  readonly approvalRequired?: boolean
  readonly approvedBy?: string
  readonly dataAccessed?: DataClassification
}

export interface AuditQuery {
  readonly userId?: string
  readonly entityType?: string
  readonly entityId?: string
  readonly action?: string
  readonly dateFrom?: Date
  readonly dateTo?: Date
  readonly dataClassification?: DataClassification
  readonly page?: number
  readonly limit?: number
}

export interface AuditStatistics {
  readonly totalEvents: number
  readonly eventsByAction: Record<string, number>
  readonly eventsByEntityType: Record<string, number>
  readonly eventsByDataClassification: Record<string, number>
  readonly topUsers: ReadonlyArray<{ readonly userId: string; readonly eventCount: number }>
  readonly recentActivity: readonly AuditLogEntry[]
}

export class AuditService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly fastify: FastifyInstance
  ) {}

  async logEvent(entry: AuditLogEntry): Promise<void> {
    try {
      // Don't log audit events for audit log reads to prevent infinite loops
      if (entry.entityType === 'AuditLog' && entry.action === 'READ') {
        return
      }

      await this.prisma.auditLog.create({
        data: {
          userId: entry.userId,
          entityType: entry.entityType,
          entityId: entry.entityId,
          action: entry.action,
          oldValues: entry.oldValues,
          newValues: entry.newValues,
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
          sessionId: entry.sessionId,
          requestId: entry.requestId,
          endpoint: entry.endpoint,
          reason: entry.reason,
          approvalRequired: entry.approvalRequired || false,
          approvedBy: entry.approvedBy,
          dataAccessed: entry.dataAccessed
        }
      })

      // Log to application logger for real-time monitoring
      this.fastify.log.info({
        auditEvent: {
          userId: entry.userId,
          entityType: entry.entityType,
          entityId: entry.entityId,
          action: entry.action,
          dataClassification: entry.dataAccessed,
          timestamp: new Date().toISOString()
        }
      }, 'Audit event logged')

    } catch (error) {
      // Critical: If audit logging fails, we must log this error but not throw
      // to avoid breaking the main application flow
      this.fastify.log.error({
        error,
        auditEntry: entry
      }, 'CRITICAL: Audit logging failed')

      // In a production system, you might want to:
      // 1. Send an alert to security team
      // 2. Write to a backup audit system
      // 3. Queue for retry
    }
  }

  async logAuthentication(
    userId: string,
    action: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGOUT',
    ipAddress?: string,
    userAgent?: string,
    reason?: string
  ): Promise<void> {
    await this.logEvent({
      userId,
      entityType: 'Authentication',
      entityId: userId,
      action: action.startsWith('LOGIN') ? 'CREATE' : 'DELETE',
      newValues: {
        authAction: action,
        timestamp: new Date().toISOString()
      },
      ipAddress,
      userAgent,
      reason,
      dataAccessed: 'PII'
    })
  }

  async logUnauthorizedAccess(
    userId?: string,
    permission?: string,
    ipAddress?: string,
    userAgent?: string,
    endpoint?: string
  ): Promise<void> {
    await this.logEvent({
      userId,
      entityType: 'SecurityViolation',
      entityId: `unauthorized_${Date.now()}`,
      action: 'READ',
      newValues: {
        violationType: 'UNAUTHORIZED_ACCESS',
        permission,
        endpoint,
        timestamp: new Date().toISOString()
      },
      ipAddress,
      userAgent,
      endpoint,
      dataAccessed: 'INTERNAL'
    })

    // Log security event at higher level
    this.fastify.log.warn({
      securityEvent: {
        type: 'UNAUTHORIZED_ACCESS',
        userId,
        permission,
        endpoint,
        ipAddress,
        userAgent
      }
    }, 'Security violation: Unauthorized access attempt')
  }

  async logDataAccess(
    userId: string,
    entityType: string,
    entityId: string,
    dataClassification: DataClassification,
    reason?: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    // Only log PHI and PII access to reduce noise
    if (['PHI', 'PII'].includes(dataClassification)) {
      await this.logEvent({
        userId,
        entityType,
        entityId,
        action: 'READ',
        reason,
        ipAddress,
        userAgent,
        dataAccessed: dataClassification
      })
    }
  }

  async logEntityCreation(
    entityType: string,
    entityId: string,
    userId: string,
    data: Record<string, unknown>,
    dataClassification?: DataClassification
  ): Promise<void> {
    // Sanitize sensitive data from audit logs
    const sanitizedData = this.sanitizeAuditData(data)

    await this.logEvent({
      userId,
      entityType,
      entityId,
      action: 'CREATE',
      newValues: sanitizedData,
      dataAccessed: dataClassification
    })
  }

  async logEntityUpdate(
    entityType: string,
    entityId: string,
    userId: string,
    newData: Record<string, unknown>,
    oldData: Record<string, unknown>,
    dataClassification?: DataClassification
  ): Promise<void> {
    // Sanitize sensitive data from audit logs
    const sanitizedNewData = this.sanitizeAuditData(newData)
    const sanitizedOldData = this.sanitizeAuditData(oldData)

    await this.logEvent({
      userId,
      entityType,
      entityId,
      action: 'UPDATE',
      oldValues: sanitizedOldData,
      newValues: sanitizedNewData,
      dataAccessed: dataClassification
    })
  }

  async logEntityDeletion(
    entityType: string,
    entityId: string,
    userId: string,
    oldData: Record<string, unknown>,
    reason?: string,
    dataClassification?: DataClassification
  ): Promise<void> {
    const sanitizedOldData = this.sanitizeAuditData(oldData)

    await this.logEvent({
      userId,
      entityType,
      entityId,
      action: 'DELETE',
      oldValues: sanitizedOldData,
      reason,
      dataAccessed: dataClassification
    })
  }

  async queryAuditLogs(query: AuditQuery): Promise<{
    readonly data: readonly AuditLogEntry[]
    readonly total: number
    readonly page: number
    readonly limit: number
  }> {
    const {
      userId,
      entityType,
      entityId,
      action,
      dateFrom,
      dateTo,
      dataClassification,
      page = 1,
      limit = 50
    } = query

    const where: Record<string, unknown> = {}

    if (userId) {
      where.userId = userId
    }

    if (entityType) {
      where.entityType = entityType
    }

    if (entityId) {
      where.entityId = entityId
    }

    if (action) {
      where.action = action
    }

    if (dataClassification) {
      where.dataAccessed = dataClassification
    }

    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        where.createdAt.gte = dateFrom
      }
      if (dateTo) {
        where.createdAt.lte = dateTo
      }
    }

    const skip = (page - 1) * limit

    const [auditLogs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
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
      }),
      this.prisma.auditLog.count({ where })
    ])

    return {
      data: auditLogs.map(log => ({
        userId: log.userId || undefined,
        entityType: log.entityType,
        entityId: log.entityId,
        action: log.action as AuditLogEntry['action'],
        oldValues: log.oldValues as Record<string, unknown> || undefined,
        newValues: log.newValues as Record<string, unknown> || undefined,
        ipAddress: log.ipAddress || undefined,
        userAgent: log.userAgent || undefined,
        sessionId: log.sessionId || undefined,
        requestId: log.requestId || undefined,
        endpoint: log.endpoint || undefined,
        reason: log.reason || undefined,
        approvalRequired: log.approvalRequired,
        approvedBy: log.approvedBy || undefined,
        dataAccessed: log.dataAccessed as DataClassification || undefined
      })),
      total,
      page,
      limit
    }
  }

  async getAuditStatistics(
    dateFrom?: Date,
    dateTo?: Date
  ): Promise<AuditStatistics> {
    const where: Record<string, unknown> = {}

    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) {
        where.createdAt.gte = dateFrom
      }
      if (dateTo) {
        where.createdAt.lte = dateTo
      }
    }

    const [
      totalEvents,
      eventsByAction,
      eventsByEntityType,
      eventsByDataClassification,
      topUsers,
      recentActivity
    ] = await Promise.all([
      // Total events
      this.prisma.auditLog.count({ where }),

      // Events by action
      this.prisma.auditLog.groupBy({
        by: ['action'],
        where,
        _count: true
      }),

      // Events by entity type
      this.prisma.auditLog.groupBy({
        by: ['entityType'],
        where,
        _count: true
      }),

      // Events by data classification
      this.prisma.auditLog.groupBy({
        by: ['dataAccessed'],
        where: {
          ...where,
          dataAccessed: { not: null }
        },
        _count: true
      }),

      // Top users by activity
      this.prisma.auditLog.groupBy({
        by: ['userId'],
        where: {
          ...where,
          userId: { not: null }
        },
        _count: true,
        orderBy: {
          _count: {
            userId: 'desc'
          }
        },
        take: 10
      }),

      // Recent activity
      this.prisma.auditLog.findMany({
        where,
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
              role: true
            }
          }
        }
      })
    ])

    return {
      totalEvents,
      eventsByAction: Object.fromEntries(
        eventsByAction.map(item => [item.action, item._count])
      ),
      eventsByEntityType: Object.fromEntries(
        eventsByEntityType.map(item => [item.entityType, item._count])
      ),
      eventsByDataClassification: Object.fromEntries(
        eventsByDataClassification.map(item => [
          item.dataAccessed || 'UNCLASSIFIED',
          item._count
        ])
      ),
      topUsers: topUsers.map(item => ({
        userId: item.userId || 'UNKNOWN',
        eventCount: item._count
      })),
      recentActivity: recentActivity.map(log => ({
        userId: log.userId || undefined,
        entityType: log.entityType,
        entityId: log.entityId,
        action: log.action as AuditLogEntry['action'],
        dataAccessed: log.dataAccessed as DataClassification || undefined
      }))
    }
  }

  private sanitizeAuditData(data: Record<string, unknown>): Record<string, unknown> {
    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'key',
      'ssn',
      'socialSecurityNumber',
      'creditCard',
      'bankAccount'
    ]

    const sanitized = { ...data }

    for (const [key, value] of Object.entries(sanitized)) {
      if (sensitiveFields.some(field =>
        key.toLowerCase().includes(field.toLowerCase())
      )) {
        sanitized[key] = '[REDACTED]'
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeAuditData(value as Record<string, unknown>)
      }
    }

    return sanitized
  }

  // Helper method to create audit logger function for repositories
  createAuditLogger() {
    return async (context: {
      readonly userId: string
      readonly action: 'CREATE' | 'UPDATE' | 'DELETE' | 'READ'
      readonly entityType: string
      readonly entityId: string
      readonly oldValues?: Record<string, unknown>
      readonly newValues?: Record<string, unknown>
      readonly reason?: string
    }) => {
      await this.logEvent({
        ...context,
        dataAccessed: this.inferDataClassification(context.entityType)
      })
    }
  }

  private inferDataClassification(entityType: string): DataClassification {
    // Healthcare entities are typically PHI
    if (['Visit', 'CarePlan', 'Profile'].includes(entityType)) {
      return 'PHI'
    }

    // User entities are PII
    if (['User', 'Authentication'].includes(entityType)) {
      return 'PII'
    }

    // Budget and financial data is PII
    if (['Budget', 'BudgetExpense'].includes(entityType)) {
      return 'PII'
    }

    // Default to internal
    return 'INTERNAL'
  }
}