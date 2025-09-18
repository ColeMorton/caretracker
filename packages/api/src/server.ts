import Fastify from 'fastify'
import { app } from './app'

const server = Fastify({
  logger: process.env['NODE_ENV'] === 'development'
    ? {
        level: process.env['LOG_LEVEL'] || 'info',
        transport: { target: 'pino-pretty' },
      }
    : {
        level: process.env['LOG_LEVEL'] || 'info',
      },
})

server.register(app)

const start = async () => {
  try {
    const port = Number(process.env['PORT']) || 3001
    const host = process.env['HOST'] || '0.0.0.0'
    
    await server.listen({ port, host })
    console.log(`🚀 Server listening at http://${host}:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()