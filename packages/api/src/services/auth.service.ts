import type { User, PrismaClient } from '@caretracker/database'
import bcrypt from 'bcryptjs'
import type { FastifyInstance } from 'fastify'

import { AuthenticationError } from '../utils/errors.js'

export interface JWTPayload {
  readonly userId: string
  readonly email: string
  readonly role: 'CLIENT' | 'WORKER' | 'ADMIN' | 'SUPERVISOR'
  readonly permissions: readonly string[]
  readonly sessionId: string
  readonly iat: number
  readonly exp: number
}

export interface TokenPair {
  readonly accessToken: string
  readonly refreshToken: string
  readonly expiresIn: number
}

export interface AuthResult {
  readonly user: {
    readonly id: string
    readonly email: string
    readonly role: string
    readonly profile?: {
      readonly firstName: string
      readonly lastName: string
      readonly phone?: string | null
    }
  }
  readonly tokens: TokenPair
}

export interface LoginCredentials {
  readonly email: string
  readonly password: string
}

const INVALID_REFRESH_TOKEN_MESSAGE = 'Invalid refresh token'

// Role-based permissions system
const _PERMISSIONS = {
  // Client permissions
  'visits:read:own': 'Read own visit data',
  'profile:update:own': 'Update own profile',
  'budget:read:own': 'View own budget information',
  'careplans:read:own': 'View own care plans',

  // Worker permissions
  'visits:read:assigned': 'Read assigned visit data',
  'visits:update:assigned': 'Update assigned visits',
  'visits:checkin': 'Check in/out of visits',
  'clients:read:assigned': 'View assigned client information',
  'careplans:read:assigned': 'View assigned care plans',

  // Admin permissions
  'users:create': 'Create user accounts',
  'users:read:all': 'Read all user data',
  'users:update:all': 'Update user accounts',
  'users:delete': 'Delete user accounts',
  'visits:read:all': 'Read all visit data',
  'visits:update:all': 'Update all visits',
  'budgets:read:all': 'Read all budget data',
  'budgets:update:all': 'Update all budgets',
  'reports:generate': 'Generate system reports',
  'audit:read': 'Access audit logs',

  // Supervisor permissions
  'workers:manage': 'Manage worker assignments',
  'visits:approve': 'Approve visit completions',
  'quality:audit': 'Perform quality audits',
  'careplans:approve': 'Approve care plans',
  'reports:team': 'Generate team reports',
} as const

const ROLE_PERMISSIONS = {
  CLIENT: [
    'visits:read:own',
    'profile:update:own',
    'budget:read:own',
    'careplans:read:own',
  ],
  WORKER: [
    'visits:read:assigned',
    'visits:update:assigned',
    'visits:checkin',
    'clients:read:assigned',
    'careplans:read:assigned',
    'profile:update:own',
  ],
  ADMIN: ['*'], // Full access
  SUPERVISOR: [
    'workers:manage',
    'visits:approve',
    'quality:audit',
    'careplans:approve',
    'visits:read:all',
    'reports:team',
    'reports:generate',
    'users:read:all',
    'budgets:read:all',
  ],
} as const

export class AuthService {
  private readonly SALT_ROUNDS = 12
  private readonly ACCESS_TOKEN_EXPIRY = '1h'
  private readonly REFRESH_TOKEN_EXPIRY = '7d'
  private readonly MAX_LOGIN_ATTEMPTS = 5
  private readonly LOCKOUT_DURATION = 30 * 60 * 1000 // 30 minutes

