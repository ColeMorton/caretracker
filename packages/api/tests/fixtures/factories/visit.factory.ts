import { faker } from '@faker-js/faker'
import type { Visit } from '@caretracker/database'

export interface CreateVisitFactoryOptions {
  readonly clientId?: string
  readonly workerId?: string
  readonly scheduledAt?: Date
  readonly estimatedDuration?: number
  readonly status?: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  readonly activities?: string[]
  readonly notes?: string
  readonly actualStartTime?: Date
  readonly actualEndTime?: Date
  readonly actualDuration?: number
}

export const VisitFactory = {
  build(options: CreateVisitFactoryOptions = {}): Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    const scheduledAt = options.scheduledAt || faker.date.future()
    const estimatedDuration = options.estimatedDuration || faker.helpers.arrayElement([60, 90, 120, 180])
    const status = options.status || 'SCHEDULED'

    let actualStartTime = options.actualStartTime
    let actualEndTime = options.actualEndTime
    let actualDuration = options.actualDuration

    // Generate realistic actual times based on status
    if (status === 'IN_PROGRESS') {
      actualStartTime = actualStartTime || faker.date.recent()
      actualEndTime = null
      actualDuration = null
    } else if (status === 'COMPLETED') {
      actualStartTime = actualStartTime || new Date(scheduledAt.getTime() + faker.number.int({ min: -15, max: 15 }) * 60000)
      actualDuration = actualDuration || faker.number.int({ min: estimatedDuration - 30, max: estimatedDuration + 30 })
      actualEndTime = actualEndTime || new Date(actualStartTime.getTime() + actualDuration * 60000)
    }

    return {
      clientId: options.clientId || faker.string.uuid(),
      workerId: options.workerId || faker.string.uuid(),
      scheduledAt,
      estimatedDuration,
      status,
      activities: options.activities || this.generateActivities(),
      notes: options.notes || (status === 'COMPLETED' ? this.generateNotes() : null),
      actualStartTime,
      actualEndTime,
      actualDuration,
      createdBy: null,
      updatedBy: null,
      deletedAt: null
    }
  },

  generateActivities(): string[] {
    const commonActivities = [
      'Personal hygiene assistance',
      'Medication reminder',
      'Meal preparation',
      'Light housekeeping',
      'Companionship',
      'Transportation assistance',
      'Mobility assistance',
      'Exercise supervision',
      'Vital signs monitoring',
      'Wound care',
      'Diabetic care',
      'Physical therapy exercises',
      'Cognitive stimulation',
      'Safety assessment',
      'Equipment maintenance'
    ]

    const count = faker.number.int({ min: 2, max: 5 })
    return faker.helpers.arrayElements(commonActivities, count)
  },

  generateNotes(): string {
    const noteTemplates = [
      'Client was in good spirits today. All activities completed successfully.',
      'Medication taken as prescribed. Client reported feeling well.',
      'Assisted with mobility exercises. Client showed improvement in strength.',
      'Prepared nutritious meal. Client ate well and enjoyed conversation.',
      'Completed hygiene assistance. Client was cooperative and grateful.',
      'Provided companionship and emotional support. Client seemed less anxious.',
      'Monitored vital signs - all within normal ranges.',
      'Assisted with light housekeeping. Home environment is safe and clean.',
      'Client completed physical therapy exercises with minimal assistance.',
      'Reviewed medication schedule with client. No concerns noted.'
    ]

    const additionalNotes = [
      'Client requests earlier visit time next week.',
      'Family member visited during care session.',
      'Client mentioned slight discomfort - will monitor.',
      'Equipment functioning properly.',
      'Client achieved personal care goals for today.',
      'Discussed nutrition and hydration needs.',
      'Client expressed satisfaction with care provided.'
    ]

    let notes = faker.helpers.arrayElement(noteTemplates)

    if (faker.datatype.boolean({ probability: 0.3 })) {
      notes += ' ' + faker.helpers.arrayElement(additionalNotes)
    }

    return notes
  },

  buildScheduled(options: CreateVisitFactoryOptions = {}): Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({ ...options, status: 'SCHEDULED' })
  },

  buildInProgress(options: CreateVisitFactoryOptions = {}): Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({
      ...options,
      status: 'IN_PROGRESS',
      scheduledAt: faker.date.recent(),
      actualStartTime: faker.date.recent()
    })
  },

  buildCompleted(options: CreateVisitFactoryOptions = {}): Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    const scheduledAt = options.scheduledAt || faker.date.past()
    const estimatedDuration = options.estimatedDuration || 120
    const actualDuration = faker.number.int({ min: estimatedDuration - 30, max: estimatedDuration + 30 })
    const actualStartTime = new Date(scheduledAt.getTime() + faker.number.int({ min: -15, max: 15 }) * 60000)
    const actualEndTime = new Date(actualStartTime.getTime() + actualDuration * 60000)

    return this.build({
      ...options,
      status: 'COMPLETED',
      scheduledAt,
      estimatedDuration,
      actualStartTime,
      actualEndTime,
      actualDuration,
      notes: this.generateNotes()
    })
  },

  buildCancelled(options: CreateVisitFactoryOptions = {}): Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({
      ...options,
      status: 'CANCELLED',
      notes: faker.helpers.arrayElement([
        'Client requested cancellation due to illness',
        'Worker unavailable - family emergency',
        'Inclement weather conditions',
        'Client hospitalized',
        'Rescheduled at client request'
      ])
    })
  },

  buildNoShow(options: CreateVisitFactoryOptions = {}): Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({
      ...options,
      status: 'NO_SHOW',
      scheduledAt: faker.date.past(),
      notes: 'Worker arrived but client was not home. No response to calls.'
    })
  },

  buildMany(count: number, options: CreateVisitFactoryOptions = {}): Array<Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'>> {
    return Array.from({ length: count }, () => this.build(options))
  },

  buildWeeklySchedule(clientId: string, workerId: string, startDate: Date = new Date()): Array<Omit<Visit, 'id' | 'createdAt' | 'updatedAt' | 'version'>> {
    const visits = []
    const daysOfWeek = [1, 3, 5] // Monday, Wednesday, Friday

    for (let week = 0; week < 4; week++) {
      for (const dayOffset of daysOfWeek) {
        const visitDate = new Date(startDate)
        visitDate.setDate(startDate.getDate() + (week * 7) + dayOffset)
        visitDate.setHours(faker.number.int({ min: 9, max: 16 }), 0, 0, 0)

        const status = visitDate < new Date() ?
          faker.helpers.arrayElement(['COMPLETED', 'CANCELLED', 'NO_SHOW'] as const) :
          'SCHEDULED'

        visits.push(this.build({
          clientId,
          workerId,
          scheduledAt: visitDate,
          status,
          estimatedDuration: 120
        }))
      }
    }

    return visits
  }
}

