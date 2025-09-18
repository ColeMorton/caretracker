import { describe, it, expect } from 'vitest'
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
  verifyEmailSchema,
  resendVerificationSchema
} from '../../../src/schemas/auth.js'

describe('Auth Schemas', () => {
  describe('loginRequestSchema', () => {
    it('should validate correct login request', () => {
      const validRequest = {
        email: 'test@example.com',
        password: 'validpassword'
      }

      const result = loginRequestSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email format', () => {
      const invalidRequest = {
        email: 'invalid-email',
        password: 'validpassword'
      }

      const result = loginRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['email'])
        expect(result.error.issues[0].code).toBe('invalid_string')
      }
    })

    it('should reject short password', () => {
      const invalidRequest = {
        email: 'test@example.com',
        password: '12345' // Less than 6 characters
      }

      const result = loginRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['password'])
        expect(result.error.issues[0].message).toBe('Password must be at least 6 characters')
      }
    })

    it('should accept minimum valid password length', () => {
      const validRequest = {
        email: 'test@example.com',
        password: '123456' // Exactly 6 characters
      }

      const result = loginRequestSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject missing required fields', () => {
      const invalidRequests = [
        { email: 'test@example.com' }, // Missing password
        { password: 'validpassword' }, // Missing email
        {} // Missing both
      ]

      invalidRequests.forEach(request => {
        const result = loginRequestSchema.safeParse(request)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('registerRequestSchema', () => {
    it('should validate correct registration request', () => {
      const validRequest = {
        email: 'newuser@example.com',
        password: 'SecurePassword123!',
        profile: {
          firstName: 'John',
          lastName: 'Doe'
        }
      }

      const result = registerRequestSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should use default role when not provided', () => {
      const request = {
        email: 'newuser@example.com',
        password: 'SecurePassword123!',
        profile: {
          firstName: 'John',
          lastName: 'Doe'
        }
      }

      const result = registerRequestSchema.parse(request)
      expect(result.role).toBe('CLIENT')
    })

    it('should accept valid roles', () => {
      const validRoles = ['CLIENT', 'WORKER', 'ADMIN', 'SUPERVISOR']

      validRoles.forEach(role => {
        const request = {
          email: 'newuser@example.com',
          password: 'SecurePassword123!',
          role,
          profile: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }

        const result = registerRequestSchema.safeParse(request)
        expect(result.success).toBe(true)
      })
    })

    it('should validate profile fields', () => {
      const request = {
        email: 'newuser@example.com',
        password: 'SecurePassword123!',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '+15551234567',
          dateOfBirth: '1990-01-01T00:00:00Z'
        }
      }

      const result = registerRequestSchema.safeParse(request)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.profile.firstName).toBe('John')
        expect(result.data.profile.lastName).toBe('Doe')
        expect(result.data.profile.phone).toBe('+15551234567')
        expect(result.data.profile.dateOfBirth).toBe('1990-01-01T00:00:00Z')
      }
    })

    it('should reject invalid profile data', () => {
      const invalidProfiles = [
        { firstName: '', lastName: 'Doe' }, // Empty first name
        { firstName: 'John', lastName: '' }, // Empty last name
        { firstName: 'a'.repeat(51), lastName: 'Doe' }, // Too long first name
        { firstName: 'John', lastName: 'a'.repeat(51) }, // Too long last name
        { firstName: 'John', lastName: 'Doe', phone: 'invalid-phone' } // Invalid phone
      ]

      invalidProfiles.forEach(profile => {
        const request = {
          email: 'newuser@example.com',
          password: 'SecurePassword123!',
          profile
        }

        const result = registerRequestSchema.safeParse(request)
        expect(result.success).toBe(false)
      })
    })

    it('should validate phone number format when provided', () => {
      const validPhones = ['+15551234567', '15551234567', '+442071234567']

      validPhones.forEach(phone => {
        const request = {
          email: 'newuser@example.com',
          password: 'SecurePassword123!',
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            phone
          }
        }

        const result = registerRequestSchema.safeParse(request)
        expect(result.success).toBe(true)
      })
    })

    it('should validate date of birth format', () => {
      const request = {
        email: 'newuser@example.com',
        password: 'SecurePassword123!',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01T00:00:00Z'
        }
      }

      const result = registerRequestSchema.safeParse(request)
      expect(result.success).toBe(true)
    })

    it('should reject invalid date of birth format', () => {
      const request = {
        email: 'newuser@example.com',
        password: 'SecurePassword123!',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01' // Invalid format, should be ISO datetime
        }
      }

      const result = registerRequestSchema.safeParse(request)
      expect(result.success).toBe(false)
    })

    it('should require strong password', () => {
      const weakPasswords = ['weak', '12345678', 'nouppercaseornumbers', 'NOLOWERCASEORNUMBERS']

      weakPasswords.forEach(password => {
        const request = {
          email: 'newuser@example.com',
          password,
          profile: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }

        const result = registerRequestSchema.safeParse(request)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('refreshTokenRequestSchema', () => {
    it('should accept valid refresh token', () => {
      const validRequest = {
        refreshToken: 'valid.refresh.token'
      }

      const result = refreshTokenRequestSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject empty refresh token', () => {
      const invalidRequest = {
        refreshToken: ''
      }

      const result = refreshTokenRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Refresh token is required')
      }
    })
  })

  describe('passwordResetRequestSchema', () => {
    it('should accept valid email', () => {
      const validRequest = {
        email: 'user@example.com'
      }

      const result = passwordResetRequestSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidRequest = {
        email: 'invalid-email'
      }

      const result = passwordResetRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })
  })

  describe('passwordResetConfirmSchema', () => {
    it('should accept valid reset confirmation', () => {
      const validRequest = {
        token: 'valid-reset-token',
        newPassword: 'NewSecureP@ss123'
      }

      const result = passwordResetConfirmSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject empty token', () => {
      const invalidRequest = {
        token: '',
        newPassword: 'NewSecureP@ss123'
      }

      const result = passwordResetConfirmSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Reset token is required')
      }
    })

    it('should require strong new password', () => {
      const invalidRequest = {
        token: 'valid-reset-token',
        newPassword: 'weak'
      }

      const result = passwordResetConfirmSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })
  })

  describe('changePasswordSchema', () => {
    it('should accept valid password change', () => {
      const validRequest = {
        currentPassword: 'currentPassword123',
        newPassword: 'NewSecureP@ss123'
      }

      const result = changePasswordSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject empty current password', () => {
      const invalidRequest = {
        currentPassword: '',
        newPassword: 'NewSecureP@ss123'
      }

      const result = changePasswordSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Current password is required')
      }
    })

    it('should require strong new password', () => {
      const invalidRequest = {
        currentPassword: 'currentPassword123',
        newPassword: 'weak'
      }

      const result = changePasswordSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })
  })

  describe('verifyEmailSchema', () => {
    it('should accept valid verification token', () => {
      const validRequest = {
        token: 'valid-verification-token'
      }

      const result = verifyEmailSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject empty token', () => {
      const invalidRequest = {
        token: ''
      }

      const result = verifyEmailSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Verification token is required')
      }
    })
  })

  describe('resendVerificationSchema', () => {
    it('should accept valid email', () => {
      const validRequest = {
        email: 'user@example.com'
      }

      const result = resendVerificationSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidRequest = {
        email: 'invalid-email'
      }

      const result = resendVerificationSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })
  })

  describe('Response Schemas', () => {
    describe('loginResponseSchema', () => {
      it('should validate login response', () => {
        const validResponse = {
          success: true,
          data: {
            accessToken: 'valid.access.token',
            refreshToken: 'valid.refresh.token',
            user: {
              id: 'user-id',
              email: 'user@example.com',
              role: 'CLIENT',
              profile: {
                firstName: 'John',
                lastName: 'Doe',
                phone: '+15551234567'
              }
            }
          }
        }

        const result = loginResponseSchema.safeParse(validResponse)
        expect(result.success).toBe(true)
      })
    })

    describe('refreshTokenResponseSchema', () => {
      it('should validate refresh token response', () => {
        const validResponse = {
          success: true,
          data: {
            accessToken: 'new.access.token',
            refreshToken: 'new.refresh.token',
            expiresIn: 3600
          }
        }

        const result = refreshTokenResponseSchema.safeParse(validResponse)
        expect(result.success).toBe(true)
      })
    })

    describe('registerResponseSchema', () => {
      it('should validate registration response', () => {
        const validResponse = {
          success: true,
          data: {
            id: 'new-user-id',
            email: 'newuser@example.com',
            role: 'CLIENT',
            emailVerified: false
          }
        }

        const result = registerResponseSchema.safeParse(validResponse)
        expect(result.success).toBe(true)
      })
    })

    describe('currentUserResponseSchema', () => {
      it('should validate current user response', () => {
        const validResponse = {
          success: true,
          data: {
            id: 'user-id',
            email: 'user@example.com',
            role: 'CLIENT',
            isActive: true,
            emailVerified: true,
            lastLoginAt: '2024-01-01T12:00:00Z',
            permissions: ['read:profile', 'update:profile'],
            profile: {
              firstName: 'John',
              lastName: 'Doe',
              phone: '+15551234567',
              preferredName: 'Johnny'
            }
          }
        }

        const result = currentUserResponseSchema.safeParse(validResponse)
        expect(result.success).toBe(true)
      })
    })

    describe('logoutResponseSchema', () => {
      it('should validate logout response', () => {
        const validResponse = {
          success: true,
          data: {
            message: 'Logged out successfully'
          }
        }

        const result = logoutResponseSchema.safeParse(validResponse)
        expect(result.success).toBe(true)
      })
    })
  })
})