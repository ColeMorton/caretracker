import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest'

// Mock environment variables for testing
beforeAll(() => {
  process.env.NODE_ENV = 'test'
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/caretracker_test'
  process.env.JWT_SECRET = 'test-secret-key'
  process.env.LOG_LEVEL = 'silent'
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