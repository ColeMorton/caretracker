import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify, { FastifyInstance } from 'fastify'
import { app } from '../../src/app'

describe('Authentication API', () => {
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

  describe('POST /auth/login', () => {
    it('should login with valid demo credentials', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'demo@caretracker.com',
          password: 'demo123',
        },
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('token')
      expect(body.data).toHaveProperty('user')
      expect(body.data.user).toEqual({
        id: 'demo-user-id',
        email: 'demo@caretracker.com',
        role: 'CLIENT',
      })
    })

    it('should reject invalid credentials', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'demo@caretracker.com',
          password: 'wrongpassword',
        },
      })

      expect(response.statusCode).toBe(401)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(false)
      expect(body.error).toBe('Invalid credentials')
    })

    it('should reject request with missing email', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          password: 'demo123',
        },
      })

      expect(response.statusCode).toBe(400)
    })

    it('should reject request with missing password', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'demo@caretracker.com',
        },
      })

      expect(response.statusCode).toBe(400)
    })

    it('should reject request with invalid email format', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'invalid-email',
          password: 'demo123',
        },
      })

      expect(response.statusCode).toBe(400)
    })

    it('should reject request with short password', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'demo@caretracker.com',
          password: '123',
        },
      })

      expect(response.statusCode).toBe(400)
    })
  })

  describe('GET /auth/me', () => {
    it('should return authentication status', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/auth/me',
      })

      expect(response.statusCode).toBe(200)
      
      const body = JSON.parse(response.body)
      expect(body.success).toBe(true)
      expect(body.data).toHaveProperty('message')
      expect(body.data.message).toBe('Authentication endpoint working')
    })
  })
})