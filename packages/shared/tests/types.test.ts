import { describe, it, expect } from 'vitest'
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  UserProfile,
} from '../src/types'

describe('ApiResponse Type', () => {
  it('should create a successful API response', () => {
    const response: ApiResponse<string> = {
      success: true,
      data: 'test data',
    }

    expect(response.success).toBe(true)
    expect(response.data).toBe('test data')
  })

  it('should create an error API response', () => {
    const response: ApiResponse = {
      success: false,
      error: 'Something went wrong',
    }

    expect(response.success).toBe(false)
    expect(response.error).toBe('Something went wrong')
  })

  it('should create response with message', () => {
    const response: ApiResponse = {
      success: true,
      message: 'Operation completed successfully',
    }

    expect(response.success).toBe(true)
    expect(response.message).toBe('Operation completed successfully')
  })
})

describe('PaginatedResponse Type', () => {
  it('should create a paginated response with data and meta', () => {
    const response: PaginatedResponse<{ id: string; name: string }> = {
      success: true,
      data: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
      meta: {
        page: 1,
        limit: 10,
        total: 25,
        totalPages: 3,
      },
    }

    expect(response.success).toBe(true)
    expect(response.data).toHaveLength(2)
    expect(response.meta.page).toBe(1)
    expect(response.meta.limit).toBe(10)
    expect(response.meta.total).toBe(25)
    expect(response.meta.totalPages).toBe(3)
  })

  it('should calculate total pages correctly', () => {
    const calculateTotalPages = (total: number, limit: number): number => {
      return Math.ceil(total / limit)
    }

    expect(calculateTotalPages(25, 10)).toBe(3)
    expect(calculateTotalPages(30, 10)).toBe(3)
    expect(calculateTotalPages(31, 10)).toBe(4)
    expect(calculateTotalPages(0, 10)).toBe(0)
  })
})

describe('PaginationParams Type', () => {
  it('should create valid pagination parameters', () => {
    const params: PaginationParams = {
      page: 2,
      limit: 20,
    }

    expect(params.page).toBe(2)
    expect(params.limit).toBe(20)
  })

  it('should work with common pagination values', () => {
    const commonParams: PaginationParams[] = [
      { page: 1, limit: 10 },
      { page: 1, limit: 25 },
      { page: 1, limit: 50 },
      { page: 1, limit: 100 },
    ]

    commonParams.forEach((params) => {
      expect(params.page).toBeGreaterThan(0)
      expect(params.limit).toBeGreaterThan(0)
    })
  })
})

describe('UserProfile Type', () => {
  it('should create a complete user profile', () => {
    const userProfile: UserProfile = {
      id: 'cm123456789',
      email: 'test@example.com',
      role: 'CLIENT',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
      },
    }

    expect(userProfile.id).toBe('cm123456789')
    expect(userProfile.email).toBe('test@example.com')
    expect(userProfile.role).toBe('CLIENT')
    expect(userProfile.profile?.firstName).toBe('John')
    expect(userProfile.profile?.lastName).toBe('Doe')
    expect(userProfile.profile?.phone).toBe('+1234567890')
  })

  it('should create user profile without nested profile', () => {
    const userProfile: UserProfile = {
      id: 'cm123456789',
      email: 'test@example.com',
      role: 'WORKER',
    }

    expect(userProfile.id).toBe('cm123456789')
    expect(userProfile.email).toBe('test@example.com')
    expect(userProfile.role).toBe('WORKER')
    expect(userProfile.profile).toBeUndefined()
  })

  it('should support all role types', () => {
    const roles: UserProfile['role'][] = ['CLIENT', 'WORKER', 'ADMIN']
    
    roles.forEach((role) => {
      const userProfile: UserProfile = {
        id: 'cm123456789',
        email: 'test@example.com',
        role,
      }
      
      expect(['CLIENT', 'WORKER', 'ADMIN']).toContain(userProfile.role)
    })
  })

  it('should create user profile with partial nested profile', () => {
    const userProfile: UserProfile = {
      id: 'cm123456789',
      email: 'test@example.com',
      role: 'ADMIN',
      profile: {
        firstName: 'Jane',
        lastName: 'Smith',
        // phone is optional
      },
    }

    expect(userProfile.profile?.firstName).toBe('Jane')
    expect(userProfile.profile?.lastName).toBe('Smith')
    expect(userProfile.profile?.phone).toBeUndefined()
  })
})