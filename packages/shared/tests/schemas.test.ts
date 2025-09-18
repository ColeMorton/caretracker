import { describe, it, expect } from 'vitest'
import {
  userSchema,
  loginSchema,
  visitSchema,
  paginationSchema,
  type LoginInput,
  type PaginationInput,
} from '../src/schemas'

describe('User Schema', () => {
  it('should validate a valid user object', () => {
    const validUser = {
      id: 'cm123456789',
      email: 'test@example.com',
      role: 'CLIENT' as const,
    }

    const result = userSchema.safeParse(validUser)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validUser)
    }
  })

  it('should reject invalid email', () => {
    const invalidUser = {
      id: 'cm123456789',
      email: 'invalid-email',
      role: 'CLIENT' as const,
    }

    const result = userSchema.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })

  it('should reject invalid role', () => {
    const invalidUser = {
      id: 'cm123456789',
      email: 'test@example.com',
      role: 'INVALID_ROLE',
    }

    const result = userSchema.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })

  it('should reject invalid cuid format', () => {
    const invalidUser = {
      id: 'invalid-id',
      email: 'test@example.com',
      role: 'CLIENT' as const,
    }

    const result = userSchema.safeParse(invalidUser)
    expect(result.success).toBe(false)
  })
})

describe('Login Schema', () => {
  it('should validate valid login credentials', () => {
    const validLogin: LoginInput = {
      email: 'test@example.com',
      password: 'password123',
    }

    const result = loginSchema.safeParse(validLogin)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validLogin)
    }
  })

  it('should reject invalid email format', () => {
    const invalidLogin = {
      email: 'invalid-email',
      password: 'password123',
    }

    const result = loginSchema.safeParse(invalidLogin)
    expect(result.success).toBe(false)
  })

  it('should reject short password', () => {
    const invalidLogin = {
      email: 'test@example.com',
      password: '123',
    }

    const result = loginSchema.safeParse(invalidLogin)
    expect(result.success).toBe(false)
  })

  it('should reject missing fields', () => {
    const incompleteLogin = {
      email: 'test@example.com',
    }

    const result = loginSchema.safeParse(incompleteLogin)
    expect(result.success).toBe(false)
  })
})

describe('Visit Schema', () => {
  it('should validate a valid visit object', () => {
    const validVisit = {
      id: 'cm123456789',
      clientId: 'cm987654321',
      workerId: 'cm555444333',
      scheduledAt: '2024-01-15T10:00:00Z',
      status: 'SCHEDULED' as const,
    }

    const result = visitSchema.safeParse(validVisit)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validVisit)
    }
  })

  it('should reject invalid datetime format', () => {
    const invalidVisit = {
      id: 'cm123456789',
      clientId: 'cm987654321',
      workerId: 'cm555444333',
      scheduledAt: '2024-01-15 10:00:00', // Invalid format
      status: 'SCHEDULED' as const,
    }

    const result = visitSchema.safeParse(invalidVisit)
    expect(result.success).toBe(false)
  })

  it('should reject invalid status', () => {
    const invalidVisit = {
      id: 'cm123456789',
      clientId: 'cm987654321',
      workerId: 'cm555444333',
      scheduledAt: '2024-01-15T10:00:00Z',
      status: 'INVALID_STATUS',
    }

    const result = visitSchema.safeParse(invalidVisit)
    expect(result.success).toBe(false)
  })
})

describe('Pagination Schema', () => {
  it('should validate valid pagination parameters', () => {
    const validPagination: PaginationInput = {
      page: 1,
      limit: 10,
    }

    const result = paginationSchema.safeParse(validPagination)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(validPagination)
    }
  })

  it('should apply default values', () => {
    const emptyPagination = {}

    const result = paginationSchema.safeParse(emptyPagination)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(1)
      expect(result.data.limit).toBe(10)
    }
  })

  it('should coerce string numbers', () => {
    const stringPagination = {
      page: '2',
      limit: '20',
    }

    const result = paginationSchema.safeParse(stringPagination)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(2)
      expect(result.data.limit).toBe(20)
    }
  })

  it('should reject zero or negative page', () => {
    const invalidPagination = {
      page: 0,
      limit: 10,
    }

    const result = paginationSchema.safeParse(invalidPagination)
    expect(result.success).toBe(false)
  })

  it('should reject limit over 100', () => {
    const invalidPagination = {
      page: 1,
      limit: 101,
    }

    const result = paginationSchema.safeParse(invalidPagination)
    expect(result.success).toBe(false)
  })

  it('should reject zero limit', () => {
    const invalidPagination = {
      page: 1,
      limit: 0,
    }

    const result = paginationSchema.safeParse(invalidPagination)
    expect(result.success).toBe(false)
  })
})