export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UserProfile {
  id: string
  email: string
  role: 'CLIENT' | 'WORKER' | 'ADMIN'
  profile?: {
    firstName: string
    lastName: string
    phone?: string
  }
}