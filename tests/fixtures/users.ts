import type { UserProfile } from '@caretracker/shared'

export const testUsers: Record<string, UserProfile> = {
  client: {
    id: 'cm_test_client_123',
    email: 'client@test.com',
    role: 'CLIENT',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
    },
  },
  worker: {
    id: 'cm_test_worker_456',
    email: 'worker@test.com',
    role: 'WORKER',
    profile: {
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+0987654321',
    },
  },
  admin: {
    id: 'cm_test_admin_789',
    email: 'admin@test.com',
    role: 'ADMIN',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1122334455',
    },
  },
}

export const testUsersList = Object.values(testUsers)