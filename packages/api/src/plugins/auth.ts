import fastifyJwt from '@fastify/jwt'
import type { FastifyPluginAsync, FastifyRequest, FastifyReply, preHandlerHookHandler } from 'fastify'
import fp from 'fastify-plugin'

import { AuthService } from '../services/auth.service.js'
import { AuthenticationError, AuthorizationError } from '../utils/errors.js'

const AUTHENTICATION_REQUIRED_MESSAGE = 'Authentication required'

interface UserPayload {
  readonly id: string
  readonly email: string
  readonly role: string
  readonly permissions: readonly string[]
  readonly sessionId: string
}

declare module 'fastify' {
  interface FastifyInstance {
    readonly authService: AuthService
    readonly authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    readonly authorize: (permissions: readonly string[]) => preHandlerHookHandler
    readonly requirePermission: (permission: string) => preHandlerHookHandler
    readonly requireRole: (...roles: readonly string[]) => preHandlerHookHandler
    readonly requireOwnership: (resourceParam?: string) => preHandlerHookHandler
    readonly optionalAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
    readonly hasPermission: (request: FastifyRequest, permission: string) => boolean
    readonly hasRole: (request: FastifyRequest, ...roles: readonly string[]) => boolean
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: UserPayload
    user: UserPayload
  }
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
  // Register JWT plugin with proper typing
  await fastify.register(fastifyJwt, {
    secret: process.env['JWT_SECRET'] || 'fallback-secret-for-development',
    sign: {
      algorithm: 'HS256',
      issuer: 'caretracker-api',
      audience: 'caretracker-clients'
    },
    verify: {
      algorithms: ['HS256'],
      issuer: 'caretracker-api',
      audience: 'caretracker-clients'
    }
  })

  // Create AuthService instance
  const authService = new AuthService(fastify, fastify.prisma)
  fastify.decorate('authService', authService)

