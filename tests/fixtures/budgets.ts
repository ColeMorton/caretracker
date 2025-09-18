export const testBudgets = [
  {
    id: 'cm_budget_january_1',
    clientId: 'cm_test_client_123',
    total: 2500.00,
    spent: 1800.50,
    period: new Date('2024-01-01T00:00:00Z'),
    allocations: {
      care: 1500.00,
      supplies: 300.00,
      transport: 200.00,
      other: 500.00,
    },
  },
  {
    id: 'cm_budget_february_2',
    clientId: 'cm_test_client_123',
    total: 2500.00,
    spent: 900.25,
    period: new Date('2024-02-01T00:00:00Z'),
    allocations: {
      care: 1500.00,
      supplies: 300.00,
      transport: 200.00,
      other: 500.00,
    },
  },
  {
    id: 'cm_budget_march_3',
    clientId: 'cm_test_client_123',
    total: 3000.00,
    spent: 0.00,
    period: new Date('2024-03-01T00:00:00Z'),
    allocations: {
      care: 2000.00,
      supplies: 400.00,
      transport: 200.00,
      other: 400.00,
    },
  },
]

export const testBudgetCategories = [
  'care',
  'supplies',
  'transport',
  'other',
] as const

export type BudgetCategory = typeof testBudgetCategories[number]