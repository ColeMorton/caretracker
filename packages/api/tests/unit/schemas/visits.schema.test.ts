import { describe, it, expect } from 'vitest'
import {
  vitalsSchema,
  createVisitSchema,
  updateVisitSchema,
  visitCheckinSchema,
  visitCheckoutSchema,
  visitFilterSchema,
  visitResponseSchema,
  visitListResponseSchema,
  visitDetailResponseSchema,
  createVisitResponseSchema,
  updateVisitStatusSchema,
  rescheduleVisitSchema,
  bulkVisitActionSchema,
  visitStatsResponseSchema
} from '../../../src/schemas/visits.js'

describe('Visits Schemas', () => {
  describe('vitalsSchema', () => {
    it('should accept valid vitals with single measurement', () => {
      const validVitals = { heartRate: 72 }
      expect(() => vitalsSchema.parse(validVitals)).not.toThrow()
    })

    it('should accept complete vitals', () => {
      const completeVitals = {
        bloodPressureSystemic: 120,
        bloodPressureDiastolic: 80,
        heartRate: 72,
        temperature: 98.6,
        oxygenSaturation: 98,
        weight: 150,
        height: 70,
        glucose: 95,
        notes: 'Patient feeling well'
      }
      expect(() => vitalsSchema.parse(completeVitals)).not.toThrow()
    })

    it('should reject empty vitals object', () => {
      expect(() => vitalsSchema.parse({})).toThrow('At least one vital measurement is required')
    })

    it('should validate vital sign ranges', () => {
      const invalidVitals = [
        { bloodPressureSystemic: 49 }, // Too low
        { bloodPressureSystemic: 301 }, // Too high
        { heartRate: 29 }, // Too low
        { heartRate: 251 }, // Too high
        { temperature: 89 }, // Too low
        { temperature: 111 }, // Too high
        { oxygenSaturation: 69 }, // Too low
        { oxygenSaturation: 101 }, // Too high
        { weight: 49 }, // Too low
        { weight: 1001 }, // Too high
        { height: 35 }, // Too low
        { height: 97 }, // Too high
        { glucose: 19 }, // Too low
        { glucose: 801 } // Too high
      ]

      invalidVitals.forEach(vitals => {
        expect(() => vitalsSchema.parse(vitals)).toThrow()
      })
    })

    it('should validate notes length', () => {
      expect(() => vitalsSchema.parse({
        heartRate: 72,
        notes: 'a'.repeat(501)
      })).toThrow('Vitals notes too long')
    })
  })

  describe('createVisitSchema', () => {
    const baseVisit = {
      clientId: 'cjld2cjxh0000qzrmn831i7rn',
      workerId: 'cjld2cjxh0000qzrmn831i7ro',
      scheduledAt: '2024-01-01T10:00:00Z'
    }

    it('should accept minimal valid visit', () => {
      expect(() => createVisitSchema.parse(baseVisit)).not.toThrow()
    })

    it('should accept complete visit with all fields', () => {
      const completeVisit = {
        ...baseVisit,
        scheduledEndAt: '2024-01-01T12:00:00Z',
        duration: 120,
        visitType: 'Personal Care',
        location: 'Client Home',
        activities: ['Personal care', 'Medication reminder'],
        plannedActivities: ['Physical therapy'],
        notes: 'Regular visit',
        privateNotes: 'Confidential information',
        carePlanId: 'cjld2cjxh0000qzrmn831i7rp',
        estimatedCost: 15000 // $150.00 in cents
      }
      expect(() => createVisitSchema.parse(completeVisit)).not.toThrow()
    })

    it('should validate duration limits', () => {
      expect(() => createVisitSchema.parse({
        ...baseVisit,
        duration: 14 // Too short
      })).toThrow('Visit must be at least 15 minutes')

      expect(() => createVisitSchema.parse({
        ...baseVisit,
        duration: 481 // Too long
      })).toThrow('Visit cannot exceed 8 hours')
    })

    it('should validate scheduledEndAt is after scheduledAt', () => {
      expect(() => createVisitSchema.parse({
        ...baseVisit,
        scheduledAt: '2024-01-01T12:00:00Z',
        scheduledEndAt: '2024-01-01T10:00:00Z' // Before start time
      })).toThrow('Scheduled end time must be after start time')
    })

    it('should validate field lengths', () => {
      const longStringTests = [
        { visitType: 'a'.repeat(51) },
        { location: 'a'.repeat(201) },
        { notes: 'a'.repeat(1001) },
        { privateNotes: 'a'.repeat(1001) }
      ]

      longStringTests.forEach(test => {
        expect(() => createVisitSchema.parse({
          ...baseVisit,
          ...test
        })).toThrow()
      })
    })

    it('should validate activities array', () => {
      expect(() => createVisitSchema.parse({
        ...baseVisit,
        activities: [] // Empty array
      })).toThrow('At least one activity is required')

      expect(() => createVisitSchema.parse({
        ...baseVisit,
        activities: Array.from({ length: 21 }, (_, i) => `Activity ${i + 1}`)
      })).toThrow('Too many activities specified')
    })
  })

  describe('updateVisitSchema', () => {
    it('should accept partial updates', () => {
      const validUpdates = [
        { status: 'COMPLETED' as const },
        { visitType: 'Emergency Visit' },
        { clientSatisfaction: 5 },
        { cancellationReason: 'Client request' },
        {}
      ]

      validUpdates.forEach(update => {
        expect(() => updateVisitSchema.parse(update)).not.toThrow()
      })
    })

    it('should validate client satisfaction rating', () => {
      const invalidRatings = [0, 6, -1, 2.5]
      invalidRatings.forEach(rating => {
        expect(() => updateVisitSchema.parse({
          clientSatisfaction: rating
        })).toThrow()
      })
    })

    it('should validate duration limits when provided', () => {
      expect(() => updateVisitSchema.parse({
        duration: 14
      })).toThrow()

      expect(() => updateVisitSchema.parse({
        duration: 481
      })).toThrow()
    })
  })

  describe('visitCheckinSchema', () => {
    it('should accept valid check-in data', () => {
      const validCheckins = [
        {},
        { location: 'Client Home' },
        { notes: 'Arrived on time' },
        { arrivalMethod: 'driving' as const },
        {
          location: 'Client Apartment',
          notes: 'Traffic delay',
          arrivalMethod: 'public_transport' as const
        }
      ]

      validCheckins.forEach(checkin => {
        expect(() => visitCheckinSchema.parse(checkin)).not.toThrow()
      })
    })

    it('should validate field lengths', () => {
      expect(() => visitCheckinSchema.parse({
        location: 'a'.repeat(201)
      })).toThrow('Location too long')

      expect(() => visitCheckinSchema.parse({
        notes: 'a'.repeat(501)
      })).toThrow('Check-in notes too long')
    })

    it('should validate arrival method enum', () => {
      expect(() => visitCheckinSchema.parse({
        arrivalMethod: 'invalid_method'
      })).toThrow()
    })
  })

  describe('visitCheckoutSchema', () => {
    const validCheckout = {
      activities: ['Personal care', 'Medication reminder']
    }

    it('should accept minimal valid checkout', () => {
      expect(() => visitCheckoutSchema.parse(validCheckout)).not.toThrow()
    })

    it('should accept complete checkout data', () => {
      const completeCheckout = {
        ...validCheckout,
        notes: 'Visit completed successfully',
        vitals: { heartRate: 72, bloodPressureSystemic: 120 },
        medications: ['Lisinopril', 'Metformin'],
        followUpRequired: true,
        followUpReason: 'Schedule follow-up appointment',
        clientCondition: 'good' as const,
        incidentOccurred: false
      }
      expect(() => visitCheckoutSchema.parse(completeCheckout)).not.toThrow()
    })

    it('should use default values for boolean fields', () => {
      const result = visitCheckoutSchema.parse(validCheckout)
      expect(result.followUpRequired).toBe(false)
      expect(result.incidentOccurred).toBe(false)
    })

    it('should require follow-up reason when follow-up is needed', () => {
      expect(() => visitCheckoutSchema.parse({
        ...validCheckout,
        followUpRequired: true
        // Missing followUpReason
      })).toThrow('Follow-up reason required when follow-up is needed')
    })

    it('should require incident description when incident occurred', () => {
      expect(() => visitCheckoutSchema.parse({
        ...validCheckout,
        incidentOccurred: true
        // Missing incidentDescription
      })).toThrow('incident description required when incident occurred')
    })

    it('should validate medications array limits', () => {
      expect(() => visitCheckoutSchema.parse({
        ...validCheckout,
        medications: Array.from({ length: 21 }, (_, i) => `Medication ${i + 1}`)
      })).toThrow('Too many medications')
    })

    it('should validate client condition enum', () => {
      expect(() => visitCheckoutSchema.parse({
        ...validCheckout,
        clientCondition: 'invalid_condition'
      })).toThrow()
    })
  })

  describe('visitFilterSchema', () => {
    it('should accept valid filter parameters', () => {
      const validFilters = [
        {},
        {
          clientId: 'cjld2cjxh0000qzrmn831i7rn',
          workerId: 'cjld2cjxh0000qzrmn831i7ro'
        },
        {
          status: 'COMPLETED' as const,
          visitType: 'Personal Care',
          includeCompleted: false
        },
        {
          onlyOverdue: true,
          needsReview: true,
          carePlanId: 'cjld2cjxh0000qzrmn831i7rp'
        }
      ]

      validFilters.forEach(filter => {
        expect(() => visitFilterSchema.parse(filter)).not.toThrow()
      })
    })

    it('should use default values', () => {
      const result = visitFilterSchema.parse({})
      expect(result.includeCompleted).toBe(true)
      expect(result.onlyOverdue).toBe(false)
      expect(result.needsReview).toBe(false)
      expect(result.page).toBe(1)
      expect(result.limit).toBe(10)
      expect(result.sortOrder).toBe('desc')
    })

    it('should validate ID formats', () => {
      const invalidIds = ['invalid-id', '123', '']
      invalidIds.forEach(id => {
        expect(() => visitFilterSchema.parse({
          clientId: id
        })).toThrow('Invalid ID format')

        expect(() => visitFilterSchema.parse({
          workerId: id
        })).toThrow('Invalid ID format')
      })
    })
  })

  describe('visitResponseSchema', () => {
    const validVisitResponse = {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      clientId: 'cjld2cjxh0000qzrmn831i7ro',
      workerId: 'cjld2cjxh0000qzrmn831i7rp',
      scheduledAt: '2024-01-01T10:00:00Z',
      scheduledEndAt: null,
      actualStartAt: null,
      actualEndAt: null,
      duration: null,
      actualDuration: null,
      status: 'SCHEDULED' as const,
      visitType: null,
      location: null,
      activities: [],
      plannedActivities: [],
      medications: [],
      vitals: null,
      notes: null,
      privateNotes: null,
      workerNotes: null,
      supervisorReview: null,
      clientSatisfaction: null,
      reviewedAt: null,
      reviewedBy: null,
      billableTime: null,
      billingRate: null,
      totalCost: null,
      invoiceId: null,
      documentationComplete: false,
      cancellationReason: null,
      rescheduledFrom: null,
      rescheduledTo: null,
      carePlanId: null,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1,
      dataClassification: 'PHI' as const
    }

    it('should accept valid visit response', () => {
      expect(() => visitResponseSchema.parse(validVisitResponse)).not.toThrow()
    })

    it('should accept visit response with related data', () => {
      const responseWithRelations = {
        ...validVisitResponse,
        client: {
          id: 'cjld2cjxh0000qzrmn831i7ro',
          profile: {
            firstName: 'John',
            lastName: 'Doe'
          }
        },
        worker: {
          id: 'cjld2cjxh0000qzrmn831i7rp',
          profile: {
            firstName: 'Jane',
            lastName: 'Worker'
          }
        },
        carePlan: {
          id: 'cjld2cjxh0000qzrmn831i7rq',
          name: 'Standard Care Plan'
        }
      }
      expect(() => visitResponseSchema.parse(responseWithRelations)).not.toThrow()
    })

    it('should require all mandatory fields', () => {
      const requiredFields = ['id', 'clientId', 'workerId', 'scheduledAt', 'status', 'createdAt', 'updatedAt', 'version']

      requiredFields.forEach(field => {
        const { [field]: _, ...incompleteResponse } = validVisitResponse
        expect(() => visitResponseSchema.parse(incompleteResponse)).toThrow()
      })
    })
  })

  describe('updateVisitStatusSchema', () => {
    it('should accept valid status updates', () => {
      const validUpdates = [
        { status: 'COMPLETED' as const },
        { status: 'CANCELLED' as const, reason: 'Client cancellation' },
        { status: 'CONFIRMED' as const, notifyParties: false }
      ]

      validUpdates.forEach(update => {
        expect(() => updateVisitStatusSchema.parse(update)).not.toThrow()
      })
    })

    it('should use default notification setting', () => {
      const result = updateVisitStatusSchema.parse({ status: 'COMPLETED' as const })
      expect(result.notifyParties).toBe(true)
    })

    it('should validate reason length', () => {
      expect(() => updateVisitStatusSchema.parse({
        status: 'CANCELLED' as const,
        reason: 'a'.repeat(201)
      })).toThrow('Reason too long')
    })
  })

  describe('rescheduleVisitSchema', () => {
    const validReschedule = {
      newScheduledAt: '2024-01-02T10:00:00Z',
      reason: 'Client requested time change'
    }

    it('should accept valid reschedule request', () => {
      expect(() => rescheduleVisitSchema.parse(validReschedule)).not.toThrow()
    })

    it('should accept reschedule with new end time', () => {
      const rescheduleWithEndTime = {
        ...validReschedule,
        newScheduledEndAt: '2024-01-02T12:00:00Z',
        notifyParties: false
      }
      expect(() => rescheduleVisitSchema.parse(rescheduleWithEndTime)).not.toThrow()
    })

    it('should validate new end time is after new start time', () => {
      expect(() => rescheduleVisitSchema.parse({
        ...validReschedule,
        newScheduledAt: '2024-01-02T12:00:00Z',
        newScheduledEndAt: '2024-01-02T10:00:00Z' // Before start time
      })).toThrow('New end time must be after new start time')
    })

    it('should require reason', () => {
      expect(() => rescheduleVisitSchema.parse({
        newScheduledAt: '2024-01-02T10:00:00Z',
        reason: ''
      })).toThrow('Reschedule reason required')

      expect(() => rescheduleVisitSchema.parse({
        newScheduledAt: '2024-01-02T10:00:00Z',
        reason: 'a'.repeat(201)
      })).toThrow('Reason too long')
    })

    it('should use default notification setting', () => {
      const result = rescheduleVisitSchema.parse(validReschedule)
      expect(result.notifyParties).toBe(true)
    })
  })

  describe('bulkVisitActionSchema', () => {
    it('should accept valid bulk actions', () => {
      const validActions = [
        {
          visitIds: ['cjld2cjxh0000qzrmn831i7rn'],
          action: 'cancel' as const,
          reason: 'Bulk cancellation'
        },
        {
          visitIds: ['cjld2cjxh0000qzrmn831i7rn', 'cjld2cjxh0000qzrmn831i7ro'],
          action: 'approve' as const
        },
        {
          visitIds: ['cjld2cjxh0000qzrmn831i7rn'],
          action: 'reschedule' as const,
          newScheduledAt: '2024-01-02T10:00:00Z'
        }
      ]

      validActions.forEach(action => {
        expect(() => bulkVisitActionSchema.parse(action)).not.toThrow()
      })
    })

    it('should enforce visit ID limits', () => {
      expect(() => bulkVisitActionSchema.parse({
        visitIds: [],
        action: 'cancel' as const
      })).toThrow('At least one visit ID required')

      expect(() => bulkVisitActionSchema.parse({
        visitIds: Array.from({ length: 51 }, (_, i) => `cjld2cjxh0000qzrmn831i7r${i}`),
        action: 'cancel' as const
      })).toThrow('Too many visits selected')
    })

    it('should validate action types', () => {
      expect(() => bulkVisitActionSchema.parse({
        visitIds: ['cjld2cjxh0000qzrmn831i7rn'],
        action: 'invalid_action'
      })).toThrow('Invalid bulk action')
    })
  })

  describe('visitStatsResponseSchema', () => {
    it('should accept valid visit statistics', () => {
      const validStats = {
        success: true,
        data: {
          totalVisits: 100,
          completedVisits: 85,
          cancelledVisits: 10,
          upcomingVisits: 5,
          overdueVisits: 2,
          averageDuration: 120.5,
          averageSatisfaction: 4.2,
          completionRate: 85.0
        }
      }
      expect(() => visitStatsResponseSchema.parse(validStats)).not.toThrow()
    })

    it('should accept stats with nullable values', () => {
      const statsWithNulls = {
        success: true,
        data: {
          totalVisits: 0,
          completedVisits: 0,
          cancelledVisits: 0,
          upcomingVisits: 0,
          overdueVisits: 0,
          averageDuration: null,
          averageSatisfaction: null,
          completionRate: 0
        }
      }
      expect(() => visitStatsResponseSchema.parse(statsWithNulls)).not.toThrow()
    })

    it('should validate completion rate range', () => {
      expect(() => visitStatsResponseSchema.parse({
        success: true,
        data: {
          totalVisits: 100,
          completedVisits: 85,
          cancelledVisits: 10,
          upcomingVisits: 5,
          overdueVisits: 2,
          averageDuration: 120.5,
          averageSatisfaction: 4.2,
          completionRate: 101 // Over 100%
        }
      })).toThrow()
    })
  })

  describe('Response Schemas', () => {
    const sampleVisit = {
      id: 'cjld2cjxh0000qzrmn831i7rn',
      clientId: 'cjld2cjxh0000qzrmn831i7ro',
      workerId: 'cjld2cjxh0000qzrmn831i7rp',
      scheduledAt: '2024-01-01T10:00:00Z',
      scheduledEndAt: null,
      actualStartAt: null,
      actualEndAt: null,
      duration: null,
      actualDuration: null,
      status: 'SCHEDULED' as const,
      visitType: null,
      location: null,
      activities: [],
      plannedActivities: [],
      medications: [],
      vitals: null,
      notes: null,
      privateNotes: null,
      workerNotes: null,
      supervisorReview: null,
      clientSatisfaction: null,
      reviewedAt: null,
      reviewedBy: null,
      billableTime: null,
      billingRate: null,
      totalCost: null,
      invoiceId: null,
      documentationComplete: false,
      cancellationReason: null,
      rescheduledFrom: null,
      rescheduledTo: null,
      carePlanId: null,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1,
      dataClassification: 'PHI' as const
    }

    describe('visitListResponseSchema', () => {
      it('should accept valid visit list response', () => {
        const validResponse = {
          success: true,
          data: [sampleVisit],
          meta: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1
          }
        }
        expect(() => visitListResponseSchema.parse(validResponse)).not.toThrow()
      })
    })

    describe('visitDetailResponseSchema', () => {
      it('should accept valid visit detail response', () => {
        const validResponse = {
          success: true,
          data: sampleVisit
        }
        expect(() => visitDetailResponseSchema.parse(validResponse)).not.toThrow()
      })
    })

    describe('createVisitResponseSchema', () => {
      it('should accept valid visit creation response', () => {
        const validResponse = {
          success: true,
          data: sampleVisit
        }
        expect(() => createVisitResponseSchema.parse(validResponse)).not.toThrow()
      })
    })
  })
})