import type { FastifyPluginAsync } from 'fastify'

import {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  registerRequestSchema,
  registerResponseSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  changePasswordSchema,
  currentUserResponseSchema,
  logoutResponseSchema,
  verifyEmailSchema
} from '../../schemas/auth.js'
import {
  AuthenticationError,
  ValidationError,
  ConflictError
} from '../../utils/errors.js'

const auth: FastifyPluginAsync = async (fastify, _opts) => {
  // POST /auth/login - User authentication
  fastify.post('/login', {
    schema: {
      tags: ['auth'],
      summary: 'User Login',
      description: 'Authenticate user with email and password',
      body: loginRequestSchema,
      response: {
        200: loginResponseSchema,
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' },
        429: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const credentials = loginRequestSchema.parse(request.body)

    const result = await fastify.authService.login(credentials)

    return reply.status(200).send({
      success: true,
      data: {
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
        user: result.user
      }
    })
  })

  // POST /auth/refresh - Refresh access token
  fastify.post('/refresh', {
    schema: {
      tags: ['auth'],
      summary: 'Refresh Token',
      description: 'Get new access token using refresh token',
      body: refreshTokenRequestSchema,
      response: {
        200: refreshTokenResponseSchema,
        401: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { refreshToken } = refreshTokenRequestSchema.parse(request.body)

    const tokens = await fastify.authService.refreshTokens(refreshToken)

    return reply.status(200).send({
      success: true,
      data: tokens
    })
  })

  // POST /auth/logout - User logout
  fastify.post('/logout', {
    schema: {
      tags: ['auth'],
      summary: 'User Logout',
      description: 'Logout user and invalidate refresh token',
      body: refreshTokenRequestSchema,
      response: {
        200: logoutResponseSchema
      }
    }
  }, async (request, reply) => {
    const { refreshToken } = refreshTokenRequestSchema.parse(request.body)

    await fastify.authService.logout(refreshToken)

    return reply.status(200).send({
      success: true,
      data: {
        message: 'Logged out successfully'
      }
    })
  })

  // POST /auth/register - User registration
  fastify.post('/register', {
    schema: {
      tags: ['auth'],
      summary: 'User Registration',
      description: 'Register new user account',
      body: registerRequestSchema,
      response: {
        201: registerResponseSchema,
        400: { $ref: 'ErrorResponse' },
        409: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const userData = registerRequestSchema.parse(request.body)

    // Check if user already exists
    const existingUser = await fastify.prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (existingUser) {
      throw new ConflictError('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await fastify.authService.hashPassword(userData.password)

    // Create user with profile in a transaction
    const newUser = await fastify.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          profile: {
            create: {
              firstName: userData.profile.firstName,
              lastName: userData.profile.lastName,
              ...(userData.profile.phone && { phone: userData.profile.phone }),
              ...(userData.profile.dateOfBirth && { dateOfBirth: new Date(userData.profile.dateOfBirth) })
            }
          }
        },
        include: {
          profile: true
        }
      })

      // Log user creation
      fastify.log.info({
        userId: user.id,
        email: user.email,
        role: user.role
      }, 'New user registered')

      return user
    })

    return reply.status(201).send({
      success: true,
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        emailVerified: newUser.emailVerified
      }
    })
  })

  // GET /auth/me - Get current user info (requires authentication)
  fastify.get('/me', {
    preHandler: [fastify.authenticate],
    schema: {
      tags: ['auth'],
      summary: 'Current User',
      description: 'Get current authenticated user information',
      security: [{ bearerAuth: [] }],
      response: {
        200: currentUserResponseSchema,
        401: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const user = await fastify.prisma.user.findUnique({
      where: { id: request.user!.id },
      include: {
        profile: true
      }
    })

    if (!user) {
      throw new AuthenticationError('User not found')
    }

    const permissions = fastify.authService.getRolePermissions(user.role)

    return reply.status(200).send({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLoginAt: user.lastLoginAt?.toISOString() || null,
        permissions: Array.from(permissions),
        profile: user.profile ? {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          phone: user.profile.phone || undefined,
          preferredName: user.profile.preferredName || undefined
        } : undefined
      }
    })
  })

  // POST /auth/change-password - Change password (requires authentication)
  fastify.post('/change-password', {
    preHandler: [fastify.authenticate],
    schema: {
      tags: ['auth'],
      summary: 'Change Password',
      description: 'Change user password',
      security: [{ bearerAuth: [] }],
      body: changePasswordSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        },
        400: { $ref: 'ErrorResponse' },
        401: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { currentPassword, newPassword } = changePasswordSchema.parse(request.body)

    await fastify.authService.changePassword(
      request.user!.id,
      currentPassword,
      newPassword
    )

    return reply.status(200).send({
      success: true,
      data: {
        message: 'Password changed successfully'
      }
    })
  })

  // POST /auth/forgot-password - Request password reset
  fastify.post('/forgot-password', {
    schema: {
      tags: ['auth'],
      summary: 'Forgot Password',
      description: 'Request password reset email',
      body: passwordResetRequestSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { email } = passwordResetRequestSchema.parse(request.body)

    // Check if user exists (but don't reveal if they don't for security)
    const user = await fastify.prisma.user.findUnique({
      where: { email, deletedAt: null }
    })

    if (user) {
      // Generate reset token (implement this)
      const resetToken = `reset_${Date.now()}_${Math.random().toString(36)}`
      const expiresAt = new Date(Date.now() + 3600000) // 1 hour

      await fastify.prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetExpiresAt: expiresAt
        }
      })

      // In a real implementation, send email here
      fastify.log.info({
        userId: user.id,
        email,
        resetToken
      }, 'Password reset requested')
    }

    // Always return success for security
    return reply.status(200).send({
      success: true,
      data: {
        message: 'If an account with that email exists, a password reset link has been sent'
      }
    })
  })

  // POST /auth/reset-password - Reset password with token
  fastify.post('/reset-password', {
    schema: {
      tags: ['auth'],
      summary: 'Reset Password',
      description: 'Reset password using reset token',
      body: passwordResetConfirmSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        },
        400: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { token, newPassword } = passwordResetConfirmSchema.parse(request.body)

    const user = await fastify.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpiresAt: {
          gt: new Date()
        },
        deletedAt: null
      }
    })

    if (!user) {
      throw new ValidationError('Invalid or expired reset token')
    }

    // Hash new password
    const hashedPassword = await fastify.authService.hashPassword(newPassword)

    // Update password and clear reset token
    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiresAt: null,
        loginAttempts: 0,
        lockedUntil: null
      }
    })

    fastify.log.info({
      userId: user.id,
      email: user.email
    }, 'Password reset completed')

    return reply.status(200).send({
      success: true,
      data: {
        message: 'Password reset successfully'
      }
    })
  })

  // POST /auth/verify-email - Verify email address
  fastify.post('/verify-email', {
    schema: {
      tags: ['auth'],
      summary: 'Verify Email',
      description: 'Verify email address with verification token',
      body: verifyEmailSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                message: { type: 'string' }
              }
            }
          }
        },
        400: { $ref: 'ErrorResponse' }
      }
    }
  }, async (request, reply) => {
    const { token } = verifyEmailSchema.parse(request.body)

    // In a real implementation, verify the email verification token
    // For now, we'll just mark the user as verified
    const user = await fastify.prisma.user.findFirst({
      where: {
        // This is a placeholder - you'd need a proper email verification token system
        id: token, // This is just for demo purposes
        emailVerified: false,
        deletedAt: null
      }
    })

    if (!user) {
      throw new ValidationError('Invalid verification token')
    }

    await fastify.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date()
      }
    })

    return reply.status(200).send({
      success: true,
      data: {
        message: 'Email verified successfully'
      }
    })
  })
}

export default auth