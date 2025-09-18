import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify, { FastifyInstance } from 'fastify'
import { app } from '../../src/app'

describe('Health Check API', () => {
  let server: FastifyInstance

  beforeAll(async () => {
    server = Fastify({
      logger: false, // Disable logging during tests
    })
    
    await server.register(app)
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  it('should return healthy status', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toBe(200)
    
    const body = JSON.parse(response.body)
    expect(body).toEqual({ status: 'ok' })
  })

  it('should return API welcome message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
    
    const body = JSON.parse(response.body)
    expect(body).toEqual({
      message: 'Welcome to CareTracker API',
      version: '0.1.0',
      documentation: '/docs'
    })
  })

  it('should have OpenAPI documentation endpoint', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/docs',
    })

    // Should redirect or return documentation page
    expect([200, 302]).toContain(response.statusCode)
  })
})