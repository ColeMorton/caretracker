import { z } from 'zod'

import {
  cuidSchema,
  dateTimeSchema,
  positiveIntSchema,
  budgetStatusSchema,
  currencySchema,
  paginationSchema,
  baseFilterSchema,
  successResponseSchema,
  paginatedResponseSchema,
  dataClassificationSchema
} from './common.js'

// Budget creation schema
export const createBudgetSchema = z.object({
  clientId: cuidSchema,
  name: z.string().min(1, 'Budget name is required').max(100, 'Budget name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  budgetType: z.enum(['MONTHLY', 'WEEKLY', 'ANNUAL', 'PROJECT']).default('MONTHLY'),

  totalAllocated: currencySchema.min(1, 'Total allocation must be greater than 0'),
  periodStart: dateTimeSchema,
  periodEnd: dateTimeSchema,
  fiscalYear: z.number().int().min(2020).max(2050).optional(),

  // Budget categories
  personalCare: currencySchema.optional(),
  medicalServices: currencySchema.optional(),
  transportation: currencySchema.optional(),
  homeModifications: currencySchema.optional(),
  emergencyFund: currencySchema.optional(),
  other: currencySchema.optional(),

  // Alert thresholds (percentages)
  warningThreshold: z.number().min(0).max(100).default(80),
  criticalThreshold: z.number().min(0).max(100).default(95),
  alertsEnabled: z.boolean().default(true),

  // Funding information
  fundingSource: z.string().max(100, 'Funding source too long').optional(),
  authorizationNumber: z.string().max(50, 'Authorization number too long').optional(),
  authorizationExpiry: dateTimeSchema.optional(),

  restrictions: z.string().max(1000, 'Restrictions too long').optional(),
  approvalRequired: z.boolean().default(false),
  autoRenew: z.boolean().default(false)
}).refine(data => {
  return new Date(data.periodEnd) > new Date(data.periodStart)
}, {
  message: 'Period end must be after period start',
  path: ['periodEnd']
}).refine(data => {
  const categories = [
    data.personalCare || 0,
    data.medicalServices || 0,
    data.transportation || 0,
    data.homeModifications || 0,
    data.emergencyFund || 0,
    data.other || 0
  ]
  const totalCategories = categories.reduce((sum, amount) => sum + amount, 0)
  return totalCategories <= data.totalAllocated
}, {
  message: 'Sum of category allocations cannot exceed total budget',
  path: ['totalAllocated']
})

// Budget update schema
export const updateBudgetSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  status: budgetStatusSchema.optional(),

  totalAllocated: currencySchema.optional(),
  periodEnd: dateTimeSchema.optional(),

  personalCare: currencySchema.optional(),
  medicalServices: currencySchema.optional(),
  transportation: currencySchema.optional(),
  homeModifications: currencySchema.optional(),
  emergencyFund: currencySchema.optional(),
  other: currencySchema.optional(),

  warningThreshold: z.number().min(0).max(100).optional(),
  criticalThreshold: z.number().min(0).max(100).optional(),
  alertsEnabled: z.boolean().optional(),

  restrictions: z.string().max(1000).optional(),
  approvalRequired: z.boolean().optional(),
  autoRenew: z.boolean().optional()
})

// Budget expense creation schema
export const createBudgetExpenseSchema = z.object({
  budgetId: cuidSchema,
  visitId: cuidSchema.optional(),
  description: z.string().min(1, 'Description is required').max(200, 'Description too long'),
  category: z.enum(['personalCare', 'medicalServices', 'transportation', 'homeModifications', 'emergencyFund', 'other']),
  amount: currencySchema.min(1, 'Amount must be greater than 0'),
  expenseDate: dateTimeSchema,
  receiptUrl: z.string().url('Invalid receipt URL').optional(),
  notes: z.string().max(500, 'Notes too long').optional()
})

// Budget expense update schema
export const updateBudgetExpenseSchema = z.object({
  description: z.string().min(1).max(200).optional(),
  category: z.enum(['personalCare', 'medicalServices', 'transportation', 'homeModifications', 'emergencyFund', 'other']).optional(),
  amount: currencySchema.optional(),
  expenseDate: dateTimeSchema.optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'PAID']).optional(),
  receiptUrl: z.string().url().optional(),
  notes: z.string().max(500).optional()
})

// Budget filter schema
export const budgetFilterSchema = baseFilterSchema.extend({
  ...paginationSchema.shape,
  clientId: cuidSchema.optional(),
  status: budgetStatusSchema.optional(),
  budgetType: z.enum(['MONTHLY', 'WEEKLY', 'ANNUAL', 'PROJECT']).optional(),
  fiscalYear: z.number().int().optional(),
  needsReview: z.boolean().optional(),
  overBudget: z.boolean().optional(),
  nearLimit: z.boolean().optional()
})

