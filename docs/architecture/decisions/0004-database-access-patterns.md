# ADR-0004: Database Access Patterns

**Status**: Accepted
**Date**: 2025-09-18
**Deciders**: Backend Team, Database Architect, Performance Team
**Technical Story**: Data access layer strategy for healthcare management system

## Context and Problem Statement

CareTracker requires a robust data access strategy for healthcare information with strict consistency requirements, audit trails, and performance optimization. The solution must handle complex relationships between users, visits, care plans, and budgets while maintaining HIPAA compliance and supporting real-time updates.

## Decision Drivers

* **Type Safety**: Healthcare data requires compile-time type checking to prevent errors
* **Performance**: Sub-50ms query response times for critical healthcare operations
* **HIPAA Compliance**: Audit trails and data encryption requirements
* **Complex Relationships**: Healthcare data has intricate relationships and constraints
* **Schema Evolution**: Medical requirements change, requiring flexible migrations
* **Developer Experience**: Productive development with excellent tooling
* **Query Optimization**: Efficient N+1 query prevention and caching
* **Transaction Support**: ACID compliance for critical healthcare operations

## Considered Options

* **Prisma ORM** - Type-safe ORM with excellent TypeScript integration
* **Drizzle ORM** - Lightweight, SQL-like TypeScript ORM
* **TypeORM** - Traditional ORM with decorator-based models
* **Kysely** - Type-safe SQL query builder
* **Raw SQL with typed queries** - Direct PostgreSQL with type generation
* **Knex.js** - SQL query builder with migration support

## Decision Outcome

**Chosen option**: "Prisma ORM", because it provides the best combination of type safety, developer experience, and healthcare-specific features required for HIPAA-compliant applications.

### Consequences

#### Positive

* **End-to-end Type Safety**: Generated types from schema to API responses
* **Excellent Developer Experience**: Prisma Studio, migrations, and introspection
* **Performance**: Optimized queries with connection pooling and caching
* **Schema Evolution**: Robust migration system with rollback capabilities
* **Audit Trail Support**: Built-in audit logging and soft delete patterns
* **Relationship Handling**: Excellent support for complex healthcare data relationships
* **Testing**: Easy database testing with isolated test databases

#### Negative

* **Vendor Lock-in**: Tied to Prisma ecosystem and migration path
* **Bundle Size**: Larger than lightweight query builders
* **Query Flexibility**: Less control over raw SQL optimization
* **Learning Curve**: Prisma-specific concepts and migration workflow

### Implementation Notes

#### Enhanced Schema with 2025 Conventions

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated"
  binaryTargets = ["native", "linux-arm64-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Audit fields mixin pattern
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  passwordHash    String
  role            Role      @default(CLIENT)

  // 2025: Enhanced audit fields
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  createdBy       String?   @map("created_by")
  updatedBy       String?   @map("updated_by")
  deletedAt       DateTime? @map("deleted_at")
  version         Int       @default(1)

  // HIPAA: Data classification
  dataClass       DataClassification @default(PII)

  // Relations with explicit foreign keys
  profile         Profile?
  clientVisits    Visit[]   @relation("ClientVisits")
  workerVisits    Visit[]   @relation("WorkerVisits")

  @@map("users")
  @@index([email, deletedAt])
  @@index([role, deletedAt])
  @@index([createdAt])
}

model Visit {
  id            String        @id @default(cuid())
  clientId      String        @map("client_id")
  workerId      String        @map("worker_id")
  scheduledAt   DateTime      @map("scheduled_at")
  completedAt   DateTime?     @map("completed_at")
  status        VisitStatus   @default(SCHEDULED)

  // JSON fields with proper typing
  activities    Json          // VisitActivity[]
  metadata      Json?         // VisitMetadata

  // Audit fields
  createdAt     DateTime      @default(now()) @map("created_at")
  updatedAt     DateTime      @updatedAt @map("updated_at")
  createdBy     String?       @map("created_by")
  updatedBy     String?       @map("updated_by")
  deletedAt     DateTime?     @map("deleted_at")
  version       Int           @default(1)

  // Relations
  client        User          @relation("ClientVisits", fields: [clientId], references: [id])
  worker        User          @relation("WorkerVisits", fields: [workerId], references: [id])

  @@map("visits")
  @@index([clientId, scheduledAt])
  @@index([workerId, scheduledAt])
  @@index([status, scheduledAt])
  @@index([deletedAt])
}

// 2025: Data classification for HIPAA
enum DataClassification {
  PUBLIC
  INTERNAL
  PII
  PHI
}
```

#### Repository Pattern Implementation

```typescript
// Base repository with audit support
abstract class BaseRepository<T> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly model: string
  ) {}

  async findById(id: string, userId?: string): Promise<T | null> {
    const record = await this.prisma[this.model].findUnique({
      where: {
        id,
        deletedAt: null  // Soft delete filter
      }
    })

    // Audit access
    await this.auditAccess('READ', id, userId)
    return record
  }

  async create(data: Omit<T, 'id'>, userId: string): Promise<T> {
    const record = await this.prisma[this.model].create({
      data: {
        ...data,
        createdBy: userId,
        updatedBy: userId
      }
    })

    await this.auditAccess('CREATE', record.id, userId)
    return record
  }

  private async auditAccess(
    action: string,
    resourceId: string,
    userId?: string
  ) {
    await this.prisma.auditLog.create({
      data: {
        userId,
        action: `${this.model.toUpperCase()}_${action}`,
        resourceId,
        timestamp: new Date(),
        ipAddress: 'system', // Will be injected by middleware
      }
    })
  }
}

// Specialized repositories
class VisitRepository extends BaseRepository<Visit> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'visit')
  }

  async findByClientWithWorker(
    clientId: string,
    options: { page: number; limit: number }
  ): Promise<Visit[]> {
    return this.prisma.visit.findMany({
      where: {
        clientId,
        deletedAt: null
      },
      include: {
        worker: {
          select: {
            id: true,
            profile: {
              select: { firstName: true, lastName: true }
            }
          }
        }
      },
      orderBy: { scheduledAt: 'desc' },
      skip: (options.page - 1) * options.limit,
      take: options.limit
    })
  }
}
```

#### Transaction Patterns

```typescript
// Healthcare-specific transaction patterns
class VisitService {
  async completeVisit(
    visitId: string,
    completionData: VisitCompletionData,
    userId: string
  ): Promise<Visit> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Update visit status
      const visit = await tx.visit.update({
        where: { id: visitId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          activities: completionData.activities,
          updatedBy: userId
        }
      })

      // 2. Update budget spending
      await tx.budget.update({
        where: {
          clientId: visit.clientId,
          period: getCurrentPeriod()
        },
        data: {
          spent: { increment: visit.rate }
        }
      })

      // 3. Create audit log
      await tx.auditLog.create({
        data: {
          userId,
          action: 'VISIT_COMPLETED',
          resourceId: visitId,
          details: { completionData }
        }
      })

      return visit
    }, {
      timeout: 10000, // 10 second timeout
      isolationLevel: 'ReadCommitted'
    })
  }
}
```

## Validation

* **Query Performance**: Monitor P95 query times < 50ms
* **Type Safety**: Zero runtime database errors in production
* **Migration Success**: 100% successful schema migrations with rollback capability
* **Audit Compliance**: Complete audit trail for all data access
* **Connection Health**: Monitor connection pool utilization and performance

## Links

* [Prisma Documentation](https://www.prisma.io/docs)
* [Database Performance Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
* [HIPAA Database Compliance](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-aws-lambda)
* [Prisma Audit Logging](https://github.com/prisma/prisma/discussions/3571)
* Supports [ADR-0001](0001-api-framework-selection.md) - Fastify integration patterns
* Related to [ADR-0003](0003-authentication-architecture.md) - User authentication queries