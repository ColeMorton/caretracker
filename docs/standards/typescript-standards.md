# TypeScript Standards (2025)

## Overview

This document defines TypeScript standards for the CareTracker project, emphasizing type safety, developer experience, and healthcare data integrity.

## Configuration Standards

### Base Configuration

All TypeScript configurations extend `@caretracker/typescript-config/tsconfig.base.json` with 2025 standards:

```jsonc
{
  // Target modern JavaScript with latest features
  "target": "ES2023",
  "lib": ["ES2023", "DOM", "DOM.Iterable"],
  "module": "ESNext",
  "moduleResolution": "bundler",

  // Ultra-strict type checking (2025 standards)
  "strict": true,
  "exactOptionalPropertyTypes": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true,
  "noPropertyAccessFromIndexSignature": true,
  "useUnknownInCatchVariables": true,

  // 2025: Clear module syntax
  "verbatimModuleSyntax": true
}
```

### Project-Specific Configurations

#### API Package (ESM)
```jsonc
{
  "extends": "@caretracker/typescript-config/tsconfig.node.esm.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node", "@types/bcryptjs"]
  }
}
```

#### Next.js Applications
```jsonc
{
  "extends": "@caretracker/typescript-config/tsconfig.nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "types": ["react", "react-dom"]
  }
}
```

## Type Safety Standards

### 1. Discriminated Unions (2025 Pattern)

✅ **Good**: Discriminated unions for type safety
```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

// Usage automatically narrows types
function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.success) {
    return response.data  // TypeScript knows this exists
  }
  throw new Error(response.error)  // TypeScript knows this exists
}
```

❌ **Avoid**: Optional properties without discrimination
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T      // Can be undefined even when success is true
  error?: string // Can be undefined even when success is false
}
```

### 2. Readonly by Default (2025 Standard)

✅ **Good**: Prefer readonly properties
```typescript
interface UserProfile {
  readonly id: string
  readonly email: string
  readonly role: Role
  readonly createdAt: Date
}

// Readonly arrays for safety
type Activities = readonly string[]
```

✅ **Good**: Readonly function parameters
```typescript
function processVisit(visit: Readonly<Visit>): ProcessedVisit {
  // Cannot accidentally mutate visit
  return {
    id: visit.id,
    status: 'PROCESSED'
  }
}
```

### 3. Strict Null Checks with Guards

✅ **Good**: Proper null checking with type guards
```typescript
function getUserFullName(user: User): string {
  // Type guard ensures profile exists
  if (!user.profile) {
    throw new Error('User profile required')
  }

  // TypeScript now knows profile is not null
  return `${user.profile.firstName} ${user.profile.lastName}`
}
```

### 4. Index Access Protection (2025)

✅ **Good**: Safe array/object access
```typescript
// With noUncheckedIndexedAccess: true
function getVisitActivity(
  visit: Visit,
  index: number
): string | undefined {
  const activities = visit.activities as string[]
  return activities[index]  // TypeScript knows this might be undefined
}

// Use with proper checking
const activity = getVisitActivity(visit, 0)
if (activity !== undefined) {
  console.log(activity.toUpperCase())  // Safe to use
}
```

## Healthcare-Specific Type Patterns

### 1. Healthcare Data Types

```typescript
// Strongly typed healthcare enums
enum Role {
  CLIENT = 'CLIENT',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN'
} as const

enum VisitStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
} as const

// Healthcare data classification
enum DataClassification {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  PII = 'PII',        // Personally Identifiable Information
  PHI = 'PHI'         // Protected Health Information
} as const
```

### 2. Audit Trail Types

```typescript
interface AuditableEntity {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly createdBy: string | null
  readonly updatedBy: string | null
  readonly deletedAt: Date | null
  readonly version: number
}

// Healthcare entities extend auditable base
interface Visit extends AuditableEntity {
  readonly clientId: string
  readonly workerId: string
  readonly scheduledAt: Date
  readonly status: VisitStatus
  readonly activities: readonly string[]
}
```

### 3. Validation Schema Types

```typescript
import { z } from 'zod'

// Zod schema for runtime validation
const CreateVisitSchema = z.object({
  clientId: z.string().cuid(),
  workerId: z.string().cuid(),
  scheduledAt: z.string().datetime(),
  activities: z.array(z.string()).min(1)
})

