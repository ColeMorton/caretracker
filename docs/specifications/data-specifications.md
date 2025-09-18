# CareTracker Data Specifications

**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Status**: Active
**Related Documents**: [Technical Requirements](./technical-requirements.md), [System Architecture](./system-architecture.md)

## Data Architecture Overview

CareTracker implements a comprehensive data layer designed specifically for healthcare applications, emphasizing data security, compliance, and audit trails. The system uses PostgreSQL as the primary database with Prisma ORM for type-safe database operations.

### Core Design Principles

1. **HIPAA Compliance**: All data handling follows healthcare privacy regulations
2. **Data Classification**: Explicit classification of data sensitivity levels
3. **Audit Trail**: Complete logging of all data access and modifications
4. **Type Safety**: End-to-end type safety from database to frontend
5. **Performance**: Optimized indexing and query patterns
6. **Scalability**: Schema designed for long-term data growth

## Data Classification System

### Healthcare Data Types

#### DataClassification Enum
- **PUBLIC**: Non-sensitive, publicly available information
- **INTERNAL**: Internal business data, non-patient related
- **PII**: Personally Identifiable Information (names, addresses, contacts)
- **PHI**: Protected Health Information (medical records, visit notes, diagnoses)

#### Data Handling Requirements
- **PHI Data**: Encrypted at rest, limited access, full audit logging
- **PII Data**: Restricted access, audit logging, anonymization in non-production
- **INTERNAL**: Standard business data protection
- **PUBLIC**: No special restrictions

## Database Schema Design

### Core Entity Models

#### 1. User Management

##### User Model
```prisma
model User {
  id                     String               @id @default(cuid())
  email                  String               @unique
  password               String               // Bcrypt hashed
  role                   Role                 @default(CLIENT)
  isActive               Boolean              @default(true)
  emailVerified          Boolean              @default(false)

  // Enhanced security fields
  refreshToken           String?
  refreshTokenExpiresAt  DateTime?
  passwordResetToken     String?
  passwordResetExpiresAt DateTime?
  loginAttempts          Int                  @default(0)
  lockedUntil            DateTime?

  // Audit trail fields
  createdAt              DateTime             @default(now())
  updatedAt              DateTime             @updatedAt
  dataClassification     DataClassification   @default(PII)
}
```

**Key Features:**
- CUID-based primary keys for security and performance
- Enhanced authentication fields for JWT token management
- Account lockout protection with attempt tracking
- Soft delete support with audit trail retention
- Data classification for compliance reporting

**Indexes:**
- `[email, isActive]`: Authentication queries
- `[role, isActive]`: Role-based access control
- `[lastLoginAt]`: Activity monitoring
- `[deletedAt]`: Soft delete filtering

##### Profile Model
```prisma
model Profile {
  id                     String               @id @default(cuid())
  userId                 String               @unique

  // Personal Information (PHI classified)
  firstName              String
  lastName               String
  dateOfBirth            DateTime?
  medicalRecordNumber    String?              @unique

  // Healthcare specific fields
  allergies              String[]             @default([])
  medications            String[]             @default([])
  medicalConditions      String[]             @default([])

  dataClassification     DataClassification   @default(PHI)
}
```

**Key Features:**
- Separate profile model for PHI data isolation
- Array fields for healthcare lists (allergies, medications)
- Unique medical record number for healthcare integration
- Emergency contact information structure

#### 2. Visit Management

##### Visit Model
```prisma
model Visit {
  id                     String               @id @default(cuid())
  clientId               String
  workerId               String

  // Scheduling and timing
  scheduledAt            DateTime
  actualStartAt          DateTime?
  actualEndAt            DateTime?
  duration               Int?                 // Planned duration in minutes
  actualDuration         Int?                 // Actual duration in minutes

  // Visit execution
  status                 VisitStatus          @default(SCHEDULED)
  activities             String[]             @default([])
  notes                  String?              // PHI classified
  vitals                 Json?                // Structured health measurements

  // Billing and outcomes
  billableTime           Int?
  billingRate            Decimal?             @db.Decimal(8, 2)
  totalCost              Decimal?             @db.Decimal(10, 2)
  clientSatisfaction     Int?                 @db.SmallInt

  dataClassification     DataClassification   @default(PHI)
}
```

**Key Features:**
- Comprehensive visit lifecycle tracking
- Structured data for healthcare activities
- JSON field for flexible vitals data storage
- Financial tracking with decimal precision
- Quality metrics capture

**Indexes:**
- `[clientId, scheduledAt]`: Client visit history
- `[workerId, scheduledAt]`: Worker schedule queries
- `[status, scheduledAt]`: Status-based filtering
- `[carePlanId]`: Care plan integration

#### 3. Care Plan Management

