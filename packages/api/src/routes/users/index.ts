import { type FastifyPluginAsync } from 'fastify'
import { UserRepository } from '../../repositories/user.repository.js'
import { AuditService } from '../../services/audit.service.js'
import {
  getUsersQuerySchema,
  getUsersResponseSchema,
  getUserByIdParamsSchema,
  getUserByIdResponseSchema,
  createUserRequestSchema,
  createUserResponseSchema,
  updateUserRequestSchema,
  updateUserResponseSchema
} from '../../schemas/users.js'
import { NotFoundError, ValidationError, AuthenticationError, AuthorizationError } from '../../utils/errors.js'

const users: FastifyPluginAsync = async (fastify, _opts) => {
  const userRepository = new UserRepository(
    fastify.prisma,
    fastify.auditService.createAuditLogger()
  )

  // GET /users - List users with filtering and pagination
  fastify.get('/', {
    preHandler: [fastify.authenticate, fastify.authorize(['users:read'])],
    schema: {
      tags: ['users'],
      summary: 'List Users',
      description: 'Get paginated list of users with optional filtering',
      security: [{ bearerAuth: [] }],
      querystring: getUsersQuerySchema,
      response: {
        200: getUsersResponseSchema,
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const query = getUsersQuerySchema.parse(request.query)
    const { page = 1, limit = 10, ...filters } = query

    // Role-based filtering: non-admins can only see active users
    const userFilters = {
      ...filters,
      ...(request.user!.role !== 'ADMIN' && { isActive: true })
    }

    const result = await userRepository.findActiveUsers(
      userFilters,
      page,
      limit,
      request.user!.id
    )

    return reply.status(200).send({
      success: true,
      data: result.data.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLoginAt: user.lastLoginAt?.toISOString() || null,
        createdAt: user.createdAt.toISOString(),
        profile: user.profile ? {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          phone: user.profile.phone || undefined,
          preferredName: user.profile.preferredName || undefined
        } : undefined
      })),
      meta: result.meta
    })
  })

  // GET /users/:id - Get user by ID
  fastify.get('/:id', {
    preHandler: [fastify.authenticate, fastify.authorize(['users:read'])],
    schema: {
      tags: ['users'],
      summary: 'Get User by ID',
      description: 'Retrieve detailed user information by ID',
      security: [{ bearerAuth: [] }],
      params: getUserByIdParamsSchema,
      response: {
        200: getUserByIdResponseSchema,
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getUserByIdParamsSchema.parse(request.params)

    // Check ownership: users can only view their own data unless they're admin/supervisor
    if (!['ADMIN', 'SUPERVISOR'].includes(request.user!.role) && request.user!.id !== id) {
      throw new UnauthorizedError('Cannot access other user data')
    }

    const user = await userRepository.findById(id, request.user!.id, {
      profile: true
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return reply.status(200).send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLoginAt: user.lastLoginAt?.toISOString() || null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        profile: user.profile ? {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          middleName: user.profile.middleName || undefined,
          preferredName: user.profile.preferredName || undefined,
          phone: user.profile.phone || undefined,
          alternatePhone: user.profile.alternatePhone || undefined,
          email: user.profile.email || undefined,
          streetAddress: user.profile.streetAddress || undefined,
          city: user.profile.city || undefined,
          state: user.profile.state || undefined,
          zipCode: user.profile.zipCode || undefined,
          country: user.profile.country || undefined,
          dateOfBirth: user.profile.dateOfBirth?.toISOString() || undefined,
          gender: user.profile.gender || undefined,
          preferredLanguage: user.profile.preferredLanguage || undefined,
          timezone: user.profile.timezone || undefined,
          photoUrl: user.profile.photoUrl || undefined
        } : undefined
      }
    })
  })

  // POST /users - Create new user (admin only)
  fastify.post('/', {
    preHandler: [fastify.authenticate, fastify.authorize(['users:create'])],
    schema: {
      tags: ['users'],
      summary: 'Create User',
      description: 'Create a new user with profile (admin only)',
      security: [{ bearerAuth: [] }],
      body: createUserRequestSchema,
      response: {
        201: createUserResponseSchema,
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        409: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const userData = createUserRequestSchema.parse(request.body)

    // Hash password
    const hashedPassword = await fastify.authService.hashPassword(userData.password)

    const user = await userRepository.createWithProfile({
      ...userData,
      password: hashedPassword
    }, request.user!.id)

    return reply.status(201).send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt.toISOString()
      },
      message: 'User created successfully'
    })
  })

  // PUT /users/:id - Update user
  fastify.put('/:id', {
    preHandler: [fastify.authenticate, fastify.authorize(['users:update'])],
    schema: {
      tags: ['users'],
      summary: 'Update User',
      description: 'Update user information and profile',
      security: [{ bearerAuth: [] }],
      params: getUserByIdParamsSchema,
      body: updateUserRequestSchema,
      response: {
        200: updateUserResponseSchema,
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        403: { $ref: 'ErrorResponse' },
        404: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { id } = getUserByIdParamsSchema.parse(request.params)
    const updateData = updateUserRequestSchema.parse(request.body)

    // Check ownership: users can only update their own data unless they're admin/supervisor
    if (!['ADMIN', 'SUPERVISOR'].includes(request.user!.role) && request.user!.id !== id) {
      throw new UnauthorizedError('Cannot update other user data')
    }

    const user = await userRepository.updateWithProfile(id, updateData, request.user!.id)

    return reply.status(200).send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        updatedAt: user.updatedAt.toISOString()
      },
      message: 'User updated successfully'
    })
  })

  // DELETE /users/:id - Soft delete user (admin only)
  fastify.delete('/:id', {
    preHandler: [fastify.authenticate, fastify.authorize(['users:delete'])],
    schema: {
      tags: ['users'],
      summary: 'Delete User',
      description: 'Soft delete a user (admin only)',
      security: [{ bearerAuth: [] }],
      params: getUserByIdParamsSchema,
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
    const { id } = getUserByIdParamsSchema.parse(request.params)

    await userRepository.softDelete(id, request.user!.id, 'Deleted by admin')

    return reply.status(200).send({
      success: true,
      data: {
        message: 'User deleted successfully'
      }
    })
  })
}

export default users
