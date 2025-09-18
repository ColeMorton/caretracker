# API Design Standards (2025)

## Overview

This document defines comprehensive API design standards for the CareTracker healthcare management system, emphasizing consistency, security, and HIPAA compliance.

## Core Principles

### 1. API-First Design
- Design APIs before implementation
- Use OpenAPI 3.1 specification
- Generate client SDKs from specifications
- Maintain backwards compatibility

### 2. RESTful Design Patterns
- Use HTTP methods correctly
- Follow resource-based URL design
- Implement consistent error handling
- Support proper caching headers

### 3. Healthcare Compliance
- HIPAA-compliant data handling
- Complete audit trail logging
- Secure authentication/authorization
- Data classification awareness

## HTTP Method Standards

### GET - Read Operations
```typescript
// ✅ Good: Idempotent read operations
GET /api/v1/visits/{id}
GET /api/v1/users/{userId}/visits?page=1&limit=10

// ❌ Avoid: State-changing operations
GET /api/v1/visits/{id}/complete  // Should be PATCH
```

### POST - Create Operations
```typescript
// ✅ Good: Create new resources
POST /api/v1/visits
POST /api/v1/users

// ✅ Good: Non-idempotent operations
POST /api/v1/visits/{id}/notifications
POST /api/v1/auth/login
```

### PUT - Full Resource Replacement
```typescript
// ✅ Good: Complete resource replacement
PUT /api/v1/visits/{id}
{
  "clientId": "client-123",
  "workerId": "worker-456",
  "scheduledAt": "2025-09-20T10:00:00Z",
  "status": "SCHEDULED",
  "activities": ["medication", "vitals"]
}
```

### PATCH - Partial Updates
```typescript
// ✅ Good: RFC 7396 JSON Merge Patch
PATCH /api/v1/visits/{id}
{
  "status": "COMPLETED",
  "completedAt": "2025-09-20T11:00:00Z",
  "notes": "Visit completed successfully"
}
```

### DELETE - Resource Deletion
```typescript
// ✅ Good: Soft delete for healthcare compliance
DELETE /api/v1/visits/{id}  // Sets deletedAt timestamp

// ✅ Good: Hard delete for non-sensitive data
DELETE /api/v1/sessions/{id}
```

## URL Design Standards

### Resource Naming
```
// ✅ Good: Plural nouns, kebab-case
/api/v1/users
/api/v1/care-plans
/api/v1/visit-schedules

// ❌ Avoid: Singular nouns, mixed case
/api/v1/user
/api/v1/carePlans
/api/v1/visitSchedule
```

### Nested Resources
```
// ✅ Good: Maximum 2 levels deep
/api/v1/users/{userId}/visits
/api/v1/visits/{visitId}/activities

// ❌ Avoid: Deep nesting
/api/v1/users/{userId}/visits/{visitId}/activities/{activityId}/notes
```

### Query Parameters
```
// ✅ Good: Consistent parameter naming
GET /api/v1/visits?page=1&limit=10&sort=-scheduledAt&status=SCHEDULED

// Standard parameters:
// - page: Page number (1-based)
// - limit: Items per page (max 100)
// - sort: Sort field with optional - prefix for descending
// - {field}: Filter by field value
```

## Request/Response Standards

### Request Format

#### Authentication Headers
```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Accept: application/json
X-Request-ID: uuid-v4-here
```

#### Request Body Schema
```typescript
interface CreateVisitRequest {
  readonly clientId: string        // Required, CUID format
  readonly workerId: string        // Required, CUID format
  readonly scheduledAt: string     // Required, ISO 8601 datetime
  readonly activities: readonly string[]  // Required, non-empty array
  readonly notes?: string          // Optional
}
```

### Response Format

#### Success Response Schema
```typescript
// Single resource
interface ApiResponse<T> {
  readonly success: true
  readonly data: T
  readonly meta?: ResponseMetadata
}

// Collection response with pagination
interface PaginatedResponse<T> extends ApiResponse<readonly T[]> {
  readonly meta: {
    readonly page: number
    readonly limit: number
    readonly total: number
    readonly totalPages: number
    readonly hasNext: boolean
    readonly hasPrev: boolean
  }
}

// Example response
{
  "success": true,
  "data": [
    {
      "id": "visit_2gqjx8kf9m3n7p2q",
      "clientId": "user_1a2b3c4d5e6f7g8h",
      "workerId": "user_9i8j7k6l5m4n3o2p",
      "scheduledAt": "2025-09-20T10:00:00Z",
      "status": "SCHEDULED",
      "activities": ["medication", "vitals"],
      "createdAt": "2025-09-18T08:00:00Z",
      "updatedAt": "2025-09-18T08:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### Error Response Schema (RFC 7807)
```typescript
interface ApiError {
  readonly success: false
  readonly error: {
    readonly type: string           // Error type identifier
    readonly title: string          // Human-readable title
    readonly status: number         // HTTP status code
    readonly detail: string         // Detailed error message
    readonly instance?: string      // Request instance identifier
    readonly violations?: readonly ValidationViolation[]
  }
  readonly meta?: {
    readonly requestId: string
    readonly timestamp: string
  }
}