##### CarePlan Model
```prisma
model CarePlan {
  id                     String               @id @default(cuid())
  clientId               String

  // Care plan structure
  name                   String
  status                 CarePlanStatus       @default(DRAFT)
  goals                  String[]             @default([])
  objectives             Json?                // Detailed objectives with metrics

  // Clinical information
  diagnosisCodes         String[]             @default([])
  treatmentPlan          String?
  safetyConsiderations   String?

  // Timeline and review
  startDate              DateTime
  endDate                DateTime?
  reviewDate             DateTime?

  dataClassification     DataClassification   @default(PHI)
}
```

**Key Features:**
- Structured goal and objective tracking
- Clinical data integration (diagnosis codes)
- Timeline-based care management
- Progress tracking capabilities

#### 4. Budget Management

##### Budget Model
```prisma
model Budget {
  id                     String               @id @default(cuid())
  clientId               String

  // Financial tracking
  totalAllocated         Decimal              @db.Decimal(12, 2)
  totalSpent             Decimal              @db.Decimal(12, 2) @default(0)
  totalCommitted         Decimal              @db.Decimal(12, 2) @default(0)

  // Budget categories
  personalCare           Decimal?             @db.Decimal(10, 2) @default(0)
  medicalServices        Decimal?             @db.Decimal(10, 2) @default(0)
  transportation         Decimal?             @db.Decimal(10, 2) @default(0)

  // Time period
  periodStart            DateTime
  periodEnd              DateTime

  dataClassification     DataClassification   @default(PII)
}
```

**Key Features:**
- Multi-category budget tracking
- Real-time spending calculations
- Period-based budget management
- Alert threshold configuration

##### BudgetExpense Model
```prisma
model BudgetExpense {
  id                     String               @id @default(cuid())
  budgetId               String
  visitId                String?

  description            String
  category               String
  amount                 Decimal              @db.Decimal(10, 2)
  expenseDate            DateTime
  status                 String               @default("PENDING")

  dataClassification     DataClassification   @default(PII)
}
```

**Key Features:**
- Individual expense tracking
- Visit linkage for automatic expense capture
- Approval workflow support
- Receipt documentation links

#### 5. Audit and Compliance

##### AuditLog Model
```prisma
model AuditLog {
  id                     String               @id @default(cuid())

  // Action tracking
  userId                 String?
  entityType             String               // Table/model name
  entityId               String               // Record ID
  action                 String               // CREATE, UPDATE, DELETE, READ
  oldValues              Json?                // Previous values
  newValues              Json?                // New values

  // Context information
  ipAddress              String?
  userAgent              String?
  sessionId              String?
  requestId              String?

  // Compliance tracking
  dataAccessed           DataClassification?
  reason                 String?

  createdAt              DateTime             @default(now())
}
```

**Key Features:**
- Complete audit trail for HIPAA compliance
- Before/after value tracking
- Context capture (IP, user agent, session)
- Data classification tracking
- Immutable audit records

## Data Relationships and Constraints

### Primary Relationships

#### User-Centric Design
```
User (1) ←→ (1) Profile
User (1) ←→ (n) Visit (as client)
User (1) ←→ (n) Visit (as worker)
User (1) ←→ (n) CarePlan
User (1) ←→ (n) Budget
User (1) ←→ (n) AuditLog
```

#### Care Delivery Relationships
```
CarePlan (1) ←→ (n) Visit
Budget (1) ←→ (n) BudgetExpense
Visit (1) ←→ (n) BudgetExpense
```

#### Supervision Hierarchy
```
User (supervisor) (1) ←→ (n) User (worker)
```

### Data Integrity Constraints

#### Unique Constraints
- User email addresses (global uniqueness)
- Medical record numbers (healthcare identifier)
- Budget periods per client (no overlapping budgets)

#### Foreign Key Relationships
- All user-related data cascades on user deletion
- Visit data maintains referential integrity
- Audit logs preserve references even after entity deletion

#### Business Logic Constraints
- Visit scheduling prevents worker double-booking
- Budget allocation enforces spending limits
- Care plan timelines maintain logical order

## Data Validation and Security

### Input Validation

#### Data Type Validation
- Email format validation for user accounts
- Phone number format validation
- Date range validation for visits and budgets
- Decimal precision for financial data

#### Business Rule Validation
- Password complexity requirements (8+ chars, mixed case, numbers, symbols)
- Medical record number format validation
- Budget allocation vs spending validation
- Visit timing logical constraints

#### Data Sanitization
- HTML sanitization for text fields
- SQL injection prevention through Prisma
- XSS prevention in user-generated content

### Security Measures

#### Encryption Standards
- **At Rest**: AES-256 encryption for PHI data
- **In Transit**: TLS 1.3 for all communications
- **Application Level**: Bcrypt for password hashing (12+ rounds)

