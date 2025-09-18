# Performance & Security Standards (2025)

## Overview

This document defines performance optimization and security standards for CareTracker, emphasizing healthcare data protection, HIPAA compliance, and optimal user experience.

## Performance Standards

### 1. Core Web Vitals (2025 Targets)

#### Largest Contentful Paint (LCP)
- **Target**: < 1.2 seconds
- **Healthcare Critical**: Patient data must load quickly for time-sensitive decisions
- **Measurement**: 95th percentile across all healthcare applications

#### First Input Delay (FID) / Interaction to Next Paint (INP)
- **Target**: < 100ms (FID) / < 200ms (INP)
- **Healthcare Critical**: Form submissions and data entry must be responsive
- **Priority**: Medical forms, visit scheduling, emergency workflows

#### Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Healthcare Critical**: Prevents accidental clicks on medical data
- **Focus**: Patient forms, medication lists, schedule interfaces

### 2. Application Performance Targets

#### Page Load Performance
```typescript
// Performance budget for healthcare pages
const performanceBudgets = {
  // Patient dashboard - critical for daily workflow
  '/dashboard': { lcp: 1000, fcp: 800, ttfb: 200 },

  // Patient details - frequently accessed
  '/patients/[id]': { lcp: 1200, fcp: 900, ttfb: 300 },

  // Visit scheduling - business critical
  '/schedule': { lcp: 1000, fcp: 700, ttfb: 200 },

  // Reports - can be slower, complex data
  '/reports': { lcp: 2000, fcp: 1200, ttfb: 500 }
} as const
```

#### Bundle Size Limits
```typescript
// Next.js bundle analysis targets
const bundleLimits = {
  // First Load JS (critical path)
  firstLoad: '130kB',  // Target for healthcare pages

  // Route-specific bundles
  routeBundle: '50kB', // Maximum per route

  // Shared bundles
  framework: '45kB',   // React + Next.js core
  commons: '30kB',     // Shared utilities

  // Third-party libraries
  ui: '25kB',          // shadcn/ui components
  forms: '15kB',       // React Hook Form + validation
  charts: '40kB'       // Chart.js for reports (code-split)
} as const
```

### 3. Database Performance

#### Query Performance Standards
```typescript
// Database query performance targets
const queryPerformanceTargets = {
  // Simple lookups (patient by ID, user auth)
  simple: 50,      // < 50ms

  // Complex queries (visit lists with filters)
  complex: 200,    // < 200ms

  // Reporting queries (analytics, summaries)
  analytics: 1000, // < 1000ms

  // Background jobs (data exports, cleanup)
  background: 5000 // < 5000ms
} as const

// Query monitoring implementation
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    }
  ]
})

prisma.$on('query', (e) => {
  if (e.duration > queryPerformanceTargets.simple) {
    console.warn(`Slow query detected: ${e.query} (${e.duration}ms)`)

    // Log to healthcare monitoring system
    logSlowQuery({
      query: e.query,
      duration: e.duration,
      params: e.params,
      timestamp: new Date().toISOString()
    })
  }
})
```

#### Connection Pool Configuration
```typescript
// Optimized connection pool for healthcare workloads
const databaseConfig = {
  // Connection pool sizing
  connectionLimit: 20,      // Sufficient for healthcare facility
  maxIdleTime: 300000,      // 5 minutes idle timeout
  maxLifetime: 1800000,     // 30 minutes connection lifetime

  // Query timeouts
  queryTimeout: 30000,      // 30 seconds max query time
  acquireTimeout: 10000,    // 10 seconds to acquire connection

  // Healthcare-specific settings
  timezone: 'UTC',          // Always UTC for medical records
  charset: 'utf8mb4',       // Full UTF-8 support for international names
  ssl: true,                // Required for HIPAA compliance

  // Monitoring
  logSlowQueries: true,
  slowQueryThreshold: 200   // Log queries > 200ms
}
```

### 4. Caching Strategy

