import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    checkDatabaseHealth(): Promise<{
      status: 'healthy' | 'unhealthy'
      timestamp: Date
      error?: string
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
        url: process.env['DATABASE_URL']
      }
    }
  })

  // Test the connection
  try {
    await prisma.$connect()
    fastify.log.info('✅ Database connected successfully')
  } catch (error) {
    fastify.log.error('❌ Database connection failed:', error)
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
      return { status: 'healthy', timestamp: new Date() }
    } catch (error) {
      fastify.log.error('Database health check failed:', error)
      return {
        status: 'unhealthy',
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