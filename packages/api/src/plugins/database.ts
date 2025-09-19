import { PrismaClient } from '@prisma/client'
import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyInstance {
    readonly prisma: PrismaClient
    checkDatabaseHealth(): Promise<{
      readonly status: 'healthy' | 'unhealthy'
      readonly timestamp: Date
      readonly error?: string
    }>
  }
}

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  const prisma = new PrismaClient({
    log: process.env['NODE_ENV'] === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
    datasources: {
      db: {
        url: process.env['DATABASE_URL'] || 'postgresql://localhost:5432/caretracker'
      }
    }
  })

  // Test the connection
  try {
    await prisma.$connect()
    fastify.log.info('✅ Database connected successfully')
  } catch (error) {
    fastify.log.error(error, '❌ Database connection failed')
    throw error
  }

  // Decorate Fastify instance with Prisma client
  fastify.decorate('prisma', prisma)

  // Handle graceful shutdown
  fastify.addHook('onClose', async () => {
    fastify.log.info('Disconnecting from database...')
    await prisma.$disconnect()
  })

  // Add health check helper
  fastify.decorate('checkDatabaseHealth', async () => {
    try {
      await prisma.$queryRaw`SELECT 1`
      return { status: 'healthy' as const, timestamp: new Date() }
    } catch (error) {
      fastify.log.error(error, 'Database health check failed')
      return {
        status: 'unhealthy' as const,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      }
    }
  })
}

export default fp(databasePlugin, {
  name: 'database',
  dependencies: []
})