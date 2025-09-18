import { z } from 'zod'
import { emailSchema, passwordSchema, roleSchema, successResponseSchema } from './common.js'

// Login request schema
export const loginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters')
})

// Login response schema
export const loginResponseSchema = successResponseSchema.extend({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    user: z.object({
      id: z.string(),
      email: emailSchema,
      role: roleSchema,
      profile: z.object({
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string().optional()
      }).optional()
    })
  })
})

// Refresh token request schema
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
})

// Refresh token response schema
export const refreshTokenResponseSchema = successResponseSchema.extend({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number()
  })
})

// Register request schema
export const registerRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema.optional().default('CLIENT'),
  profile: z.object({
    firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format').optional(),
    dateOfBirth: z.string().datetime().optional()
  })
})

// Register response schema
export const registerResponseSchema = successResponseSchema.extend({
  data: z.object({
    id: z.string(),
    email: emailSchema,
    role: roleSchema,
    emailVerified: z.boolean()
  })
})

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: emailSchema
})

// Password reset confirm schema
export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: passwordSchema
})

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema
})

// Current user response schema
export const currentUserResponseSchema = successResponseSchema.extend({
  data: z.object({
    id: z.string(),
    email: emailSchema,
    role: roleSchema,
    isActive: z.boolean(),
    emailVerified: z.boolean(),
    lastLoginAt: z.string().datetime().nullable(),
    permissions: z.array(z.string()),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string().optional(),
      preferredName: z.string().optional()
    }).optional()
  })
})

// Logout response schema
export const logoutResponseSchema = successResponseSchema.extend({
  data: z.object({
    message: z.string()
  })
})

// Account verification schema
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required')
})

// Resend verification schema
export const resendVerificationSchema = z.object({
  email: emailSchema
})