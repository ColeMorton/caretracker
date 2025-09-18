# Database Standards (2025)

## Overview

This document defines database design and development standards for the CareTracker healthcare management system, emphasizing HIPAA compliance, audit trails, and data integrity.

## Core Principles

### 1. Healthcare Data Protection
- All PHI/PII data classified and protected
- Complete audit trail for all changes
- Soft deletes for compliance
- Encryption at rest and in transit

### 2. Data Integrity
- Optimistic concurrency control
- Foreign key constraints
- Check constraints for business rules
- Proper indexing for performance

### 3. HIPAA Compliance
- Audit logging for all data access
- Data classification tracking
- User access controls
- Retention policies

## Schema Design Standards

### 1. Audit Trail Pattern (2025)

Every healthcare entity includes standard audit fields:

```prisma
model HealthcareEntity {
  id                String               @id @default(cuid())

  // Audit trail fields (required for all models)
  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt
  createdBy         String?              // User ID who created
  updatedBy         String?              // User ID who updated
  deletedAt         DateTime?            // Soft delete timestamp
  version           Int                  @default(1)
  dataClassification DataClassification @default(INTERNAL)
}
```

### 2. Data Classification

All models must specify data sensitivity:

```prisma
enum DataClassification {
  PUBLIC       // Non-sensitive information
  INTERNAL     // Internal business data
  PII          // Personally Identifiable Information
  PHI          // Protected Health Information
}
```

### 3. Naming Conventions

#### Model Names
- **PascalCase** for model names
- **Singular** nouns (User, not Users)
- **Descriptive** and healthcare-specific

```prisma
// ✅ Good
model User { }
model Visit { }
model CarePlan { }

// ❌ Avoid
model user { }
model Visits { }
model CP { }
```

#### Field Names
- **camelCase** for field names
- **Descriptive** names, avoid abbreviations
- **Consistent** naming across models

```prisma
// ✅ Good
firstName         String
scheduledAt       DateTime
medicalRecordNumber String?

// ❌ Avoid
fname             String
sched_at          DateTime
mrn               String?
```

#### Table Names
- **snake_case** for database table names
- **Plural** nouns
- Use `@@map()` directive

```prisma
model User {
  // fields...
  @@map("users")
}

model CarePlan {
  // fields...
  @@map("care_plans")
}
```

### 4. Index Strategy

#### Required Indexes
- **Primary keys** (automatic)
- **Foreign keys** for relationships
- **Soft delete** fields (deletedAt)
- **Audit trail** fields (createdAt, updatedAt)

```prisma
model Visit {
  // fields...

  @@index([clientId, scheduledAt])    // Client's visits by date
  @@index([workerId, scheduledAt])    // Worker's schedule
  @@index([status, scheduledAt])      // Status-based queries
  @@index([deletedAt])                // Soft delete queries
}
```

#### Performance Indexes
- **Composite indexes** for common queries
- **Partial indexes** for filtered queries
- **Covering indexes** for read-heavy operations

```prisma
// Composite index for common visit queries
@@index([clientId, status, scheduledAt])

// Partial index for active records only
@@index([scheduledAt], where: { deletedAt: null })
```

### 5. Relationship Patterns

#### One-to-Many
```prisma
model User {
  id       String @id @default(cuid())
  visits   Visit[]
}

model Visit {
  id       String @id @default(cuid())
  clientId String
  client   User   @relation(fields: [clientId], references: [id])
}
```

#### Many-to-Many with Junction Table
```prisma
model Visit {
  id         String @id @default(cuid())
  activities VisitActivity[]
}

model Activity {
  id     String @id @default(cuid())
  visits VisitActivity[]
}

model VisitActivity {
  visitId    String
  activityId String
  visit      Visit    @relation(fields: [visitId], references: [id])
  activity   Activity @relation(fields: [activityId], references: [id])

  @@id([visitId, activityId])
}
```

## Data Types and Constraints

### 1. Healthcare-Specific Types

#### Monetary Values
```prisma
// Use Decimal for currency (avoid Float)
totalCost    Decimal @db.Decimal(10, 2)  // $99,999,999.99 max
hourlyRate   Decimal @db.Decimal(8, 2)   // $999,999.99 max
```

#### Time and Dates
```prisma
// Use DateTime for timestamps
scheduledAt  DateTime
createdAt    DateTime @default(now())

// Use Date for date-only fields (birthdate, etc.)
dateOfBirth  DateTime? // Store as DateTime, display as date
```

#### Text Fields
```prisma
// Short text (indexed)
firstName    String   @db.VarChar(100)
lastName     String   @db.VarChar(100)

// Medium text (not indexed)
notes        String?  @db.VarChar(2000)

// Long text (large content)
assessment   String?  @db.Text
```

