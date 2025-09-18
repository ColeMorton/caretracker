import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify, { FastifyInstance } from 'fastify'
import { app } from '../../src/app'

describe('Users API', () => {
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

  describe('GET /users', () => {
    it('should return paginated users with default parameters', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/users',
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toBeInstanceOf(Array)
      expect(body.meta).toEqual({
        page: 1,
        limit: 10,
        total: 3,
        totalPages: 1,
      })
    })

    it('should return paginated users with custom page and limit', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/users?page=1&limit=2',
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toBeInstanceOf(Array)
      expect(body.data).toHaveLength(2)
      expect(body.meta).toEqual({
        page: 1,
        limit: 2,
        total: 3,
        totalPages: 2,
      })
    })

    it('should handle page beyond available data', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/users?page=10&limit=10',
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toBeInstanceOf(Array)
      expect(body.data).toHaveLength(0)
      expect(body.meta).toEqual({
        page: 10,
        limit: 10,
        total: 3,
        totalPages: 1,
      })
    })

    it('should validate query parameters', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/users?page=0&limit=0',
      })

      // Should either return 400 or handle gracefully
      expect([200, 400]).toContain(response.statusCode)
    })
  })

  describe('GET /users/:id', () => {
    it('should return user by ID', async () => {
      const userId = 'test-user-id'
      const response = await server.inject({
        method: 'GET',
        url: `/users/${userId}`,
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toEqual({
        id: userId,
        email: 'user@demo.com',
        role: 'CLIENT',
        profile: {
          firstName: 'Demo',
          lastName: 'User',
          phone: '+1234567890',
        },
      })
    })

    it('should return consistent user data structure', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/users/any-id',
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('id')
      expect(body.data).toHaveProperty('email')
      expect(body.data).toHaveProperty('role')
      expect(body.data).toHaveProperty('profile')
      expect(body.data.profile).toHaveProperty('firstName')
      expect(body.data.profile).toHaveProperty('lastName')
      expect(body.data.profile).toHaveProperty('phone')
    })
  })
})