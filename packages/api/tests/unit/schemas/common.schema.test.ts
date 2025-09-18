import { describe, it, expect } from 'vitest'
import {
  cuidSchema,
  emailSchema,
  dateTimeSchema,
  positiveIntSchema,
  nonNegativeIntSchema,
  paginationSchema,
  idParamsSchema,
  successResponseSchema,
  paginatedResponseSchema,
  phoneSchema,
  medicalRecordNumberSchema,
  zipCodeSchema,
  passwordSchema,
  roleSchema,
  visitStatusSchema,
  budgetStatusSchema,
  carePlanStatusSchema,
  currencySchema,
  activitySchema,
  activitiesArraySchema,
  fileTypeSchema,
  baseFilterSchema,
  dataClassificationSchema
} from '../../../src/schemas/common.js'

describe('Common Schemas', () => {
  describe('cuidSchema', () => {
    it('should accept valid CUID', () => {
      const validCuid = 'cjld2cjxh0000qzrmn831i7rn'
      expect(() => cuidSchema.parse(validCuid)).not.toThrow()
    })

    it('should reject invalid CUID format', () => {
      const invalidCuids = ['', 'not-a-cuid', '123', 'abc-def-ghi']
      invalidCuids.forEach(invalid => {
        expect(() => cuidSchema.parse(invalid)).toThrow('Invalid ID format')
      })
    })
  })

  describe('emailSchema', () => {
    it('should accept valid email addresses', () => {
      const validEmails = ['test@example.com', 'user.name+tag@domain.co.uk', 'simple@test.io']
      validEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).not.toThrow()
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = ['', 'not-an-email', '@domain.com', 'user@', 'user@domain']
      invalidEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).toThrow('Invalid email format')
      })
    })
  })

  describe('dateTimeSchema', () => {
    it('should accept valid ISO datetime strings', () => {
      const validDates = [
        '2024-01-01T00:00:00Z',
        '2024-12-31T23:59:59.999Z',
        '2024-06-15T12:30:45.123Z'
      ]
      validDates.forEach(date => {
        expect(() => dateTimeSchema.parse(date)).not.toThrow()
      })
    })

    it('should reject invalid datetime formats', () => {
      const invalidDates = ['', '2024-01-01', '2024/01/01', 'not-a-date', '2024-13-01T00:00:00Z']
      invalidDates.forEach(date => {
        expect(() => dateTimeSchema.parse(date)).toThrow('Invalid date format')
      })
    })
  })

  describe('positiveIntSchema', () => {
    it('should accept positive integers', () => {
      const validNumbers = [1, 100, 999999]
      validNumbers.forEach(num => {
        expect(() => positiveIntSchema.parse(num)).not.toThrow()
      })
    })

    it('should reject zero, negative numbers, and decimals', () => {
      const invalidNumbers = [0, -1, -100, 1.5, 0.1]
      invalidNumbers.forEach(num => {
        expect(() => positiveIntSchema.parse(num)).toThrow()
      })
    })
  })

  describe('nonNegativeIntSchema', () => {
    it('should accept zero and positive integers', () => {
      const validNumbers = [0, 1, 100, 999999]
      validNumbers.forEach(num => {
        expect(() => nonNegativeIntSchema.parse(num)).not.toThrow()
      })
    })

    it('should reject negative numbers and decimals', () => {
      const negativeNumbers = [-1, -100]
      negativeNumbers.forEach(num => {
        expect(() => nonNegativeIntSchema.parse(num)).toThrow('Must be non-negative')
      })

      const decimalNumbers = [1.5, -0.1]
      decimalNumbers.forEach(num => {
        expect(() => nonNegativeIntSchema.parse(num)).toThrow('Expected integer, received float')
      })
    })
  })

  describe('paginationSchema', () => {
    it('should use default values when not provided', () => {
      const result = paginationSchema.parse({})
      expect(result).toEqual({ page: 1, limit: 10 })
    })

    it('should accept valid pagination parameters', () => {
      const result = paginationSchema.parse({ page: '5', limit: '25' })
      expect(result).toEqual({ page: 5, limit: 25 })
    })

    it('should enforce minimum and maximum limits', () => {
      expect(() => paginationSchema.parse({ page: 0 })).toThrow('Page must be at least 1')
      expect(() => paginationSchema.parse({ limit: 0 })).toThrow('Limit must be at least 1')
      expect(() => paginationSchema.parse({ limit: 101 })).toThrow('Limit cannot exceed 100')
    })
  })

  describe('phoneSchema', () => {
    it('should accept valid phone numbers', () => {
      const validPhones = [
        '+15551234567', // Standard US number with country code
        '15551234567', // US number without +
        '+442071234567', // UK number
        '123', // Short but valid (1 + 2 digits)
        '12345678901234', // Long but valid (14 digits after first)
        '9876543210' // Standard 10-digit
      ]
      validPhones.forEach(phone => {
        expect(() => phoneSchema.parse(phone)).not.toThrow()
      })
    })

    it('should reject invalid phone formats when string is provided', () => {
      // Test actually invalid phone numbers according to the regex /^\+?[1-9]\d{1,14}$/
      expect(() => phoneSchema.parse('0123456789')).toThrow('Invalid phone number format') // Starts with 0
      expect(() => phoneSchema.parse('+0123456789')).toThrow('Invalid phone number format') // Starts with +0
      expect(() => phoneSchema.parse('not-a-phone')).toThrow('Invalid phone number format') // Contains letters
      expect(() => phoneSchema.parse('555-123-4567')).toThrow('Invalid phone number format') // Contains dashes
      expect(() => phoneSchema.parse('')).toThrow() // Empty string
      expect(() => phoneSchema.parse('12345678901234567')).toThrow('Invalid phone number format') // Too long (>15 digits)
    })

    it('should handle edge case phone numbers correctly', () => {
      // Test boundary conditions
      expect(() => phoneSchema.parse('1')).toThrow() // Too short (needs at least 1 more digit)
      expect(() => phoneSchema.parse('12')).not.toThrow() // Minimum valid (1 + 1 digit)
      expect(() => phoneSchema.parse('123456789012345')).not.toThrow() // Maximum valid (1 + 14 digits)
    })

    it('should allow undefined for optional phone', () => {
      expect(() => phoneSchema.parse(undefined)).not.toThrow()
    })

    it('should return undefined when parsing undefined', () => {
      const result = phoneSchema.parse(undefined)
      expect(result).toBeUndefined()
    })
  })

  describe('medicalRecordNumberSchema', () => {
    it('should accept valid medical record numbers', () => {
      const validMRNs = ['ABC12345678', 'MRN123456789', '1234567890123456']
      validMRNs.forEach(mrn => {
        expect(() => medicalRecordNumberSchema.parse(mrn)).not.toThrow()
      })
    })

    it('should reject invalid medical record numbers', () => {
      const invalidMRNs = ['', 'abc123', 'toolongmedicalrecordnumber', 'MRN-123', 'mrn@123']
      invalidMRNs.forEach(mrn => {
        expect(() => medicalRecordNumberSchema.parse(mrn)).toThrow('Medical record number must be 8-20 alphanumeric characters')
      })
    })

    it('should allow undefined for optional MRN', () => {
      expect(() => medicalRecordNumberSchema.parse(undefined)).not.toThrow()
    })
  })

  describe('zipCodeSchema', () => {
    it('should accept valid ZIP codes', () => {
      const validZips = ['12345', '12345-6789']
      validZips.forEach(zip => {
        expect(() => zipCodeSchema.parse(zip)).not.toThrow()
      })
    })

    it('should reject invalid ZIP codes', () => {
      const invalidZips = ['', '1234', '123456', '12345-678', 'ABCDE']
      invalidZips.forEach(zip => {
        expect(() => zipCodeSchema.parse(zip)).toThrow('Invalid ZIP code format')
      })
    })
  })

  describe('passwordSchema', () => {
    it('should accept valid strong passwords', () => {
      const validPasswords = ['SecureP@ss1', 'MyStr0ng!Password', 'C0mplex$Pass123']
      validPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).not.toThrow()
      })
    })

    it('should reject passwords missing requirements', () => {
      const passwordTests = [
        { password: 'short', error: 'Password must be at least 8 characters' },
        { password: 'nouppercase1!', error: 'Password must contain at least one uppercase letter' },
        { password: 'NOLOWERCASE1!', error: 'Password must contain at least one lowercase letter' },
        { password: 'NoNumbers!', error: 'Password must contain at least one number' },
        { password: 'NoSpecialChars123', error: 'Password must contain at least one special character' }
      ]

      passwordTests.forEach(({ password, error }) => {
        expect(() => passwordSchema.parse(password)).toThrow(error)
      })
    })
  })

  describe('roleSchema', () => {
    it('should accept valid roles', () => {
      const validRoles = ['CLIENT', 'WORKER', 'ADMIN', 'SUPERVISOR']
      validRoles.forEach(role => {
        expect(() => roleSchema.parse(role)).not.toThrow()
      })
    })

    it('should reject invalid roles', () => {
      const invalidRoles = ['', 'INVALID', 'client', 'admin', 'USER']
      invalidRoles.forEach(role => {
        expect(() => roleSchema.parse(role)).toThrow('Invalid role')
      })
    })
  })

  describe('visitStatusSchema', () => {
    it('should accept all valid visit statuses', () => {
      const validStatuses = ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED']
      validStatuses.forEach(status => {
        expect(() => visitStatusSchema.parse(status)).not.toThrow()
      })
    })

    it('should reject invalid visit statuses', () => {
      const invalidStatuses = ['', 'INVALID', 'scheduled', 'PENDING']
      invalidStatuses.forEach(status => {
        expect(() => visitStatusSchema.parse(status)).toThrow('Invalid visit status')
      })
    })
  })

  describe('budgetStatusSchema', () => {
    it('should accept valid budget statuses', () => {
      const validStatuses = ['ACTIVE', 'EXHAUSTED', 'EXPIRED', 'SUSPENDED']
      validStatuses.forEach(status => {
        expect(() => budgetStatusSchema.parse(status)).not.toThrow()
      })
    })

    it('should reject invalid budget statuses', () => {
      const invalidStatuses = ['', 'INVALID', 'active', 'PENDING']
      invalidStatuses.forEach(status => {
        expect(() => budgetStatusSchema.parse(status)).toThrow('Invalid budget status')
      })
    })
  })

  describe('carePlanStatusSchema', () => {
    it('should accept valid care plan statuses', () => {
      const validStatuses = ['DRAFT', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'DISCONTINUED']
      validStatuses.forEach(status => {
        expect(() => carePlanStatusSchema.parse(status)).not.toThrow()
      })
    })

    it('should reject invalid care plan statuses', () => {
      const invalidStatuses = ['', 'INVALID', 'draft', 'PENDING']
      invalidStatuses.forEach(status => {
        expect(() => carePlanStatusSchema.parse(status)).toThrow('Invalid care plan status')
      })
    })
  })

  describe('currencySchema', () => {
    it('should accept valid currency amounts in cents', () => {
      const validAmounts = [0, 1, 1000, 5000000, 99999999]
      validAmounts.forEach(amount => {
        expect(() => currencySchema.parse(amount)).not.toThrow()
      })
    })

    it('should reject invalid currency amounts', () => {
      const invalidAmounts = [-1, 1.5, 100000000]
      const errorMessages = [
        'Amount cannot be negative',
        'Amount must be an integer (in cents)',
        'Amount too large'
      ]

      invalidAmounts.forEach((amount, index) => {
        expect(() => currencySchema.parse(amount)).toThrow(errorMessages[index])
      })
    })
  })

  describe('activitySchema', () => {
    it('should accept valid activity descriptions', () => {
      const validActivities = ['Personal care', 'Medication reminder', 'Physical therapy exercises']
      validActivities.forEach(activity => {
        expect(() => activitySchema.parse(activity)).not.toThrow()
      })
    })

    it('should reject empty or too long activities', () => {
      expect(() => activitySchema.parse('')).toThrow('Activity cannot be empty')
      expect(() => activitySchema.parse('a'.repeat(101))).toThrow('Activity description too long')
    })
  })

  describe('activitiesArraySchema', () => {
    it('should accept valid activity arrays', () => {
      const validArrays = [
        ['Personal care'],
        ['Personal care', 'Medication reminder', 'Companionship'],
        Array.from({ length: 20 }, (_, i) => `Activity ${i + 1}`)
      ]
      validArrays.forEach(activities => {
        expect(() => activitiesArraySchema.parse(activities)).not.toThrow()
      })
    })

    it('should reject invalid activity arrays', () => {
      expect(() => activitiesArraySchema.parse([])).toThrow('At least one activity is required')
      expect(() => activitiesArraySchema.parse(Array.from({ length: 21 }, (_, i) => `Activity ${i + 1}`))).toThrow('Too many activities specified')
    })
  })

  describe('fileTypeSchema', () => {
    it('should accept valid file types', () => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
      validTypes.forEach(type => {
        expect(() => fileTypeSchema.parse(type)).not.toThrow()
      })
    })

    it('should reject invalid file types', () => {
      const invalidTypes = ['', 'image/bmp', 'application/msword', 'video/mp4']
      invalidTypes.forEach(type => {
        expect(() => fileTypeSchema.parse(type)).toThrow('Invalid file type')
      })
    })
  })

  describe('baseFilterSchema', () => {
    it('should accept valid filter parameters', () => {
      const validFilters = [
        {},
        { search: 'John Doe', sortBy: 'name', sortOrder: 'asc' },
        { dateFrom: '2024-01-01T00:00:00Z', dateTo: '2024-12-31T23:59:59Z' }
      ]
      validFilters.forEach(filter => {
        expect(() => baseFilterSchema.parse(filter)).not.toThrow()
      })
    })

    it('should use default sort order', () => {
      const result = baseFilterSchema.parse({ sortBy: 'name' })
      expect(result.sortOrder).toBe('desc')
    })

    it('should reject invalid filter parameters', () => {
      expect(() => baseFilterSchema.parse({ search: 'a'.repeat(101) })).toThrow('Search term too long')
      expect(() => baseFilterSchema.parse({ sortBy: 'a'.repeat(51) })).toThrow('Sort field too long')
      expect(() => baseFilterSchema.parse({ sortOrder: 'invalid' })).toThrow()
    })
  })

  describe('dataClassificationSchema', () => {
    it('should accept valid data classifications', () => {
      const validClassifications = ['PUBLIC', 'INTERNAL', 'PII', 'PHI']
      validClassifications.forEach(classification => {
        expect(() => dataClassificationSchema.parse(classification)).not.toThrow()
      })
    })

    it('should reject invalid data classifications', () => {
      const invalidClassifications = ['', 'CONFIDENTIAL', 'public', 'SECRET']
      invalidClassifications.forEach(classification => {
        expect(() => dataClassificationSchema.parse(classification)).toThrow('Invalid data classification')
      })
    })
  })

  describe('successResponseSchema', () => {
    it('should accept valid success responses', () => {
      const validResponses = [
        { success: true, data: { id: 1 } },
        { success: true, data: [], message: 'Success' },
        { success: true, data: null }
      ]
      validResponses.forEach(response => {
        expect(() => successResponseSchema.parse(response)).not.toThrow()
      })
    })

    it('should reject invalid success responses', () => {
      expect(() => successResponseSchema.parse({ success: false, data: {} })).toThrow()
      expect(() => successResponseSchema.parse({ data: {} })).toThrow()
    })
  })

  describe('paginatedResponseSchema', () => {
    it('should accept valid paginated responses', () => {
      const validResponse = {
        success: true,
        data: [{ id: 1 }, { id: 2 }],
        meta: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1
        }
      }
      expect(() => paginatedResponseSchema.parse(validResponse)).not.toThrow()
    })

    it('should reject responses missing meta information', () => {
      const invalidResponse = {
        success: true,
        data: [],
        meta: {
          page: 1,
          limit: 10
          // missing total and totalPages
        }
      }
      expect(() => paginatedResponseSchema.parse(invalidResponse)).toThrow()
    })
  })

  describe('idParamsSchema', () => {
    it('should accept valid ID parameters', () => {
      const validParams = { id: 'cjld2cjxh0000qzrmn831i7rn' }
      expect(() => idParamsSchema.parse(validParams)).not.toThrow()
    })

    it('should reject invalid ID parameters', () => {
      expect(() => idParamsSchema.parse({ id: 'invalid-id' })).toThrow('Invalid ID format')
      expect(() => idParamsSchema.parse({})).toThrow()
    })
  })
})