// Budget response schema
export const budgetResponseSchema = z.object({
  id: cuidSchema,
  clientId: cuidSchema,
  name: z.string(),
  description: z.string().nullable(),
  status: budgetStatusSchema,
  budgetType: z.string(),

  totalAllocated: z.number(),
  totalSpent: z.number(),
  totalCommitted: z.number(),
  remaining: z.number(),

  periodStart: dateTimeSchema,
  periodEnd: dateTimeSchema,
  fiscalYear: z.number().int().nullable(),

  // Category allocations and spending
  personalCare: z.number().nullable(),
  medicalServices: z.number().nullable(),
  transportation: z.number().nullable(),
  homeModifications: z.number().nullable(),
  emergencyFund: z.number().nullable(),
  other: z.number().nullable(),

  personalCareSpent: z.number().nullable(),
  medicalServicesSpent: z.number().nullable(),
  transportationSpent: z.number().nullable(),
  homeModificationsSpent: z.number().nullable(),
  emergencyFundSpent: z.number().nullable(),
  otherSpent: z.number().nullable(),

  approvedBy: cuidSchema.nullable(),
  approvedAt: dateTimeSchema.nullable(),
  lastReviewDate: dateTimeSchema.nullable(),
  nextReviewDate: dateTimeSchema.nullable(),
  autoRenew: z.boolean(),

  warningThreshold: z.number(),
  criticalThreshold: z.number(),
  alertsEnabled: z.boolean(),

  fundingSource: z.string().nullable(),
  authorizationNumber: z.string().nullable(),
  authorizationExpiry: dateTimeSchema.nullable(),

  restrictions: z.string().nullable(),
  approvalRequired: z.boolean(),

  // Related data
  client: z.object({
    id: cuidSchema,
    profile: z.object({
      firstName: z.string(),
      lastName: z.string()
    }).optional()
  }).optional(),

  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  version: positiveIntSchema,
  dataClassification: dataClassificationSchema
})

// Budget expense response schema
export const budgetExpenseResponseSchema = z.object({
  id: cuidSchema,
  budgetId: cuidSchema,
  visitId: cuidSchema.nullable(),
  description: z.string(),
  category: z.string(),
  amount: z.number(),
  expenseDate: dateTimeSchema,
  status: z.string(),
  approvedBy: cuidSchema.nullable(),
  approvedAt: dateTimeSchema.nullable(),
  receiptUrl: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  version: positiveIntSchema,
  dataClassification: dataClassificationSchema
})

// Budget list response schema
export const budgetListResponseSchema = paginatedResponseSchema.extend({
  data: z.array(budgetResponseSchema)
})

// Budget detail response schema
export const budgetDetailResponseSchema = successResponseSchema.extend({
  data: budgetResponseSchema.extend({
    expenses: z.array(budgetExpenseResponseSchema).optional()
  })
})

// Budget creation response schema
export const createBudgetResponseSchema = successResponseSchema.extend({
  data: budgetResponseSchema
})

// Budget utilization schema
export const budgetUtilizationSchema = successResponseSchema.extend({
  data: z.object({
    budgetId: cuidSchema,
    utilizationPercentage: z.number().min(0).max(9999), // Can go over 100%
    remainingAmount: z.number(), // Can be negative
    daysRemaining: z.number().int(),
    projectedOverage: z.number().nullable(),
    categoryBreakdown: z.object({
      personalCare: z.object({
        allocated: z.number(),
        spent: z.number(),
        percentage: z.number()
      }),
      medicalServices: z.object({
        allocated: z.number(),
        spent: z.number(),
        percentage: z.number()
      }),
      transportation: z.object({
        allocated: z.number(),
        spent: z.number(),
        percentage: z.number()
      }),
      homeModifications: z.object({
        allocated: z.number(),
        spent: z.number(),
        percentage: z.number()
      }),
      emergencyFund: z.object({
        allocated: z.number(),
        spent: z.number(),
        percentage: z.number()
      }),
      other: z.object({
        allocated: z.number(),
        spent: z.number(),
        percentage: z.number()
      })
    }),
    alerts: z.array(z.object({
      type: z.enum(['warning', 'critical', 'overbudget']),
      message: z.string(),
      category: z.string().optional()
    }))
  })
})

// Bulk expense approval schema
export const bulkExpenseActionSchema = z.object({
  expenseIds: z.array(cuidSchema).min(1, 'At least one expense ID required').max(100, 'Too many expenses selected'),
  action: z.enum(['approve', 'reject', 'mark_paid'], {
    errorMap: () => ({ message: 'Invalid bulk action' })
  }),
  reason: z.string().max(200, 'Reason too long').optional()
})