// Infer TypeScript type from schema
type CreateVisitRequest = z.infer<typeof CreateVisitSchema>
```

## Function and Class Standards

### 1. Function Declarations (2025 Preference)

✅ **Good**: Function declarations for better stack traces
```typescript
function scheduleVisit(request: ScheduleVisitRequest): Promise<Visit> {
  // Function name appears in stack traces
  return visitService.schedule(request)
}
```

✅ **Also Good**: Arrow functions for callbacks and short utilities
```typescript
const sortVisitsByDate = (visits: readonly Visit[]): readonly Visit[] =>
  visits.toSorted((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
```

### 2. Explicit Return Types (Healthcare Requirement)

✅ **Good**: Always specify return types for public functions
```typescript
function calculateVisitCost(
  visit: Visit,
  rates: BillingRates
): CalculatedCost {  // Explicit return type prevents errors
  return {
    baseCost: rates.hourly * visit.duration,
    taxAmount: 0,
    totalCost: rates.hourly * visit.duration
  }
}
```

### 3. Error Handling with Unknown

✅ **Good**: Use unknown for catch blocks (2025 standard)
```typescript
async function saveVisit(visit: Visit): Promise<void> {
  try {
    await database.visits.create(visit)
  } catch (error: unknown) {  // unknown instead of any
    if (error instanceof Error) {
      logger.error('Failed to save visit', {
        error: error.message,
        visitId: visit.id
      })
    }
    throw error
  }
}
```

## Advanced Type Patterns

### 1. Branded Types for IDs

```typescript
// Prevent ID mixing with branded types
type UserId = string & { readonly __brand: 'UserId' }
type VisitId = string & { readonly __brand: 'VisitId' }

function createUserId(id: string): UserId {
  return id as UserId
}

function getUserVisits(userId: UserId): Promise<Visit[]> {
  // Cannot accidentally pass VisitId
  return database.visits.findMany({ where: { userId } })
}
```

### 2. Utility Types for Healthcare

```typescript
// Extract required fields for creation
type CreateVisit = Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'>

// Make specific fields optional for updates
type UpdateVisit = Partial<Pick<Visit, 'status' | 'notes'>> & {
  readonly id: string
  readonly updatedBy: string
}

// Extract public fields for API responses
type PublicVisit = Omit<Visit, 'deletedAt' | 'version' | 'createdBy' | 'updatedBy'>
```

### 3. Template Literal Types

```typescript
// Type-safe route definitions
type ApiRoute =
  | '/health'
  | '/auth/login'
  | '/auth/refresh'
  | `/users/${string}`
  | `/visits/${string}`

// Type-safe environment variables
type EnvVar =
  | 'DATABASE_URL'
  | 'JWT_SECRET'
  | 'PORT'
  | `LOG_${Uppercase<string>}`
```

## Testing Types

### 1. Test Utilities

```typescript
// Type-safe test factories
interface CreateVisitOptions {
  readonly clientId?: string
  readonly workerId?: string
  readonly status?: VisitStatus
  readonly scheduledAt?: Date
}

function createTestVisit(
  options: CreateVisitOptions = {}
): Visit {
  return {
    id: 'test-visit-id',
    clientId: options.clientId ?? 'test-client',
    workerId: options.workerId ?? 'test-worker',
    status: options.status ?? VisitStatus.SCHEDULED,
    scheduledAt: options.scheduledAt ?? new Date(),
    // ... other required fields
  }
}
```

### 2. Mock Types

```typescript
// Type-safe mocks
type MockDatabase = {
  readonly visits: {
    create: jest.MockedFunction<typeof database.visits.create>
    findMany: jest.MockedFunction<typeof database.visits.findMany>
  }
}
```

## Migration Strategy

### Phase 1: Enable New Standards
1. Update base TypeScript configuration
2. Fix type errors in existing code
3. Add type annotations to public APIs

### Phase 2: Enhance Existing Code
1. Convert to discriminated unions
2. Add readonly modifiers
3. Implement branded types for IDs

### Phase 3: Advanced Patterns
1. Template literal types for routes
2. Advanced utility types
3. Property-based testing with types

## Tools and IDE Support

### Required VS Code Extensions
- TypeScript Importer
- TypeScript Hero
- Error Lens
- Prettier - Code formatter

### Recommended Settings
```json
{
  "typescript.preferences.strictNullChecks": true,
  "typescript.preferences.noSemicolons": false,
  "typescript.suggest.autoImports": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll": true
  }
}
```

## Validation

- All new code must pass TypeScript strict mode
- Zero `any` types in production code (use `unknown` instead)
- All public APIs must have explicit type annotations
- Healthcare data types must use proper enums and validation
- Regular type coverage reports to maintain standards