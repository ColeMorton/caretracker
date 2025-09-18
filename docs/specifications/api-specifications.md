# CareTracker API Specifications

**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Status**: Active
**Related Documents**: [Technical Requirements](./technical-requirements.md), [Data Specifications](./data-specifications.md), [System Architecture](./system-architecture.md)

## API Architecture Overview

CareTracker implements a comprehensive RESTful API built with Fastify and TypeScript, designed specifically for healthcare applications. The API follows OpenAPI 3.0 specifications and emphasizes security, performance, and healthcare compliance.

### Core Design Principles

1. **RESTful Design**: Standard REST conventions with resource-based URLs
2. **Type Safety**: End-to-end TypeScript with Fastify type system
3. **Security First**: JWT authentication, rate limiting, CORS, and HIPAA compliance
4. **Documentation**: Auto-generated OpenAPI documentation with Swagger UI
5. **Performance**: Optimized for healthcare workflow patterns
6. **Compliance**: HIPAA audit trails and data classification enforcement

## API Base Configuration

### Server Configuration
- **Base URL**: `http://localhost:4000` (development)
- **API Version**: `v1` (implied in current structure)
- **Documentation**: Available at `/docs`
- **Health Check**: Available at `/health`

### Security Configuration
```typescript
{
  helmet: true,                    // Security headers
  cors: {
    origin: ['localhost:3000-3002'], // Frontend applications
    credentials: true               // Support for JWT cookies
  },
  rateLimit: {
    max: 100,                      // 100 requests
    timeWindow: '1 minute'         // Per minute per IP
  }
}
```

### Content Types
- **Request**: `application/json`
- **Response**: `application/json`
- **File Uploads**: `multipart/form-data`

## Authentication and Authorization

### Authentication Strategy

#### JWT Token-Based Authentication
```typescript
interface AuthToken {
  accessToken: string      // Short-lived access token (1 hour)
  refreshToken: string     // Long-lived refresh token (7 days)
  tokenType: 'Bearer'
  expiresIn: number       // Seconds until expiration
}
```

#### Security Features
- **Password Requirements**: Minimum 8 characters, mixed case, numbers, symbols
- **Account Lockout**: 5 failed attempts, 30-minute lockout
- **Token Rotation**: Refresh tokens rotate on each use
- **Session Management**: Configurable timeout with automatic logout

### Authorization Model

#### Role-Based Access Control (RBAC)
```typescript
enum Role {
  CLIENT = 'CLIENT',           // Care recipients
  WORKER = 'WORKER',           // Healthcare providers
  ADMIN = 'ADMIN',             // Administrative staff
  SUPERVISOR = 'SUPERVISOR'     // Clinical supervisors
}
```

#### Permission Hierarchy
- **SUPERVISOR**: Full access to managed workers and their clients
- **ADMIN**: User management, system configuration, reporting
- **WORKER**: Client data access, visit management, care documentation
- **CLIENT**: Personal data access, visit history, budget information

## Core API Endpoints

### Authentication Endpoints

#### POST /auth/login
**Purpose**: User authentication with credentials

**Request Schema**:
```typescript
{
  email: string                  // Valid email format
  password: string               // Minimum 6 characters
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    token: string               // JWT access token
    user: {
      id: string
      email: string
      role: Role
      profile?: {
        firstName: string
        lastName: string
        phone?: string
      }
    }
  }
}
```

**Status Codes**:
- `200`: Successful authentication
- `401`: Invalid credentials
- `423`: Account locked due to failed attempts
- `429`: Rate limit exceeded

#### GET /auth/me
**Purpose**: Get current authenticated user information

**Headers Required**:
```
Authorization: Bearer <jwt-token>
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    email: string
    role: Role
    lastLoginAt: string
    permissions: string[]
  }
}
```

#### POST /auth/refresh
**Purpose**: Refresh expired access token

**Request Schema**:
```typescript
{
  refreshToken: string
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    accessToken: string
    refreshToken: string      // New rotated refresh token
    expiresIn: number
  }
}
```

#### POST /auth/logout
**Purpose**: Invalidate current session and tokens

**Headers Required**:
```
Authorization: Bearer <jwt-token>
```

**Response Schema**:
```typescript
{
  success: boolean
  message: string
}
```

### User Management Endpoints

