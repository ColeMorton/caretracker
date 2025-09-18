import { type FastifyPluginAsync } from 'fastify'
import { VisitRepository } from '../../repositories/visit.repository.js'
import { AuditService } from '../../services/audit.service.js'
import {
  getVisitsQuerySchema,
  getVisitsResponseSchema,
  getVisitByIdParamsSchema,
  getVisitByIdResponseSchema,
  createVisitRequestSchema,
  createVisitResponseSchema,
  updateVisitRequestSchema,
  updateVisitResponseSchema,
  checkinRequestSchema,
  checkoutRequestSchema,
  rescheduleVisitRequestSchema
} from '../../schemas/visits.js'
import { NotFoundError, ValidationError, AuthenticationError, AuthorizationError, BusinessRuleError } from '../../utils/errors.js'

const visits: FastifyPluginAsync = async (fastify, _opts) => {
  const visitRepository = new VisitRepository(
    fastify.prisma,
    fastify.auditService.createAuditLogger()
  )

  // GET /visits - List visits with filtering and pagination
  fastify.get('/', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:read'])],
    schema: {
      tags: ['visits'],
      summary: 'List Visits',
      description: 'Get paginated list of visits with optional filtering',
      security: [{ bearerAuth: [] }],
      querystring: getVisitsQuerySchema,
      response: {
        200: getVisitsResponseSchema,
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const query = getVisitsQuerySchema.parse(request.query)
    const { page = 1, limit = 10, ...filters } = query

    // Role-based filtering
    let visitFilters = { ...filters }

    if (request.user!.role === 'CLIENT') {
      // Clients can only see their own visits
      visitFilters.clientId = request.user!.id
    } else if (request.user!.role === 'WORKER') {
      // Workers can only see visits assigned to them
      visitFilters.workerId = request.user!.id
    }
    // ADMIN and SUPERVISOR can see all visits based on filters

    const result = await visitRepository.findWithFilters(
      visitFilters,
      page,
      limit,
      request.user!.id
    )

    return reply.status(200).send({
      success: true,
      data: result.data.map(visit => ({
        id: visit.id,
        clientId: visit.clientId,
        workerId: visit.workerId,
        scheduledAt: visit.scheduledAt.toISOString(),
        estimatedDuration: visit.estimatedDuration,
        status: visit.status,
        activities: visit.activities || [],
        actualStartTime: visit.actualStartTime?.toISOString() || undefined,
        actualEndTime: visit.actualEndTime?.toISOString() || undefined,
        actualDuration: visit.actualDuration || undefined,
        notes: visit.notes || undefined,
        createdAt: visit.createdAt.toISOString(),
        client: visit.client ? {
          firstName: visit.client.profile?.firstName || 'Unknown',
          lastName: visit.client.profile?.lastName || 'User'
        } : undefined,
        worker: visit.worker ? {
          firstName: visit.worker.profile?.firstName || 'Unknown',
          lastName: visit.worker.profile?.lastName || 'Worker'
        } : undefined
      })),
      meta: result.meta
    })
  })

  // GET /visits/:id - Get visit by ID
  fastify.get('/:id', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:read'])],
    schema: {
      tags: ['visits'],
      summary: 'Get Visit by ID',
      description: 'Retrieve detailed visit information by ID',
      security: [{ bearerAuth: [] }],
      params: getVisitByIdParamsSchema,
      response: {
        200: getVisitByIdResponseSchema,
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getVisitByIdParamsSchema.parse(request.params)

    const visit = await visitRepository.findById(id, request.user!.id, {
      client: { include: { profile: true } },
      worker: { include: { profile: true } }
    })

    if (!visit) {
      throw new NotFoundError('Visit not found')
    }

    // Check access permissions
    const canAccess =
      ['ADMIN', 'SUPERVISOR'].includes(request.user!.role) ||
      visit.clientId === request.user!.id ||
      visit.workerId === request.user!.id

    if (!canAccess) {
      throw new UnauthorizedError('Cannot access this visit')
    }

    return reply.status(200).send({
      success: true,
      data: {
        id: visit.id,
        clientId: visit.clientId,
        workerId: visit.workerId,
        scheduledAt: visit.scheduledAt.toISOString(),
        estimatedDuration: visit.estimatedDuration,
        status: visit.status,
        activities: visit.activities || [],
        actualStartTime: visit.actualStartTime?.toISOString() || undefined,
        actualEndTime: visit.actualEndTime?.toISOString() || undefined,
        actualDuration: visit.actualDuration || undefined,
        notes: visit.notes || undefined,
        createdAt: visit.createdAt.toISOString(),
        updatedAt: visit.updatedAt.toISOString(),
        client: visit.client ? {
          id: visit.client.id,
          email: visit.client.email,
          profile: visit.client.profile ? {
            firstName: visit.client.profile.firstName,
            lastName: visit.client.profile.lastName,
            phone: visit.client.profile.phone || undefined
          } : undefined
        } : undefined,
        worker: visit.worker ? {
          id: visit.worker.id,
          email: visit.worker.email,
          profile: visit.worker.profile ? {
            firstName: visit.worker.profile.firstName,
            lastName: visit.worker.profile.lastName,
            phone: visit.worker.profile.phone || undefined
          } : undefined
        } : undefined
      }
    })
  })

  // POST /visits - Create new visit
  fastify.post('/', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:create'])],
    schema: {
      tags: ['visits'],
      summary: 'Create Visit',
      description: 'Schedule a new care visit',
      security: [{ bearerAuth: [] }],
      body: createVisitRequestSchema,
      response: {
        201: createVisitResponseSchema,
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        409: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const visitData = createVisitRequestSchema.parse(request.body)

    const visit = await visitRepository.create(visitData, request.user!.id)

    return reply.status(201).send({
      success: true,
      data: {
        id: visit.id,
        clientId: visit.clientId,
        workerId: visit.workerId,
        scheduledAt: visit.scheduledAt.toISOString(),
        estimatedDuration: visit.estimatedDuration,
        status: visit.status,
        activities: visit.activities || [],
        createdAt: visit.createdAt.toISOString()
      },
      message: 'Visit created successfully'
    })
  })

  // PUT /visits/:id - Update visit
  fastify.put('/:id', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:update'])],
    schema: {
      tags: ['visits'],
      summary: 'Update Visit',
      description: 'Update visit information',
      security: [{ bearerAuth: [] }],
      params: getVisitByIdParamsSchema,
      body: updateVisitRequestSchema,
      response: {
        200: updateVisitResponseSchema,
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getVisitByIdParamsSchema.parse(request.params)
    const updateData = updateVisitRequestSchema.parse(request.body)

    const visit = await visitRepository.update(id, updateData, request.user!.id)

    return reply.status(200).send({
      success: true,
      data: {
        id: visit.id,
        clientId: visit.clientId,
        workerId: visit.workerId,
        scheduledAt: visit.scheduledAt.toISOString(),
        estimatedDuration: visit.estimatedDuration,
        status: visit.status,
        activities: visit.activities || [],
        updatedAt: visit.updatedAt.toISOString()
      },
      message: 'Visit updated successfully'
    })
  })

  // POST /visits/:id/checkin - Check in to visit
  fastify.post('/:id/checkin', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:checkin'])],
    schema: {
      tags: ['visits'],
      summary: 'Check In to Visit',
      description: 'Worker checks in to start a visit',
      security: [{ bearerAuth: [] }],
      params: getVisitByIdParamsSchema,
      body: checkinRequestSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                status: { type: 'string' },
                actualStartTime: { type: 'string' },
                message: { type: 'string' }
              }
            }
          }
        },
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getVisitByIdParamsSchema.parse(request.params)
    const checkinData = checkinRequestSchema.parse(request.body)

    const visit = await visitRepository.checkin(id, request.user!.id, checkinData)

    return reply.status(200).send({
      success: true,
      data: {
        id: visit.id,
        status: visit.status,
        actualStartTime: visit.actualStartTime!.toISOString(),
        message: 'Checked in successfully'
      }
    })
  })

  // POST /visits/:id/checkout - Check out of visit
  fastify.post('/:id/checkout', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:checkout'])],
    schema: {
      tags: ['visits'],
      summary: 'Check Out of Visit',
      description: 'Worker checks out to complete a visit',
      security: [{ bearerAuth: [] }],
      params: getVisitByIdParamsSchema,
      body: checkoutRequestSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                status: { type: 'string' },
                actualEndTime: { type: 'string' },
                actualDuration: { type: 'number' },
                message: { type: 'string' }
              }
            }
          }
        },
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getVisitByIdParamsSchema.parse(request.params)
    const checkoutData = checkoutRequestSchema.parse(request.body)

    const visit = await visitRepository.checkout(id, request.user!.id, checkoutData)

    return reply.status(200).send({
      success: true,
      data: {
        id: visit.id,
        status: visit.status,
        actualEndTime: visit.actualEndTime!.toISOString(),
        actualDuration: visit.actualDuration!,
        message: 'Checked out successfully'
      }
    })
  })

  // POST /visits/:id/reschedule - Reschedule visit
  fastify.post('/:id/reschedule', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:reschedule'])],
    schema: {
      tags: ['visits'],
      summary: 'Reschedule Visit',
      description: 'Reschedule a visit to a new time',
      security: [{ bearerAuth: [] }],
      params: getVisitByIdParamsSchema,
      body: rescheduleVisitRequestSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                scheduledAt: { type: 'string' },
                message: { type: 'string' }
              }
            }
          }
        },
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getVisitByIdParamsSchema.parse(request.params)
    const rescheduleData = rescheduleVisitRequestSchema.parse(request.body)

    const visit = await visitRepository.reschedule(
      id,
      rescheduleData.newScheduledAt,
      request.user!.id,
      rescheduleData.reason
    )

    return reply.status(200).send({
      success: true,
      data: {
        id: visit.id,
        scheduledAt: visit.scheduledAt.toISOString(),
        message: 'Visit rescheduled successfully'
      }
    })
  })

  // DELETE /visits/:id - Cancel visit
  fastify.delete('/:id', {
    preHandler: [fastify.authenticate, fastify.authorize(['visits:cancel'])],
    schema: {
      tags: ['visits'],
      summary: 'Cancel Visit',
      description: 'Cancel a scheduled visit',
      security: [{ bearerAuth: [] }],
      params: getVisitByIdParamsSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getVisitByIdParamsSchema.parse(request.params)

    await visitRepository.softDelete(id, request.user!.id, 'Visit cancelled')

    return reply.status(200).send({
      success: true,
      data: {
        message: 'Visit cancelled successfully'
      }
    })
  })
}

export default visits
