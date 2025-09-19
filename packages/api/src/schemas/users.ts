import { z } from 'zod'

import {
  cuidSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  medicalRecordNumberSchema,
  zipCodeSchema,
  roleSchema,
  paginationSchema,
  baseFilterSchema,
  successResponseSchema,
  paginatedResponseSchema,
  dataClassificationSchema
} from './common.js'

// User profile schema
export const userProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  middleName: z.string().max(50, 'Middle name too long').optional(),
  preferredName: z.string().max(50, 'Preferred name too long').optional(),
  phone: phoneSchema,
  alternatePhone: phoneSchema,
  email: emailSchema.optional(),

  // Address information
  streetAddress: z.string().max(200, 'Street address too long').optional(),
  city: z.string().max(100, 'City name too long').optional(),
  state: z.string().max(50, 'State name too long').optional(),
  zipCode: zipCodeSchema,
  country: z.string().max(50, 'Country name too long').default('US'),

  // Healthcare information (PHI)
  dateOfBirth: z.string().datetime().optional(),
  gender: z.string().max(20, 'Gender value too long').optional(),
  medicalRecordNumber: medicalRecordNumberSchema,
  insuranceNumber: z.string().max(50, 'Insurance number too long').optional(),
  insuranceProvider: z.string().max(100, 'Insurance provider name too long').optional(),
  primaryCarePhysician: z.string().max(100, 'Physician name too long').optional(),

  // Emergency contact
  emergencyContactName: z.string().max(100, 'Emergency contact name too long').optional(),
  emergencyContactPhone: phoneSchema,
  emergencyContactRelation: z.string().max(50, 'Relation too long').optional(),
  emergencyContactAddress: z.string().max(200, 'Emergency contact address too long').optional(),

  // Healthcare data arrays
  allergies: z.array(z.string().max(100, 'Allergy description too long')).max(20, 'Too many allergies listed').default([]),
  medications: z.array(z.string().max(100, 'Medication name too long')).max(50, 'Too many medications listed').default([]),
  medicalConditions: z.array(z.string().max(100, 'Condition description too long')).max(30, 'Too many conditions listed').default([]),
  specialNeeds: z.string().max(500, 'Special needs description too long').optional(),

  // Preferences
  preferredLanguage: z.string().max(10, 'Language code too long').default('en'),
  timezone: z.string().max(50, 'Timezone too long').default('America/New_York'),
  photoUrl: z.string().url('Invalid photo URL').optional()
})

// Create user request schema
export const createUserRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
  profile: userProfileSchema
})

// Update user request schema
export const updateUserRequestSchema = z.object({
  email: emailSchema.optional(),
  role: roleSchema.optional(),
  isActive: z.boolean().optional(),
  profile: userProfileSchema.partial().optional()
})

// User filter schema
export const userFilterSchema = baseFilterSchema.extend({
  ...paginationSchema.shape,
  role: roleSchema.optional(),
  isActive: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  supervisorId: cuidSchema.optional()
})

// Alias for route imports
export const getUsersQuerySchema = userFilterSchema

// Get user by ID params schema
export const getUserByIdParamsSchema = z.object({
  id: cuidSchema
})

// Response schemas for routes
export const getUsersResponseSchema = userListResponseSchema
export const getUserByIdResponseSchema = userDetailResponseSchema
export const updateUserResponseSchema = userDetailResponseSchema

// User response schema
export const userResponseSchema = z.object({
  id: cuidSchema,
  email: emailSchema,
  role: roleSchema,
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  emailVerifiedAt: z.string().datetime().nullable(),
  lastLoginAt: z.string().datetime().nullable(),
  loginAttempts: z.number().int().min(0),
  lockedUntil: z.string().datetime().nullable(),
  supervisorId: cuidSchema.nullable(),
  profile: userProfileSchema.optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  version: z.number().int().positive(),
  dataClassification: dataClassificationSchema
})

// User list response schema
export const userListResponseSchema = paginatedResponseSchema.extend({
  data: z.array(userResponseSchema)
})

// User detail response schema
export const userDetailResponseSchema = successResponseSchema.extend({
  data: userResponseSchema
})

// User creation response schema
export const createUserResponseSchema = successResponseSchema.extend({
  data: z.object({
    id: cuidSchema,
    email: emailSchema,
    role: roleSchema,
    isActive: z.boolean(),
    emailVerified: z.boolean()
  })
})

// Supervisor assignment schema
export const assignSupervisorSchema = z.object({
  supervisorId: cuidSchema.nullable()
})

// Bulk user operations schema
export const bulkUserActionSchema = z.object({
  userIds: z.array(cuidSchema).min(1, 'At least one user ID required').max(100, 'Too many users selected'),
  action: z.enum(['activate', 'deactivate', 'delete'], {
    errorMap: () => ({ message: 'Invalid bulk action' })
  })
})

// User status update schema
export const updateUserStatusSchema = z.object({
  isActive: z.boolean(),
  reason: z.string().max(200, 'Reason too long').optional()
})

// User role change schema
export const changeUserRoleSchema = z.object({
  role: roleSchema,
  reason: z.string().min(1, 'Reason is required').max(200, 'Reason too long')
})

// Worker assignment schema (for supervisors)
export const workerAssignmentSchema = z.object({
  workerIds: z.array(cuidSchema).min(1, 'At least one worker required').max(50, 'Too many workers'),
  clientIds: z.array(cuidSchema).min(1, 'At least one client required').max(100, 'Too many clients')
})