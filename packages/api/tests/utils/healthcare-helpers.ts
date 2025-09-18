import { faker } from '@faker-js/faker'
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@caretracker/database'

export interface HealthcareTestUser {
  readonly id: string
  readonly email: string
  readonly role: string
  readonly profile?: {
    readonly id: string
    readonly firstName: string
    readonly lastName: string
    readonly medicalRecordNumber?: string
  }
}

export interface HealthcareTestVisit {
  readonly id: string
  readonly clientId: string
  readonly workerId: string
  readonly scheduledAt: Date
  readonly status: string
  readonly activities: string[]
}

export class HealthcareTestScenarios {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly server?: FastifyInstance
  ) {}

  /**
   * Creates a complete client-worker relationship with visit history
   */
  async createClientWorkerRelationship(): Promise<{
    client: HealthcareTestUser
    worker: HealthcareTestUser
    visits: HealthcareTestVisit[]
  }> {
    const { UserFactory, ProfileFactory } = await import('../fixtures/factories/user.factory.js')
    const { VisitFactory } = await import('../fixtures/factories/visit.factory.js')

    // Create client with medical profile
    const clientData = UserFactory.buildClient({ emailVerified: true })
    const clientProfileData = ProfileFactory.build({
      medicalConditions: ['Diabetes', 'Hypertension'],
      medications: ['Metformin 500mg twice daily', 'Lisinopril 10mg daily'],
      allergies: ['Penicillin']
    })

    const client = await this.prisma.user.create({
      data: {
        ...clientData,
        profile: {
          create: clientProfileData
        }
      },
      include: { profile: true }
    })

    // Create worker
    const workerData = UserFactory.buildWorker({ emailVerified: true })
    const workerProfileData = ProfileFactory.build({
      medicalConditions: [],
      medications: [],
      allergies: [],
      medicalRecordNumber: null,
      insuranceNumber: null,
      insuranceProvider: null
    })

    const worker = await this.prisma.user.create({
      data: {
        ...workerData,
        profile: {
          create: workerProfileData
        }
      },
      include: { profile: true }
    })

    // Create visit history (2 completed, 1 scheduled)
    const visitData = [
      VisitFactory.buildCompleted({
        clientId: client.id,
        workerId: worker.id,
        scheduledAt: faker.date.past({ days: 7 })
      }),
      VisitFactory.buildCompleted({
        clientId: client.id,
        workerId: worker.id,
        scheduledAt: faker.date.past({ days: 3 })
      }),
      VisitFactory.buildScheduled({
        clientId: client.id,
        workerId: worker.id,
        scheduledAt: faker.date.future({ days: 2 })
      })
    ]

    const visits = await Promise.all(
      visitData.map(data => this.prisma.visit.create({ data }))
    )

    return {
      client: {
        id: client.id,
        email: client.email,
        role: client.role,
        profile: client.profile ? {
          id: client.profile.id,
          firstName: client.profile.firstName,
          lastName: client.profile.lastName,
          medicalRecordNumber: client.profile.medicalRecordNumber
        } : undefined
      },
      worker: {
        id: worker.id,
        email: worker.email,
        role: worker.role,
        profile: worker.profile ? {
          id: worker.profile.id,
          firstName: worker.profile.firstName,
          lastName: worker.profile.lastName
        } : undefined
      },
      visits: visits.map(visit => ({
        id: visit.id,
        clientId: visit.clientId,
        workerId: visit.workerId,
        scheduledAt: visit.scheduledAt,
        status: visit.status,
        activities: visit.activities || []
      }))
    }
  }

  /**
   * Creates a supervisor with assigned workers
   */
  async createSupervisorTeam(): Promise<{
    supervisor: HealthcareTestUser
    workers: HealthcareTestUser[]
  }> {
    const { UserFactory, ProfileFactory } = await import('../fixtures/factories/user.factory.js')

    // Create supervisor
    const supervisorData = UserFactory.buildSupervisor({ emailVerified: true })
    const supervisorProfileData = ProfileFactory.build({
      medicalConditions: [],
      medications: [],
      allergies: [],
      medicalRecordNumber: null,
      insuranceNumber: null,
      insuranceProvider: null
    })

    const supervisor = await this.prisma.user.create({
      data: {
        ...supervisorData,
        profile: {
          create: supervisorProfileData
        }
      },
      include: { profile: true }
    })

    // Create workers assigned to supervisor
    const workerData = Array.from({ length: 3 }, () => ({
      ...UserFactory.buildWorker({ emailVerified: true }),
      supervisorId: supervisor.id
    }))

    const workers = await Promise.all(
      workerData.map(data =>
        this.prisma.user.create({
          data: {
            ...data,
            profile: {
              create: ProfileFactory.build({
                medicalConditions: [],
                medications: [],
                allergies: [],
                medicalRecordNumber: null,
                insuranceNumber: null,
                insuranceProvider: null
              })
            }
          },
          include: { profile: true }
        })
      )
    )

    return {
      supervisor: {
        id: supervisor.id,
        email: supervisor.email,
        role: supervisor.role,
        profile: supervisor.profile ? {
          id: supervisor.profile.id,
          firstName: supervisor.profile.firstName,
          lastName: supervisor.profile.lastName
        } : undefined
      },
      workers: workers.map(worker => ({
        id: worker.id,
        email: worker.email,
        role: worker.role,
        profile: worker.profile ? {
          id: worker.profile.id,
          firstName: worker.profile.firstName,
          lastName: worker.profile.lastName
        } : undefined
      }))
    }
  }

  /**
   * Creates a complex scheduling scenario with conflicts
   */
  async createSchedulingConflictScenario(): Promise<{
    worker: HealthcareTestUser
    clients: HealthcareTestUser[]
    conflictingVisits: HealthcareTestVisit[]
  }> {
    const { UserFactory, ProfileFactory } = await import('../fixtures/factories/user.factory.js')
    const { VisitFactory } = await import('../fixtures/factories/visit.factory.js')

    // Create worker
    const workerData = UserFactory.buildWorker({ emailVerified: true })
    const worker = await this.prisma.user.create({
      data: {
        ...workerData,
        profile: {
          create: ProfileFactory.build({
            medicalConditions: [],
            medications: [],
            allergies: [],
            medicalRecordNumber: null,
            insuranceNumber: null,
            insuranceProvider: null
          })
        }
      },
      include: { profile: true }
    })

    // Create multiple clients
    const clientsData = Array.from({ length: 3 }, () => UserFactory.buildClient({ emailVerified: true }))
    const clients = await Promise.all(
      clientsData.map(data =>
        this.prisma.user.create({
          data: {
            ...data,
            profile: {
              create: ProfileFactory.build()
            }
          },
          include: { profile: true }
        })
      )
    )

    // Create overlapping visits for the same time slot
    const baseTime = new Date()
    baseTime.setHours(14, 0, 0, 0) // 2 PM today

    const conflictingVisitsData = clients.map((client, index) =>
      VisitFactory.buildScheduled({
        clientId: client.id,
        workerId: worker.id,
        scheduledAt: new Date(baseTime.getTime() + index * 30 * 60000), // 30 min intervals
        estimatedDuration: 120 // 2 hours each - these will overlap
      })
    )

    const conflictingVisits = await Promise.all(
      conflictingVisitsData.map(data => this.prisma.visit.create({ data }))
    )

    return {
      worker: {
        id: worker.id,
        email: worker.email,
        role: worker.role,
        profile: worker.profile ? {
          id: worker.profile.id,
          firstName: worker.profile.firstName,
          lastName: worker.profile.lastName
        } : undefined
      },
      clients: clients.map(client => ({
        id: client.id,
        email: client.email,
        role: client.role,
        profile: client.profile ? {
          id: client.profile.id,
          firstName: client.profile.firstName,
          lastName: client.profile.lastName,
          medicalRecordNumber: client.profile.medicalRecordNumber
        } : undefined
      })),
      conflictingVisits: conflictingVisits.map(visit => ({
        id: visit.id,
        clientId: visit.clientId,
        workerId: visit.workerId,
        scheduledAt: visit.scheduledAt,
        status: visit.status,
        activities: visit.activities || []
      }))
    }
  }

  /**
   * Creates emergency scenario for testing audit logging
   */
  async createEmergencyScenario(): Promise<{
    client: HealthcareTestUser
    worker: HealthcareTestUser
    emergencyVisit: HealthcareTestVisit
  }> {
    const { client, worker } = await this.createClientWorkerRelationship()
    const { VisitFactory } = await import('../fixtures/factories/visit.factory.js')

    // Create an in-progress visit that will be marked as emergency
    const emergencyVisitData = VisitFactory.buildInProgress({
      clientId: client.id,
      workerId: worker.id,
      scheduledAt: new Date(),
      notes: 'EMERGENCY: Client experienced fall during routine care. Emergency services contacted.'
    })

    const emergencyVisit = await this.prisma.visit.create({
      data: emergencyVisitData
    })

    return {
      client,
      worker,
      emergencyVisit: {
        id: emergencyVisit.id,
        clientId: emergencyVisit.clientId,
        workerId: emergencyVisit.workerId,
        scheduledAt: emergencyVisit.scheduledAt,
        status: emergencyVisit.status,
        activities: emergencyVisit.activities || []
      }
    }
  }
}