  // Authentication hook - verifies JWT token
  const authenticate = async (request: FastifyRequest, _reply: FastifyReply) => {
    try {
      const authHeader = request.headers.authorization

      if (!authHeader) {
        throw new AuthenticationError('Authorization header is required')
      }

      const [scheme, token] = authHeader.split(' ')

      if (scheme !== 'Bearer' || !token) {
        throw new AuthenticationError('Invalid authorization header format. Use: Bearer <token>')
      }

      // Validate the token using AuthService
      const payload = await authService.validateAccessToken(token)

      // Attach user info to request
      request.user = {
        id: payload.userId,
        email: payload.email,
        role: payload.role,
        permissions: payload.permissions,
        sessionId: payload.sessionId
      }

      // Log access for audit trail
      fastify.log.info({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        sessionId: payload.sessionId,
        url: request.url,
        method: request.method,
        userAgent: request.headers['user-agent'],
        ip: request.ip
      }, 'Authenticated request')

    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error
      }
      throw new AuthenticationError('Token validation failed')
    }
  }

  // Multi-permission authorization hook (user needs ANY of the provided permissions)
  const authorize = (permissions: readonly string[]): preHandlerHookHandler => {
    return async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.user) {
        throw new AuthenticationError(AUTHENTICATION_REQUIRED_MESSAGE)
      }

      // Check if user has any of the required permissions
      const hasPermissionChecks = await Promise.all(
        permissions.map(permission => authService.checkPermission(request.user!.id, permission))
      )
      const hasAnyPermission = hasPermissionChecks.some(hasPermission => hasPermission)

      if (!hasAnyPermission) {
        // Log unauthorized access attempt
        fastify.log.warn({
          userId: request.user!.id,
          role: request.user!.role,
          requiredPermissions: permissions,
          url: request.url,
          method: request.method,
          ip: request.ip
        }, 'Unauthorized access attempt')

        throw new AuthorizationError(`Insufficient permissions. Required one of: ${permissions.join(', ')}`)
      }

      // Log successful authorization
      fastify.log.debug({
        userId: request.user!.id,
        permissions,
        url: request.url
      }, 'Authorization check passed')
    }
  }

  // Permission-based authorization hook
  const requirePermission = (permission: string): preHandlerHookHandler => {
    return async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.user) {
        throw new AuthenticationError(AUTHENTICATION_REQUIRED_MESSAGE)
      }

      const hasPermission = await authService.checkPermission(request.user!.id, permission)

      if (!hasPermission) {
        // Log unauthorized access attempt
        fastify.log.warn({
          userId: request.user!.id,
          role: request.user!.role,
          requiredPermission: permission,
          url: request.url,
          method: request.method,
          ip: request.ip
        }, 'Unauthorized access attempt')

        throw new AuthorizationError(`Insufficient permissions. Required: ${permission}`)
      }

      // Log successful authorization
      fastify.log.debug({
        userId: request.user!.id,
        permission,
        url: request.url
      }, 'Permission check passed')
    }
  }

  // Role-based authorization hook
  const requireRole = (...allowedRoles: readonly string[]): preHandlerHookHandler => {
    return async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.user) {
        throw new AuthenticationError(AUTHENTICATION_REQUIRED_MESSAGE)
      }

      if (!allowedRoles.includes(request.user!.role)) {
        // Log unauthorized access attempt
        fastify.log.warn({
          userId: request.user!.id,
          userRole: request.user!.role,
          allowedRoles,
          url: request.url,
          method: request.method,
          ip: request.ip
        }, 'Role-based access denied')

        throw new AuthorizationError(`Access denied. Required roles: ${allowedRoles.join(', ')}`)
      }

      fastify.log.debug({
        userId: request.user!.id,
        role: request.user!.role,
        url: request.url
      }, 'Role check passed')
    }
  }

  // Helper function to check if user has admin privileges
  const hasAdminPrivileges = (role: string): boolean => {
    return ['ADMIN', 'SUPERVISOR'].includes(role)
  }

  // Helper function to validate resource access
  const validateResourceAccess = async (
    user: UserPayload,
    resourceId: string,
    url: string
  ): Promise<void> => {
    if (resourceId === user.id) {
      return // User accessing their own resource
    }

    if (user.role === 'CLIENT') {
      await validateClientAccess(user.id, resourceId, url)
    } else if (user.role === 'WORKER') {
      await validateWorkerAccess(user.id, resourceId, url)
    } else {
      throw new AuthorizationError('You can only access your own resources')
    }
  }

  // Helper function to validate client access
  const validateClientAccess = async (userId: string, resourceId: string, url: string): Promise<void> => {
    const isClientRoute = url.includes('/visits') || url.includes('/budgets')
    const hasOwnership = isClientRoute && await verifyClientOwnership(userId, resourceId, url)

    if (!hasOwnership) {
      throw new AuthorizationError('You can only access your own resources')
    }
  }

  // Helper function to validate worker access
  const validateWorkerAccess = async (userId: string, resourceId: string, url: string): Promise<void> => {
    const hasAssignment = await verifyWorkerAssignment(userId, resourceId, url)

    if (!hasAssignment) {
      throw new AuthorizationError('You can only access assigned resources')
    }
  }

  // Ownership-based authorization (user can only access their own resources)
  const requireOwnership = (resourceParam: string = 'id'): preHandlerHookHandler => {
    return async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.user) {
        throw new AuthenticationError(AUTHENTICATION_REQUIRED_MESSAGE)
      }

      if (hasAdminPrivileges(request.user!.role)) {
        return
      }

      // Security: Validate parameter name against whitelist to prevent object injection
      const allowedParams = ['id', 'userId', 'clientId', 'workerId', 'visitId', 'budgetId', 'carePlanId']
      if (!allowedParams.includes(resourceParam)) {
        throw new AuthenticationError(`Invalid resource parameter: ${resourceParam}`)
      }

      const params = request.params as Record<string, string>
      // Safe property access using Map to prevent object injection
      const paramsMap = new Map(Object.entries(params))
      const resourceId = paramsMap.get(resourceParam)

      if (!resourceId) {
        throw new AuthenticationError(`Resource parameter '${resourceParam}' is required`)
      }

      await validateResourceAccess(request.user!, resourceId, request.url)

      fastify.log.debug({
        userId: request.user!.id,
        resourceId,
        url: request.url
      }, 'Ownership check passed')
    }
  }

  // Helper method to verify client ownership
  const verifyClientOwnership = async (userId: string, resourceId: string, url: string): Promise<boolean> => {
    try {
      if (url.includes('/visits')) {
        const visit = await fastify.prisma.visit.findUnique({
          where: { id: resourceId },
          select: { clientId: true }
        })
        return visit?.clientId === userId
      }

      if (url.includes('/budgets')) {
        const budget = await fastify.prisma.budget.findUnique({
          where: { id: resourceId },
          select: { clientId: true }
        })
        return budget?.clientId === userId
      }

      if (url.includes('/careplans')) {
        const carePlan = await fastify.prisma.carePlan.findUnique({
          where: { id: resourceId },
          select: { clientId: true }
        })
        return carePlan?.clientId === userId
      }

      return false
    } catch (error) {
      fastify.log.error(error, 'Error verifying client ownership')
      return false
    }
  }

  // Helper method to verify worker assignment
  const verifyWorkerAssignment = async (userId: string, resourceId: string, url: string): Promise<boolean> => {
    try {
      if (url.includes('/visits')) {
        const visit = await fastify.prisma.visit.findUnique({
          where: { id: resourceId },
          select: { workerId: true }
        })
        return visit?.workerId === userId
      }

      if (url.includes('/clients')) {
        // Check if worker is assigned to any visits for this client
        const visitExists = await fastify.prisma.visit.findFirst({
          where: {
            clientId: resourceId,
            workerId: userId
          },
          select: { id: true }
        })
        return !!visitExists
      }

      return false
    } catch (error) {
      fastify.log.error(error, 'Error verifying worker assignment')
      return false
    }
  }

  // Decorate fastify instance with auth methods
  fastify.decorate('authenticate', authenticate)
  fastify.decorate('authorize', authorize)
  fastify.decorate('requirePermission', requirePermission)
  fastify.decorate('requireRole', requireRole)
  fastify.decorate('requireOwnership', requireOwnership)

  // Optional authentication hook (doesn't throw if no token)
  const optionalAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await authenticate(request, reply)
    } catch (error) {
      // Silently continue without user context
      fastify.log.debug('Optional authentication failed - continuing without user context')
    }
  }

  fastify.decorate('optionalAuth', optionalAuth)

  // Helper method to check if current user has permission
  fastify.decorate('hasPermission', (request: FastifyRequest, permission: string): boolean => {
    if (!request.user) return false
    return request.user.permissions.includes('*') || request.user.permissions.includes(permission)
  })

  // Helper method to check if current user has role
  fastify.decorate('hasRole', (request: FastifyRequest, ...roles: readonly string[]): boolean => {
    if (!request.user) return false
    return roles.includes(request.user.role)
  })

  // Add JWT schemas for OpenAPI documentation
  fastify.addSchema({
    $id: 'TokenResponse',
    type: 'object',
    properties: {
      accessToken: { type: 'string' },
      refreshToken: { type: 'string' },
      expiresIn: { type: 'number' }
    },
    required: ['accessToken', 'refreshToken', 'expiresIn'],
    additionalProperties: false
  })

  fastify.addSchema({
    $id: 'UserProfile',
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string' },
      profile: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          phone: { type: 'string' }
        }
      }
    },
    required: ['id', 'email', 'role'],
    additionalProperties: false
  })
}

export default fp(authPlugin, {
  name: 'auth',
  dependencies: ['database']
})