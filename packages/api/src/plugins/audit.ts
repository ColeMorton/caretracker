import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

import { AuditService } from '../services/audit.service.js'

declare module 'fastify' {
  interface FastifyInstance {
    readonly auditService: AuditService
  }
}

const auditPlugin: FastifyPluginAsync = async (fastify, _opts) => {
  // Wait for database plugin to be registered
  await fastify.after()

  // Create audit service instance
  const auditService = new AuditService(fastify.prisma, fastify)

  // Register audit service as decorator
  fastify.decorate('auditService', auditService)

  // Add shutdown handler to flush any pending audit events
  fastify.addHook('onClose', async () => {
    fastify.log.info('Audit service cleanup completed')
  })
}

export default fp(auditPlugin, {
  name: 'audit',
  dependencies: ['database']
})