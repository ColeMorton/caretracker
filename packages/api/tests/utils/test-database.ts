import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { PrismaClient } from '@caretracker/database'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface TestDatabase {
  readonly container: StartedPostgreSqlContainer
  readonly prisma: PrismaClient
  readonly connectionString: string
}

export class TestDatabaseManager {
  private static instance: TestDatabaseManager
  private databases: Map<string, TestDatabase> = new Map()

  static getInstance(): TestDatabaseManager {
    if (!TestDatabaseManager.instance) {
      TestDatabaseManager.instance = new TestDatabaseManager()
    }
    return TestDatabaseManager.instance
  }

  async createDatabase(name: string = 'test'): Promise<TestDatabase> {
    if (this.databases.has(name)) {
      return this.databases.get(name)!
    }

    console.log(`Starting PostgreSQL container for ${name}...`)

    const container = await new PostgreSqlContainer('postgres:15-alpine')
      .withDatabase('caretracker_test')
      .withUsername('test')
      .withPassword('test')
      .withExposedPorts(5432)
      .start()

    const connectionString = container.getConnectionUri()

    // Create Prisma client
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString
        }
      },
      log: ['error'] // Reduce log noise in tests
    })

    // Run migrations
    await this.runMigrations(connectionString)

    const testDb: TestDatabase = {
      container,
      prisma,
      connectionString
    }

    this.databases.set(name, testDb)

    console.log(`PostgreSQL container ready for ${name} at ${connectionString}`)

    return testDb
  }

  async destroyDatabase(name: string): Promise<void> {
    const db = this.databases.get(name)
    if (db) {
      await db.prisma.$disconnect()
      await db.container.stop()
      this.databases.delete(name)
      console.log(`Destroyed test database: ${name}`)
    }
  }

  async destroyAllDatabases(): Promise<void> {
    const promises = Array.from(this.databases.keys()).map(name => this.destroyDatabase(name))
    await Promise.all(promises)
  }

  async cleanDatabase(prisma: PrismaClient): Promise<void> {
    const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname='public'
    `

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter(name => name !== '_prisma_migrations')
      .map(name => `"public"."${name}"`)
      .join(', ')

    if (tables.length > 0) {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`)
      } catch (error) {
        console.log('Note: Some tables might not exist yet, which is normal for a fresh database')
      }
    }
  }

  private async runMigrations(connectionString: string): Promise<void> {
    const databaseDir = join(process.cwd(), '../database')

    try {
      // Set the database URL for migrations
      const env = { ...process.env, DATABASE_URL: connectionString }

      // Generate Prisma client first
      execSync('npx prisma generate', {
        cwd: databaseDir,
        env,
        stdio: 'inherit'
      })

      // Run migrations
      execSync('npx prisma migrate deploy', {
        cwd: databaseDir,
        env,
        stdio: 'inherit'
      })

      console.log('Database migrations completed successfully')
    } catch (error) {
      console.error('Migration failed:', error)
      throw new Error(`Failed to run migrations: ${error}`)
    }
  }
}

// Singleton instance
export const testDatabaseManager = TestDatabaseManager.getInstance()

// Utility functions
export async function setupTestDatabase(name?: string): Promise<TestDatabase> {
  return testDatabaseManager.createDatabase(name)
}

export async function cleanTestDatabase(prisma: PrismaClient): Promise<void> {
  return testDatabaseManager.cleanDatabase(prisma)
}

export async function teardownTestDatabase(name: string): Promise<void> {
  return testDatabaseManager.destroyDatabase(name)
}

export async function teardownAllTestDatabases(): Promise<void> {
  return testDatabaseManager.destroyAllDatabases()
}

// Database seeding utilities
export class DatabaseSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seedUsers(count: number = 10): Promise<void> {
    // Implementation would use our UserFactory
    console.log(`Seeding ${count} users...`)
    // This will be implemented when we create the actual seed functions
  }

  async seedVisits(count: number = 20): Promise<void> {
    // Implementation would use our VisitFactory
    console.log(`Seeding ${count} visits...`)
    // This will be implemented when we create the actual seed functions
  }

  async seedAll(): Promise<void> {
    await this.seedUsers()
    await this.seedVisits()
  }

  async clear(): Promise<void> {
    await testDatabaseManager.cleanDatabase(this.prisma)
  }
}

// Helper for tests that need a fresh database
export async function withTestDatabase<T>(
  testFn: (db: TestDatabase) => Promise<T>,
  name?: string
): Promise<T> {
  const db = await setupTestDatabase(name)
  try {
    await cleanTestDatabase(db.prisma)
    return await testFn(db)
  } finally {
    await cleanTestDatabase(db.prisma)
  }
}

// Helper for tests that need isolated database per test
export async function withIsolatedDatabase<T>(
  testFn: (db: TestDatabase) => Promise<T>
): Promise<T> {
  const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const db = await setupTestDatabase(testId)
  try {
    return await testFn(db)
  } finally {
    await teardownTestDatabase(testId)
  }
}