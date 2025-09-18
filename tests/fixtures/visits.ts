export const testVisits = [
  {
    id: 'cm_visit_scheduled_1',
    clientId: 'cm_test_client_123',
    workerId: 'cm_test_worker_456',
    scheduledAt: '2024-01-15T10:00:00Z',
    status: 'SCHEDULED' as const,
    activities: [
      'Personal hygiene assistance',
      'Meal preparation',
    ],
  },
  {
    id: 'cm_visit_completed_2',
    clientId: 'cm_test_client_123',
    workerId: 'cm_test_worker_456',
    scheduledAt: '2024-01-14T10:00:00Z',
    completedAt: '2024-01-14T12:00:00Z',
    duration: 120,
    status: 'COMPLETED' as const,
    notes: 'Visit completed successfully. Client was in good spirits.',
    activities: [
      'Medication reminder',
      'Companionship',
      'Light housekeeping',
    ],
  },
  {
    id: 'cm_visit_in_progress_3',
    clientId: 'cm_test_client_123',
    workerId: 'cm_test_worker_456',
    scheduledAt: '2024-01-16T14:00:00Z',
    status: 'IN_PROGRESS' as const,
    activities: [
      'Personal hygiene assistance',
    ],
  },
  {
    id: 'cm_visit_cancelled_4',
    clientId: 'cm_test_client_123',
    workerId: 'cm_test_worker_456',
    scheduledAt: '2024-01-13T10:00:00Z',
    status: 'CANCELLED' as const,
    notes: 'Client was not available',
    activities: [],
  },
]

export const testVisitActivities = [
  'Personal hygiene assistance',
  'Meal preparation', 
  'Medication reminders',
  'Light housekeeping',
  'Companionship',
  'Transportation assistance',
  'Grocery shopping',
  'Medical appointment accompaniment',
]