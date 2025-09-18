import pkg from 'fastify'
const { FastifyPluginAsync } = pkg

const root: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    return { 
      message: 'Welcome to CareTracker API',
      version: '0.1.0',
      documentation: '/docs'
    }
  })
}

export default root