#### Application-Level Caching
```typescript
// Redis caching for healthcare data
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  // Healthcare compliance settings
  db: 0,                    // Dedicated database for CareTracker
  keyPrefix: 'ct:',         // Namespace all keys
  retryDelayOnFailover: 100,
  lazyConnect: true
})

// Cache duration strategy
const cacheStrategy = {
  // User sessions - short-lived for security
  userSession: 900,         // 15 minutes

  // Patient data - moderate duration
  patientProfile: 3600,     // 1 hour

  // Visit schedules - frequently changing
  visitSchedule: 300,       // 5 minutes

  // Reference data - long-lived
  careActivities: 86400,    // 24 hours
  medicationList: 86400,    // 24 hours

  // Reports - can be cached longer
  monthlyReports: 7200      // 2 hours
} as const

// Automatic cache invalidation on data changes
export async function invalidatePatientCache(patientId: string): Promise<void> {
  const patterns = [
    `ct:patient:${patientId}:*`,
    `ct:visits:client:${patientId}:*`,
    `ct:careplan:${patientId}:*`
  ]

  for (const pattern of patterns) {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  }
}
```

#### CDN and Static Asset Optimization
```typescript
// Next.js optimization configuration
const nextConfig = {
  // Image optimization for healthcare
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: false, // Security for healthcare
  },

  // Compression
  compress: true,
  poweredByHeader: false, // Security - don't reveal Next.js

  // Healthcare-specific headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // HIPAA compliance headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}
```

## Security Standards

### 1. Authentication & Authorization

#### JWT Implementation
```typescript
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Healthcare-compliant JWT configuration
const jwtConfig = {
  accessTokenExpiry: '15m',    // Short-lived for security
  refreshTokenExpiry: '7d',    // Reasonable for healthcare workers
  algorithm: 'RS256' as const, // Asymmetric encryption
  issuer: 'caretracker.com',
  audience: 'caretracker-api'
}

// Enhanced JWT payload for healthcare
interface HealthcareJWTPayload {
  readonly sub: string              // User ID
  readonly email: string            // Email for audit trail
  readonly role: Role               // User role
  readonly permissions: readonly string[] // Granular permissions
  readonly organizationId: string   // Healthcare organization
  readonly departmentId?: string    // Department/unit access
  readonly dataAccessLevel: 'FULL' | 'LIMITED' | 'READ_ONLY'
  readonly sessionId: string        // For session management
  readonly lastPasswordChange: number // Force re-auth if password changed
  readonly mfaVerified: boolean     // Multi-factor authentication status
}

// Secure token generation
export function generateAccessToken(payload: HealthcareJWTPayload): string {
  return jwt.sign(
    payload,
    process.env.JWT_PRIVATE_KEY!,
    {
      algorithm: jwtConfig.algorithm,
      expiresIn: jwtConfig.accessTokenExpiry,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
      notBefore: '0s', // Valid immediately
      jwtid: crypto.randomUUID() // Unique token ID for tracking
    }
  )
}
```

#### Role-Based Access Control (RBAC)
```typescript
// Healthcare permission system
enum HealthcarePermission {
  // Patient data permissions
  PATIENT_READ = 'patient:read',
  PATIENT_WRITE = 'patient:write',
  PATIENT_DELETE = 'patient:delete',

  // Visit permissions
  VISIT_READ = 'visit:read',
  VISIT_CREATE = 'visit:create',
  VISIT_UPDATE = 'visit:update',
  VISIT_CANCEL = 'visit:cancel',

  // Administrative permissions
  USER_MANAGE = 'user:manage',
  REPORTS_ACCESS = 'reports:access',
  AUDIT_LOG_ACCESS = 'audit:access',

  // Clinical permissions
  CARE_PLAN_CREATE = 'careplan:create',
  CARE_PLAN_APPROVE = 'careplan:approve',
  MEDICATION_MANAGE = 'medication:manage'
}

// Role permission mapping
const rolePermissions: Record<Role, readonly HealthcarePermission[]> = {
  CLIENT: [
    HealthcarePermission.PATIENT_READ, // Own data only
    HealthcarePermission.VISIT_READ    // Own visits only
  ],

  WORKER: [
    HealthcarePermission.PATIENT_READ,
    HealthcarePermission.VISIT_READ,
    HealthcarePermission.VISIT_CREATE,
    HealthcarePermission.VISIT_UPDATE,
    HealthcarePermission.CARE_PLAN_CREATE
  ],

  SUPERVISOR: [
    ...rolePermissions.WORKER,
    HealthcarePermission.CARE_PLAN_APPROVE,
    HealthcarePermission.USER_MANAGE,
    HealthcarePermission.REPORTS_ACCESS
  ],

  ADMIN: Object.values(HealthcarePermission) // All permissions
}

// Permission middleware
export function requirePermission(permission: HealthcarePermission) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as HealthcareJWTPayload

    if (!user) {
      throw new UnauthorizedError('Authentication required')
    }

    const userPermissions = rolePermissions[user.role]
    if (!userPermissions.includes(permission)) {
      // Log unauthorized access attempt for HIPAA audit
      await logSecurityEvent({
        userId: user.sub,
        action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
        resource: permission,
        ipAddress: request.ip,
        userAgent: request.headers['user-agent'],
        timestamp: new Date().toISOString()
      })

      throw new ForbiddenError(`Insufficient permissions: ${permission}`)
    }
  }
}
```

