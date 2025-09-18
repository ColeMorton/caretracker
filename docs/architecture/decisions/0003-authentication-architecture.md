# ADR-0003: Authentication Architecture

**Status**: Accepted
**Date**: 2025-09-18
**Deciders**: Security Team, Backend Team, Compliance Officer
**Technical Story**: HIPAA-compliant authentication system for healthcare management platform

## Context and Problem Statement

CareTracker requires a secure, HIPAA-compliant authentication system supporting multiple user roles (clients, care workers, administrators) with audit trails, session management, and protection against common security vulnerabilities. The system must balance security with user experience for healthcare professionals.

## Decision Drivers

* **HIPAA Compliance**: Healthcare data requires strict access controls and audit trails
* **Security**: Protection against JWT vulnerabilities, XSS, CSRF, and session hijacking
* **User Experience**: Minimal login friction for care workers using mobile devices
* **Scalability**: Support for thousands of concurrent users
* **Token Management**: Secure token storage and automatic renewal
* **Audit Requirements**: Complete logging of authentication events
* **Multi-tenancy**: Support for multiple healthcare organizations
* **Device Management**: Secure handling of multiple devices per user

## Considered Options

* **JWT with Refresh Token Rotation** - Stateless tokens with security rotation
* **Session-based Authentication** - Traditional server-side session storage
* **OAuth 2.0 + OIDC** - Federated authentication with third-party providers
* **Passwordless Authentication** - Magic links or SMS-based login
* **Certificate-based Authentication** - Client certificate authentication

## Decision Outcome

**Chosen option**: "JWT with Refresh Token Rotation", because it provides the optimal balance of security, scalability, and HIPAA compliance while maintaining excellent user experience.

### Consequences

#### Positive

* **Stateless Scaling**: JWTs enable horizontal scaling without session stores
* **Security**: Refresh token rotation prevents token replay attacks
* **HIPAA Compliance**: Comprehensive audit trail and access control
* **Performance**: No database lookups for token validation
* **Mobile Optimized**: Efficient for PWA and mobile applications
* **Granular Permissions**: Role-based access control (RBAC) embedded in tokens
* **Automatic Renewal**: Seamless token refresh for users

#### Negative

* **Complexity**: More complex than session-based authentication
* **Token Revocation**: Cannot immediately invalidate JWTs (mitigated by short expiry)
* **Storage Security**: Requires secure token storage on client side
* **Implementation Overhead**: Proper refresh token rotation logic required

### Implementation Notes

#### Token Configuration
```typescript
const tokenConfig = {
  accessToken: {
    expiresIn: '15m',        // Short-lived for security
    algorithm: 'RS256',      // Asymmetric signing
    issuer: 'caretracker.com',
    audience: 'caretracker-api'
  },
  refreshToken: {
    expiresIn: '7d',         // Longer-lived but rotated
    storage: 'httpOnly',     // Secure cookie storage
    rotation: true           // New refresh token on each use
  }
}
```

#### Authentication Flow
1. **Login**: Username/password → Access + Refresh tokens
2. **API Requests**: Bearer token in Authorization header
3. **Token Refresh**: Automatic refresh before expiration
4. **Logout**: Invalidate refresh token, clear client storage
5. **Security Events**: Log all authentication events for audit

#### Security Measures
* **Token Storage**: httpOnly cookies for refresh tokens, memory for access tokens
* **CSRF Protection**: SameSite cookies and CSRF tokens
* **Rate Limiting**: Login attempt throttling per IP/user
* **Audit Logging**: All authentication events logged with user/IP/timestamp
* **Device Fingerprinting**: Additional security layer for suspicious activity

#### Role-Based Access Control (RBAC)
```typescript
interface UserToken {
  sub: string              // User ID
  email: string            // User email
  role: 'CLIENT' | 'WORKER' | 'ADMIN'
  permissions: string[]    // Granular permissions
  org: string             // Healthcare organization
  exp: number             // Expiration timestamp
  iat: number             // Issued at timestamp
}
```

#### Database Schema
```prisma
model User {
  id                String      @id @default(cuid())
  email             String      @unique
  passwordHash      String
  role              Role        @default(CLIENT)
  refreshTokens     RefreshToken[]
  lastLoginAt       DateTime?
  failedLoginCount  Int         @default(0)
  lockedUntil       DateTime?
  emailVerifiedAt   DateTime?
}

model RefreshToken {
  id        String   @id @default(cuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  revokedAt DateTime?
  user      User     @relation(fields: [userId], references: [id])
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // LOGIN, LOGOUT, TOKEN_REFRESH, etc.
  ipAddress String
  userAgent String?
  success   Boolean
  details   Json?
  createdAt DateTime @default(now())
}
```

## Validation

* **Security Audit**: External penetration testing and security review
* **HIPAA Compliance**: Compliance audit with healthcare regulations
* **Performance**: Monitor token validation latency < 10ms
* **User Experience**: Track login success rates and user feedback
* **Audit Trail**: Verify complete logging of all authentication events
* **Token Security**: Monitor for token leakage or unauthorized access

## Links

* [JWT Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-jwt-bcp)
* [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
* [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
* [Fastify JWT Plugin](https://github.com/fastify/fastify-jwt)
* Refines [ADR-0002](0002-frontend-state-management.md) - Authentication state management
* Related to [ADR-0004](0004-database-access-patterns.md) - User data access patterns