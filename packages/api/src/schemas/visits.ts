import { z } from 'zod'
import {
  cuidSchema,
  dateTimeSchema,
  positiveIntSchema,
  nonNegativeIntSchema,
  visitStatusSchema,
  activitiesArraySchema,
  activitySchema,
  paginationSchema,
  baseFilterSchema,
  successResponseSchema,
  paginatedResponseSchema,
  currencySchema,
  dataClassificationSchema
} from './common.js'

// Vitals schema for healthcare measurements
export const vitalsSchema = z.object({
  bloodPressureSystemic: z.number().min(50).max(300).optional(),
  bloodPressureDiastolic: z.number().min(30).max(200).optional(),
  heartRate: z.number().int().min(30).max(250).optional(),
  temperature: z.number().min(90).max(110).optional(), // Fahrenheit
  oxygenSaturation: z.number().min(70).max(100).optional(),
  weight: z.number().min(50).max(1000).optional(), // pounds
  height: z.number().min(36).max(96).optional(), // inches
  glucose: z.number().min(20).max(800).optional(), // mg/dL
  notes: z.string().max(500, 'Vitals notes too long').optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one vital measurement is required'
})

// Visit creation schema
export const createVisitSchema = z.object({
  clientId: cuidSchema,
  workerId: cuidSchema,
  scheduledAt: dateTimeSchema,
  scheduledEndAt: dateTimeSchema.optional(),
  duration: positiveIntSchema.min(15, 'Visit must be at least 15 minutes').max(480, 'Visit cannot exceed 8 hours').optional(),

  visitType: z.string().max(50, 'Visit type too long').optional(),
  location: z.string().max(200, 'Location too long').optional(),

  activities: activitiesArraySchema.optional(),
  plannedActivities: activitiesArraySchema.optional(),
  notes: z.string().max(1000, 'Notes too long').optional(),
  privateNotes: z.string().max(1000, 'Private notes too long').optional(),

  carePlanId: cuidSchema.optional(),
  estimatedCost: currencySchema.optional()
}).refine(data => {
  if (data.scheduledEndAt && data.scheduledAt) {
    return new Date(data.scheduledEndAt) > new Date(data.scheduledAt)
  }
  return true
}, {
  message: 'Scheduled end time must be after start time',
  path: ['scheduledEndAt']
})

// Visit update schema
export const updateVisitSchema = z.object({
  scheduledAt: dateTimeSchema.optional(),
  scheduledEndAt: dateTimeSchema.optional(),
  duration: positiveIntSchema.min(15).max(480).optional(),

  status: visitStatusSchema.optional(),
  visitType: z.string().max(50, 'Visit type too long').optional(),
  location: z.string().max(200, 'Location too long').optional(),

  activities: activitiesArraySchema.optional(),
  plannedActivities: activitiesArraySchema.optional(),
  notes: z.string().max(1000, 'Notes too long').optional(),
  privateNotes: z.string().max(1000, 'Private notes too long').optional(),

  cancellationReason: z.string().max(200, 'Cancellation reason too long').optional(),
  clientSatisfaction: z.number().int().min(1).max(5).optional(),
  workerNotes: z.string().max(1000, 'Worker notes too long').optional()
})

// Visit check-in schema
export const visitCheckinSchema = z.object({
  location: z.string().max(200, 'Location too long').optional(),
  notes: z.string().max(500, 'Check-in notes too long').optional(),
  arrivalMethod: z.enum(['walking', 'driving', 'public_transport', 'other']).optional()
})

// Visit check-out schema
export const visitCheckoutSchema = z.object({
  activities: activitiesArraySchema,
  notes: z.string().max(1000, 'Visit notes too long').optional(),
  vitals: vitalsSchema.optional(),
  medications: z.array(z.string().max(100, 'Medication name too long')).max(20, 'Too many medications').optional(),
  followUpRequired: z.boolean().default(false),
  followUpReason: z.string().max(200, 'Follow-up reason too long').optional(),
  clientCondition: z.enum(['excellent', 'good', 'fair', 'poor', 'critical']).optional(),
  incidentOccurred: z.boolean().default(false),
  incidentDescription: z.string().max(500, 'Incident description too long').optional()
}).refine(data => {
  if (data.followUpRequired && !data.followUpReason) {
    return false
  }
  if (data.incidentOccurred && !data.incidentDescription) {
    return false
  }
  return true
}, {
  message: 'Follow-up reason required when follow-up is needed, incident description required when incident occurred'
})

