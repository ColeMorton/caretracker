import { beforeAll, afterAll } from 'vitest'

beforeAll(async () => {
  // Set environment variables for integration tests
  process.env.NODE_ENV = 'test'
  process.env.JWT_SECRET = 'test-secret-key'
  process.env.LOG_LEVEL = 'silent'
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
})

afterAll(async () => {
  // Cleanup
})