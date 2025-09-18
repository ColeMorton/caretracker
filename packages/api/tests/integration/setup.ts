import { beforeAll, afterAll } from 'vitest'
import { testDatabaseManager } from '../utils/test-database.js'

beforeAll(async () => {
  // Set environment variables for integration tests
  process.env.NODE_ENV = 'test'
  process.env.JWT_SECRET = 'test-secret-key-for-healthcare-integration-testing'
  process.env.LOG_LEVEL = 'silent'
  process.env.CI = 'false'

  // Setup shared test database for integration tests
  const db = await testDatabaseManager.createDatabase('integration')
  process.env.DATABASE_URL = db.connectionString

  console.log('Integration test database ready')
}, 60000) // 60 second timeout for database setup

afterAll(async () => {
  // Cleanup test databases
  await testDatabaseManager.destroyAllDatabases()
  console.log('Integration test cleanup completed')
}, 30000)