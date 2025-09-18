import pkg from 'fastify'
const { FastifyPluginAsync } = pkg
import type { ApiResponse, PaginatedResponse } from '@caretracker/shared'

const visits: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{
    Querystring: { page?: number; limit?: number; clientId?: string }
    Reply: PaginatedResponse<any>
  }>('/', {
    schema: {
      tags: ['visits'],
      description: 'Get visits',
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', minimum: 1, default: 1 },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
          clientId: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    const { page = 1, limit = 10, clientId } = request.query
    
    // Mock visit data
    const mockVisits = [
      {
        id: 'visit-1',
        clientId: 'client-1',
        workerId: 'worker-1',
        scheduledAt: new Date().toISOString(),
        status: 'SCHEDULED',
        activities: ['Personal care', 'Meal preparation'],
      },
      {
        id: 'visit-2',
        clientId: 'client-1',
        workerId: 'worker-1',
        scheduledAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'COMPLETED',
        activities: ['Medication reminder', 'Companionship'],
        completedAt: new Date(Date.now() - 84600000).toISOString(),
        duration: 120,
        notes: 'Visit completed successfully',
      },
    ]
    
    // Filter by clientId if provided
    const filteredVisits = clientId 
      ? mockVisits.filter(visit => visit.clientId === clientId)
      : mockVisits
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedVisits = filteredVisits.slice(startIndex, endIndex)
    
    return {
      success: true,
      data: paginatedVisits,
      meta: {
        page,
        limit,
        total: filteredVisits.length,
        totalPages: Math.ceil(filteredVisits.length / limit),
      },
    }
  })

  fastify.post<{
    Body: {
      clientId: string
      workerId: string
      scheduledAt: string
      activities: string[]
    }
    Reply: ApiResponse<any>
  }>('/', {
    schema: {
      tags: ['visits'],
      description: 'Create a new visit',
      body: {
        type: 'object',
        required: ['clientId', 'workerId', 'scheduledAt'],
        properties: {
          clientId: { type: 'string' },
          workerId: { type: 'string' },
          scheduledAt: { type: 'string', format: 'date-time' },
          activities: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { clientId, workerId, scheduledAt, activities = [] } = request.body
    
    const newVisit = {
      id: `visit-${Date.now()}`,
      clientId,
      workerId,
      scheduledAt,
      status: 'SCHEDULED' as const,
      activities,
      createdAt: new Date().toISOString(),
    }
    
    return {
      success: true,
      data: newVisit,
      message: 'Visit created successfully',
    }
  })
}

export default visits