import { faker } from '@faker-js/faker'
import type { UserProfile } from '@caretracker/shared'

/**
 * Generate a random CUID-like string for testing
 */
export function generateCuid(): string {
  return `cm${faker.string.alphanumeric(10)}`
}

/**
 * Generate test user data
 */
export function generateUser(overrides?: Partial<UserProfile>): UserProfile {
  return {
    id: generateCuid(),
    email: faker.internet.email().toLowerCase(),
    role: faker.helpers.arrayElement(['CLIENT', 'WORKER', 'ADMIN']),
    profile: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
    },
    ...overrides,
  }
}

/**
 * Generate test visit data
 */
export function generateVisit(overrides?: any) {
  return {
    id: generateCuid(),
    clientId: generateCuid(),
    workerId: generateCuid(),
    scheduledAt: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
    activities: faker.helpers.arrayElements([
      'Personal hygiene assistance',
      'Meal preparation',
      'Medication reminders',
      'Light housekeeping',
      'Companionship',
    ]),
    ...overrides,
  }
}

/**
 * Generate test budget data
 */
export function generateBudget(overrides?: any) {
  const total = faker.number.float({ min: 1000, max: 5000, precision: 0.01 })
  const spent = faker.number.float({ min: 0, max: total, precision: 0.01 })
  
  return {
    id: generateCuid(),
    clientId: generateCuid(),
    total,
    spent,
    period: faker.date.recent(),
    allocations: {
      care: faker.number.float({ min: 500, max: 2000, precision: 0.01 }),
      supplies: faker.number.float({ min: 100, max: 500, precision: 0.01 }),
      transport: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
      other: faker.number.float({ min: 0, max: 300, precision: 0.01 }),
    },
    ...overrides,
  }
}

/**
 * Wait for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Create a mock API response
 */
export function createMockApiResponse<T>(data: T, success = true) {
  return {
    success,
    data: success ? data : undefined,
    error: success ? undefined : 'Mock error',
  }
}

/**
 * Create a mock paginated API response
 */
export function createMockPaginatedResponse<T>(
  data: T[],
  page = 1,
  limit = 10,
  total?: number
) {
  const actualTotal = total ?? data.length
  const totalPages = Math.ceil(actualTotal / limit)
  
  return {
    success: true,
    data,
    meta: {
      page,
      limit,
      total: actualTotal,
      totalPages,
    },
  }
}