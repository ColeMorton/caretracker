import { type FastifyPluginAsync, type FastifyRequest } from 'fastify'

import { UserRepository } from '../../repositories/user.repository.js'
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
import { NotFoundError, AuthorizationError } from '../../utils/errors.js'

// Helper function to validate user access permissions
const validateUserAccess = (currentUser: NonNullable<FastifyRequest['user']>, targetUserId: string): void => {
  const hasAdminPrivileges = ['ADMIN', 'SUPERVISOR'].includes(currentUser.role)
  const isAccessingOwnData = currentUser.id === targetUserId

  if (!hasAdminPrivileges && !isAccessingOwnData) {
    throw new AuthorizationError('Cannot access other user data')
  }
  return undefined
}

// Helper to safely get optional field value
const getOptionalField = (value: unknown): unknown => value || undefined

// Helper function to format profile data
const formatProfileData = (profile: Record<string, unknown> | null | undefined): Record<string, unknown> | undefined => {
  if (!profile) return undefined

  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    middleName: getOptionalField(profile.middleName),
    preferredName: getOptionalField(profile.preferredName),
    phone: getOptionalField(profile.phone),
    alternatePhone: getOptionalField(profile.alternatePhone),
    email: getOptionalField(profile.email),
    streetAddress: getOptionalField(profile.streetAddress),
    city: getOptionalField(profile.city),
    state: getOptionalField(profile.state),
    zipCode: getOptionalField(profile.zipCode),
    country: getOptionalField(profile.country),
    dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth as string).toISOString() : undefined,
    gender: getOptionalField(profile.gender),
    preferredLanguage: getOptionalField(profile.preferredLanguage),
    timezone: getOptionalField(profile.timezone),
    photoUrl: getOptionalField(profile.photoUrl)
  }
}

// Helper function to format user response
const formatUserResponse = (user: Record<string, unknown>): Record<string, unknown> => ({
  id: user.id,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  emailVerified: user.emailVerified,
  lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt as string).toISOString() : null,
  createdAt: new Date(user.createdAt as string).toISOString(),
  updatedAt: new Date(user.updatedAt as string).toISOString(),
  profile: formatProfileData(user.profile as Record<string, unknown> | null | undefined)
})

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

    validateUserAccess(request.user!, id)

    const user = await userRepository.findById(id, request.user!.id, {
      profile: true
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return reply.status(200).send({
      success: true,
      data: formatUserResponse(user)
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
      throw new AuthorizationError('Cannot update other user data')
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
