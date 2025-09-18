import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import AutoLoad from '@fastify/autoload'
import cors from '@fastify/cors'
import env from '@fastify/env'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import sensible from '@fastify/sensible'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { type FastifyPluginAsync } from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Create environment-specific schemas
const ciEnvSchema = {
  type: 'object',
  required: [],
  properties: {
    DATABASE_URL: { 
      type: 'string',
      default: 'postgresql://test:test@localhost:5432/caretracker_test'
    },
    JWT_SECRET: { 
      type: 'string', 
      default: 'ci-test-secret-key-for-testing-only'
    },
    PORT: { type: 'number', default: 4000 },
    HOST: { type: 'string', default: '0.0.0.0' },
    NODE_ENV: { type: 'string', default: 'test' },
    LOG_LEVEL: { type: 'string', default: 'info' },
  },
} as const

const devEnvSchema = {
  type: 'object',
  required: ['DATABASE_URL', 'JWT_SECRET'],
  properties: {
    DATABASE_URL: { type: 'string' },
    JWT_SECRET: { type: 'string' },
    PORT: { type: 'number', default: 4000 },
    HOST: { type: 'string', default: '0.0.0.0' },
    NODE_ENV: { type: 'string', default: 'development' },
    LOG_LEVEL: { type: 'string', default: 'info' },
  },
} as const

export const app: FastifyPluginAsync = async (fastify, opts) => {
  // Environment variables with CI-friendly configuration
  const envConfig = process.env['CI'] === 'true'
    ? {
        schema: ciEnvSchema,
        dotenv: false,
        data: process.env,
      }
    : {
        schema: devEnvSchema,
        dotenv: true,
      }

  await fastify.register(env, envConfig)

  // Security plugins
  await fastify.register(helmet, {
    contentSecurityPolicy: process.env['NODE_ENV'] === 'production',
  })

  await fastify.register(cors, {
    origin: process.env['NODE_ENV'] === 'production'
      ? ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
      : true,
    credentials: true,
  })

  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  // Error handling
  await fastify.register(sensible)

  // API Documentation
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'CareTracker API',
        description: 'Healthcare Management System API',
        version: '0.1.0',
      },
      tags: [
        { name: 'auth', description: 'Authentication endpoints' },
        { name: 'users', description: 'User management' },
        { name: 'visits', description: 'Visit tracking' },
        { name: 'budgets', description: 'Budget management' },
      ],
    },
  })

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    staticCSP: true,
    transformStaticCSP: (header) => header,
  })

  // Load plugins
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  })

  // Load routes
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  })

  // Health check with database status
  fastify.get('/health', async () => {
    const dbHealth = await fastify.checkDatabaseHealth()

    return {
      status: dbHealth.status === 'healthy' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      checks: {
        database: dbHealth
      }
    }
  })
}