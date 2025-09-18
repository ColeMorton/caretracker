import { type FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.get('/', async (_request, _reply) => {
    return { 
      message: 'Welcome to CareTracker API',
      version: '0.1.0',
      documentation: '/docs'
    }
  })
}

export default root