/**
 * HIPAA Compliance Test Utilities
 */
export class HIPAATestUtilities {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly server?: FastifyInstance
  ) {}

  /**
   * Verify audit log entry was created for PHI access
   */
  async verifyPHIAccessLogged(userId: string, entityType: string, entityId: string): Promise<boolean> {
    const auditLog = await this.prisma.auditLog.findFirst({
      where: {
        userId,
        entityType,
        entityId,
        dataAccessed: 'PHI'
      }
    })

    return auditLog !== null
  }

  /**
   * Verify unauthorized access attempt was logged
   */
  async verifyUnauthorizedAccessLogged(userId: string, endpoint: string): Promise<boolean> {
    const auditLog = await this.prisma.auditLog.findFirst({
      where: {
        userId,
        entityType: 'SecurityViolation',
        endpoint
      }
    })

    return auditLog !== null
  }

  /**
   * Get all audit events for a user
   */
  async getUserAuditTrail(userId: string): Promise<any[]> {
    return this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
  }

  /**
   * Verify data classification enforcement
   */
  async verifyDataClassification(entityType: string, expectedClassification: string): Promise<boolean> {
    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        entityType,
        dataAccessed: expectedClassification
      }
    })

    return auditLogs.length > 0
  }
}

/**
 * Performance Test Data Generator
 */