### 2. Data Protection

#### Input Validation & Sanitization
```typescript
import { z } from 'zod'
import DOMPurify from 'dompurify'

// Healthcare-specific validation schemas
const healthcareSchemas = {
  // Patient identification
  patientId: z.string().cuid('Invalid patient ID format'),
  medicalRecordNumber: z.string()
    .regex(/^[A-Z0-9]{6,12}$/, 'Invalid MRN format')
    .transform(val => val.toUpperCase()),

  // Personal information (PII/PHI protection)
  firstName: z.string()
    .min(1, 'First name required')
    .max(50, 'First name too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in first name')
    .transform(val => DOMPurify.sanitize(val.trim())),

  lastName: z.string()
    .min(1, 'Last name required')
    .max(50, 'Last name too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in last name')
    .transform(val => DOMPurify.sanitize(val.trim())),

  // Healthcare dates
  dateOfBirth: z.string()
    .datetime('Invalid date format')
    .refine(date => {
      const birthDate = new Date(date)
      const now = new Date()
      const age = now.getFullYear() - birthDate.getFullYear()
      return age >= 0 && age <= 150
    }, 'Invalid birth date'),

  // Visit notes (PHI protection)
  visitNotes: z.string()
    .max(2000, 'Notes too long')
    .transform(val => DOMPurify.sanitize(val))
    .optional(),

  // Phone numbers
  phone: z.string()
    .regex(/^\+?[1-9]\d{10,14}$/, 'Invalid phone number')
    .transform(val => val.replace(/\D/g, '')) // Strip non-digits
    .optional(),

  // Email addresses
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .refine(email => !email.includes('+'), 'Email aliases not allowed for healthcare')
}

// SQL injection prevention
export function sanitizeForDatabase(input: string): string {
  // Remove potential SQL injection patterns
  return input
    .replace(/[';\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '')     // Remove SQL comments
    .replace(/\/\*/g, '')   // Remove block comment start
    .replace(/\*\//g, '')   // Remove block comment end
    .trim()
}
```

#### Encryption Standards
```typescript
import crypto from 'crypto'

// AES-256-GCM encryption for PHI data
class HealthcareEncryption {
  private readonly algorithm = 'aes-256-gcm'
  private readonly keyLength = 32 // 256 bits
  private readonly ivLength = 16  // 128 bits
  private readonly tagLength = 16 // 128 bits

  private getKey(): Buffer {
    const key = process.env.HEALTHCARE_ENCRYPTION_KEY
    if (!key || key.length !== 64) { // 32 bytes = 64 hex chars
      throw new Error('Invalid encryption key configuration')
    }
    return Buffer.from(key, 'hex')
  }

  // Encrypt sensitive healthcare data
  encryptPHI(plaintext: string): string {
    try {
      const key = this.getKey()
      const iv = crypto.randomBytes(this.ivLength)
      const cipher = crypto.createCipher(this.algorithm, key, iv)

      let encrypted = cipher.update(plaintext, 'utf8', 'hex')
      encrypted += cipher.final('hex')

      const tag = cipher.getAuthTag()

      // Combine IV + tag + encrypted data
      return iv.toString('hex') + tag.toString('hex') + encrypted
    } catch (error) {
      console.error('PHI encryption failed:', error)
      throw new Error('Failed to encrypt healthcare data')
    }
  }

  // Decrypt sensitive healthcare data
  decryptPHI(ciphertext: string): string {
    try {
      const key = this.getKey()

      // Extract IV, tag, and encrypted data
      const iv = Buffer.from(ciphertext.slice(0, this.ivLength * 2), 'hex')
      const tag = Buffer.from(ciphertext.slice(this.ivLength * 2, (this.ivLength + this.tagLength) * 2), 'hex')
      const encrypted = ciphertext.slice((this.ivLength + this.tagLength) * 2)

      const decipher = crypto.createDecipher(this.algorithm, key, iv)
      decipher.setAuthTag(tag)

      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')

      return decrypted
    } catch (error) {
      console.error('PHI decryption failed:', error)
      throw new Error('Failed to decrypt healthcare data')
    }
  }
}

export const healthcareEncryption = new HealthcareEncryption()
```

