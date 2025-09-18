import { faker } from '@faker-js/faker'
import type { User, Profile } from '@caretracker/database'

export interface CreateUserFactoryOptions {
  readonly role?: 'CLIENT' | 'WORKER' | 'ADMIN' | 'SUPERVISOR'
  readonly isActive?: boolean
  readonly emailVerified?: boolean
  readonly withProfile?: boolean
  readonly profile?: Partial<CreateProfileFactoryOptions>
}

export interface CreateProfileFactoryOptions {
  readonly firstName?: string
  readonly lastName?: string
  readonly phone?: string
  readonly dateOfBirth?: Date
  readonly gender?: string
  readonly medicalRecordNumber?: string
  readonly insuranceNumber?: string
  readonly insuranceProvider?: string
  readonly allergies?: string[]
  readonly medications?: string[]
  readonly medicalConditions?: string[]
}

export const UserFactory = {
  build(options: CreateUserFactoryOptions = {}): Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return {
      email: faker.internet.email().toLowerCase(),
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxnBwBoS', // bcrypt hash for 'password123'
      role: options.role || faker.helpers.arrayElement(['CLIENT', 'WORKER', 'ADMIN', 'SUPERVISOR'] as const),
      isActive: options.isActive ?? true,
      emailVerified: options.emailVerified ?? faker.datatype.boolean(),
      emailVerifiedAt: options.emailVerified ? faker.date.past() : null,
      lastLoginAt: faker.date.recent(),
      loginAttempts: 0,
      lockedUntil: null,
      passwordResetToken: null,
      passwordResetExpiresAt: null,
      supervisorId: null,
      createdBy: null,
      updatedBy: null,
      deletedAt: null
    }
  },

  buildMany(count: number, options: CreateUserFactoryOptions = {}): Array<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'>> {
    return Array.from({ length: count }, () => this.build(options))
  },

  buildClient(options: CreateUserFactoryOptions = {}): Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({ ...options, role: 'CLIENT' })
  },

  buildWorker(options: CreateUserFactoryOptions = {}): Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({ ...options, role: 'WORKER' })
  },

  buildAdmin(options: CreateUserFactoryOptions = {}): Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({ ...options, role: 'ADMIN' })
  },

  buildSupervisor(options: CreateUserFactoryOptions = {}): Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'version'> {
    return this.build({ ...options, role: 'SUPERVISOR' })
  }
}

