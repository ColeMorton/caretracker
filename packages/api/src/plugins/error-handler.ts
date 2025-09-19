import { Prisma } from '@prisma/client'
import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { ZodError } from 'zod'

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

// User payload interface for request.user (from @fastify/jwt)

const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  // Helper function to create error response
  const createErrorResponse = (
    appError: AppError,
    requestId: string,
    timestamp: string
  ): ErrorResponse => ({
    success: false,
    error: {
      code: appError.code,
      message: appError.message,
      details: appError.details,
      requestId,
      timestamp
    }
  })

  // Helper function to log errors
  const logError = (error: Error, request: FastifyRequest, logContext: Record<string, unknown>): boolean => {
    if (error instanceof AppError) {
      return logAppError(error, request, logContext)
    } else {
      request.log.error(logContext, 'Unhandled error')
      return true
    }
  }

  // Helper function to log app errors with appropriate severity
  const logAppError = (error: AppError, request: FastifyRequest, logContext: Record<string, unknown>): boolean => {
    if (error.code.includes('HIPAA') || error.code.includes('PHI')) {
      request.log.error(logContext, 'HIPAA/Security violation')
    } else if (error.statusCode >= 500) {
      request.log.error(logContext, 'Server error')
    } else if (error.statusCode >= 400) {
      request.log.warn(logContext, 'Client error')
    } else {
      request.log.info(logContext, 'Application error')
    }
    return true
  }

  // Helper function to handle Prisma errors
  const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError): AppError => {
    switch (error.code) {
      case 'P2002': {
        const target = error.meta?.['target'] as readonly string[] | undefined
        const field = target?.[0] || 'field'
        return new ValidationError(`${field} already exists`, {
          field,
          code: error.code,
          message: 'Unique constraint violation'
        })
      }
      case 'P2025':
        return new AppError(ErrorCode.RESOURCE_NOT_FOUND, 'Record not found', 404)
      case 'P2034':
        return new AppError(ErrorCode.OPTIMISTIC_LOCK_ERROR, 'Resource was modified by another user', 409)
      default:
        return new DatabaseError('Database operation failed', {
          code: error.code,
          message: error.message
        })
    }
  }

  // Helper function to handle Zod validation errors
  const handleZodError = (error: ZodError): ValidationError => {
    return new ValidationError('Request validation failed',
      error.errors.map(err => ({
        field: err.path.join('.'),
        code: err.code,
        message: err.message,
        value: 'received' in err ? err.received : undefined
      }))
    )
  }
  // Global error handler
  fastify.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    const requestId = request.id
    const timestamp = new Date().toISOString()

    // Log error with healthcare compliance context
    const logContext = {
      err: error,
      requestId,
      userId: request.user?.id,
      userRole: request.user?.role,
      url: request.url,
      method: request.method,
      userAgent: request.headers['user-agent'],
      ip: request.ip,
      timestamp
    }

    logError(error, request, logContext)

    // Handle known error types
    if (error instanceof AppError) {
      const errorResponse = createErrorResponse(error, requestId, timestamp)
      return reply.status(error.statusCode).send(errorResponse)
    }

    if (error instanceof ZodError) {
      const validationError = handleZodError(error)
      const errorResponse = createErrorResponse(validationError, requestId, timestamp)
      return reply.status(400).send(errorResponse)
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const appError = handlePrismaError(error)
      const errorResponse = createErrorResponse(appError, requestId, timestamp)
      return reply.status(appError.statusCode).send(errorResponse)
    }

    if ('validation' in error && error.validation) {
      const validationError = new ValidationError('Request validation failed', {
        field: 'validationContext' in error ? String(error.validationContext) : 'unknown',
        message: error.message
      })
      const errorResponse = createErrorResponse(validationError, requestId, timestamp)
      return reply.status(400).send(errorResponse)
    }

    if ('statusCode' in error && error.statusCode === 429) {
      const rateLimitError = new AppError(
        ErrorCode.RATE_LIMIT_EXCEEDED,
        'Too many requests. Please try again later.',
        429
      )
      const errorResponse = createErrorResponse(rateLimitError, requestId, timestamp)
      return reply.status(429).send(errorResponse)
    }

    // Unknown errors - mask sensitive information in production
    const systemError = new SystemError(
      process.env['NODE_ENV'] === 'production'
        ? 'Internal server error'
        : error.message
    )
    const errorResponse = createErrorResponse(systemError, requestId, timestamp)
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