import { describe, it, expect } from 'vitest'
import {
  createBudgetSchema,
  updateBudgetSchema,
  createBudgetExpenseSchema,
  updateBudgetExpenseSchema,
  budgetFilterSchema,
  budgetResponseSchema,
  budgetExpenseResponseSchema,
  budgetListResponseSchema,
  budgetDetailResponseSchema,
  createBudgetResponseSchema,
  budgetUtilizationSchema,
  bulkExpenseActionSchema
} from '../../../src/schemas/budgets.js'

describe('Budgets Schemas', () => {
  describe('createBudgetSchema', () => {
    const baseBudget = {
      clientId: 'cjld2cjxh0000qzrmn831i7rn',
      name: 'Monthly Care Budget',
      totalAllocated: 500000, // $5,000.00 in cents
      periodStart: '2024-01-01T00:00:00Z',
      periodEnd: '2024-01-31T23:59:59Z'
    }

    it('should accept minimal valid budget', () => {
      expect(() => createBudgetSchema.parse(baseBudget)).not.toThrow()
    })

    it('should accept complete budget with all fields', () => {
      const completeBudget = {
        ...baseBudget,
        description: 'Monthly budget for client care services',
        budgetType: 'MONTHLY' as const,
        fiscalYear: 2024,
        personalCare: 200000, // $2,000.00
        medicalServices: 150000, // $1,500.00
        transportation: 80000, // $800.00
        homeModifications: 40000, // $400.00
        emergencyFund: 30000, // $300.00
        other: 0, // Total: $5,000.00
        warningThreshold: 80,
        criticalThreshold: 95,
        alertsEnabled: true,
        fundingSource: 'Medicare',
        authorizationNumber: 'AUTH123456',
        authorizationExpiry: '2024-12-31T23:59:59Z',
        restrictions: 'No out-of-state services',
        approvalRequired: false,
        autoRenew: true
      }
      expect(() => createBudgetSchema.parse(completeBudget)).not.toThrow()
    })

    it('should use default values', () => {
      const result = createBudgetSchema.parse(baseBudget)
      expect(result.budgetType).toBe('MONTHLY')
      expect(result.warningThreshold).toBe(80)
      expect(result.criticalThreshold).toBe(95)
      expect(result.alertsEnabled).toBe(true)
      expect(result.approvalRequired).toBe(false)
      expect(result.autoRenew).toBe(false)
    })

    it('should validate period end is after period start', () => {
      expect(() => createBudgetSchema.parse({
        ...baseBudget,
        periodStart: '2024-01-31T00:00:00Z',
        periodEnd: '2024-01-01T00:00:00Z' // Before start
      })).toThrow('Period end must be after period start')
    })

    it('should validate category allocations do not exceed total budget', () => {
      expect(() => createBudgetSchema.parse({
        ...baseBudget,
        totalAllocated: 100000, // $1,000.00
        personalCare: 60000, // $600.00
        medicalServices: 50000 // $500.00 - Total would be $1,100.00
      })).toThrow('Sum of category allocations cannot exceed total budget')
    })

    it('should validate minimum total allocation', () => {
      expect(() => createBudgetSchema.parse({
        ...baseBudget,
        totalAllocated: 0
      })).toThrow('Total allocation must be greater than 0')
    })

    it('should validate field lengths', () => {
      const longStringTests = [
        { name: '' }, // Empty name
        { name: 'a'.repeat(101) }, // Too long name
        { description: 'a'.repeat(501) }, // Too long description
        { fundingSource: 'a'.repeat(101) }, // Too long funding source
        { authorizationNumber: 'a'.repeat(51) }, // Too long auth number
        { restrictions: 'a'.repeat(1001) } // Too long restrictions
      ]

      longStringTests.forEach(test => {
        expect(() => createBudgetSchema.parse({
          ...baseBudget,
          ...test
        })).toThrow()
      })
    })

    it('should validate fiscal year range', () => {
      const invalidYears = [2019, 2051]
      invalidYears.forEach(year => {
        expect(() => createBudgetSchema.parse({
          ...baseBudget,
          fiscalYear: year
        })).toThrow()
      })
    })

    it('should validate threshold percentages', () => {
      const invalidThresholds = [
        { warningThreshold: -1 },
        { warningThreshold: 101 },
        { criticalThreshold: -1 },
        { criticalThreshold: 101 }
      ]

      invalidThresholds.forEach(test => {
        expect(() => createBudgetSchema.parse({
          ...baseBudget,
          ...test
        })).toThrow()
      })
    })

    it('should validate budget type enum', () => {
      expect(() => createBudgetSchema.parse({
        ...baseBudget,
        budgetType: 'INVALID_TYPE'
      })).toThrow()
    })
  })

  describe('updateBudgetSchema', () => {
    it('should accept partial updates', () => {
      const validUpdates = [
        { name: 'Updated Budget Name' },
        { status: 'EXHAUSTED' as const },
        { totalAllocated: 600000 },
        { alertsEnabled: false },
        {}
      ]

      validUpdates.forEach(update => {
        expect(() => updateBudgetSchema.parse(update)).not.toThrow()
      })
    })

    it('should validate optional fields when provided', () => {
      expect(() => updateBudgetSchema.parse({
        name: ''
      })).toThrow()

      expect(() => updateBudgetSchema.parse({
        warningThreshold: 101
      })).toThrow()
    })
  })

  describe('createBudgetExpenseSchema', () => {
    const baseExpense = {
      budgetId: 'cjld2cjxh0000qzrmn831i7rn',
      description: 'Transportation to medical appointment',
      category: 'transportation' as const,
      amount: 2500, // $25.00 in cents
      expenseDate: '2024-01-15T10:00:00Z'
    }

    it('should accept valid budget expense', () => {
      expect(() => createBudgetExpenseSchema.parse(baseExpense)).not.toThrow()
    })

    it('should accept expense with optional fields', () => {
      const completeExpense = {
        ...baseExpense,
        visitId: 'cjld2cjxh0000qzrmn831i7ro',
        receiptUrl: 'https://example.com/receipt.pdf',
        notes: 'Taxi fare for client appointment'
      }
      expect(() => createBudgetExpenseSchema.parse(completeExpense)).not.toThrow()
    })

    it('should validate minimum amount', () => {
      expect(() => createBudgetExpenseSchema.parse({
        ...baseExpense,
        amount: 0
      })).toThrow('Amount must be greater than 0')
    })

    it('should validate description', () => {
      expect(() => createBudgetExpenseSchema.parse({
        ...baseExpense,
        description: ''
      })).toThrow('Description is required')

      expect(() => createBudgetExpenseSchema.parse({
        ...baseExpense,
        description: 'a'.repeat(201)
      })).toThrow('Description too long')
    })

    it('should validate category enum', () => {
      expect(() => createBudgetExpenseSchema.parse({
        ...baseExpense,
        category: 'invalidCategory'
      })).toThrow()
    })

    it('should validate receipt URL format', () => {
      expect(() => createBudgetExpenseSchema.parse({
        ...baseExpense,
        receiptUrl: 'not-a-valid-url'
      })).toThrow('Invalid receipt URL')
    })

    it('should validate notes length', () => {
      expect(() => createBudgetExpenseSchema.parse({
        ...baseExpense,
        notes: 'a'.repeat(501)
      })).toThrow('Notes too long')
    })
  })

  describe('updateBudgetExpenseSchema', () => {
    it('should accept partial expense updates', () => {
      const validUpdates = [
        { description: 'Updated description' },
        { amount: 3000 },
        { status: 'APPROVED' as const },
        { receiptUrl: 'https://example.com/new-receipt.pdf' },
        {}
      ]

      validUpdates.forEach(update => {
        expect(() => updateBudgetExpenseSchema.parse(update)).not.toThrow()
      })
    })

    it('should validate expense status enum', () => {
      const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'PAID']
      validStatuses.forEach(status => {
        expect(() => updateBudgetExpenseSchema.parse({
          status: status as any
        })).not.toThrow()
      })

      expect(() => updateBudgetExpenseSchema.parse({
        status: 'INVALID_STATUS'
      })).toThrow()
    })
  })

  describe('budgetFilterSchema', () => {
    it('should accept valid filter parameters', () => {
      const validFilters = [
        {},
        {
          clientId: 'cjld2cjxh0000qzrmn831i7rn',
          status: 'ACTIVE' as const
        },
        {
          budgetType: 'MONTHLY' as const,
          fiscalYear: 2024
        },
        {
          needsReview: true,
          overBudget: false,
          nearLimit: true
        }
      ]

      validFilters.forEach(filter => {
        expect(() => budgetFilterSchema.parse(filter)).not.toThrow()
      })
    })

    it('should include pagination defaults', () => {
      const result = budgetFilterSchema.parse({})
      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
      expect(result.sortOrder).toBe('desc')
    })

    it('should validate client ID format', () => {
      expect(() => budgetFilterSchema.parse({
        clientId: 'invalid-id'
      })).toThrow('Invalid ID format')
    })

    it('should validate budget status enum', () => {
      expect(() => budgetFilterSchema.parse({
        status: 'INVALID_STATUS'
      })).toThrow()
    })

    it('should validate budget type enum', () => {
      expect(() => budgetFilterSchema.parse({
        budgetType: 'INVALID_TYPE'
      })).toThrow()
    })
  })

  describe('budgetResponseSchema', () => {
    const validBudgetResponse = {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      clientId: 'cjld2cjxh0000qzrmn831i7ro',
      name: 'Monthly Care Budget',
      description: null,
      status: 'ACTIVE' as const,
      budgetType: 'MONTHLY',
      totalAllocated: 500000,
      totalSpent: 150000,
      totalCommitted: 50000,
      remaining: 300000,
      periodStart: '2024-01-01T00:00:00Z',
      periodEnd: '2024-01-31T23:59:59Z',
      fiscalYear: null,
      personalCare: null,
      medicalServices: null,
      transportation: null,
      homeModifications: null,
      emergencyFund: null,
      other: null,
      personalCareSpent: null,
      medicalServicesSpent: null,
      transportationSpent: null,
      homeModificationsSpent: null,
      emergencyFundSpent: null,
      otherSpent: null,
      approvedBy: null,
      approvedAt: null,
      lastReviewDate: null,
      nextReviewDate: null,
      autoRenew: false,
      warningThreshold: 80,
      criticalThreshold: 95,
      alertsEnabled: true,
      fundingSource: null,
      authorizationNumber: null,
      authorizationExpiry: null,
      restrictions: null,
      approvalRequired: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1,
      dataClassification: 'PHI' as const
    }

    it('should accept valid budget response', () => {
      expect(() => budgetResponseSchema.parse(validBudgetResponse)).not.toThrow()
    })

    it('should accept budget response with client relation', () => {
      const responseWithClient = {
        ...validBudgetResponse,
        client: {
          id: 'cjld2cjxh0000qzrmn831i7ro',
          profile: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      }
      expect(() => budgetResponseSchema.parse(responseWithClient)).not.toThrow()
    })

    it('should require all mandatory fields', () => {
      const requiredFields = ['id', 'clientId', 'name', 'status', 'budgetType', 'totalAllocated', 'totalSpent', 'createdAt', 'updatedAt', 'version']

      requiredFields.forEach(field => {
        const { [field]: _, ...incompleteResponse } = validBudgetResponse
        expect(() => budgetResponseSchema.parse(incompleteResponse)).toThrow()
      })
    })
  })

  describe('budgetExpenseResponseSchema', () => {
    const validExpenseResponse = {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      budgetId: 'cjld2cjxh0000qzrmn831i7ro',
      visitId: null,
      description: 'Transportation expense',
      category: 'transportation',
      amount: 2500,
      expenseDate: '2024-01-15T10:00:00Z',
      status: 'PENDING',
      approvedBy: null,
      approvedAt: null,
      receiptUrl: null,
      notes: null,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      version: 1,
      dataClassification: 'PHI' as const
    }

    it('should accept valid expense response', () => {
      expect(() => budgetExpenseResponseSchema.parse(validExpenseResponse)).not.toThrow()
    })

    it('should require all mandatory fields', () => {
      const requiredFields = ['id', 'budgetId', 'description', 'category', 'amount', 'expenseDate', 'status', 'createdAt', 'updatedAt', 'version']

      requiredFields.forEach(field => {
        const { [field]: _, ...incompleteResponse } = validExpenseResponse
        expect(() => budgetExpenseResponseSchema.parse(incompleteResponse)).toThrow()
      })
    })
  })

  describe('budgetUtilizationSchema', () => {
    it('should accept valid budget utilization data', () => {
      const validUtilization = {
        success: true,
        data: {
          budgetId: 'cjld2cjxh0000qzrmn831i7rn',
          utilizationPercentage: 75.5,
          remainingAmount: 122500,
          daysRemaining: 15,
          projectedOverage: null,
          categoryBreakdown: {
            personalCare: { allocated: 200000, spent: 150000, percentage: 75.0 },
            medicalServices: { allocated: 150000, spent: 100000, percentage: 66.7 },
            transportation: { allocated: 100000, spent: 25000, percentage: 25.0 },
            homeModifications: { allocated: 50000, spent: 0, percentage: 0.0 },
            emergencyFund: { allocated: 50000, spent: 0, percentage: 0.0 },
            other: { allocated: 0, spent: 0, percentage: 0.0 }
          },
          alerts: [
            {
              type: 'warning' as const,
              message: 'Personal care budget is at 75% utilization',
              category: 'personalCare'
            }
          ]
        }
      }
      expect(() => budgetUtilizationSchema.parse(validUtilization)).not.toThrow()
    })

    it('should accept utilization over 100%', () => {
      const overUtilization = {
        success: true,
        data: {
          budgetId: 'cjld2cjxh0000qzrmn831i7rn',
          utilizationPercentage: 125.0,
          remainingAmount: -50000, // Negative remaining amount
          daysRemaining: 0,
          projectedOverage: 50000,
          categoryBreakdown: {
            personalCare: { allocated: 200000, spent: 250000, percentage: 125.0 },
            medicalServices: { allocated: 150000, spent: 150000, percentage: 100.0 },
            transportation: { allocated: 100000, spent: 75000, percentage: 75.0 },
            homeModifications: { allocated: 50000, spent: 0, percentage: 0.0 },
            emergencyFund: { allocated: 50000, spent: 0, percentage: 0.0 },
            other: { allocated: 0, spent: 0, percentage: 0.0 }
          },
          alerts: [
            {
              type: 'overbudget' as const,
              message: 'Budget has been exceeded',
              category: 'personalCare'
            }
          ]
        }
      }
      expect(() => budgetUtilizationSchema.parse(overUtilization)).not.toThrow()
    })

    it('should validate alert types', () => {
      const invalidAlert = {
        success: true,
        data: {
          budgetId: 'cjld2cjxh0000qzrmn831i7rn',
          utilizationPercentage: 50.0,
          remainingAmount: 250000,
          daysRemaining: 15,
          projectedOverage: null,
          categoryBreakdown: {
            personalCare: { allocated: 200000, spent: 100000, percentage: 50.0 },
            medicalServices: { allocated: 150000, spent: 50000, percentage: 33.3 },
            transportation: { allocated: 100000, spent: 25000, percentage: 25.0 },
            homeModifications: { allocated: 50000, spent: 0, percentage: 0.0 },
            emergencyFund: { allocated: 50000, spent: 0, percentage: 0.0 },
            other: { allocated: 0, spent: 0, percentage: 0.0 }
          },
          alerts: [
            {
              type: 'invalid_type',
              message: 'Invalid alert type'
            }
          ]
        }
      }
      expect(() => budgetUtilizationSchema.parse(invalidAlert)).toThrow()
    })

    it('should validate utilization percentage limits', () => {
      expect(() => budgetUtilizationSchema.parse({
        success: true,
        data: {
          budgetId: 'cjld2cjxh0000qzrmn831i7rn',
          utilizationPercentage: 10000, // Too high
          remainingAmount: 0,
          daysRemaining: 0,
          projectedOverage: null,
          categoryBreakdown: {
            personalCare: { allocated: 0, spent: 0, percentage: 0 },
            medicalServices: { allocated: 0, spent: 0, percentage: 0 },
            transportation: { allocated: 0, spent: 0, percentage: 0 },
            homeModifications: { allocated: 0, spent: 0, percentage: 0 },
            emergencyFund: { allocated: 0, spent: 0, percentage: 0 },
            other: { allocated: 0, spent: 0, percentage: 0 }
          },
          alerts: []
        }
      })).toThrow()
    })
  })

  describe('bulkExpenseActionSchema', () => {
    it('should accept valid bulk expense actions', () => {
      const validActions = [
        {
          expenseIds: ['cjld2cjxh0000qzrmn831i7rn'],
          action: 'approve' as const
        },
        {
          expenseIds: ['cjld2cjxh0000qzrmn831i7rn', 'cjld2cjxh0000qzrmn831i7ro'],
          action: 'reject' as const,
          reason: 'Insufficient documentation'
        },
        {
          expenseIds: ['cjld2cjxh0000qzrmn831i7rn'],
          action: 'mark_paid' as const
        }
      ]

      validActions.forEach(action => {
        expect(() => bulkExpenseActionSchema.parse(action)).not.toThrow()
      })
    })

    it('should enforce expense ID limits', () => {
      expect(() => bulkExpenseActionSchema.parse({
        expenseIds: [],
        action: 'approve' as const
      })).toThrow('At least one expense ID required')

      expect(() => bulkExpenseActionSchema.parse({
        expenseIds: Array.from({ length: 101 }, (_, i) => `cjld2cjxh0000qzrmn831i7r${i}`),
        action: 'approve' as const
      })).toThrow('Too many expenses selected')
    })

    it('should validate action types', () => {
      expect(() => bulkExpenseActionSchema.parse({
        expenseIds: ['cjld2cjxh0000qzrmn831i7rn'],
        action: 'invalid_action'
      })).toThrow('Invalid bulk action')
    })

    it('should validate reason length', () => {
      expect(() => bulkExpenseActionSchema.parse({
        expenseIds: ['cjld2cjxh0000qzrmn831i7rn'],
        action: 'reject' as const,
        reason: 'a'.repeat(201)
      })).toThrow('Reason too long')
    })
  })

  describe('Response Schemas', () => {
    const sampleBudget = {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      clientId: 'cjld2cjxh0000qzrmn831i7ro',
      name: 'Monthly Care Budget',
      description: null,
      status: 'ACTIVE' as const,
      budgetType: 'MONTHLY',
      totalAllocated: 500000,
      totalSpent: 150000,
      totalCommitted: 50000,
      remaining: 300000,
      periodStart: '2024-01-01T00:00:00Z',
      periodEnd: '2024-01-31T23:59:59Z',
      fiscalYear: null,
      personalCare: null,
      medicalServices: null,
      transportation: null,
      homeModifications: null,
      emergencyFund: null,
      other: null,
      personalCareSpent: null,
      medicalServicesSpent: null,
      transportationSpent: null,
      homeModificationsSpent: null,
      emergencyFundSpent: null,
      otherSpent: null,
      approvedBy: null,
      approvedAt: null,
      lastReviewDate: null,
      nextReviewDate: null,
      autoRenew: false,
      warningThreshold: 80,
      criticalThreshold: 95,
      alertsEnabled: true,
      fundingSource: null,
      authorizationNumber: null,
      authorizationExpiry: null,
      restrictions: null,
      approvalRequired: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1,
      dataClassification: 'PHI' as const
    }

    describe('budgetListResponseSchema', () => {
      it('should accept valid budget list response', () => {
        const validResponse = {
          success: true,
          data: [sampleBudget],
          meta: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1
          }
        }
        expect(() => budgetListResponseSchema.parse(validResponse)).not.toThrow()
      })
    })

    describe('budgetDetailResponseSchema', () => {
      it('should accept valid budget detail response', () => {
        const validResponse = {
          success: true,
          data: {
            ...sampleBudget,
            expenses: [{
              id: 'cjld2cjxh0000qzrmn831i7rp',
              budgetId: 'cjld2cjxh0000qzrmn831i7rn',
              visitId: null,
              description: 'Transportation expense',
              category: 'transportation',
              amount: 2500,
              expenseDate: '2024-01-15T10:00:00Z',
              status: 'APPROVED',
              approvedBy: null,
              approvedAt: null,
              receiptUrl: null,
              notes: null,
              createdAt: '2024-01-15T00:00:00Z',
              updatedAt: '2024-01-15T00:00:00Z',
              version: 1,
              dataClassification: 'PHI' as const
            }]
          }
        }
        expect(() => budgetDetailResponseSchema.parse(validResponse)).not.toThrow()
      })
    })

    describe('createBudgetResponseSchema', () => {
      it('should accept valid budget creation response', () => {
        const validResponse = {
          success: true,
          data: sampleBudget
        }
        expect(() => createBudgetResponseSchema.parse(validResponse)).not.toThrow()
      })
    })
  })
})