  constructor(
    private readonly fastify: FastifyInstance,
    private readonly prisma: PrismaClient
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    const { email, password } = credentials

    // Find user with profile
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      include: { profile: true },
    })

    if (!user) {
      throw new AuthenticationError('Invalid credentials')
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AuthenticationError('Account is deactivated')
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const lockRemaining = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / 60000
      )
      throw new AuthenticationError(
        `Account is locked. Try again in ${lockRemaining} minutes`
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      await this.handleFailedLogin(user.id)
      throw new AuthenticationError('Invalid credentials')
    }

    // Reset login attempts on successful login
    await this.resetLoginAttempts(user.id)

    // Generate session ID
    const sessionId = this.generateSessionId()

    // Generate token pair
    const tokens = await this.generateTokenPair(user, sessionId)

    // Update last login timestamp
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Log successful authentication
    this.fastify.log.info(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId,
      },
      'User logged in successfully'
    )

    return {
      user: this.sanitizeUser(user),
      tokens,
    }
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    try {
      // Verify refresh token
      const payload = this.fastify.jwt.verify(refreshToken) as JWTPayload

      // Check if user still exists and is active
      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId, deletedAt: null },
      })

      if (!user || !user.isActive) {
        throw new AuthenticationError(INVALID_REFRESH_TOKEN_MESSAGE)
      }

      // Check if refresh token is blacklisted (you'd implement this with Redis)
      // const isBlacklisted = await this.isTokenBlacklisted(refreshToken)
      // if (isBlacklisted) {
      //   throw new AuthenticationError('Token has been revoked')
      // }

      // Generate new token pair
      const newTokens = await this.generateTokenPair(user, payload.sessionId)

      // Blacklist old refresh token (implement with Redis)
      // await this.blacklistToken(refreshToken)

      this.fastify.log.info(
        {
          userId: user.id,
          sessionId: payload.sessionId,
        },
        'Tokens refreshed successfully'
      )

      return newTokens
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error
      }
      throw new AuthenticationError(INVALID_REFRESH_TOKEN_MESSAGE)
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      const payload = this.fastify.jwt.verify(refreshToken) as JWTPayload

      // Blacklist the refresh token (implement with Redis)
      // await this.blacklistToken(refreshToken)

      this.fastify.log.info(
        {
          userId: payload.userId,
          sessionId: payload.sessionId,
        },
        'User logged out successfully'
      )
    } catch (error) {
      // Even if token verification fails, we should succeed
      // to prevent information leakage
      this.fastify.log.warn('Logout attempt with invalid token')
    }
  }

  async validateAccessToken(token: string): Promise<JWTPayload> {
    try {
      const payload = this.fastify.jwt.verify(token) as JWTPayload

      // Verify user still exists and is active
      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId, deletedAt: null },
      })

      if (!user || !user.isActive) {
        throw new AuthenticationError('Token is no longer valid')
      }

      return payload
    } catch (error) {
      if (
        (error as Error & { readonly code?: string }).code ===
        'FAST_JWT_EXPIRED'
      ) {
        throw new AuthenticationError('Token has expired')
      }
      throw new AuthenticationError('Invalid token')
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS)
  }

  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  async generateAccessToken(user: User, sessionId: string): Promise<string> {
    const permissions = this.getRolePermissions(user.role)
    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email,
      role: user.role as JWTPayload['role'],
      permissions,
      sessionId,
    }
    return this.fastify.jwt.sign(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    })
  }

  async generateRefreshToken(user: User, sessionId: string): Promise<string> {
    const permissions = this.getRolePermissions(user.role)
    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email,
      role: user.role as JWTPayload['role'],
      permissions,
      sessionId,
    }
    return this.fastify.jwt.sign(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    })
  }

  async validateRefreshToken(refreshToken: string): Promise<JWTPayload> {
    try {
      const payload = this.fastify.jwt.verify(refreshToken) as JWTPayload

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId, deletedAt: null },
      })

      if (!user || !user.isActive) {
        throw new AuthenticationError(INVALID_REFRESH_TOKEN_MESSAGE)
      }

      return payload
    } catch (error) {
      throw new AuthenticationError(INVALID_REFRESH_TOKEN_MESSAGE)
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
    })

    if (!user) {
      throw new AuthenticationError('User not found')
    }

    // Verify current password
    const isValidPassword = await this.validatePassword(
      currentPassword,
      user.password
    )
    if (!isValidPassword) {
      throw new AuthenticationError('Current password is incorrect')
    }

    // Hash new password
    const hashedNewPassword = await this.hashPassword(newPassword)

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date(),
      },
    })

    this.fastify.log.info({ userId }, 'Password changed successfully')
  }

  getRolePermissions(role: string): readonly string[] {
    return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || []
  }

  async checkPermission(
    userId: string,
    requiredPermission: string
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
    })

    if (!user || !user.isActive) {
      return false
    }

    const userPermissions = this.getRolePermissions(user.role)

    // Admin has all permissions
    if (userPermissions.includes('*')) {
      return true
    }

    // Check if user has the required permission
    return userPermissions.includes(requiredPermission)
  }

  async hasPermission(
    userId: string,
    requiredPermission: string
  ): Promise<boolean> {
    return this.checkPermission(userId, requiredPermission)
  }

  private async generateTokenPair(
    user: User,
    sessionId: string
  ): Promise<TokenPair> {
    const permissions = this.getRolePermissions(user.role)

    const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email,
      role: user.role as JWTPayload['role'],
      permissions,
      sessionId,
    }

    const accessToken = this.fastify.jwt.sign(payload, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    })
    const refreshToken = this.fastify.jwt.sign(payload, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    })

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600, // 1 hour in seconds
    }
  }

  private async handleFailedLogin(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) return

    const newAttempts = user.loginAttempts + 1
    const shouldLock = newAttempts >= this.MAX_LOGIN_ATTEMPTS

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: newAttempts,
        lockedUntil: shouldLock
          ? new Date(Date.now() + this.LOCKOUT_DURATION)
          : null,
      },
    })

    if (shouldLock) {
      this.fastify.log.warn(
        {
          userId,
          loginAttempts: newAttempts,
        },
        'Account locked due to too many failed login attempts'
      )
    }
  }

  private async resetLoginAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
      },
    })
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }

  private sanitizeUser(
    user: User & {
      readonly profile?: {
        readonly firstName: string
        readonly lastName: string
        readonly phone?: string | null
      } | null
    }
  ): {
    readonly id: string
    readonly email: string
    readonly role: string
    readonly profile?: {
      readonly firstName: string
      readonly lastName: string
      readonly phone?: string | null
    }
  } {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile
        ? {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            phone: user.profile.phone,
          }
        : undefined,
    }
  }
}
