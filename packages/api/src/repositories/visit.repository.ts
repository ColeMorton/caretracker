import type { Visit, User, CarePlan, PrismaClient, VisitStatus } from '@caretracker/database'

import { NotFoundError, BusinessRuleError, ConflictError } from '../utils/errors.js'
import { filterUndefinedValues, makeMutable } from '../utils/prisma-types.js'

import type { AuditContext, PaginatedResult, CreateInput, PrismaTransactionClient } from './base.repository.js';
import { BaseRepository } from './base.repository.js'

const VISIT_NOT_FOUND_MESSAGE = 'Visit not found'


export interface VisitWithRelations extends Visit {
  readonly client?: User & { readonly profile?: { readonly firstName: string; readonly lastName: string; readonly phone?: string | null } | null } | null
  readonly worker?: User & { readonly profile?: { readonly firstName: string; readonly lastName: string; readonly phone?: string | null } | null } | null
  readonly carePlan?: CarePlan | null
}

export interface VisitFilters {
  readonly clientId?: string
  readonly workerId?: string
  readonly status?: VisitStatus
  readonly visitType?: string
  readonly carePlanId?: string
  readonly dateFrom?: Date
  readonly dateTo?: Date
  readonly includeCompleted?: boolean
  readonly onlyOverdue?: boolean
  readonly needsReview?: boolean
}

export interface CreateVisitData {
  readonly clientId: string
  readonly workerId: string
  readonly scheduledAt: Date
  readonly scheduledEndAt?: Date
  readonly duration?: number
  readonly visitType?: string
  readonly location?: string
  readonly activities?: readonly string[]
  readonly plannedActivities?: readonly string[]
  readonly notes?: string
  readonly privateNotes?: string
  readonly carePlanId?: string
  readonly estimatedCost?: number
}

export interface UpdateVisitData {
  readonly scheduledAt?: Date
  readonly scheduledEndAt?: Date
  readonly duration?: number
  readonly status?: VisitStatus
  readonly visitType?: string
  readonly location?: string
  readonly activities?: readonly string[]
  readonly plannedActivities?: readonly string[]
  readonly notes?: string
  readonly privateNotes?: string
  readonly cancellationReason?: string
  readonly clientSatisfaction?: number
  readonly workerNotes?: string
}

export interface CheckinData {
  readonly location?: string
  readonly notes?: string
  readonly arrivalMethod?: string
}

export interface CheckoutData {
  readonly activities: readonly string[]
  readonly notes?: string
  readonly vitals?: Record<string, unknown>
  readonly medications?: readonly string[]
  readonly followUpRequired?: boolean
  readonly followUpReason?: string
  readonly clientCondition?: string
  readonly incidentOccurred?: boolean
  readonly incidentDescription?: string
}

export interface VisitStatistics {
  readonly totalVisits: number
  readonly completedVisits: number
  readonly cancelledVisits: number
  readonly upcomingVisits: number
  readonly overdueVisits: number
  readonly averageDuration?: number
  readonly averageSatisfaction?: number
  readonly completionRate: number
}

export class VisitRepository extends BaseRepository<VisitWithRelations> {
  protected readonly tableName = 'visit'
  protected readonly entityName = 'Visit'

  constructor(
    prisma: PrismaClient,
    auditLogger?: (context: AuditContext) => Promise<void>
  ) {
    super(prisma, auditLogger)
  }

