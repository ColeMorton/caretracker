# Phase 2: Backend API & Database Implementation

**Phase Status**: 🟡 READY TO START
**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Duration**: Week 2
**Dependencies**: Phase 1 (Foundation) ✅

## Phase Overview

Phase 2 transforms the foundational infrastructure into a fully functional healthcare management backend. This phase implements enterprise-grade authentication, comprehensive database operations, and RESTful API endpoints with HIPAA-compliant security patterns.

## Objectives & Deliverables

### Primary Objectives
- [ ] **Authentication System**: Implement JWT with refresh token rotation and role-based access control
- [ ] **Database Integration**: Replace mock data with Prisma-based CRUD operations
- [ ] **API Development**: Create comprehensive RESTful endpoints with validation and documentation
- [ ] **Security Implementation**: HIPAA-compliant data protection and audit logging
- [ ] **Error Handling**: Standardized error responses and logging patterns
- [ ] **Testing Coverage**: Comprehensive API testing with integration and unit tests

### Success Criteria
- [ ] All API endpoints functional with real database operations
- [ ] JWT authentication with refresh token rotation working
- [ ] Role-based access control enforcing healthcare permissions
- [ ] 100% API test coverage with integration testing
- [ ] OpenAPI documentation complete and accurate
- [ ] Security audit passing with zero critical vulnerabilities

## Technical Specifications

### Authentication Architecture

#### JWT Implementation
```typescript
// JWT Service Implementation
interface JWTPayload {
  readonly userId: string;
  readonly role: 'CLIENT' | 'WORKER' | 'ADMIN' | 'SUPERVISOR';
  readonly permissions: readonly string[];
  readonly organizationId: string;
  readonly iat: number;
  readonly exp: number;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResult> {
    // 1. Validate credentials with bcrypt
    const user = await this.userService.validateCredentials(email, password);

    // 2. Generate JWT pair
    const tokens = await this.generateTokenPair(user);

    // 3. Store refresh token in Redis
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    // 4. Log authentication event
    await this.auditService.logAuthentication(user.id, 'LOGIN_SUCCESS');

    return {
      user: this.sanitizeUser(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenPair> {
    // 1. Verify refresh token
    const payload = await this.verifyRefreshToken(refreshToken);

    // 2. Generate new token pair
    const newTokens = await this.generateTokenPair({ id: payload.userId });

    // 3. Rotate refresh token (invalidate old)
    await this.rotateRefreshToken(payload.userId, refreshToken, newTokens.refreshToken);

    return newTokens;
  }
}
```

#### Role-Based Access Control
```typescript
// RBAC Permission System
const PERMISSIONS = {
  // Client permissions
  'visits:read:own': 'Read own visit data',
  'profile:update:own': 'Update own profile',
  'budget:read:own': 'View own budget information',

  // Worker permissions
  'visits:read:assigned': 'Read assigned visit data',
  'visits:update:assigned': 'Update assigned visits',
  'clients:read:assigned': 'View assigned client information',
  'visits:checkin': 'Check in to visits',

  // Admin permissions
  'users:create': 'Create user accounts',
  'users:read:all': 'Read all user data',
  'visits:read:all': 'Read all visit data',
  'reports:generate': 'Generate system reports',

  // Supervisor permissions
  'workers:manage': 'Manage worker assignments',
  'visits:approve': 'Approve visit completions',
  'quality:audit': 'Perform quality audits'
} as const;

const ROLE_PERMISSIONS = {
  CLIENT: [
    'visits:read:own',
    'profile:update:own',
    'budget:read:own'
  ],
  WORKER: [
    'visits:read:assigned',
    'visits:update:assigned',
    'clients:read:assigned',
    'visits:checkin',
    'profile:update:own'
  ],
  ADMIN: ['*:*'], // Full access
  SUPERVISOR: [
    'workers:manage',
    'visits:approve',
    'quality:audit',
    'visits:read:all',
    'reports:generate'
  ]
} as const;

// Permission checking middleware
async function requirePermission(permission: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;

    if (!user) {
      return reply.status(401).send({ error: 'Authentication required' });
    }

    const hasPermission = await this.authService.checkPermission(user, permission);

    if (!hasPermission) {
      await this.auditService.logUnauthorizedAccess(user.id, permission);
      return reply.status(403).send({ error: 'Insufficient permissions' });
    }
  };
}
```

### Database Service Layer

#### Repository Pattern Implementation
```typescript
// Base Repository with Audit Logging
abstract class BaseRepository<T> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly auditService: AuditService
  ) {}

  async create(data: CreateInput<T>, userId: string): Promise<T> {
    const result = await this.prisma.$transaction(async (tx) => {
      // Create the entity
      const entity = await tx[this.tableName].create({
        data: {
          ...data,
          createdBy: userId,
          updatedBy: userId,
          version: 1
        }
      });

      // Log the creation
      await this.auditService.logEntityCreation(
        this.tableName,
        entity.id,
        userId,
        data
      );

      return entity;
    });

    return result;
  }

  async update(
    id: string,
    data: UpdateInput<T>,
    userId: string
  ): Promise<T> {
    const result = await this.prisma.$transaction(async (tx) => {
      // Get current version for optimistic locking
      const current = await tx[this.tableName].findUnique({
        where: { id },
        select: { version: true }
      });

      if (!current) {
        throw new NotFoundError(`${this.tableName} not found`);
      }

      // Update with version increment
      const updated = await tx[this.tableName].update({
        where: {
          id,
          version: current.version // Optimistic locking
        },
        data: {
          ...data,
          updatedBy: userId,
          version: current.version + 1,
          updatedAt: new Date()
        }
      });

      // Log the update
      await this.auditService.logEntityUpdate(
        this.tableName,
        id,
        userId,
        data,
        current
      );

      return updated;
    });

    return result;
  }
}

// User Repository Implementation
class UserRepository extends BaseRepository<User> {
  protected readonly tableName = 'user';

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
      include: {
        profile: true
      }
    });
  }

  async findActiveUsers(filters: UserFilters): Promise<PaginatedResult<User>> {
    const { page = 1, limit = 10, role, search } = filters;

    const where = {
      isActive: true,
      deletedAt: null,
      ...(role && { role }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { profile: { firstName: { contains: search, mode: 'insensitive' } } },
          { profile: { lastName: { contains: search, mode: 'insensitive' } } }
        ]
      })
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: { profile: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.user.count({ where })
    ]);

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
```

### API Endpoint Implementation

#### RESTful API Structure
```typescript
// Visit Management API
class VisitController {
  constructor(
    private readonly visitService: VisitService,
    private readonly authService: AuthService
  ) {}

  // GET /visits - List visits with filtering
  async listVisits(request: FastifyRequest, reply: FastifyReply) {
    const query = visitListSchema.parse(request.query);
    const user = request.user;

    // Apply role-based filtering
    const filters = await this.applyRoleBasedFilters(query, user);

    const visits = await this.visitService.findMany(filters);

    return reply.send({
      success: true,
      data: visits.data,
      meta: visits.meta
    });
  }

  // POST /visits - Create new visit
  async createVisit(request: FastifyRequest, reply: FastifyReply) {
    const visitData = createVisitSchema.parse(request.body);
    const user = request.user;

    // Validate business rules
    await this.validateVisitCreation(visitData, user);

    const visit = await this.visitService.create(visitData, user.id);

    // Send real-time notification
    await this.notificationService.notifyVisitCreated(visit);

    return reply.status(201).send({
      success: true,
      data: visit,
      message: 'Visit created successfully'
    });
  }

  // PUT /visits/:id - Update visit
  async updateVisit(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamsSchema.parse(request.params);
    const updateData = updateVisitSchema.parse(request.body);
    const user = request.user;

    // Check ownership/assignment
    await this.validateVisitAccess(id, user);

    const visit = await this.visitService.update(id, updateData, user.id);

    // Send real-time notification
    await this.notificationService.notifyVisitUpdated(visit);

    return reply.send({
      success: true,
      data: visit,
      message: 'Visit updated successfully'
    });
  }

  // POST /visits/:id/checkin - Worker check-in
  async checkinVisit(request: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamsSchema.parse(request.params);
    const checkinData = checkinSchema.parse(request.body);
    const user = request.user;

    // Validate worker assignment
    await this.validateWorkerAssignment(id, user.id);

    const visit = await this.visitService.checkin(id, {
      ...checkinData,
      workerId: user.id,
      checkinTime: new Date()
    });

    return reply.send({
      success: true,
      data: visit,
      message: 'Successfully checked in to visit'
    });
  }
}
```

#### Input Validation with Zod
```typescript
// Request validation schemas
const createVisitSchema = z.object({
  clientId: z.string().cuid('Invalid client ID'),
  workerId: z.string().cuid('Invalid worker ID'),
  scheduledAt: z.string().datetime('Invalid date format'),
  activities: z.array(z.string()).min(1, 'At least one activity required'),
  notes: z.string().optional(),
  estimatedDuration: z.number().min(15).max(480).optional() // 15 min to 8 hours
});

const updateVisitSchema = z.object({
  scheduledAt: z.string().datetime().optional(),
  activities: z.array(z.string()).optional(),
  notes: z.string().optional(),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'RESCHEDULED']).optional()
});

const visitListSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  clientId: z.string().cuid().optional(),
  workerId: z.string().cuid().optional(),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional()
});

// Response validation
const visitResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string(),
    clientId: z.string(),
    workerId: z.string(),
    scheduledAt: z.string(),
    status: z.string(),
    activities: z.array(z.string()),
    notes: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
  }),
  message: z.string().optional()
});
```

### Error Handling & Logging

#### Standardized Error Responses
```typescript
// Error classification system
export enum ErrorCode {
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Authentication/Authorization errors
  AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Business logic errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',

  // System errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR'
}

// Custom error classes
class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, details);
  }
}

class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(ErrorCode.AUTHENTICATION_REQUIRED, message, 401);
  }
}

// Global error handler
export const errorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestId = request.id;

  // Log error with context
  request.log.error({
    err: error,
    requestId,
    url: request.url,
    method: request.method,
    headers: request.headers,
    userId: request.user?.id
  }, 'Request error');

  // Handle known error types
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        requestId,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return reply.status(400).send({
      success: false,
      error: {
        code: ErrorCode.VALIDATION_ERROR,
        message: 'Validation failed',
        details: error.errors,
        requestId,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = error.code === 'P2002' ? 409 : 400;
    return reply.status(statusCode).send({
      success: false,
      error: {
        code: ErrorCode.DATABASE_ERROR,
        message: 'Database operation failed',
        requestId,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Unknown errors
  return reply.status(500).send({
    success: false,
    error: {
      code: ErrorCode.SYSTEM_ERROR,
      message: 'Internal server error',
      requestId,
      timestamp: new Date().toISOString()
    }
  });
};
```

## Implementation Tasks

### Authentication & Authorization
- [ ] **JWT Service Implementation**
  - [ ] Token generation with user claims
  - [ ] Refresh token rotation mechanism
  - [ ] Token blacklisting for logout
  - [ ] Rate limiting for login attempts
  - [ ] Account lockout after failed attempts

- [ ] **RBAC System**
  - [ ] Permission definition and management
  - [ ] Role-based middleware for routes
  - [ ] Dynamic permission checking
  - [ ] Audit logging for access attempts

- [ ] **Password Security**
  - [ ] Bcrypt hashing with proper salt rounds
  - [ ] Password strength validation
  - [ ] Password reset functionality
  - [ ] Password history tracking

### Database Integration
- [ ] **Repository Layer**
  - [ ] Base repository with common CRUD operations
  - [ ] User repository with authentication methods
  - [ ] Visit repository with complex queries
  - [ ] Budget repository with financial calculations
  - [ ] Audit repository for compliance tracking

- [ ] **Data Validation**
  - [ ] Prisma schema validation
  - [ ] Business rule validation
  - [ ] Data integrity constraints
  - [ ] Soft delete implementation

- [ ] **Performance Optimization**
  - [ ] Database indexing strategy
  - [ ] Query optimization
  - [ ] Connection pooling configuration
  - [ ] Caching layer implementation

### API Development
- [ ] **Core Endpoints**
  - [ ] Authentication endpoints (`/auth/*`)
  - [ ] User management endpoints (`/users/*`)
  - [ ] Visit management endpoints (`/visits/*`)
  - [ ] Budget tracking endpoints (`/budgets/*`)
  - [ ] File upload endpoints (`/files/*`)

- [ ] **Advanced Features**
  - [ ] Search and filtering
  - [ ] Pagination with cursor-based navigation
  - [ ] Bulk operations
  - [ ] Export functionality
  - [ ] Real-time subscriptions

- [ ] **API Documentation**
  - [ ] Complete OpenAPI 3.0 specification
  - [ ] Interactive Swagger UI
  - [ ] Request/response examples
  - [ ] Error code documentation

### Security Implementation
- [ ] **Data Protection**
  - [ ] Encryption at rest for sensitive data
  - [ ] Field-level encryption for PHI
  - [ ] Secure file upload handling
  - [ ] SQL injection prevention
  - [ ] XSS protection

- [ ] **Audit & Compliance**
  - [ ] Comprehensive audit logging
  - [ ] HIPAA compliance validation
  - [ ] Data retention policies
  - [ ] Access control logging
  - [ ] Security event monitoring

## Validation & Testing

### Unit Testing
```typescript
// Service layer unit tests
describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockRedisClient: jest.Mocked<Redis>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    mockRedisClient = createMockRedisClient();
    authService = new AuthService(mockUserRepository, mockRedisClient);
  });

  describe('login', () => {
    it('should authenticate valid credentials', async () => {
      const user = createMockUser();
      mockUserRepository.findByEmail.mockResolvedValue(user);

      const result = await authService.login('test@example.com', 'password123');

      expect(result.user.id).toBe(user.id);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login('invalid@example.com', 'wrongpassword')
      ).rejects.toThrow(AuthenticationError);
    });
  });
});
```

### Integration Testing
```typescript
// API integration tests
describe('Visit API Integration', () => {
  let app: FastifyInstance;
  let testDatabase: TestDatabase;
  let authToken: string;

  beforeAll(async () => {
    testDatabase = await createTestDatabase();
    app = await createTestApp(testDatabase.url);
    authToken = await createTestAuthToken(app);
  });

  afterAll(async () => {
    await testDatabase.cleanup();
    await app.close();
  });

  describe('POST /visits', () => {
    it('should create visit with valid data', async () => {
      const visitData = {
        clientId: 'client-1',
        workerId: 'worker-1',
        scheduledAt: '2025-01-01T10:00:00Z',
        activities: ['Personal care', 'Medication reminder']
      };

      const response = await app.inject({
        method: 'POST',
        url: '/visits',
        headers: {
          authorization: `Bearer ${authToken}`
        },
        payload: visitData
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.data.id).toBeDefined();
    });

    it('should reject invalid visit data', async () => {
      const invalidData = {
        clientId: 'invalid-id',
        // Missing required fields
      };

      const response = await app.inject({
        method: 'POST',
        url: '/visits',
        headers: {
          authorization: `Bearer ${authToken}`
        },
        payload: invalidData
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
```

### Security Testing
```typescript
// Security validation tests
describe('Security Tests', () => {
  describe('Authentication', () => {
    it('should reject requests without token', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/visits'
      });

      expect(response.statusCode).toBe(401);
    });

    it('should reject expired tokens', async () => {
      const expiredToken = generateExpiredToken();

      const response = await app.inject({
        method: 'GET',
        url: '/visits',
        headers: {
          authorization: `Bearer ${expiredToken}`
        }
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('Authorization', () => {
    it('should enforce role-based access control', async () => {
      const clientToken = generateClientToken();

      const response = await app.inject({
        method: 'GET',
        url: '/admin/users',
        headers: {
          authorization: `Bearer ${clientToken}`
        }
      });

      expect(response.statusCode).toBe(403);
    });
  });
});
```

## Success Metrics

### Functional Requirements
- [ ] **Authentication**: 100% of auth flows working correctly
- [ ] **API Coverage**: All planned endpoints implemented and tested
- [ ] **Database Operations**: CRUD operations for all entities
- [ ] **Security**: RBAC enforced on all protected endpoints
- [ ] **Documentation**: Complete OpenAPI specification

### Non-Functional Requirements
- [ ] **Performance**: API responses <100ms for 95% of requests
- [ ] **Security**: Zero critical vulnerabilities in security scan
- [ ] **Testing**: 95%+ code coverage for service and repository layers
- [ ] **Reliability**: 99.9% uptime during testing period
- [ ] **Compliance**: HIPAA audit checklist 100% complete

### Quality Gates
- [ ] **Code Quality**: ESLint passes with zero errors
- [ ] **Type Safety**: TypeScript compilation with no errors
- [ ] **Test Coverage**: All new code covered by unit/integration tests
- [ ] **Documentation**: All endpoints documented with examples
- [ ] **Security Review**: Penetration testing passed

---

*Phase 2 establishes the robust backend foundation required for healthcare data management, authentication, and secure API operations. This phase enables frontend development and real-world healthcare workflows.*