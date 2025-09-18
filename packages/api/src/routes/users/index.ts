import pkg from 'fastify'
const { FastifyPluginAsync } = pkg
import type { ApiResponse, PaginatedResponse } from '@caretracker/shared'

const users: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{
    Querystring: { page?: number; limit?: number }
    Reply: PaginatedResponse<any>
  }>('/', {
    schema: {
      tags: ['users'],
      description: 'Get all users',
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', minimum: 1, default: 1 },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
        },
      },
    },
  }, async (request, reply) => {
    const { page = 1, limit = 10 } = request.query
    
    // Mock data for now
    const mockUsers = [
      { id: '1', email: 'client@demo.com', role: 'CLIENT' },
      { id: '2', email: 'worker@demo.com', role: 'WORKER' },
      { id: '3', email: 'admin@demo.com', role: 'ADMIN' },
    ]
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = mockUsers.slice(startIndex, endIndex)
    
    return {
      success: true,
      data: paginatedUsers,
      meta: {
        page,
        limit,
        total: mockUsers.length,
        totalPages: Math.ceil(mockUsers.length / limit),
      },
    }
  })

  fastify.get<{
    Params: { id: string }
    Reply: ApiResponse<any>
  }>('/:id', {
    schema: {
      tags: ['users'],
      description: 'Get user by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  }, async (request, reply) => {
    const { id } = request.params
    
    // Mock user data
    const mockUser = {
      id,
      email: 'user@demo.com',
      role: 'CLIENT',
      profile: {
        firstName: 'Demo',
        lastName: 'User',
        phone: '+1234567890',
      },
    }
    
    return {
      success: true,
      data: mockUser,
    }
  })
}

export default users