// Example error response
{
  "success": false,
  "error": {
    "type": "validation-error",
    "title": "Request validation failed",
    "status": 400,
    "detail": "The request body contains invalid data",
    "instance": "/api/v1/visits",
    "violations": [
      {
        "field": "scheduledAt",
        "message": "Must be a future date",
        "code": "FUTURE_DATE_REQUIRED"
      }
    ]
  },
  "meta": {
    "requestId": "req_1b2c3d4e5f6g7h8i",
    "timestamp": "2025-09-18T10:30:00Z"
  }
}
```

## Status Code Standards

### Success Codes
- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST with resource creation
- `202 Accepted` - Asynchronous operation started
- `204 No Content` - Successful DELETE or PUT with no response body

### Client Error Codes
- `400 Bad Request` - Invalid request syntax or data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity` - Valid syntax but semantic errors
- `429 Too Many Requests` - Rate limit exceeded

### Server Error Codes
- `500 Internal Server Error` - Unexpected server error
- `502 Bad Gateway` - Upstream service error
- `503 Service Unavailable` - Service temporarily unavailable

## Security Standards

### Authentication
```typescript
// JWT Bearer Token (required for all protected endpoints)
Authorization: Bearer <access_token>

// Token payload structure
interface JWTPayload {
  readonly sub: string              // User ID
  readonly email: string            // User email
  readonly role: Role               // User role
  readonly permissions: readonly string[]  // Granular permissions
  readonly org: string              // Healthcare organization
  readonly exp: number              // Expiration timestamp
  readonly iat: number              // Issued at timestamp
}
```

### Rate Limiting
```typescript
// Rate limit headers (included in all responses)
X-RateLimit-Limit: 100           // Requests per window
X-RateLimit-Remaining: 95        // Remaining requests
X-RateLimit-Reset: 1642694400    // Window reset timestamp
```

### CORS Headers
```typescript
// CORS configuration for healthcare compliance
Access-Control-Allow-Origin: https://app.caretracker.com
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type, X-Request-ID
Access-Control-Max-Age: 86400
```

## Validation Standards

### Request Validation with Zod
```typescript
import { z } from 'zod'

// Healthcare-specific validation schemas
const CreateVisitSchema = z.object({
  clientId: z.string().cuid('Invalid client ID format'),
  workerId: z.string().cuid('Invalid worker ID format'),
  scheduledAt: z.string().datetime('Must be valid ISO 8601 datetime'),
  activities: z.array(z.string()).min(1, 'At least one activity required'),
  notes: z.string().max(1000, 'Notes must be under 1000 characters').optional()
})

// Fastify route with validation
fastify.post<{
  Body: z.infer<typeof CreateVisitSchema>
  Reply: ApiResponse<Visit>
}>('/visits', {
  schema: {
    body: CreateVisitSchema,
    response: {
      201: VisitResponseSchema
    }
  }
}, async (request, reply) => {
  // Request automatically validated
  const visit = await visitService.create(request.body)

  reply.status(201).send({
    success: true,
    data: visit
  })
})
```

### Healthcare Data Validation
```typescript
// PII/PHI validation patterns
const EmailSchema = z.string().email().toLowerCase()
const PhoneSchema = z.string().regex(/^\+?[1-9]\d{10,14}$/)
const NameSchema = z.string().min(1).max(100).regex(/^[a-zA-Z\s'-]+$/)

// Date validation for healthcare
const FutureDateSchema = z.string().datetime().refine(
  (date) => new Date(date) > new Date(),
  'Must be a future date'
)

// Healthcare-specific business rules
const VisitDurationSchema = z.number()
  .min(15, 'Minimum visit duration is 15 minutes')
  .max(480, 'Maximum visit duration is 8 hours')
```

## Caching Standards

### Cache Headers
```typescript
// GET requests - Cache for 5 minutes
Cache-Control: public, max-age=300, stale-while-revalidate=60

// Sensitive healthcare data - No cache
Cache-Control: private, no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: 0

// ETags for conditional requests
ETag: "v1.2.3-abc123"
If-None-Match: "v1.2.3-abc123"
```

