import { PrismaClient, Role, VisitStatus } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.budget.deleteMany()
  await prisma.carePlan.deleteMany()
  await prisma.visit.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const _admin = await prisma.user.create({
    data: {
      email: 'admin@caretracker.com',
      password: adminPassword,
      role: Role.ADMIN,
      profile: {
        create: {
          firstName: 'System',
          lastName: 'Administrator',
          phone: faker.phone.number(),
        },
      },
    },
  })

  // Create care workers
  const workerPassword = await bcrypt.hash('worker123', 10)
  const workers = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      return prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          password: workerPassword,
          role: Role.WORKER,
          profile: {
            create: {
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              phone: faker.phone.number(),
              address: faker.location.streetAddress(true),
            },
          },
        },
      })
    })
  )

  // Create clients
  const clientPassword = await bcrypt.hash('client123', 10)
  const clients = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          password: clientPassword,
          role: Role.CLIENT,
          profile: {
            create: {
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              phone: faker.phone.number(),
              address: faker.location.streetAddress(true),
              dateOfBirth: faker.date.birthdate({ min: 60, max: 90, mode: 'age' }),
              emergencyContact: {
                name: faker.person.fullName(),
                phone: faker.phone.number(),
                relationship: faker.helpers.arrayElement(['Spouse', 'Child', 'Sibling', 'Friend']),
              },
            },
          },
        },
      })
    })
  )

  // Create care plans for clients
  for (const client of clients) {
    await prisma.carePlan.create({
      data: {
        clientId: client.id,
        name: faker.helpers.arrayElement(['Basic Care', 'Advanced Care', 'Specialized Care']),
        description: faker.lorem.paragraph(),
        goals: [
          'Maintain independence',
          'Ensure medication compliance',
          'Provide companionship',
          'Assist with daily activities',
        ],
        activities: [
          'Personal hygiene assistance',
          'Meal preparation',
          'Medication reminders',
          'Light housekeeping',
          'Companionship',
        ],
        startDate: faker.date.past(),
        isActive: true,
      },
    })
  }

  // Create visits
  for (const client of clients) {
    const assignedWorker = faker.helpers.arrayElement(workers)
    
    // Past visits
    for (let i = 0; i < 10; i++) {
      const scheduledAt = faker.date.recent({ days: 30 })
      await prisma.visit.create({
        data: {
          clientId: client.id,
          workerId: assignedWorker.id,
          scheduledAt,
          completedAt: faker.date.soon({ days: 1, refDate: scheduledAt }),
          duration: faker.number.int({ min: 60, max: 240 }),
          status: VisitStatus.COMPLETED,
          notes: faker.lorem.sentence(),
          activities: [
            'Assisted with personal care',
            'Prepared meals',
            'Administered medications',
            'Provided companionship',
          ],
        },
      })
    }

    // Future visits
    for (let i = 0; i < 5; i++) {
      await prisma.visit.create({
        data: {
          clientId: client.id,
          workerId: assignedWorker.id,
          scheduledAt: faker.date.soon({ days: 30 }),
          status: VisitStatus.SCHEDULED,
          activities: [],
        },
      })
    }
  }

  // Create budgets for clients
  for (const client of clients) {
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    await prisma.budget.create({
      data: {
        clientId: client.id,
        total: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }),
        spent: faker.number.float({ min: 0, max: 2000, precision: 0.01 }),
        period: currentMonth,
        allocations: {
          care: faker.number.float({ min: 500, max: 2000, precision: 0.01 }),
          supplies: faker.number.float({ min: 100, max: 500, precision: 0.01 }),
          transport: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
          other: faker.number.float({ min: 0, max: 300, precision: 0.01 }),
        },
      },
    })
  }

  console.log('✅ Database seed completed!')
  console.log(`Created:`)
  console.log(`  - 1 admin user`)
  console.log(`  - ${workers.length} care workers`)
  console.log(`  - ${clients.length} clients`)
  console.log(`  - ${clients.length} care plans`)
  console.log(`  - ${clients.length * 15} visits`)
  console.log(`  - ${clients.length} budgets`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })