import { type FastifyPluginAsync } from 'fastify'
import AutoLoad from '@fastify/autoload'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import sensible from '@fastify/sensible'
import env from '@fastify/env'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

const envSchema = {
  type: 'object',
  required: ['DATABASE_URL'],
  properties: {
    DATABASE_URL: { type: 'string' },
    JWT_SECRET: { type: 'string', default: 'your-secret-key' },
    PORT: { type: 'number', default: 3001 },
    HOST: { type: 'string', default: '0.0.0.0' },
    NODE_ENV: { type: 'string', default: 'development' },
  },
}

export const app: FastifyPluginAsync = async (fastify, opts) => {
  // Environment variables
  await fastify.register(env, {
    schema: envSchema,
    dotenv: true,
  })

  // Security plugins
  await fastify.register(helmet, {
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
  })

  await fastify.register(cors, {
    origin: process.env.NODE_ENV === 'production' 
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

  // Health check
  fastify.get('/health', async () => ({ status: 'ok' }))
}