## Pagination Standards

### Cursor-based Pagination (Preferred)
```typescript
// Request
GET /api/v1/visits?limit=10&cursor=eyJpZCI6InZpc2l0XzEyMyJ9

// Response
{
  "success": true,
  "data": [...],
  "meta": {
    "limit": 10,
    "hasNext": true,
    "nextCursor": "eyJpZCI6InZpc2l0XzQ1NiJ9"
  }
}
```

### Offset-based Pagination (Fallback)
```typescript
// Request
GET /api/v1/visits?page=2&limit=10

// Response with full pagination metadata
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 10,
    "total": 156,
    "totalPages": 16,
    "hasNext": true,
    "hasPrev": true
  }
}
```

## Healthcare-Specific Standards

### Audit Trail Headers
```typescript
// Required headers for audit compliance
X-User-ID: user_abc123          // Acting user
X-Request-ID: req_xyz789        // Request correlation ID
X-Client-IP: 192.168.1.100     // Client IP for audit
X-User-Agent: CareTracker/1.0   // Client application
```

### Data Classification Headers
```typescript
// Data sensitivity classification
X-Data-Classification: PHI      // PHI, PII, INTERNAL, PUBLIC
X-Retention-Period: P7Y         // ISO 8601 duration (7 years)
```

### Healthcare Entity Standards
```typescript
// Standard healthcare entity structure
interface HealthcareEntity {
  readonly id: string              // CUID identifier
  readonly createdAt: string       // ISO 8601 datetime
  readonly updatedAt: string       // ISO 8601 datetime
  readonly createdBy: string       // User ID of creator
  readonly updatedBy: string       // User ID of last updater
  readonly deletedAt?: string      // Soft delete timestamp
  readonly version: number         // Optimistic concurrency control
}

// Visit entity example
interface Visit extends HealthcareEntity {
  readonly clientId: string
  readonly workerId: string
  readonly scheduledAt: string
  readonly completedAt?: string
  readonly status: VisitStatus
  readonly activities: readonly string[]
  readonly notes?: string
  readonly billingAmount?: number
}
```

## OpenAPI Documentation Standards

### Complete API Specification
```yaml
openapi: 3.1.0
info:
  title: CareTracker API
  version: 1.0.0
  description: Healthcare Management System API
  contact:
    name: CareTracker Support
    email: support@caretracker.com
  license:
    name: Proprietary

servers:
  - url: https://api.caretracker.com/v1
    description: Production server
  - url: https://staging-api.caretracker.com/v1
    description: Staging server

paths:
  /visits:
    post:
      summary: Create a new visit
      operationId: createVisit
      tags: [visits]
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateVisitRequest'
      responses:
        '201':
          description: Visit created successfully
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/ApiResponse'
                  - type: object
                    properties:
                      data:
                        $ref: '#/components/schemas/Visit'

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    Visit:
      type: object
      required: [id, clientId, workerId, scheduledAt, status, activities]
      properties:
        id:
          type: string
          pattern: '^visit_[a-z0-9]{20}$'
          example: 'visit_abc123def456ghi789'
        clientId:
          type: string
          pattern: '^user_[a-z0-9]{20}$'
        workerId:
          type: string
          pattern: '^user_[a-z0-9]{20}$'
        scheduledAt:
          type: string
          format: date-time
        status:
          $ref: '#/components/schemas/VisitStatus'
        activities:
          type: array
          items:
            type: string
          minItems: 1
```

## Testing Standards

### API Contract Testing
```typescript
// Contract tests ensure API specification compliance
describe('Visits API Contract', () => {
  it('POST /visits should match OpenAPI specification', async () => {
    const response = await request(app)
      .post('/api/v1/visits')
      .set('Authorization', `Bearer ${validToken}`)
      .send(validVisitData)
      .expect(201)

    // Validate response against OpenAPI schema
    const validation = ajv.validate('Visit', response.body.data)
    expect(validation).toBe(true)
  })
})
```

## Migration and Versioning

### API Versioning Strategy
- URL versioning: `/api/v1/`, `/api/v2/`
- Maintain backwards compatibility for at least 12 months
- Deprecation headers for old versions:
  ```
  Deprecation: Sun, 01 Nov 2025 23:59:59 GMT
  Sunset: Sun, 01 Feb 2026 23:59:59 GMT
  ```

### Breaking Change Process
1. Announce deprecation 6 months in advance
2. Provide migration guide and tooling
3. Run both versions in parallel
4. Monitor usage metrics before shutdown

This comprehensive API design standard ensures consistency, security, and HIPAA compliance across the entire CareTracker healthcare management system.