#### GET /users
**Purpose**: List users with pagination and filtering

**Query Parameters**:
```typescript
{
  page?: number              // Page number (default: 1)
  limit?: number             // Items per page (default: 10, max: 100)
  role?: Role                // Filter by user role
  isActive?: boolean         // Filter by active status
  search?: string            // Search by name or email
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: ApiUser[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

**Authorization**: ADMIN, SUPERVISOR roles

#### GET /users/:id
**Purpose**: Get detailed user information by ID

**Path Parameters**:
```typescript
{
  id: string                 // User CUID
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    email: string
    role: Role
    isActive: boolean
    profile: {
      firstName: string
      lastName: string
      phone?: string
      dateOfBirth?: string
      medicalRecordNumber?: string
      // Additional PHI fields based on role access
    }
    createdAt: string
    lastLoginAt?: string
  }
}
```

**Authorization**:
- Own profile: All roles
- Other profiles: ADMIN, SUPERVISOR only
- PHI fields: Healthcare roles only

#### POST /users
**Purpose**: Create new user account

**Request Schema**:
```typescript
{
  email: string
  password: string
  role: Role
  profile: {
    firstName: string
    lastName: string
    phone?: string
    dateOfBirth?: string      // For healthcare roles
    medicalRecordNumber?: string
  }
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    email: string
    role: Role
    isActive: boolean
  }
  message: string
}
```

**Authorization**: ADMIN, SUPERVISOR roles

#### PUT /users/:id
**Purpose**: Update user information

**Path Parameters**:
```typescript
{
  id: string
}
```

**Request Schema**:
```typescript
{
  email?: string
  role?: Role                // ADMIN only
  isActive?: boolean         // ADMIN only
  profile?: {
    firstName?: string
    lastName?: string
    phone?: string
    // Additional fields based on authorization
  }
}
```

**Authorization**:
- Own profile: All roles (limited fields)
- Other profiles: ADMIN, SUPERVISOR only

#### DELETE /users/:id
**Purpose**: Soft delete user account

**Path Parameters**:
```typescript
{
  id: string
}
```

**Authorization**: ADMIN role only

### Visit Management Endpoints

#### GET /visits
**Purpose**: List visits with filtering and pagination

**Query Parameters**:
```typescript
{
  page?: number
  limit?: number
  clientId?: string          // Filter by client
  workerId?: string          // Filter by worker
  status?: VisitStatus       // Filter by status
  dateFrom?: string          // ISO date string
  dateTo?: string            // ISO date string
  includeCompleted?: boolean // Include completed visits
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: ApiVisit[]
  meta: PaginationMeta
}

