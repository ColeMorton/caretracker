import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest'

// Mock environment variables for testing
beforeAll(() => {
  process.env.NODE_ENV = 'test'
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/caretracker_test'
  process.env.JWT_SECRET = 'test-secret-key-for-healthcare-testing'
  process.env.LOG_LEVEL = 'silent'
  process.env.CI = 'false' // Ensure we don't use CI config during tests
})

// Clean up any global state
beforeEach(() => {
  // Reset any global state if needed
})

afterEach(() => {
  // Clean up after each test
})

afterAll(() => {
  // Global cleanup
})