#### Arrays and JSON
```prisma
// Simple arrays for known values
activities   String[] @default([])
allergies    String[] @default([])

// JSON for complex structured data
vitals       Json?    // { "bp": "120/80", "hr": 72 }
```

### 2. Validation Constraints

#### Check Constraints
```prisma
model Budget {
  totalAllocated Decimal @db.Decimal(12, 2)
  totalSpent     Decimal @db.Decimal(12, 2) @default(0)

  // Ensure spent doesn't exceed allocated
  @@check("total_spent <= total_allocated")
}
```

#### Unique Constraints
```prisma
model Profile {
  medicalRecordNumber String? @unique

  @@unique([clientId, periodStart, periodEnd]) // Composite unique
}
```

## Migration Standards

### 1. Migration Naming
```bash
# Format: YYYYMMDD_HHMMSS_descriptive_name
20250918_143000_add_audit_fields_to_users.sql
20250918_150000_create_budget_expense_table.sql
```

### 2. Safe Migration Practices

#### Backward Compatible Changes
```sql
-- ✅ Safe: Adding nullable columns
ALTER TABLE users ADD COLUMN middle_name VARCHAR(100);

-- ✅ Safe: Adding indexes
CREATE INDEX idx_users_last_login ON users(last_login_at);
```

#### Breaking Changes (Require Coordination)
```sql
-- ⚠️ Breaking: Renaming columns
ALTER TABLE users RENAME COLUMN name TO full_name;

-- ⚠️ Breaking: Changing data types
ALTER TABLE visits ALTER COLUMN duration TYPE INTEGER;
```

### 3. Data Migration Pattern
```sql
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN new_field VARCHAR(100);

-- Step 2: Populate new column
UPDATE users SET new_field = old_field WHERE old_field IS NOT NULL;

-- Step 3: (Later migration) Drop old column
ALTER TABLE users DROP COLUMN old_field;
```

## Security Standards

### 1. Access Control
- **Principle of least privilege**
- **Role-based access control (RBAC)**
- **Row-level security for multi-tenant data**

```sql
-- Example RLS policy for user data isolation
CREATE POLICY user_isolation ON users
  FOR ALL TO app_user
  USING (id = current_user_id() OR role = 'ADMIN');
```

### 2. Data Encryption

#### Application-Level Encryption
```typescript
// Encrypt sensitive fields before storing
const encryptedSSN = encrypt(patient.ssn, process.env.ENCRYPTION_KEY)
```

#### Database-Level Encryption
```sql
-- Use PostgreSQL's built-in encryption
CREATE TABLE sensitive_data (
  id UUID PRIMARY KEY,
  encrypted_data BYTEA -- Store encrypted binary data
);
```

### 3. Connection Security
```typescript
// Database connection with SSL
const database = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "?sslmode=require"
    }
  }
})
```

## Performance Standards

### 1. Query Optimization

#### Use Proper Indexes
```prisma
// Index frequently queried combinations
model Visit {
  @@index([clientId, status, scheduledAt])
  @@index([workerId, actualStartAt])
}
```

#### Avoid N+1 Queries
```typescript
// ✅ Good: Include related data
const visits = await prisma.visit.findMany({
  include: {
    client: { include: { profile: true } },
    worker: { include: { profile: true } }
  }
})

// ❌ Avoid: Separate queries for each relation
const visits = await prisma.visit.findMany()
for (const visit of visits) {
  const client = await prisma.user.findUnique({ where: { id: visit.clientId } })
}
```

### 2. Connection Management

#### Connection Pooling
```typescript
// Configure connection pool
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
```

#### Proper Cleanup
```typescript
// Cleanup connections
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
```

## Monitoring and Observability

### 1. Query Monitoring
```typescript
// Log slow queries in development
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
  ],
})

prisma.$on('query', (e) => {
  if (e.duration > 1000) { // Log queries > 1s
    console.warn(`Slow query: ${e.query} (${e.duration}ms)`)
  }
})
```

### 2. Health Checks
```typescript
// Database health check endpoint
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}
```

## Development Workflow

### 1. Schema Changes
1. **Update** Prisma schema
2. **Generate** migration
3. **Review** migration SQL
4. **Test** in development
5. **Deploy** to staging
6. **Validate** data integrity
7. **Deploy** to production

### 2. Database Commands
```bash
# Generate Prisma client
pnpm database:generate

# Create migration
pnpm database:migrate dev --name add_audit_fields

# Deploy migrations
pnpm database:migrate deploy

# Reset database (development only)
pnpm database:reset

# Seed database
pnpm database:seed
```

### 3. Testing Standards
```typescript
// Database testing with transactions
describe('User model', () => {
  beforeEach(async () => {
    await prisma.$transaction(async (tx) => {
      // Setup test data
    })
  })

  afterEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
  })
})
```

This comprehensive database standard ensures HIPAA compliance, data integrity, and optimal performance for the CareTracker healthcare management system.