### 3. API Security

#### Rate Limiting for Healthcare APIs
```typescript
import rateLimit from '@fastify/rate-limit'

// Healthcare-specific rate limiting
const healthcareRateLimits = {
  // Authentication endpoints - strict limits
  auth: {
    max: 5,           // 5 attempts
    timeWindow: '15m', // per 15 minutes
    skipSuccessfulRequests: true
  },

  // Patient data access - moderate limits
  patientData: {
    max: 100,         // 100 requests
    timeWindow: '1m',  // per minute
    skipSuccessfulRequests: false
  },

  // Visit scheduling - higher limits for workflow
  scheduling: {
    max: 200,         // 200 requests
    timeWindow: '1m',  // per minute
    skipSuccessfulRequests: false
  },

  // Emergency endpoints - no limits but logged
  emergency: {
    max: 1000,        // Very high limit
    timeWindow: '1m',
    skipSuccessfulRequests: false
  }
}

// IP-based blocking for security threats
const securityRateLimit = {
  max: 10,            // 10 failed attempts
  timeWindow: '1h',   // in 1 hour
  skipSuccessfulRequests: true,
  onLimitReached: async (request: FastifyRequest) => {
    // Log security incident
    await logSecurityEvent({
      type: 'RATE_LIMIT_EXCEEDED',
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
      endpoint: request.url,
      timestamp: new Date().toISOString()
    })

    // Consider temporary IP blocking for repeated offenders
    await considerIPBlocking(request.ip)
  }
}
```

#### Content Security Policy (CSP)
```typescript
// Healthcare-compliant CSP configuration
const healthcareCSP = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Only for initial hydration - remove in production
    'https://www.googletagmanager.com' // Analytics if needed
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for CSS-in-JS components
    'https://fonts.googleapis.com'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com'
  ],
  'img-src': [
    "'self'",
    'data:', // For base64 images
    'https:' // External images with HTTPS only
  ],
  'connect-src': [
    "'self'",
    process.env.NEXT_PUBLIC_API_URL,
    'https://api.caretracker.com'
  ],
  'frame-ancestors': ["'none'"], // Prevent embedding
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': []
}
```

### 4. Monitoring & Incident Response

#### Security Event Logging
```typescript
interface SecurityEvent {
  readonly type: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'UNAUTHORIZED_ACCESS' | 'DATA_BREACH_ATTEMPT'
  readonly userId?: string
  readonly ipAddress: string
  readonly userAgent?: string
  readonly endpoint?: string
  readonly dataAccessed?: string[]
  readonly timestamp: string
  readonly severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
}

export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  // Log to database for HIPAA audit trail
  await prisma.auditLog.create({
    data: {
      userId: event.userId,
      entityType: 'SECURITY_EVENT',
      entityId: 'system',
      action: event.type,
      newValues: event,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      endpoint: event.endpoint,
      dataAccessed: event.dataAccessed?.[0] ? 'PHI' : 'INTERNAL'
    }
  })

  // Real-time alerting for critical events
  if (event.severity === 'CRITICAL') {
    await sendSecurityAlert({
      message: `Critical security event: ${event.type}`,
      details: event,
      timestamp: event.timestamp
    })
  }

  // External security monitoring (SIEM)
  await sendToSecurityMonitoring(event)
}
```

#### Performance Monitoring
```typescript
// Application performance monitoring
export function measurePerformance<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = performance.now()

    try {
      const result = await fn()
      const duration = performance.now() - startTime

      // Log performance metrics
      await logPerformanceMetric({
        operation,
        duration,
        success: true,
        timestamp: new Date().toISOString()
      })

      // Alert on slow operations
      if (duration > 1000) { // > 1 second
        console.warn(`Slow operation detected: ${operation} (${duration}ms)`)
      }

      resolve(result)
    } catch (error) {
      const duration = performance.now() - startTime

      await logPerformanceMetric({
        operation,
        duration,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })

      reject(error)
    }
  })
}
```

These comprehensive performance and security standards ensure CareTracker meets healthcare industry requirements while delivering optimal user experience and maintaining HIPAA compliance.