  async findWithRelations(
    filters: VisitFilters = {},
    page: number = 1,
    limit: number = 10,
    userId?: string
  ): Promise<PaginatedResult<VisitWithRelations>> {
    const {
      clientId,
      workerId,
      status,
      visitType,
      carePlanId,
      dateFrom,
      dateTo,
      includeCompleted = true,
      onlyOverdue = false,
      needsReview = false
    } = filters

    const where: Record<string, unknown> = {
      deletedAt: null
    }

    if (clientId) {
      where['clientId'] = clientId
    }

    if (workerId) {
      where['workerId'] = workerId
    }

    if (status) {
      where['status'] = status
    }

    if (visitType) {
      where['visitType'] = visitType
    }

    if (carePlanId) {
      where['carePlanId'] = carePlanId
    }

    if (!includeCompleted) {
      where['status'] = {
        notIn: ['COMPLETED', 'CANCELLED']
      }
    }

    if (dateFrom || dateTo) {
      where['scheduledAt'] = {}
      if (dateFrom) {
        (where['scheduledAt'] as Record<string, unknown>)['gte'] = dateFrom
      }
      if (dateTo) {
        (where['scheduledAt'] as Record<string, unknown>)['lte'] = dateTo
      }
    }

    if (onlyOverdue) {
      where['scheduledAt'] = {
        lt: new Date()
      }
      where['status'] = {
        in: ['SCHEDULED', 'CONFIRMED']
      }
    }

    if (needsReview) {
      where['status'] = 'COMPLETED'
      where['reviewedAt'] = null
    }

    const include = {
      client: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              preferredName: true
            }
          }
        }
      },
      worker: {
        include: {
          profile: {
            select: {
              firstName: true,
              lastName: true,
              preferredName: true
            }
          }
        }
      },
      carePlan: {
        select: {
          id: true,
          name: true,
          status: true
        }
      }
    }

    return this.findManyPaginated(
      page,
      limit,
      where,
      { scheduledAt: 'asc' },
      include,
      userId
    )
  }

  override async create(data: CreateInput<VisitWithRelations>, userId: string, _tx?: PrismaTransactionClient): Promise<VisitWithRelations> {
    return this.executeInTransaction(async (transactionClient) => {
      // Validate client exists and is active
      const client = await transactionClient['user'].findUnique({
        where: { id: data.clientId, role: 'CLIENT', isActive: true, deletedAt: null }
      })

      if (!client) {
        throw new NotFoundError('Client not found or inactive')
      }

      // Validate worker exists and is active
      const worker = await transactionClient['user'].findUnique({
        where: { id: data.workerId, role: 'WORKER', isActive: true, deletedAt: null }
      })

      if (!worker) {
        throw new NotFoundError('Worker not found or inactive')
      }

      // Check for worker scheduling conflicts
      const conflictingVisit = await transactionClient['visit'].findFirst({
        where: {
          workerId: data.workerId,
          status: {
            in: ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS']
          },
          scheduledAt: {
            lte: data.scheduledEndAt || new Date(data.scheduledAt.getTime() + (data.duration || 60) * 60000)
          },
          scheduledEndAt: {
            gte: data.scheduledAt
          },
          deletedAt: null
        }
      })

      if (conflictingVisit) {
        throw new ConflictError('Worker has a scheduling conflict at this time')
      }

      // Validate care plan if provided
      if (data.carePlanId) {
        const carePlan = await transactionClient['carePlan'].findUnique({
          where: { id: data.carePlanId, clientId: data.clientId, deletedAt: null }
        })

        if (!carePlan) {
          throw new NotFoundError('Care plan not found for this client')
        }
      }

      // Calculate scheduled end time if not provided
      const scheduledEndAt = data.scheduledEndAt ||
        new Date(data.scheduledAt.getTime() + (data.duration || 60) * 60000)

      // Create visit
      const visit = await transactionClient['visit'].create({
        data: {
          clientId: data.clientId,
          workerId: data.workerId,
          scheduledAt: data.scheduledAt,
          scheduledEndAt,
          duration: data.duration,
          visitType: data.visitType,
          location: data.location,
          activities: data.activities || [],
          plannedActivities: data.plannedActivities || [],
          notes: data.notes,
          privateNotes: data.privateNotes,
          carePlanId: data.carePlanId,
          status: 'SCHEDULED',
          createdBy: userId,
          updatedBy: userId,
          version: 1
        },
        include: {
          client: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          worker: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          carePlan: {
            select: {
              id: true,
              name: true,
              status: true
            }
          }
        }
      })

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'CREATE',
          entityType: this.entityName,
          entityId: visit.id,
          newValues: data
        })
      }

      return visit as VisitWithRelations
    })
  }

  async checkin(
    visitId: string,
    workerId: string,
    data: CheckinData,
    userId: string
  ): Promise<VisitWithRelations> {
    return this.executeInTransaction(async (tx) => {
      const visit = await tx['visit'].findUnique({
        where: { id: visitId, deletedAt: null },
        include: {
          client: { include: { profile: true } },
          worker: { include: { profile: true } }
        }
      })

      if (!visit) {
        throw new NotFoundError(VISIT_NOT_FOUND_MESSAGE)
      }

      // Verify worker is assigned to this visit
      if (visit.workerId !== workerId) {
        throw new BusinessRuleError('Worker is not assigned to this visit')
      }

      // Verify visit is in correct status
      if (!['SCHEDULED', 'CONFIRMED'].includes(visit.status)) {
        throw new BusinessRuleError('Visit cannot be checked into from current status')
      }

      // Update visit with check-in data
      const updatedVisit = await tx['visit'].update({
        where: { id: visitId, version: visit.version },
        data: filterUndefinedValues({
          status: 'IN_PROGRESS',
          actualStartAt: new Date(),
          location: data.location || visit.location,
          workerNotes: data.notes,
          updatedBy: userId,
          version: visit.version + 1,
          updatedAt: new Date()
        }),
        include: {
          client: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          worker: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          carePlan: {
            select: {
              id: true,
              name: true,
              status: true
            }
          }
        }
      })

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'UPDATE',
          entityType: this.entityName,
          entityId: visitId,
          oldValues: { status: visit.status },
          newValues: { status: 'IN_PROGRESS', checkinData: data }
        })
      }

      return updatedVisit as VisitWithRelations
    })
  }

  async checkout(
    visitId: string,
    workerId: string,
    data: CheckoutData,
    userId: string
  ): Promise<VisitWithRelations> {
    return this.executeInTransaction(async (tx) => {
      const visit = await tx['visit'].findUnique({
        where: { id: visitId, deletedAt: null }
      })

      if (!visit) {
        throw new NotFoundError(VISIT_NOT_FOUND_MESSAGE)
      }

      // Verify worker is assigned to this visit
      if (visit.workerId !== workerId) {
        throw new BusinessRuleError('Worker is not assigned to this visit')
      }

      // Verify visit is in progress
      if (visit.status !== 'IN_PROGRESS') {
        throw new BusinessRuleError('Visit must be in progress to check out')
      }

      // Calculate actual duration
      const actualEndAt = new Date()
      const actualDuration = visit.actualStartAt
        ? Math.round((actualEndAt.getTime() - visit.actualStartAt.getTime()) / 60000)
        : undefined

      // Update visit with checkout data
      const updatedVisit = await tx['visit'].update({
        where: { id: visitId, version: visit.version },
        data: filterUndefinedValues({
          status: 'COMPLETED',
          actualEndAt,
          actualDuration,
          activities: makeMutable(data.activities),
          notes: data.notes,
          vitals: data.vitals,
          medications: data.medications ? makeMutable(data.medications) : [],
          workerNotes: [visit.workerNotes, data.notes].filter(Boolean).join('\n\n'),
          documentationComplete: true,
          updatedBy: userId,
          version: visit.version + 1,
          updatedAt: new Date()
        }),
        include: {
          client: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          worker: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          carePlan: {
            select: {
              id: true,
              name: true,
              status: true
            }
          }
        }
      })

      // Create follow-up task if required
      if (data.followUpRequired && data.followUpReason) {
        // In a real implementation, you'd create a follow-up task or notification
        // For now, we'll just log it
        await this.auditLogger?.({
          userId,
          action: 'CREATE',
          entityType: 'FollowUpTask',
          entityId: `followup_${visitId}`,
          newValues: {
            visitId,
            reason: data.followUpReason,
            clientCondition: data.clientCondition
          }
        })
      }

      // Log incident if occurred
      if (data.incidentOccurred && data.incidentDescription) {
        await this.auditLogger?.({
          userId,
          action: 'CREATE',
          entityType: 'Incident',
          entityId: `incident_${visitId}`,
          newValues: {
            visitId,
            description: data.incidentDescription,
            reportedBy: userId
          }
        })
      }

      // Log audit event for checkout
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'UPDATE',
          entityType: this.entityName,
          entityId: visitId,
          oldValues: { status: visit.status },
          newValues: { status: 'COMPLETED', checkoutData: data }
        })
      }

      return updatedVisit as VisitWithRelations
    })
  }

  async reschedule(
    visitId: string,
    newScheduledAt: Date,
    newScheduledEndAt: Date,
    reason: string,
    userId: string
  ): Promise<VisitWithRelations> {
    return this.executeInTransaction(async (tx) => {
      const visit = await tx['visit'].findUnique({
        where: { id: visitId, deletedAt: null }
      })

      if (!visit) {
        throw new NotFoundError(VISIT_NOT_FOUND_MESSAGE)
      }

      // Check if visit can be rescheduled
      if (['COMPLETED', 'CANCELLED'].includes(visit.status)) {
        throw new BusinessRuleError('Completed or cancelled visits cannot be rescheduled')
      }

      // Check for worker conflicts at new time
      const conflictingVisit = await tx['visit'].findFirst({
        where: {
          workerId: visit.workerId,
          status: {
            in: ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS']
          },
          scheduledAt: {
            lte: newScheduledEndAt
          },
          scheduledEndAt: {
            gte: newScheduledAt
          },
          id: {
            not: visitId
          },
          deletedAt: null
        }
      })

      if (conflictingVisit) {
        throw new ConflictError('Worker has a scheduling conflict at the new time')
      }

      // Create new visit record for the rescheduled appointment
      const rescheduledVisit = await tx['visit'].create({
        data: {
          clientId: visit.clientId,
          workerId: visit.workerId,
          scheduledAt: newScheduledAt,
          scheduledEndAt: newScheduledEndAt,
          duration: visit.duration,
          visitType: visit.visitType,
          location: visit.location,
          activities: visit.activities,
          plannedActivities: visit.plannedActivities,
          notes: visit.notes,
          privateNotes: visit.privateNotes,
          carePlanId: visit.carePlanId,
          status: 'SCHEDULED',
          rescheduledFrom: visitId,
          createdBy: userId,
          updatedBy: userId,
          version: 1
        },
        include: {
          client: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          worker: {
            include: {
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                  preferredName: true
                }
              }
            }
          },
          carePlan: {
            select: {
              id: true,
              name: true,
              status: true
            }
          }
        }
      })

      // Update original visit to cancelled
      await tx['visit'].update({
        where: { id: visitId },
        data: {
          status: 'RESCHEDULED',
          cancellationReason: `Rescheduled: ${reason}`,
          rescheduledTo: rescheduledVisit.id,
          updatedBy: userId,
          version: visit.version + 1,
          updatedAt: new Date()
        }
      })

      // Log audit event
      if (this.auditLogger) {
        await this.auditLogger({
          userId,
          action: 'UPDATE',
          entityType: this.entityName,
          entityId: visitId,
          oldValues: {
            scheduledAt: visit.scheduledAt,
            status: visit.status
          },
          newValues: {
            scheduledAt: newScheduledAt,
            status: 'RESCHEDULED',
            reason
          }
        })
      }

      return rescheduledVisit as VisitWithRelations
    })
  }

  async getStatistics(
    filters: Pick<VisitFilters, 'clientId' | 'workerId' | 'dateFrom' | 'dateTo'> = {},
    userId?: string
  ): Promise<VisitStatistics> {
    const { clientId, workerId, dateFrom, dateTo } = filters

    const where: Record<string, unknown> = {
      deletedAt: null
    }

    if (clientId) {
      where['clientId'] = clientId
    }

    if (workerId) {
      where['workerId'] = workerId
    }

    if (dateFrom || dateTo) {
      where['scheduledAt'] = {}
      if (dateFrom) {
        ;(where['scheduledAt'] as Record<string, unknown>)['gte'] = dateFrom
      }
      if (dateTo) {
        ;(where['scheduledAt'] as Record<string, unknown>)['lte'] = dateTo
      }
    }

    const [
      totalVisits,
      completedVisits,
      cancelledVisits,
      upcomingVisits,
      overdueVisits,
      averageStats
    ] = await Promise.all([
      // Total visits
      this.prisma.visit.count({ where }),

      // Completed visits
      this.prisma.visit.count({
        where: { ...where, status: 'COMPLETED' }
      }),

      // Cancelled visits
      this.prisma.visit.count({
        where: { ...where, status: { in: ['CANCELLED', 'NO_SHOW'] } }
      }),

      // Upcoming visits
      this.prisma.visit.count({
        where: {
          ...where,
          status: { in: ['SCHEDULED', 'CONFIRMED'] },
          scheduledAt: { gte: new Date() }
        }
      }),

      // Overdue visits
      this.prisma.visit.count({
        where: {
          ...where,
          status: { in: ['SCHEDULED', 'CONFIRMED'] },
          scheduledAt: { lt: new Date() }
        }
      }),

      // Average duration and satisfaction
      this.prisma.visit.aggregate({
        where: { ...where, status: 'COMPLETED' },
        _avg: {
          actualDuration: true,
          clientSatisfaction: true
        }
      })
    ])

    const completionRate = totalVisits > 0
      ? Math.round((completedVisits / totalVisits) * 100)
      : 0

    // Log audit event
    if (this.auditLogger && userId) {
      await this.auditLogger({
        userId,
        action: 'READ',
        entityType: 'VisitStatistics',
        entityId: 'STATISTICS',
        newValues: { filters, totalVisits, completedVisits }
      })
    }

    const baseStatistics = {
      totalVisits,
      completedVisits,
      cancelledVisits,
      upcomingVisits,
      overdueVisits,
      completionRate
    }

    const averageDuration = averageStats._avg.actualDuration !== null ? averageStats._avg.actualDuration : undefined
    const averageSatisfaction = averageStats._avg.clientSatisfaction !== null ? averageStats._avg.clientSatisfaction : undefined

    const statistics: VisitStatistics = {
      ...baseStatistics,
      ...(averageDuration !== undefined && { averageDuration }),
      ...(averageSatisfaction !== undefined && { averageSatisfaction })
    }

    return statistics
  }

  async findOverdueVisits(userId?: string): Promise<readonly VisitWithRelations[]> {
    const visits = await this.prisma.visit.findMany({
      where: {
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
        scheduledAt: { lt: new Date() },
        deletedAt: null
      },
      include: {
        client: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                preferredName: true
              }
            }
          }
        },
        worker: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                preferredName: true
              }
            }
          }
        }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    // Log audit event
    if (this.auditLogger && userId) {
      await this.auditLogger({
        userId,
        action: 'READ',
        entityType: this.entityName,
        entityId: 'OVERDUE_VISITS',
        newValues: { overdueCount: visits.length }
      })
    }

    return visits as readonly VisitWithRelations[]
  }
}