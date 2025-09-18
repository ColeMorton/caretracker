import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { AppError, ErrorCode, ValidationError, DatabaseError, SystemError } from '../utils/errors.js'

interface ErrorResponse {
  readonly success: false
  readonly error: {
    readonly code: string
    readonly message: string
    readonly details?: unknown
    readonly requestId: string
    readonly timestamp: string
  }
}

interface User {
  readonly id: string
  readonly email: string
  readonly role: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}

const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  // Global error handler
  fastify.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    const requestId = request.id
    const timestamp = new Date().toISOString()
    const userId = request.user?.id

    // Log error with healthcare compliance context
    const logContext = {
      err: error,
      requestId,
      userId,
      userRole: request.user?.role,
      url: request.url,
      method: request.method,
      userAgent: request.headers['user-agent'],
      ip: request.ip,
      timestamp
    }

    // Different log levels based on error severity
    if (error instanceof AppError) {
      if (error.code.includes('HIPAA') || error.code.includes('PHI')) {
        request.log.error(logContext, 'HIPAA/Security violation')
      } else if (error.statusCode >= 500) {
        request.log.error(logContext, 'Server error')
      } else if (error.statusCode >= 400) {
        request.log.warn(logContext, 'Client error')
      } else {
        request.log.info(logContext, 'Application error')
      }
    } else {
      request.log.error(logContext, 'Unhandled error')
    }

    // Handle known error types
    if (error instanceof AppError) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
          requestId,
          timestamp
        }
      }

      return reply.status(error.statusCode).send(errorResponse)
    }

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const validationError = new ValidationError('Request validation failed',
        error.errors.map(err => ({
          field: err.path.join('.'),
          code: err.code,
          message: err.message,
          value: err.input
        }))
      )

      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: validationError.code,
          message: validationError.message,
          details: validationError.details,
          requestId,
          timestamp
        }
      }

      return reply.status(400).send(errorResponse)
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      let appError: AppError

      switch (error.code) {
        case 'P2002':
          // Unique constraint violation
          const target = error.meta?.target as string[] | undefined
          const field = target?.[0] || 'field'
          appError = new ValidationError(`${field} already exists`, {
            field,
            code: error.code,
            message: 'Unique constraint violation'
          })
          break
        case 'P2025':
          // Record not found
          appError = new AppError(ErrorCode.RESOURCE_NOT_FOUND, 'Record not found', 404)
          break
        case 'P2034':
          // Transaction failed due to write conflict
          appError = new AppError(ErrorCode.OPTIMISTIC_LOCK_ERROR, 'Resource was modified by another user', 409)
          break
        default:
          appError = new DatabaseError('Database operation failed', {
            code: error.code,
            message: error.message
          })
      }

      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: appError.code,
          message: appError.message,
          details: appError.details,
          requestId,
          timestamp
        }
      }

      return reply.status(appError.statusCode).send(errorResponse)
    }

    // Handle Fastify validation errors
    if (error.validation) {
      const validationError = new ValidationError('Request validation failed', {
        field: error.validationContext,
        message: error.message
      })

      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: validationError.code,
          message: validationError.message,
          details: validationError.details,
          requestId,
          timestamp
        }
      }

      return reply.status(400).send(errorResponse)
    }

    // Handle rate limit errors
    if (error.statusCode === 429) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: {
          code: ErrorCode.RATE_LIMIT_EXCEEDED,
          message: 'Too many requests. Please try again later.',
          requestId,
          timestamp
        }
      }

      return reply.status(429).send(errorResponse)
    }

    // Unknown errors - mask sensitive information in production
    const systemError = new SystemError(
      process.env['NODE_ENV'] === 'production'
        ? 'Internal server error'
        : error.message
    )

    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: systemError.code,
        message: systemError.message,
        requestId,
        timestamp
      }
    }

    return reply.status(500).send(errorResponse)
  })

  // Add error response schema for OpenAPI documentation
  fastify.addSchema({
    $id: 'ErrorResponse',
    type: 'object',
    properties: {
      success: { type: 'boolean', const: false },
      error: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          message: { type: 'string' },
          details: {},
          requestId: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' }
        },
        required: ['code', 'message', 'requestId', 'timestamp'],
        additionalProperties: false
      }
    },
    required: ['success', 'error'],
    additionalProperties: false
  })
}

export default fp(errorHandlerPlugin, {
  name: 'error-handler',
  dependencies: []
})