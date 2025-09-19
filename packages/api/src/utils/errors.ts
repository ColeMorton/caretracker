export enum ErrorCode {
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Authentication/Authorization errors
  AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',

  // Business logic errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  OPTIMISTIC_LOCK_ERROR = 'OPTIMISTIC_LOCK_ERROR',

  // Healthcare-specific errors
  HIPAA_VIOLATION = 'HIPAA_VIOLATION',
  DATA_CLASSIFICATION_ERROR = 'DATA_CLASSIFICATION_ERROR',
  AUDIT_LOG_REQUIRED = 'AUDIT_LOG_REQUIRED',
  PHI_ACCESS_DENIED = 'PHI_ACCESS_DENIED',

  // System errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}

export interface ErrorDetails {
  readonly field?: string
  readonly code?: string
  readonly message?: string
  readonly value?: unknown
}

export class AppError extends Error {
  public readonly timestamp: Date

  constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly details?: ErrorDetails | readonly ErrorDetails[]
  ) {
    super(message)
    this.name = this.constructor.name
    this.timestamp = new Date()
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON(): {
    readonly code: string
    readonly message: string
    readonly statusCode: number
    readonly details?: Record<string, unknown>
    readonly timestamp: string
  } {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp.toISOString()
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails | readonly ErrorDetails[]) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, details)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(ErrorCode.AUTHENTICATION_REQUIRED, message, 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(ErrorCode.INSUFFICIENT_PERMISSIONS, message, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(ErrorCode.RESOURCE_NOT_FOUND, `${resource} not found`, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(ErrorCode.RESOURCE_CONFLICT, message, 409, details)
  }
}

export class BusinessRuleError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(ErrorCode.BUSINESS_RULE_VIOLATION, message, 422, details)
  }
}

export class HIPAAViolationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(ErrorCode.HIPAA_VIOLATION, message, 403, details)
  }
}

export class OptimisticLockError extends AppError {
  constructor(resource: string = 'Resource') {
    super(
      ErrorCode.OPTIMISTIC_LOCK_ERROR,
      `${resource} was modified by another user. Please refresh and try again.`,
      409
    )
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', details?: ErrorDetails) {
    super(ErrorCode.DATABASE_ERROR, message, 500, details)
  }
}

export class SystemError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(ErrorCode.SYSTEM_ERROR, message, 500)
  }
}