export const ProfileFactory = {
  build(options: CreateProfileFactoryOptions = {}): Omit<Profile, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'version'> {
    const firstName = options.firstName || faker.person.firstName()
    const lastName = options.lastName || faker.person.lastName()
    const gender = options.gender || faker.helpers.arrayElement(['Male', 'Female', 'Non-binary', 'Prefer not to say'])
    const dateOfBirth = options.dateOfBirth || faker.date.birthdate({ min: 18, max: 95, mode: 'age' })

    return {
      firstName,
      lastName,
      middleName: faker.datatype.boolean() ? faker.person.middleName() : null,
      preferredName: faker.datatype.boolean() ? faker.person.firstName() : null,
      phone: options.phone || faker.phone.number(),
      alternatePhone: faker.datatype.boolean() ? faker.phone.number() : null,
      email: faker.datatype.boolean() ? faker.internet.email(firstName, lastName) : null,
      streetAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: 'United States',
      dateOfBirth,
      gender,
      medicalRecordNumber: options.medicalRecordNumber || `MRN${faker.string.numeric(8)}`,
      insuranceNumber: options.insuranceNumber || faker.string.alphanumeric(12, { casing: 'upper' }),
      insuranceProvider: options.insuranceProvider || faker.helpers.arrayElement([
        'Blue Cross Blue Shield',
        'Aetna',
        'UnitedHealth',
        'Anthem',
        'Humana',
        'Cigna',
        'Kaiser Permanente'
      ]),
      primaryCarePhysician: `Dr. ${faker.person.fullName()}`,
      emergencyContactName: faker.person.fullName(),
      emergencyContactPhone: faker.phone.number(),
      emergencyContactRelation: faker.helpers.arrayElement(['Spouse', 'Child', 'Parent', 'Sibling', 'Friend']),
      emergencyContactAddress: faker.location.streetAddress(),
      allergies: options.allergies || this.generateAllergies(),
      medications: options.medications || this.generateMedications(),
      medicalConditions: options.medicalConditions || this.generateMedicalConditions(),
      specialNeeds: faker.datatype.boolean() ? faker.lorem.sentence() : null,
      preferredLanguage: faker.helpers.arrayElement(['English', 'Spanish', 'French', 'German', 'Italian']),
      timezone: faker.helpers.arrayElement([
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'America/Phoenix'
      ]),
      photoUrl: faker.datatype.boolean() ? faker.image.avatar() : null,
      createdBy: null,
      updatedBy: null,
      deletedAt: null
    }
  },

  generateAllergies(): string[] {
    const commonAllergies = [
      'Penicillin',
      'Sulfa drugs',
      'Latex',
      'Peanuts',
      'Tree nuts',
      'Shellfish',
      'Dairy',
      'Eggs',
      'Bee stings',
      'Dust mites',
      'Pollen'
    ]

    if (faker.datatype.boolean({ probability: 0.3 })) {
      return []
    }

    const count = faker.number.int({ min: 1, max: 3 })
    return faker.helpers.arrayElements(commonAllergies, count)
  },

  generateMedications(): string[] {
    const commonMedications = [
      'Lisinopril 10mg daily',
      'Metformin 500mg twice daily',
      'Atorvastatin 20mg daily',
      'Amlodipine 5mg daily',
      'Omeprazole 20mg daily',
      'Levothyroxine 50mcg daily',
      'Gabapentin 300mg three times daily',
      'Sertraline 50mg daily',
      'Aspirin 81mg daily',
      'Vitamin D3 1000IU daily'
    ]

    if (faker.datatype.boolean({ probability: 0.2 })) {
      return []
    }

    const count = faker.number.int({ min: 1, max: 4 })
    return faker.helpers.arrayElements(commonMedications, count)
  },

  generateMedicalConditions(): string[] {
    const commonConditions = [
      'Hypertension',
      'Type 2 Diabetes',
      'High Cholesterol',
      'Arthritis',
      'Chronic Pain',
      'Depression',
      'Anxiety',
      'COPD',
      'Heart Disease',
      'Stroke Recovery',
      'Dementia',
      'Alzheimer\'s Disease'
    ]

    if (faker.datatype.boolean({ probability: 0.1 })) {
      return []
    }

    const count = faker.number.int({ min: 1, max: 3 })
    return faker.helpers.arrayElements(commonConditions, count)
  }
}

export const HealthcareUserFactory = {
  buildClientWithProfile(options: CreateUserFactoryOptions & { profile?: CreateProfileFactoryOptions } = {}) {
    const user = UserFactory.buildClient(options)
    const profile = ProfileFactory.build({
      ...options.profile,
      medicalConditions: options.profile?.medicalConditions || ProfileFactory.generateMedicalConditions(),
      medications: options.profile?.medications || ProfileFactory.generateMedications(),
      allergies: options.profile?.allergies || ProfileFactory.generateAllergies()
    })

    return { user, profile }
  },

  buildWorkerWithProfile(options: CreateUserFactoryOptions & { profile?: CreateProfileFactoryOptions } = {}) {
    const user = UserFactory.buildWorker(options)
    const profile = ProfileFactory.build({
      ...options.profile,
      medicalConditions: [],
      medications: [],
      allergies: [],
      medicalRecordNumber: null,
      insuranceNumber: null,
      insuranceProvider: null
    })

    return { user, profile }
  }
}