interface ApiVisit {
  id: string
  clientId: string
  workerId: string
  scheduledAt: string
  actualStartAt?: string
  actualEndAt?: string
  status: VisitStatus
  activities: string[]
  notes?: string             // Redacted based on role
  duration?: number
  completedAt?: string
  createdAt: string
}
```

**Authorization**:
- All visits: ADMIN, SUPERVISOR
- Own visits: WORKER, CLIENT

#### GET /visits/:id
**Purpose**: Get detailed visit information

**Path Parameters**:
```typescript
{
  id: string
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    client: {
      id: string
      name: string            // Based on authorization level
    }
    worker: {
      id: string
      name: string
    }
    scheduledAt: string
    actualStartAt?: string
    actualEndAt?: string
    status: VisitStatus
    activities: string[]
    plannedActivities: string[]
    notes?: string
    privateNotes?: string     // SUPERVISOR only
    vitals?: object           // Healthcare data
    billingInfo?: {           // ADMIN only
      billableTime: number
      billingRate: number
      totalCost: number
    }
    carePlan?: {
      id: string
      name: string
    }
    createdAt: string
    updatedAt: string
  }
}
```

#### POST /visits
**Purpose**: Create new visit appointment

**Request Schema**:
```typescript
{
  clientId: string
  workerId: string
  scheduledAt: string        // ISO datetime
  scheduledEndAt?: string    // ISO datetime
  activities?: string[]
  notes?: string
  carePlanId?: string
  visitType?: string         // 'home', 'telehealth', etc.
  location?: string
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: ApiVisit
  message: string
}
```

**Authorization**: ADMIN, SUPERVISOR, WORKER (own visits)

#### PUT /visits/:id
**Purpose**: Update visit information

**Request Schema**:
```typescript
{
  scheduledAt?: string
  status?: VisitStatus
  activities?: string[]
  notes?: string
  actualStartAt?: string     // Check-in
  actualEndAt?: string       // Check-out
  vitals?: object
  clientSatisfaction?: number // 1-5 rating
}
```

**Authorization**:
- Basic updates: Assigned WORKER
- Status changes: ADMIN, SUPERVISOR
- Billing updates: ADMIN only

#### POST /visits/:id/checkin
**Purpose**: Worker check-in to visit

**Request Schema**:
```typescript
{
  location?: string          // GPS coordinates or address
  notes?: string
}
```

#### POST /visits/:id/checkout
**Purpose**: Worker check-out from visit

**Request Schema**:
```typescript
{
  activities: string[]       // Activities performed
  notes?: string             // Visit summary
  vitals?: object           // Health measurements
  followUpRequired?: boolean
}
```

### Budget Management Endpoints

#### GET /budgets
**Purpose**: List budgets with filtering

**Query Parameters**:
```typescript
{
  clientId?: string
  status?: BudgetStatus
  periodStart?: string
  periodEnd?: string
  page?: number
  limit?: number
}
```

**Authorization**: ADMIN, SUPERVISOR, CLIENT (own budgets)

#### GET /budgets/:id
**Purpose**: Get detailed budget information

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    clientId: string
    name: string
    status: BudgetStatus
    totalAllocated: number
    totalSpent: number
    totalCommitted: number
    remaining: number
    periodStart: string
    periodEnd: string
    categories: {
      personalCare: number
      medicalServices: number
      transportation: number
      homeModifications: number
      emergencyFund: number
      other: number
    }
    utilization: {
      personalCareSpent: number
      medicalServicesSpent: number
      transportationSpent: number
      // ... other categories
    }
    alerts: {
      warningThreshold: number
      criticalThreshold: number
      alertsEnabled: boolean
    }
    expenses: BudgetExpense[]
  }
}
```

#### POST /budgets
**Purpose**: Create new budget allocation

**Request Schema**:
```typescript
{
  clientId: string
  name: string
  totalAllocated: number
  periodStart: string
  periodEnd: string
  categories: {
    personalCare?: number
    medicalServices?: number
    transportation?: number
    homeModifications?: number
    emergencyFund?: number
    other?: number
  }
  fundingSource?: string
  authorizationNumber?: string
}
```

#### POST /budgets/:id/expenses
**Purpose**: Add expense to budget

**Request Schema**:
```typescript
{
  description: string
  category: string
  amount: number
  expenseDate: string
  receiptUrl?: string
  notes?: string
  visitId?: string           // Link to visit if applicable
}
```

### Care Plan Management Endpoints

#### GET /careplans
**Purpose**: List care plans

**Query Parameters**:
```typescript
{
  clientId?: string
  status?: CarePlanStatus
  reviewDue?: boolean        // Plans needing review
  page?: number
  limit?: number
}
```

