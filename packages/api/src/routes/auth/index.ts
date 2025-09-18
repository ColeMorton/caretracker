import type { ApiResponse, UserProfile } from '@caretracker/shared'
import { type FastifyPluginAsync } from 'fastify'

const auth: FastifyPluginAsync = async (fastify, _opts) => {
  fastify.post<{
    readonly Body: { readonly email: string; readonly password: string }
    readonly Reply: ApiResponse<{
      readonly token: string
      readonly user: UserProfile
    }>
  }>(
    '/login',
    {
      schema: {
        tags: ['auth'],
        description: 'User login',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      email: { type: 'string' },
                      role: { type: 'string' },
                    },
                    additionalProperties: false,
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      // TODO: Implement actual authentication
      if (email === 'demo@caretracker.com' && password === 'demo123') {
        return {
          success: true,
          data: {
            token: 'demo-jwt-token',
            user: {
              id: 'demo-user-id',
              email,
              role: 'CLIENT',
            },
          },
        }
      }

      return reply.status(401).send({
        success: false,
        error: 'Invalid credentials',
      })
    }
  )

  fastify.get<{
    readonly Reply: ApiResponse<{ readonly message: string }>
  }>(
    '/me',
    {
      schema: {
        tags: ['auth'],
        description: 'Get current user',
      },
    },
    async (_request, _reply) => {
      // TODO: Implement JWT verification
      return {
        success: true,
        data: {
          message: 'Authentication endpoint working',
        },
      }
    }
  )
}

export default auth