// Visit filter schema
export const visitFilterSchema = baseFilterSchema.extend({
  ...paginationSchema.shape,
  clientId: cuidSchema.optional(),
  workerId: cuidSchema.optional(),
  status: visitStatusSchema.optional(),
  visitType: z.string().optional(),
  carePlanId: cuidSchema.optional(),
  includeCompleted: z.boolean().default(true),
  onlyOverdue: z.boolean().default(false),
  needsReview: z.boolean().default(false)
})

// Visit response schema
export const visitResponseSchema = z.object({
  id: cuidSchema,
  clientId: cuidSchema,
  workerId: cuidSchema,

  scheduledAt: dateTimeSchema,
  scheduledEndAt: dateTimeSchema.nullable(),
  actualStartAt: dateTimeSchema.nullable(),
  actualEndAt: dateTimeSchema.nullable(),
  duration: nonNegativeIntSchema.nullable(),
  actualDuration: nonNegativeIntSchema.nullable(),

  status: visitStatusSchema,
  visitType: z.string().nullable(),
  location: z.string().nullable(),

  activities: z.array(activitySchema),
  plannedActivities: z.array(activitySchema),
  medications: z.array(z.string()),
  vitals: vitalsSchema.nullable(),

  notes: z.string().nullable(),
  privateNotes: z.string().nullable(),
  workerNotes: z.string().nullable(),
  supervisorReview: z.string().nullable(),

  clientSatisfaction: z.number().int().min(1).max(5).nullable(),
  reviewedAt: dateTimeSchema.nullable(),
  reviewedBy: cuidSchema.nullable(),

  billableTime: nonNegativeIntSchema.nullable(),
  billingRate: z.number().nullable(),
  totalCost: z.number().nullable(),
  invoiceId: z.string().nullable(),
  documentationComplete: z.boolean(),

  cancellationReason: z.string().nullable(),
  rescheduledFrom: cuidSchema.nullable(),
  rescheduledTo: cuidSchema.nullable(),

  carePlanId: cuidSchema.nullable(),

  // Related data (when included)
  client: z.object({
    id: cuidSchema,
    profile: z.object({
      firstName: z.string(),
      lastName: z.string()
    }).optional()
  }).optional(),

  worker: z.object({
    id: cuidSchema,
    profile: z.object({
      firstName: z.string(),
      lastName: z.string()
    }).optional()
  }).optional(),

  carePlan: z.object({
    id: cuidSchema,
    name: z.string()
  }).optional(),

  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  version: positiveIntSchema,
  dataClassification: dataClassificationSchema
})

// Visit list response schema
export const visitListResponseSchema = paginatedResponseSchema.extend({
  data: z.array(visitResponseSchema)
})

// Visit detail response schema
export const visitDetailResponseSchema = successResponseSchema.extend({
  data: visitResponseSchema
})

// Visit creation response schema
export const createVisitResponseSchema = successResponseSchema.extend({
  data: visitResponseSchema
})

// Visit status update schema
export const updateVisitStatusSchema = z.object({
  status: visitStatusSchema,
  reason: z.string().max(200, 'Reason too long').optional(),
  notifyParties: z.boolean().default(true)
})

// Visit reschedule schema
export const rescheduleVisitSchema = z.object({
  newScheduledAt: dateTimeSchema,
  newScheduledEndAt: dateTimeSchema.optional(),
  reason: z.string().min(1, 'Reschedule reason required').max(200, 'Reason too long'),
  notifyParties: z.boolean().default(true)
}).refine(data => {
  if (data.newScheduledEndAt) {
    return new Date(data.newScheduledEndAt) > new Date(data.newScheduledAt)
  }
  return true
}, {
  message: 'New end time must be after new start time',
  path: ['newScheduledEndAt']
})

// Bulk visit operations schema
export const bulkVisitActionSchema = z.object({
  visitIds: z.array(cuidSchema).min(1, 'At least one visit ID required').max(50, 'Too many visits selected'),
  action: z.enum(['cancel', 'reschedule', 'approve', 'mark_reviewed'], {
    errorMap: () => ({ message: 'Invalid bulk action' })
  }),
  reason: z.string().max(200, 'Reason too long').optional(),
  newScheduledAt: dateTimeSchema.optional()
})

// Visit statistics response schema
export const visitStatsResponseSchema = successResponseSchema.extend({
  data: z.object({
    totalVisits: nonNegativeIntSchema,
    completedVisits: nonNegativeIntSchema,
    cancelledVisits: nonNegativeIntSchema,
    upcomingVisits: nonNegativeIntSchema,
    overdueVisits: nonNegativeIntSchema,
    averageDuration: z.number().nullable(),
    averageSatisfaction: z.number().nullable(),
    completionRate: z.number().min(0).max(100)
  })
})