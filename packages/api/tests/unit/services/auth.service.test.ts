import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@caretracker/database'
import { AuthService } from '../../../src/services/auth.service.js'
import { AuthenticationError, AuthorizationError, BusinessRuleError } from '../../../src/utils/errors.js'
import bcrypt from 'bcryptjs'

// Mock bcrypt
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  }
}))

// Mock Fastify instance
const mockFastify = {
  jwt: {
    sign: vi.fn(),
    verify: vi.fn(),
  },
  log: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
} as unknown as FastifyInstance

// Mock Prisma client
const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    update: vi.fn(),
    findFirst: vi.fn(),
  },
  refreshToken: {
    create: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    deleteMany: vi.fn(),
  }
} as unknown as PrismaClient

describe('AuthService', () => {
  let authService: AuthService
  const userId = 'user-123'
  const email = 'test@example.com'
  const password = 'password123'
  const hashedPassword = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxnBwBoS'

  beforeEach(() => {
    vi.clearAllMocks()
    authService = new AuthService(mockFastify, mockPrisma)
  })

  describe('hashPassword', () => {
    it('should hash password with 12 salt rounds', async () => {
      const mockHash = '$2a$12$hashedpassword'
      vi.mocked(bcrypt.hash).mockResolvedValue(mockHash)

      const result = await authService.hashPassword(password)

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 12)
      expect(result).toBe(mockHash)
    })
  })

  describe('verifyPassword', () => {
    it('should verify password correctly', async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(true)

      const result = await authService.verifyPassword(password, hashedPassword)

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword)
      expect(result).toBe(true)
    })

    it('should return false for incorrect password', async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(false)

      const result = await authService.verifyPassword('wrongpassword', hashedPassword)

      expect(result).toBe(false)
    })
  })

  describe('generateAccessToken', () => {
    it('should generate access token with correct payload', async () => {
      const payload = {
        userId,
        role: 'CLIENT',
        permissions: ['visits:read:own'],
        sessionId: 'session-123'
      }
      const mockToken = 'jwt.access.token'

      mockFastify.jwt.sign = vi.fn().mockResolvedValue(mockToken)

      const result = await authService.generateAccessToken(payload)

      expect(mockFastify.jwt.sign).toHaveBeenCalledWith(
        payload,
        { expiresIn: '1h' }
      )
      expect(result).toBe(mockToken)
    })
  })

  describe('generateRefreshToken', () => {
    it('should generate and store refresh token', async () => {
      const mockToken = 'refresh.token.jwt'
      const mockDbToken = {
        id: 'token-id',
        token: mockToken,
        userId,
        expiresAt: expect.any(Date)
      }

      mockFastify.jwt.sign = vi.fn().mockResolvedValue(mockToken)
      mockPrisma.refreshToken.create = vi.fn().mockResolvedValue(mockDbToken)

      const result = await authService.generateRefreshToken(userId)

      expect(mockFastify.jwt.sign).toHaveBeenCalledWith(
        { userId, type: 'refresh' },
        { expiresIn: '7d' }
      )
      expect(mockPrisma.refreshToken.create).toHaveBeenCalledWith({
        data: {
          token: mockToken,
          userId,
          expiresAt: expect.any(Date)
        }
      })
      expect(result).toBe(mockToken)
    })
  })

  describe('validateAccessToken', () => {
    it('should validate access token and return payload', async () => {
      const mockPayload = {
        userId,
        role: 'CLIENT',
        permissions: ['visits:read:own'],
        sessionId: 'session-123'
      }

      mockFastify.jwt.verify = vi.fn().mockResolvedValue(mockPayload)

      const result = await authService.validateAccessToken('valid.jwt.token')

      expect(mockFastify.jwt.verify).toHaveBeenCalledWith('valid.jwt.token')
      expect(result).toEqual(mockPayload)
    })

    it('should throw AuthenticationError for invalid token', async () => {
      mockFastify.jwt.verify = vi.fn().mockRejectedValue(new Error('Invalid token'))

      await expect(authService.validateAccessToken('invalid.token'))
        .rejects.toThrow(AuthenticationError)
    })
  })

  describe('validateRefreshToken', () => {
    it('should validate refresh token and return payload', async () => {
      const token = 'valid.refresh.token'
      const mockJwtPayload = { userId, type: 'refresh' }
      const mockDbToken = {
        id: 'token-id',
        token,
        userId,
        expiresAt: new Date(Date.now() + 86400000), // 1 day from now
        isRevoked: false
      }

      mockFastify.jwt.verify = vi.fn().mockResolvedValue(mockJwtPayload)
      mockPrisma.refreshToken.findUnique = vi.fn().mockResolvedValue(mockDbToken)

      const result = await authService.validateRefreshToken(token)

      expect(mockPrisma.refreshToken.findUnique).toHaveBeenCalledWith({
        where: { token }
      })
      expect(result).toEqual(mockJwtPayload)
    })

    it('should throw AuthenticationError for revoked token', async () => {
      const token = 'revoked.token'
      const mockJwtPayload = { userId, type: 'refresh' }
      const mockDbToken = {
        token,
        isRevoked: true
      }

      mockFastify.jwt.verify = vi.fn().mockResolvedValue(mockJwtPayload)
      mockPrisma.refreshToken.findUnique = vi.fn().mockResolvedValue(mockDbToken)

      await expect(authService.validateRefreshToken(token))
        .rejects.toThrow(AuthenticationError)
    })

    it('should throw AuthenticationError for expired token', async () => {
      const token = 'expired.token'
      const mockJwtPayload = { userId, type: 'refresh' }
      const mockDbToken = {
        token,
        expiresAt: new Date(Date.now() - 86400000), // 1 day ago
        isRevoked: false
      }

      mockFastify.jwt.verify = vi.fn().mockResolvedValue(mockJwtPayload)
      mockPrisma.refreshToken.findUnique = vi.fn().mockResolvedValue(mockDbToken)

      await expect(authService.validateRefreshToken(token))
        .rejects.toThrow(AuthenticationError)
    })
  })

  describe('login', () => {
    const credentials = { email, password }

    it('should login user with correct credentials', async () => {
      const user = {
        id: userId,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: true,
        emailVerified: true,
        loginAttempts: 0,
        lockedUntil: null
      }

      const mockTokens = {
        accessToken: 'access.token',
        refreshToken: 'refresh.token'
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      vi.mocked(bcrypt.compare).mockResolvedValue(true)
      mockFastify.jwt.sign = vi.fn()
        .mockResolvedValueOnce(mockTokens.accessToken)
        .mockResolvedValueOnce(mockTokens.refreshToken)
      mockPrisma.refreshToken.create = vi.fn().mockResolvedValue({})
      mockPrisma.user.update = vi.fn().mockResolvedValue(user)

      const result = await authService.login(credentials)

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { email }
      })
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword)
      expect(result).toEqual({
        user: {
          id: userId,
          email,
          role: 'CLIENT',
          permissions: expect.any(Array)
        },
        tokens: mockTokens
      })
    })

    it('should throw AuthenticationError for non-existent user', async () => {
      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(null)

      await expect(authService.login(credentials))
        .rejects.toThrow(AuthenticationError)
    })

    it('should throw AuthenticationError for incorrect password', async () => {
      const user = {
        id: userId,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: true,
        emailVerified: true,
        loginAttempts: 0,
        lockedUntil: null
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      vi.mocked(bcrypt.compare).mockResolvedValue(false)
      mockPrisma.user.update = vi.fn().mockResolvedValue(user)

      await expect(authService.login(credentials))
        .rejects.toThrow(AuthenticationError)

      // Should increment login attempts
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { loginAttempts: 1 }
      })
    })

    it('should lock account after 5 failed attempts', async () => {
      const user = {
        id: userId,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: true,
        emailVerified: true,
        loginAttempts: 4, // One more attempt will lock the account
        lockedUntil: null
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      vi.mocked(bcrypt.compare).mockResolvedValue(false)
      mockPrisma.user.update = vi.fn().mockResolvedValue(user)

      await expect(authService.login(credentials))
        .rejects.toThrow(AuthenticationError)

      // Should lock the account for 15 minutes
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          loginAttempts: 5,
          lockedUntil: expect.any(Date)
        }
      })
    })

    it('should throw AuthenticationError for locked account', async () => {
      const user = {
        id: userId,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: true,
        emailVerified: true,
        loginAttempts: 5,
        lockedUntil: new Date(Date.now() + 900000) // 15 minutes from now
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)

      await expect(authService.login(credentials))
        .rejects.toThrow(AuthenticationError)
    })

    it('should throw AuthenticationError for inactive user', async () => {
      const user = {
        id: userId,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: false,
        emailVerified: true,
        loginAttempts: 0,
        lockedUntil: null
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)

      await expect(authService.login(credentials))
        .rejects.toThrow(AuthenticationError)
    })

    it('should reset login attempts on successful login', async () => {
      const user = {
        id: userId,
        email,
        password: hashedPassword,
        role: 'CLIENT',
        isActive: true,
        emailVerified: true,
        loginAttempts: 2,
        lockedUntil: null
      }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      vi.mocked(bcrypt.compare).mockResolvedValue(true)
      mockFastify.jwt.sign = vi.fn()
        .mockResolvedValueOnce('access.token')
        .mockResolvedValueOnce('refresh.token')
      mockPrisma.refreshToken.create = vi.fn().mockResolvedValue({})
      mockPrisma.user.update = vi.fn().mockResolvedValue(user)

      await authService.login(credentials)

      // Should reset login attempts
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          loginAttempts: 0,
          lockedUntil: null,
          lastLoginAt: expect.any(Date)
        }
      })
    })
  })

  describe('refreshTokens', () => {
    it('should generate new tokens with valid refresh token', async () => {
      const refreshToken = 'valid.refresh.token'
      const mockJwtPayload = { userId, type: 'refresh' }
      const mockDbToken = {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 86400000),
        isRevoked: false
      }
      const user = {
        id: userId,
        role: 'CLIENT',
        isActive: true
      }
      const newTokens = {
        accessToken: 'new.access.token',
        refreshToken: 'new.refresh.token'
      }

      mockFastify.jwt.verify = vi.fn().mockResolvedValue(mockJwtPayload)
      mockPrisma.refreshToken.findUnique = vi.fn().mockResolvedValue(mockDbToken)
      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      mockFastify.jwt.sign = vi.fn()
        .mockResolvedValueOnce(newTokens.accessToken)
        .mockResolvedValueOnce(newTokens.refreshToken)
      mockPrisma.refreshToken.update = vi.fn().mockResolvedValue({})
      mockPrisma.refreshToken.create = vi.fn().mockResolvedValue({})

      const result = await authService.refreshTokens(refreshToken)

      expect(result).toEqual(newTokens)
      // Should revoke old refresh token
      expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
        where: { token: refreshToken },
        data: { isRevoked: true }
      })
    })

    it('should throw AuthenticationError for invalid refresh token', async () => {
      mockFastify.jwt.verify = vi.fn().mockRejectedValue(new Error('Invalid token'))

      await expect(authService.refreshTokens('invalid.token'))
        .rejects.toThrow(AuthenticationError)
    })
  })

  describe('logout', () => {
    it('should revoke refresh token on logout', async () => {
      const refreshToken = 'valid.refresh.token'

      mockPrisma.refreshToken.update = vi.fn().mockResolvedValue({})

      await authService.logout(refreshToken)

      expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith({
        where: { token: refreshToken },
        data: { isRevoked: true }
      })
    })

    it('should not throw error if token not found', async () => {
      const refreshToken = 'non.existent.token'

      mockPrisma.refreshToken.update = vi.fn().mockRejectedValue(new Error('Token not found'))

      await expect(authService.logout(refreshToken)).resolves.not.toThrow()
    })
  })

  describe('changePassword', () => {
    it('should change password with valid current password', async () => {
      const currentPassword = 'oldpassword'
      const newPassword = 'newpassword'
      const user = {
        id: userId,
        password: hashedPassword
      }
      const newHashedPassword = '$2a$12$newhashedpassword'

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      vi.mocked(bcrypt.compare).mockResolvedValue(true)
      vi.mocked(bcrypt.hash).mockResolvedValue(newHashedPassword)
      mockPrisma.user.update = vi.fn().mockResolvedValue(user)

      await authService.changePassword(userId, currentPassword, newPassword)

      expect(bcrypt.compare).toHaveBeenCalledWith(currentPassword, hashedPassword)
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 12)
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { password: newHashedPassword }
      })
    })

    it('should throw AuthenticationError for incorrect current password', async () => {
      const user = { id: userId, password: hashedPassword }

      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(user)
      vi.mocked(bcrypt.compare).mockResolvedValue(false)

      await expect(authService.changePassword(userId, 'wrongpassword', 'newpassword'))
        .rejects.toThrow(AuthenticationError)
    })

    it('should throw AuthenticationError for non-existent user', async () => {
      mockPrisma.user.findUnique = vi.fn().mockResolvedValue(null)

      await expect(authService.changePassword(userId, 'password', 'newpassword'))
        .rejects.toThrow(AuthenticationError)
    })
  })

  describe('getRolePermissions', () => {
    it('should return correct permissions for CLIENT role', () => {
      const permissions = authService.getRolePermissions('CLIENT')

      expect(permissions).toContain('visits:read:own')
      expect(permissions).toContain('profile:update:own')
      expect(permissions).toContain('budget:read:own')
      expect(permissions).not.toContain('users:create')
    })

    it('should return correct permissions for WORKER role', () => {
      const permissions = authService.getRolePermissions('WORKER')

      expect(permissions).toContain('visits:read:assigned')
      expect(permissions).toContain('visits:update:assigned')
      expect(permissions).toContain('visits:checkin')
      expect(permissions).not.toContain('users:create')
    })

    it('should return all permissions for ADMIN role', () => {
      const permissions = authService.getRolePermissions('ADMIN')

      expect(permissions).toContain('*')
    })

    it('should return supervisor permissions for SUPERVISOR role', () => {
      const permissions = authService.getRolePermissions('SUPERVISOR')

      expect(permissions).toContain('workers:manage')
      expect(permissions).toContain('visits:approve')
      expect(permissions).toContain('quality:audit')
    })

    it('should return empty set for unknown role', () => {
      const permissions = authService.getRolePermissions('UNKNOWN_ROLE' as any)

      expect(permissions.size).toBe(0)
    })
  })

  describe('hasPermission', () => {
    it('should return true for admin with any permission', () => {
      const result = authService.hasPermission(['*'], 'users:create')

      expect(result).toBe(true)
    })

    it('should return true for exact permission match', () => {
      const result = authService.hasPermission(['visits:read:own'], 'visits:read:own')

      expect(result).toBe(true)
    })

    it('should return true for wildcard permission match', () => {
      const result = authService.hasPermission(['visits:*'], 'visits:read:own')

      expect(result).toBe(true)
    })

    it('should return false for permission mismatch', () => {
      const result = authService.hasPermission(['visits:read:own'], 'users:create')

      expect(result).toBe(false)
    })

    it('should handle ownership-based permissions', () => {
      const result = authService.hasPermission(['visits:read:own'], 'visits:read', 'user-123', 'user-123')

      expect(result).toBe(true)
    })

    it('should return false for ownership mismatch', () => {
      const result = authService.hasPermission(['visits:read:own'], 'visits:read', 'user-123', 'other-user')

      expect(result).toBe(false)
    })
  })
})