export const HealthcareVisitScenarios = {
  createTypicalWeek(clientId: string, workerId: string) {
    return {
      monday: VisitFactory.buildCompleted({
        clientId,
        workerId,
        scheduledAt: new Date(2024, 0, 1, 10, 0), // Monday 10 AM
        activities: ['Personal hygiene assistance', 'Medication reminder', 'Light housekeeping'],
        estimatedDuration: 120
      }),
      wednesday: VisitFactory.buildCompleted({
        clientId,
        workerId,
        scheduledAt: new Date(2024, 0, 3, 14, 0), // Wednesday 2 PM
        activities: ['Meal preparation', 'Companionship', 'Exercise supervision'],
        estimatedDuration: 90
      }),
      friday: VisitFactory.buildScheduled({
        clientId,
        workerId,
        scheduledAt: new Date(2024, 0, 5, 11, 0), // Friday 11 AM
        activities: ['Vital signs monitoring', 'Medication reminder', 'Transportation assistance'],
        estimatedDuration: 120
      })
    }
  },

  createEmergencyScenario(clientId: string, workerId: string) {
    return {
      regularVisit: VisitFactory.buildInProgress({
        clientId,
        workerId,
        scheduledAt: new Date(),
        activities: ['Personal hygiene assistance', 'Medication reminder']
      }),
      emergencyNote: 'Client experienced fall during visit. Emergency services contacted. Family notified.'
    }
  },

  createMedicationManagement(clientId: string, workerId: string) {
    return VisitFactory.buildCompleted({
      clientId,
      workerId,
      activities: ['Medication reminder', 'Diabetic care', 'Vital signs monitoring'],
      notes: 'All medications taken as prescribed. Blood glucose: 125 mg/dL. Client reported feeling well.',
      estimatedDuration: 60
    })
  }
}