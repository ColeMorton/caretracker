import { z } from 'zod'

// Common validation patterns
export const cuidSchema = z.string().cuid('Invalid ID format')
export const emailSchema = z.string().email('Invalid email format')
export const dateTimeSchema = z.string().datetime('Invalid date format')
export const positiveIntSchema = z.number().int().positive('Must be a positive integer')
export const nonNegativeIntSchema = z.number().int().min(0, 'Must be non-negative')

// Common pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1, 'Page must be at least 1').default(1),
  limit: z.coerce.number().int().min(1, 'Limit must be at least 1').max(100, 'Limit cannot exceed 100').default(10)
})

// ID parameter schema
export const idParamsSchema = z.object({
  id: cuidSchema
})

// Standard response schemas
export const successResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
  message: z.string().optional()
})

export const paginatedResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(z.unknown()),
  meta: z.object({
    page: positiveIntSchema,
    limit: positiveIntSchema,
    total: nonNegativeIntSchema,
    totalPages: positiveIntSchema
  })
})

// Healthcare-specific validation patterns
export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .optional()

export const medicalRecordNumberSchema = z.string()
  .regex(/^[A-Z0-9]{8,20}$/, 'Medical record number must be 8-20 alphanumeric characters')
  .optional()

export const zipCodeSchema = z.string()
  .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
  .optional()

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Role and enum validation
export const roleSchema = z.enum(['CLIENT', 'WORKER', 'ADMIN', 'SUPERVISOR'], {
  errorMap: () => ({ message: 'Invalid role' })
})

export const visitStatusSchema = z.enum([
  'SCHEDULED',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
  'RESCHEDULED'
], {
  errorMap: () => ({ message: 'Invalid visit status' })
})

export const budgetStatusSchema = z.enum([
  'ACTIVE',
  'EXHAUSTED',
  'EXPIRED',
  'SUSPENDED'
], {
  errorMap: () => ({ message: 'Invalid budget status' })
})

export const carePlanStatusSchema = z.enum([
  'DRAFT',
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'DISCONTINUED'
], {
  errorMap: () => ({ message: 'Invalid care plan status' })
})

// Currency validation (in cents)
export const currencySchema = z.number()
  .int('Amount must be an integer (in cents)')
  .min(0, 'Amount cannot be negative')
  .max(99999999, 'Amount too large') // $999,999.99

// Healthcare activity validation
export const activitySchema = z.string()
  .min(1, 'Activity cannot be empty')
  .max(100, 'Activity description too long')

export const activitiesArraySchema = z.array(activitySchema)
  .min(1, 'At least one activity is required')
  .max(20, 'Too many activities specified')

// File upload validation
export const fileTypeSchema = z.enum(['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'], {
  errorMap: () => ({ message: 'Invalid file type' })
})

// Generic filter schema for list endpoints
export const baseFilterSchema = z.object({
  search: z.string().max(100, 'Search term too long').optional(),
  sortBy: z.string().max(50, 'Sort field too long').optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  dateFrom: dateTimeSchema.optional(),
  dateTo: dateTimeSchema.optional()
})

// Data classification validation
export const dataClassificationSchema = z.enum(['PUBLIC', 'INTERNAL', 'PII', 'PHI'], {
  errorMap: () => ({ message: 'Invalid data classification' })
})