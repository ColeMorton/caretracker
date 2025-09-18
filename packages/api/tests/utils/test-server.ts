import { FastifyInstance } from 'fastify'
import { build } from '../../src/server.js'
import { TestDatabase } from './test-database.js'
import { AuthService } from '../../src/services/auth.service.js'

export interface TestServerOptions {
  readonly database?: TestDatabase
  readonly logLevel?: 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent'
}

export class TestServer {
  private server: FastifyInstance | null = null

  async start(options: TestServerOptions = {}): Promise<FastifyInstance> {
    if (this.server) {
      await this.stop()
    }

    const testEnv = {
      NODE_ENV: 'test',
      JWT_SECRET: 'test-secret-key-for-testing-only',
      LOG_LEVEL: options.logLevel || 'silent',
      DATABASE_URL: options.database?.connectionString || 'postgresql://test:test@localhost:5432/test'
    }

    // Override environment variables for testing
    Object.assign(process.env, testEnv)

    this.server = await build()
    await this.server.ready()

    return this.server
  }

  async stop(): Promise<void> {
    if (this.server) {
      await this.server.close()
      this.server = null
    }
  }

  getInstance(): FastifyInstance {
    if (!this.server) {
      throw new Error('Test server not started. Call start() first.')
    }
    return this.server
  }

  // Helper methods for authentication testing
  async generateAuthToken(userId: string, role: string = 'CLIENT'): Promise<string> {
    if (!this.server) {
      throw new Error('Test server not started')
    }

    const authService = this.server.authService as AuthService
    const permissions = authService.getRolePermissions(role)

    const payload = {
      userId,
      role,
      permissions: Array.from(permissions),
      sessionId: `test_session_${Date.now()}`
    }

    return authService.generateAccessToken(payload)
  }

  async generateRefreshToken(userId: string): Promise<string> {
    if (!this.server) {
      throw new Error('Test server not started')
    }

    const authService = this.server.authService as AuthService
    return authService.generateRefreshToken(userId)
  }

  // Helper for making authenticated requests
  getAuthHeaders(token: string): Record<string, string> {
    return {
      'Authorization': `Bearer ${token}`
    }
  }
}

// Singleton test server
let testServerInstance: TestServer | null = null

export function getTestServer(): TestServer {
  if (!testServerInstance) {
    testServerInstance = new TestServer()
  }
  return testServerInstance
}

export async function setupTestServer(options: TestServerOptions = {}): Promise<FastifyInstance> {
  const testServer = getTestServer()
  return testServer.start(options)
}

export async function teardownTestServer(): Promise<void> {
  if (testServerInstance) {
    await testServerInstance.stop()
    testServerInstance = null
  }
}

// Helper for tests that need a fresh server instance
export async function withTestServer<T>(
  testFn: (server: FastifyInstance, testServer: TestServer) => Promise<T>,
  options: TestServerOptions = {}
): Promise<T> {
  const testServer = new TestServer()
  const server = await testServer.start(options)

  try {
    return await testFn(server, testServer)
  } finally {
    await testServer.stop()
  }
}

// Helper for tests that need both server and database
export async function withTestServerAndDatabase<T>(
  testFn: (server: FastifyInstance, testServer: TestServer, database: TestDatabase) => Promise<T>,
  databaseName?: string
): Promise<T> {
  const { setupTestDatabase, teardownTestDatabase } = await import('./test-database.js')

  const database = await setupTestDatabase(databaseName)
  const testServer = new TestServer()

  try {
    const server = await testServer.start({ database, logLevel: 'silent' })
    return await testFn(server, testServer, database)
  } finally {
    await testServer.stop()
    if (databaseName) {
      await teardownTestDatabase(databaseName)
    }
  }
}

// Authentication test helpers
export const AuthTestHelpers = {
  async createClientUser(server: FastifyInstance): Promise<{ id: string; token: string; user: any }> {
    const { UserFactory } = await import('../fixtures/factories/user.factory.js')
    const userData = UserFactory.buildClient({ emailVerified: true })

    // Create user in database
    const user = await server.prisma.user.create({
      data: userData
    })

    const testServer = getTestServer()
    const token = await testServer.generateAuthToken(user.id, 'CLIENT')

    return { id: user.id, token, user }
  },

  async createWorkerUser(server: FastifyInstance): Promise<{ id: string; token: string; user: any }> {
    const { UserFactory } = await import('../fixtures/factories/user.factory.js')
    const userData = UserFactory.buildWorker({ emailVerified: true })

    const user = await server.prisma.user.create({
      data: userData
    })

    const testServer = getTestServer()
    const token = await testServer.generateAuthToken(user.id, 'WORKER')

    return { id: user.id, token, user }
  },

  async createAdminUser(server: FastifyInstance): Promise<{ id: string; token: string; user: any }> {
    const { UserFactory } = await import('../fixtures/factories/user.factory.js')
    const userData = UserFactory.buildAdmin({ emailVerified: true })

    const user = await server.prisma.user.create({
      data: userData
    })

    const testServer = getTestServer()
    const token = await testServer.generateAuthToken(user.id, 'ADMIN')

    return { id: user.id, token, user }
  },

  async createSupervisorUser(server: FastifyInstance): Promise<{ id: string; token: string; user: any }> {
    const { UserFactory } = await import('../fixtures/factories/user.factory.js')
    const userData = UserFactory.buildSupervisor({ emailVerified: true })

    const user = await server.prisma.user.create({
      data: userData
    })

    const testServer = getTestServer()
    const token = await testServer.generateAuthToken(user.id, 'SUPERVISOR')

    return { id: user.id, token, user }
  }
}

// Request testing utilities
export const RequestHelpers = {
  async makeAuthenticatedRequest(
    server: FastifyInstance,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    token: string,
    payload?: any
  ) {
    const options: any = {
      method,
      url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    if (payload) {
      options.payload = payload
    }

    return server.inject(options)
  },

  async expectUnauthorized(
    server: FastifyInstance,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    payload?: any
  ) {
    const response = await server.inject({
      method,
      url,
      payload
    })

    expect(response.statusCode).toBe(401)
    return response
  },

  async expectForbidden(
    server: FastifyInstance,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    token: string,
    payload?: any
  ) {
    const response = await this.makeAuthenticatedRequest(server, method, url, token, payload)
    expect(response.statusCode).toBe(403)
    return response
  }
}