#### Access Control
- Role-based access control (RBAC) enforcement
- Field-level access control for sensitive data
- API endpoint authorization validation
- Database connection encryption

#### Data Masking
- Production data masking in non-production environments
- PHI anonymization for testing and development
- Audit log data redaction for reporting

## Performance Optimization

### Indexing Strategy

#### Primary Indexes
- Primary keys (CUID-based) for fast lookups
- Foreign key indexes for join performance
- Composite indexes for common query patterns

#### Query-Specific Indexes
```sql
-- User authentication and role queries
CREATE INDEX idx_users_email_active ON users(email, is_active);
CREATE INDEX idx_users_role_active ON users(role, is_active);

-- Visit scheduling and history
CREATE INDEX idx_visits_client_scheduled ON visits(client_id, scheduled_at);
CREATE INDEX idx_visits_worker_scheduled ON visits(worker_id, scheduled_at);
CREATE INDEX idx_visits_status_scheduled ON visits(status, scheduled_at);

-- Budget period queries
CREATE INDEX idx_budgets_client_period ON budgets(client_id, period_start, period_end);

-- Audit trail queries
CREATE INDEX idx_audit_logs_user_created ON audit_logs(user_id, created_at);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
```

#### Soft Delete Indexes
- All tables include `deleted_at` indexes for soft delete filtering
- Partial indexes for active records only

### Query Optimization

#### Common Query Patterns
- **Dashboard Queries**: Optimized for role-based data aggregation
- **Schedule Queries**: Date range optimization with proper indexing
- **Audit Queries**: Efficient filtering by date and entity type
- **Budget Queries**: Real-time calculation optimization

#### Caching Strategy
- Redis caching for frequently accessed user profiles
- Query result caching for dashboard aggregations
- Session caching for authentication state

## Data Migration and Versioning

### Schema Evolution

#### Migration Strategy
- Prisma migration system for schema changes
- Backward-compatible migrations when possible
- Data transformation scripts for breaking changes

#### Version Control
- All models include version fields for optimistic locking
- Schema version tracking in database
- Migration rollback procedures

### Data Archival

#### Retention Policies
- **Audit Logs**: 7-year retention for compliance
- **Visit Data**: Indefinite retention for care continuity
- **User Data**: Retention per patient data policies
- **Financial Data**: 7-year retention for tax compliance

#### Archival Strategy
- Cold storage migration for old data
- Compressed storage for archived records
- Selective data purging for non-essential data

## Backup and Disaster Recovery

### Backup Strategy

#### Full Database Backups
- Daily full backups with encryption
- Real-time replication to secondary database
- Point-in-time recovery capability

#### Incremental Backups
- Hourly transaction log backups
- Continuous data protection (CDP) for critical data
- Geographic distribution of backup copies

### Recovery Procedures

#### Recovery Time Objectives (RTO)
- **Critical Data**: 15 minutes maximum downtime
- **Standard Data**: 1 hour maximum downtime
- **Archived Data**: 24 hours maximum recovery time

#### Recovery Point Objectives (RPO)
- **Critical Data**: Maximum 5 minutes data loss
- **Standard Data**: Maximum 1 hour data loss
- **Batch Data**: Maximum 24 hours data loss

## Data Quality and Monitoring

### Data Quality Metrics

#### Completeness Metrics
- Required field completion rates
- Profile data completeness scoring
- Visit documentation completion rates

#### Accuracy Metrics
- Data validation error rates
- Duplicate record detection
- Reference data consistency checks

#### Timeliness Metrics
- Data freshness monitoring
- Visit check-in/check-out timeliness
- Audit log delay monitoring

### Monitoring and Alerting

#### Performance Monitoring
- Query performance tracking
- Index usage analysis
- Connection pool monitoring

#### Data Health Monitoring
- Data consistency checks
- Orphaned record detection
- Schema drift monitoring

#### Compliance Monitoring
- Audit log completeness verification
- Data classification compliance
- Access pattern anomaly detection

## Integration Specifications

### External System Integration

#### Healthcare Standards
- **HL7 FHIR**: Prepared for health information exchange
- **ICD-10**: Support for medical diagnosis codes
- **CPT**: Support for medical procedure codes
- **SNOMED CT**: Clinical terminology support

#### API Data Formats
- JSON-based RESTful APIs
- GraphQL for complex data queries
- WebSocket for real-time updates
- Standardized error response formats

### Data Export Capabilities

#### Report Generation
- PDF reports for visit summaries
- CSV exports for financial data
- Excel reports for administrative use
- JSON exports for system integration

#### Compliance Exports
- HIPAA audit trail exports
- Financial compliance reports
- Quality assurance reports
- Security incident reports

---

*This data specifications document defines the comprehensive data architecture, security measures, and compliance requirements for the CareTracker healthcare management system. All data handling must adhere to these specifications to ensure healthcare compliance and system reliability.*