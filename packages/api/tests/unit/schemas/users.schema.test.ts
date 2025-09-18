import { describe, it, expect } from 'vitest'
import {
  userProfileSchema,
  createUserRequestSchema,
  updateUserRequestSchema,
  userFilterSchema,
  userResponseSchema,
  userListResponseSchema,
  userDetailResponseSchema,
  createUserResponseSchema,
  assignSupervisorSchema,
  bulkUserActionSchema,
  updateUserStatusSchema,
  changeUserRoleSchema,
  workerAssignmentSchema
} from '../../../src/schemas/users.js'

describe('Users Schemas', () => {
  describe('userProfileSchema', () => {
    const validProfile = {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+15551234567',
      email: 'john.doe@example.com'
    }

    it('should accept valid user profile with required fields', () => {
      expect(() => userProfileSchema.parse(validProfile)).not.toThrow()
    })

    it('should accept complete user profile with all fields', () => {
      const completeProfile = {
        ...validProfile,
        middleName: 'Robert',
        preferredName: 'Johnny',
        alternatePhone: '+15559876543',
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'US',
        dateOfBirth: '1980-01-01T00:00:00Z',
        gender: 'Male',
        medicalRecordNumber: 'MRN123456789',
        insuranceNumber: 'INS123456',
        insuranceProvider: 'Health Insurance Co',
        primaryCarePhysician: 'Dr. Smith',
        emergencyContactName: 'Jane Doe',
        emergencyContactPhone: '+15551111111',
        emergencyContactRelation: 'Spouse',
        emergencyContactAddress: '123 Main St',
        allergies: ['Penicillin', 'Shellfish'],
        medications: ['Lisinopril 10mg', 'Metformin 500mg'],
        medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
        specialNeeds: 'Wheelchair accessible',
        preferredLanguage: 'en',
        timezone: 'America/New_York',
        photoUrl: 'https://example.com/photo.jpg'
      }
      expect(() => userProfileSchema.parse(completeProfile)).not.toThrow()
    })

    it('should use default values for optional fields', () => {
      const result = userProfileSchema.parse(validProfile)
      expect(result.allergies).toEqual([])
      expect(result.medications).toEqual([])
      expect(result.medicalConditions).toEqual([])
      expect(result.preferredLanguage).toBe('en')
      expect(result.timezone).toBe('America/New_York')
      expect(result.country).toBe('US')
    })

    it('should reject profiles with invalid field lengths', () => {
      const invalidProfiles = [
        { ...validProfile, firstName: '' }, // Empty first name
        { ...validProfile, firstName: 'a'.repeat(51) }, // Too long first name
        { ...validProfile, lastName: '' }, // Empty last name
        { ...validProfile, lastName: 'a'.repeat(51) }, // Too long last name
        { ...validProfile, streetAddress: 'a'.repeat(201) }, // Too long address
        { ...validProfile, specialNeeds: 'a'.repeat(501) } // Too long special needs
      ]

      invalidProfiles.forEach(profile => {
        expect(() => userProfileSchema.parse(profile)).toThrow()
      })
    })

    it('should enforce array limits for healthcare data', () => {
      expect(() => userProfileSchema.parse({
        ...validProfile,
        allergies: Array.from({ length: 21 }, (_, i) => `Allergy ${i + 1}`)
      })).toThrow('Too many allergies listed')

      expect(() => userProfileSchema.parse({
        ...validProfile,
        medications: Array.from({ length: 51 }, (_, i) => `Medication ${i + 1}`)
      })).toThrow('Too many medications listed')

      expect(() => userProfileSchema.parse({
        ...validProfile,
        medicalConditions: Array.from({ length: 31 }, (_, i) => `Condition ${i + 1}`)
      })).toThrow('Too many conditions listed')
    })

    it('should validate phone number formats', () => {
      const invalidPhones = ['123-456-7890', '(555) 123-4567', 'not-a-phone']
      invalidPhones.forEach(phone => {
        expect(() => userProfileSchema.parse({
          ...validProfile,
          phone
        })).toThrow('Invalid phone number format')
      })
    })

    it('should validate medical record number format', () => {
      const invalidMRNs = ['too-short', 'MRN-WITH-DASHES', 'lowercase123']
      invalidMRNs.forEach(mrn => {
        expect(() => userProfileSchema.parse({
          ...validProfile,
          medicalRecordNumber: mrn
        })).toThrow('Medical record number must be 8-20 alphanumeric characters')
      })
    })

    it('should validate ZIP code format', () => {
      const invalidZips = ['1234', '123456', 'ABCDE', '12345-678']
      invalidZips.forEach(zip => {
        expect(() => userProfileSchema.parse({
          ...validProfile,
          zipCode: zip
        })).toThrow('Invalid ZIP code format')
      })
    })
  })

  describe('createUserRequestSchema', () => {
    const validCreateRequest = {
      email: 'user@example.com',
      password: 'SecureP@ss123',
      role: 'CLIENT' as const,
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '+15551234567'
      }
    }

    it('should accept valid user creation request', () => {
      expect(() => createUserRequestSchema.parse(validCreateRequest)).not.toThrow()
    })

    it('should validate email format', () => {
      expect(() => createUserRequestSchema.parse({
        ...validCreateRequest,
        email: 'invalid-email'
      })).toThrow('Invalid email format')
    })

    it('should validate password requirements', () => {
      expect(() => createUserRequestSchema.parse({
        ...validCreateRequest,
        password: 'weak'
      })).toThrow('Password must be at least 8 characters')
    })

    it('should validate role', () => {
      expect(() => createUserRequestSchema.parse({
        ...validCreateRequest,
        role: 'INVALID_ROLE'
      })).toThrow('Invalid role')
    })
  })

  describe('updateUserRequestSchema', () => {
    it('should accept partial updates', () => {
      const validUpdates = [
        { email: 'new@example.com' },
        { role: 'WORKER' as const },
        { isActive: false },
        { profile: { firstName: 'Jane' } },
        {}
      ]

      validUpdates.forEach(update => {
        expect(() => updateUserRequestSchema.parse(update)).not.toThrow()
      })
    })

    it('should validate optional fields when provided', () => {
      expect(() => updateUserRequestSchema.parse({
        email: 'invalid-email'
      })).toThrow('Invalid email format')

      expect(() => updateUserRequestSchema.parse({
        role: 'INVALID_ROLE'
      })).toThrow('Invalid role')
    })
  })

  describe('userFilterSchema', () => {
    it('should accept valid filter parameters', () => {
      const validFilters = [
        {},
        { page: 1, limit: 10, role: 'CLIENT' as const },
        { isActive: true, emailVerified: false },
        { supervisorId: 'cjld2cjxh0000qzrmn831i7rn' },
        { search: 'John', sortBy: 'firstName', sortOrder: 'asc' as const }
      ]

      validFilters.forEach(filter => {
        expect(() => userFilterSchema.parse(filter)).not.toThrow()
      })
    })

    it('should validate supervisor ID format', () => {
      expect(() => userFilterSchema.parse({
        supervisorId: 'invalid-id'
      })).toThrow('Invalid ID format')
    })

    it('should include pagination defaults', () => {
      const result = userFilterSchema.parse({})
      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
      expect(result.sortOrder).toBe('desc')
    })
  })

  describe('userResponseSchema', () => {
    const validUserResponse = {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      email: 'user@example.com',
      role: 'CLIENT' as const,
      isActive: true,
      emailVerified: true,
      emailVerifiedAt: '2024-01-01T00:00:00Z',
      lastLoginAt: '2024-01-01T12:00:00Z',
      loginAttempts: 0,
      lockedUntil: null,
      supervisorId: null,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1,
      dataClassification: 'PII' as const
    }

    it('should accept valid user response', () => {
      expect(() => userResponseSchema.parse(validUserResponse)).not.toThrow()
    })

    it('should require all mandatory fields', () => {
      const requiredFields = ['id', 'email', 'role', 'isActive', 'emailVerified', 'createdAt', 'updatedAt', 'version']

      requiredFields.forEach(field => {
        const { [field]: _, ...incompleteResponse } = validUserResponse
        expect(() => userResponseSchema.parse(incompleteResponse)).toThrow()
      })
    })

    it('should accept nullable optional fields', () => {
      const responseWithNulls = {
        ...validUserResponse,
        emailVerifiedAt: null,
        lastLoginAt: null,
        lockedUntil: null,
        supervisorId: null
      }
      expect(() => userResponseSchema.parse(responseWithNulls)).not.toThrow()
    })
  })

  describe('assignSupervisorSchema', () => {
    it('should accept valid supervisor assignment', () => {
      const validAssignments = [
        { supervisorId: 'cjld2cjxh0000qzrmn831i7rn' },
        { supervisorId: null }
      ]

      validAssignments.forEach(assignment => {
        expect(() => assignSupervisorSchema.parse(assignment)).not.toThrow()
      })
    })

    it('should validate supervisor ID format when provided', () => {
      expect(() => assignSupervisorSchema.parse({
        supervisorId: 'invalid-id'
      })).toThrow('Invalid ID format')
    })
  })

  describe('bulkUserActionSchema', () => {
    it('should accept valid bulk actions', () => {
      const validActions = [
        {
          userIds: ['cjld2cjxh0000qzrmn831i7rn'],
          action: 'activate' as const
        },
        {
          userIds: ['cjld2cjxh0000qzrmn831i7rn', 'cjld2cjxh0000qzrmn831i7ro'],
          action: 'deactivate' as const
        }
      ]

      validActions.forEach(action => {
        expect(() => bulkUserActionSchema.parse(action)).not.toThrow()
      })
    })

    it('should enforce user ID limits', () => {
      expect(() => bulkUserActionSchema.parse({
        userIds: [],
        action: 'activate' as const
      })).toThrow('At least one user ID required')

      expect(() => bulkUserActionSchema.parse({
        userIds: Array.from({ length: 101 }, (_, i) => `cjld2cjxh0000qzrmn831i7r${i}`),
        action: 'activate' as const
      })).toThrow('Too many users selected')
    })

    it('should validate action types', () => {
      expect(() => bulkUserActionSchema.parse({
        userIds: ['cjld2cjxh0000qzrmn831i7rn'],
        action: 'invalid_action'
      })).toThrow('Invalid bulk action')
    })
  })

  describe('updateUserStatusSchema', () => {
    it('should accept valid status updates', () => {
      const validUpdates = [
        { isActive: true },
        { isActive: false, reason: 'Account suspended' },
        { isActive: true, reason: 'Account reactivated' }
      ]

      validUpdates.forEach(update => {
        expect(() => updateUserStatusSchema.parse(update)).not.toThrow()
      })
    })

    it('should validate reason length', () => {
      expect(() => updateUserStatusSchema.parse({
        isActive: false,
        reason: 'a'.repeat(201)
      })).toThrow('Reason too long')
    })
  })

  describe('changeUserRoleSchema', () => {
    it('should accept valid role changes', () => {
      const validChanges = [
        { role: 'ADMIN' as const, reason: 'Promotion to admin' },
        { role: 'WORKER' as const, reason: 'Role change to worker' }
      ]

      validChanges.forEach(change => {
        expect(() => changeUserRoleSchema.parse(change)).not.toThrow()
      })
    })

    it('should require reason for role changes', () => {
      expect(() => changeUserRoleSchema.parse({
        role: 'ADMIN' as const,
        reason: ''
      })).toThrow('Reason is required')

      expect(() => changeUserRoleSchema.parse({
        role: 'ADMIN' as const,
        reason: 'a'.repeat(201)
      })).toThrow('Reason too long')
    })

    it('should validate role', () => {
      expect(() => changeUserRoleSchema.parse({
        role: 'INVALID_ROLE',
        reason: 'Invalid role test'
      })).toThrow('Invalid role')
    })
  })

  describe('workerAssignmentSchema', () => {
    it('should accept valid worker assignments', () => {
      const validAssignments = [
        {
          workerIds: ['cjld2cjxh0000qzrmn831i7rn'],
          clientIds: ['cjld2cjxh0000qzrmn831i7ro']
        },
        {
          workerIds: ['cjld2cjxh0000qzrmn831i7rn', 'cjld2cjxh0000qzrmn831i7rp'],
          clientIds: ['cjld2cjxh0000qzrmn831i7ro', 'cjld2cjxh0000qzrmn831i7rq']
        }
      ]

      validAssignments.forEach(assignment => {
        expect(() => workerAssignmentSchema.parse(assignment)).not.toThrow()
      })
    })

    it('should enforce minimum requirements', () => {
      expect(() => workerAssignmentSchema.parse({
        workerIds: [],
        clientIds: ['cjld2cjxh0000qzrmn831i7rn']
      })).toThrow('At least one worker required')

      expect(() => workerAssignmentSchema.parse({
        workerIds: ['cjld2cjxh0000qzrmn831i7rn'],
        clientIds: []
      })).toThrow('At least one client required')
    })

    it('should enforce maximum limits', () => {
      expect(() => workerAssignmentSchema.parse({
        workerIds: Array.from({ length: 51 }, (_, i) => `cjld2cjxh0000qzrmn831i7r${i}`),
        clientIds: ['cjld2cjxh0000qzrmn831i7rn']
      })).toThrow('Too many workers')

      expect(() => workerAssignmentSchema.parse({
        workerIds: ['cjld2cjxh0000qzrmn831i7rn'],
        clientIds: Array.from({ length: 101 }, (_, i) => `cjld2cjxh0000qzrmn831i7r${i}`)
      })).toThrow('Too many clients')
    })
  })

  describe('Response Schemas', () => {
    describe('userListResponseSchema', () => {
      it('should accept valid user list response', () => {
        const validResponse = {
          success: true,
          data: [{
            id: 'cjld2cjxh0000qzrmn831i7rn',
            email: 'user@example.com',
            role: 'CLIENT' as const,
            isActive: true,
            emailVerified: true,
            emailVerifiedAt: null,
            lastLoginAt: null,
            loginAttempts: 0,
            lockedUntil: null,
            supervisorId: null,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            version: 1,
            dataClassification: 'PII' as const
          }],
          meta: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1
          }
        }
        expect(() => userListResponseSchema.parse(validResponse)).not.toThrow()
      })
    })

    describe('userDetailResponseSchema', () => {
      it('should accept valid user detail response', () => {
        const validResponse = {
          success: true,
          data: {
            id: 'cjld2cjxh0000qzrmn831i7rn',
            email: 'user@example.com',
            role: 'CLIENT' as const,
            isActive: true,
            emailVerified: true,
            emailVerifiedAt: null,
            lastLoginAt: null,
            loginAttempts: 0,
            lockedUntil: null,
            supervisorId: null,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            version: 1,
            dataClassification: 'PII' as const
          }
        }
        expect(() => userDetailResponseSchema.parse(validResponse)).not.toThrow()
      })
    })

    describe('createUserResponseSchema', () => {
      it('should accept valid user creation response', () => {
        const validResponse = {
          success: true,
          data: {
            id: 'cjld2cjxh0000qzrmn831i7rn',
            email: 'user@example.com',
            role: 'CLIENT' as const,
            isActive: true,
            emailVerified: false
          }
        }
        expect(() => createUserResponseSchema.parse(validResponse)).not.toThrow()
      })
    })
  })
})