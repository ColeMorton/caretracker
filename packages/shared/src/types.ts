export interface ApiResponse<T = unknown> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
  readonly message?: string
}

export interface PaginationParams {
  readonly page: number
  readonly limit: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  readonly meta: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly totalPages: number
  }
}

export interface UserProfile {
  readonly id: string
  readonly email: string
  readonly role: 'CLIENT' | 'WORKER' | 'ADMIN'
  readonly profile?: {
    readonly firstName: string
    readonly lastName: string
    readonly phone?: string
  }
}

// API-specific types for demo endpoints (simplified versions)
export interface ApiUser {
  readonly id: string
  readonly email: string
  readonly role: string
  readonly createdAt?: string
}

export interface ApiVisit {
  readonly id: string
  readonly clientId: string
  readonly workerId: string
  readonly scheduledAt: string
  readonly status: string
  readonly activities?: readonly string[]
  readonly completedAt?: string
  readonly duration?: number
  readonly notes?: string
  readonly createdAt?: string
}