export class PerformanceTestDataGenerator {
  constructor(private readonly prisma: PrismaClient) {}

  async generateLargeUserBase(count: number = 1000): Promise<void> {
    const { UserFactory, ProfileFactory } = await import('../fixtures/factories/user.factory.js')

    console.log(`Generating ${count} users for performance testing...`)

    const batchSize = 100
    for (let i = 0; i < count; i += batchSize) {
      const batch = Math.min(batchSize, count - i)
      const usersData = Array.from({ length: batch }, (_, index) => {
        const role = ['CLIENT', 'WORKER', 'ADMIN', 'SUPERVISOR'][index % 4] as any
        return UserFactory.build({ role, emailVerified: true })
      })

      await this.prisma.user.createMany({
        data: usersData
      })
    }

    console.log(`Generated ${count} users successfully`)
  }

  async generateVisitHistory(userCount: number = 100, visitsPerUser: number = 10): Promise<void> {
    const { VisitFactory } = await import('../fixtures/factories/visit.factory.js')

    console.log(`Generating visit history for ${userCount} users...`)

    const users = await this.prisma.user.findMany({
      take: userCount,
      where: { role: { in: ['CLIENT', 'WORKER'] } }
    })

    const clients = users.filter(u => u.role === 'CLIENT')
    const workers = users.filter(u => u.role === 'WORKER')

    if (clients.length === 0 || workers.length === 0) {
      throw new Error('Need both clients and workers to generate visit history')
    }

    for (const client of clients) {
      const worker = faker.helpers.arrayElement(workers)
      const visitsData = Array.from({ length: visitsPerUser }, () =>
        VisitFactory.build({
          clientId: client.id,
          workerId: worker.id,
          status: faker.helpers.arrayElement(['COMPLETED', 'SCHEDULED', 'CANCELLED'])
        })
      )

      await this.prisma.visit.createMany({
        data: visitsData
      })
    }

    console.log(`Generated ${clients.length * visitsPerUser} visits successfully`)
  }
}