#### GET /careplans/:id
**Purpose**: Get detailed care plan

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    clientId: string
    name: string
    description?: string
    status: CarePlanStatus
    priority: string
    category: string
    goals: string[]
    objectives: object
    standardActivities: string[]
    specialInstructions?: string
    startDate: string
    endDate?: string
    reviewDate?: string
    progressNotes: string[]
    diagnosisCodes: string[]
    treatmentPlan?: string
    safetyConsiderations?: string
    visits: ApiVisit[]         // Associated visits
    createdAt: string
    updatedAt: string
  }
}
```

#### POST /careplans
**Purpose**: Create new care plan

**Authorization**: SUPERVISOR, ADMIN roles

#### PUT /careplans/:id
**Purpose**: Update care plan

**Authorization**: SUPERVISOR, ADMIN roles

## File Management Endpoints

### Document Upload

#### POST /files/upload
**Purpose**: Upload documents and images

**Request**: Multipart form data
```typescript
{
  file: File                 // Max 10MB
  category: string           // 'medical', 'visit', 'profile'
  entityId?: string          // Related entity ID
  description?: string
}
```

**Response Schema**:
```typescript
{
  success: boolean
  data: {
    id: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    category: string
    url: string              // Access URL
    entityId?: string
    uploadedBy: string
    uploadedAt: string
  }
}
```

**Authorization**: All authenticated users (role-based access control)

#### GET /files/:id
**Purpose**: Download or view file

**Authorization**: Based on file category and entity ownership

#### DELETE /files/:id
**Purpose**: Delete uploaded file

**Authorization**: File owner, ADMIN, SUPERVISOR

## Real-Time Communication

### WebSocket Endpoints

#### /ws/visits
**Purpose**: Real-time visit status updates

**Events**:
```typescript
{
  visitUpdated: {
    visitId: string
    status: VisitStatus
    timestamp: string
  }
  workerCheckedIn: {
    visitId: string
    workerId: string
    location?: string
    timestamp: string
  }
  emergencyAlert: {
    clientId: string
    workerId: string
    visitId?: string
    message: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    timestamp: string
  }
}
```

**Authorization**: JWT token in connection headers

#### /ws/notifications
**Purpose**: General system notifications

**Events**:
```typescript
{
  budgetAlert: {
    budgetId: string
    clientId: string
    threshold: number
    currentUtilization: number
  }
  careplanReview: {
    carePlanId: string
    clientId: string
    reviewDate: string
  }
  systemMaintenance: {
    message: string
    scheduledAt: string
    estimatedDuration: number
  }
}
```

## Error Handling

### Standard Error Response Format

```typescript
interface ErrorResponse {
  success: false
  error: string              // Error type/code
  message: string            // Human-readable message
  details?: object           // Additional error context
  timestamp: string          // ISO datetime
  requestId: string          // For support/debugging
}
```

### HTTP Status Codes

#### Success Codes
- `200`: OK - Standard success response
- `201`: Created - Resource successfully created
- `204`: No Content - Successful deletion or update with no response body

#### Client Error Codes
- `400`: Bad Request - Invalid request data or parameters
- `401`: Unauthorized - Authentication required or invalid
- `403`: Forbidden - Insufficient permissions for requested resource
- `404`: Not Found - Requested resource does not exist
- `409`: Conflict - Resource conflict (duplicate email, etc.)
- `422`: Unprocessable Entity - Valid JSON but business logic errors
- `429`: Too Many Requests - Rate limit exceeded

#### Server Error Codes
- `500`: Internal Server Error - Unexpected server error
- `502`: Bad Gateway - Upstream service error
- `503`: Service Unavailable - Temporary service interruption

### Field Validation Errors

```typescript
interface ValidationError {
  success: false
  error: 'VALIDATION_ERROR'
  message: 'Request validation failed'
  details: {
    field: string
    message: string
    code: string
  }[]
}
```

### Healthcare-Specific Errors

```typescript
interface ComplianceError {
  success: false
  error: 'COMPLIANCE_VIOLATION'
  message: string
  details: {
    regulation: 'HIPAA' | 'STATE_HEALTH'
    violation: string
    requiredAction: string
  }
}
```

## Performance and Caching

### Response Time Targets
- **Authentication**: < 100ms
- **Data Retrieval**: < 200ms
- **Data Creation**: < 300ms
- **File Upload**: < 2 seconds (10MB)
- **Real-time Updates**: < 1 second

### Caching Strategy

#### Client-Side Caching
```typescript
{
  'Cache-Control': 'public, max-age=300',     // User profiles (5 min)
  'ETag': 'W/"user-profile-v1"'              // Conditional requests
}
```

#### Server-Side Caching
- **User Profiles**: Redis cache, 15-minute TTL
- **Care Plans**: Redis cache, 1-hour TTL
- **Visit Lists**: Redis cache, 5-minute TTL
- **Budget Data**: Real-time, no caching

### Rate Limiting

#### Endpoint-Specific Limits
```typescript
{
  '/auth/login': '5 requests per minute',
  '/files/upload': '10 requests per minute',
  '/visits': '100 requests per minute',
  'default': '100 requests per minute'
}
```

## Security Specifications

### Input Validation

#### Request Sanitization
- **SQL Injection**: Prisma ORM with parameterized queries
- **XSS Prevention**: HTML sanitization for text fields
- **JSON Validation**: Strict schema validation with Fastify
- **File Upload**: MIME type validation, virus scanning

#### Data Validation Rules
```typescript
{
  email: 'Valid email format, max 255 characters',
  password: 'Min 8 chars, uppercase, lowercase, number, symbol',
  phone: 'Valid international phone format',
  medicalRecordNumber: 'Alphanumeric, 8-20 characters',
  dates: 'ISO 8601 format validation',
  currency: 'Decimal precision to 2 places, max 999999.99'
}
```

### Authentication Security

#### JWT Token Configuration
```typescript
{
  algorithm: 'HS256',
  expiresIn: '1h',           // Access token
  refreshExpiresIn: '7d',    // Refresh token
  issuer: 'caretracker-api',
  audience: 'caretracker-clients'
}
```

#### Password Security
```typescript
{
  hashing: 'bcrypt',
  saltRounds: 12,            // Minimum for healthcare data
  passwordHistory: 5,        // Prevent password reuse
  complexityRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true
  }
}
```

### Data Protection

#### Encryption Standards
- **At Rest**: AES-256 for PHI data in database
- **In Transit**: TLS 1.3 for all API communications
- **JWT Signing**: HMAC-SHA256 with 256-bit keys

#### Access Logging
```typescript
interface AccessLog {
  timestamp: string
  userId: string
  endpoint: string
  method: string
  ipAddress: string
  userAgent: string
  dataAccessed: DataClassification
  responseStatus: number
  responseTime: number
}
```

## API Testing and Quality Assurance

### Testing Strategy

#### Unit Tests
- **Controller Tests**: Request/response validation
- **Service Tests**: Business logic validation
- **Authentication Tests**: Security and token handling
- **Validation Tests**: Input sanitization and error handling

#### Integration Tests
- **API Contract Tests**: OpenAPI specification compliance
- **Database Tests**: Data consistency and transactions
- **Authentication Flow Tests**: End-to-end auth scenarios
- **Permission Tests**: Role-based access control

#### Performance Tests
- **Load Testing**: Concurrent user simulation
- **Stress Testing**: System breaking point identification
- **Response Time Testing**: Performance requirement validation

### API Documentation

#### OpenAPI Specification
- **Automatic Generation**: From TypeScript types and Fastify schemas
- **Interactive Documentation**: Swagger UI at `/docs`
- **Schema Validation**: Request/response validation
- **Code Generation**: Client SDK generation support

#### Documentation Standards
```typescript
{
  endpoint: {
    summary: 'Brief description (< 50 chars)',
    description: 'Detailed explanation with use cases',
    tags: ['category'],
    parameters: 'Full parameter documentation',
    responses: 'All possible responses with examples',
    security: 'Authentication and authorization requirements'
  }
}
```

## Deployment and Monitoring

### API Health Monitoring

#### Health Check Endpoint
```typescript
GET /health
{
  status: 'healthy' | 'degraded' | 'unhealthy',
  timestamp: string,
  version: string,
  checks: {
    database: 'healthy' | 'unhealthy',
    cache: 'healthy' | 'unhealthy',
    external_services: 'healthy' | 'unhealthy'
  },
  uptime: number,
  memory: {
    used: number,
    total: number,
    percentage: number
  }
}
```

#### Metrics Collection
- **Response Times**: P50, P95, P99 percentiles
- **Error Rates**: By endpoint and status code
- **Throughput**: Requests per second
- **Active Users**: Concurrent authenticated sessions
- **Resource Usage**: CPU, memory, database connections

### Production Configuration

#### Environment Variables
```typescript
{
  NODE_ENV: 'production',
  DATABASE_URL: 'postgresql://...',
  JWT_SECRET: 'secure-random-key',
  PORT: 4000,
  HOST: '0.0.0.0',
  CORS_ORIGINS: 'https://app.caretracker.com',
  LOG_LEVEL: 'warn',
  RATE_LIMIT_MAX: 1000,
  FILE_UPLOAD_MAX_SIZE: '10MB'
}
```

#### Production Security
- **HTTPS Only**: TLS 1.3 encryption
- **HSTS Headers**: HTTP Strict Transport Security
- **CSP Headers**: Content Security Policy
- **Request Size Limits**: 10MB max payload
- **IP Whitelisting**: Admin endpoint restrictions

---

*This API specifications document defines the comprehensive REST API architecture, security measures, and integration patterns for the CareTracker healthcare management system. All API development must adhere to these specifications to ensure healthcare compliance, security, and system reliability.*