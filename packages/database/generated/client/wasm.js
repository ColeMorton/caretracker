
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  isActive: 'isActive',
  emailVerified: 'emailVerified',
  emailVerifiedAt: 'emailVerifiedAt',
  lastLoginAt: 'lastLoginAt',
  refreshToken: 'refreshToken',
  refreshTokenExpiresAt: 'refreshTokenExpiresAt',
  passwordResetToken: 'passwordResetToken',
  passwordResetExpiresAt: 'passwordResetExpiresAt',
  loginAttempts: 'loginAttempts',
  lockedUntil: 'lockedUntil',
  supervisorId: 'supervisorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedAt: 'deletedAt',
  version: 'version',
  dataClassification: 'dataClassification'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  preferredName: 'preferredName',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  email: 'email',
  streetAddress: 'streetAddress',
  city: 'city',
  state: 'state',
  zipCode: 'zipCode',
  country: 'country',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  medicalRecordNumber: 'medicalRecordNumber',
  insuranceNumber: 'insuranceNumber',
  insuranceProvider: 'insuranceProvider',
  primaryCarePhysician: 'primaryCarePhysician',
  emergencyContactName: 'emergencyContactName',
  emergencyContactPhone: 'emergencyContactPhone',
  emergencyContactRelation: 'emergencyContactRelation',
  emergencyContactAddress: 'emergencyContactAddress',
  allergies: 'allergies',
  medications: 'medications',
  medicalConditions: 'medicalConditions',
  specialNeeds: 'specialNeeds',
  preferredLanguage: 'preferredLanguage',
  timezone: 'timezone',
  photoUrl: 'photoUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedAt: 'deletedAt',
  version: 'version',
  dataClassification: 'dataClassification'
};

exports.Prisma.VisitScalarFieldEnum = {
  id: 'id',
  clientId: 'clientId',
  workerId: 'workerId',
  scheduledAt: 'scheduledAt',
  scheduledEndAt: 'scheduledEndAt',
  actualStartAt: 'actualStartAt',
  actualEndAt: 'actualEndAt',
  duration: 'duration',
  actualDuration: 'actualDuration',
  status: 'status',
  visitType: 'visitType',
  location: 'location',
  notes: 'notes',
  privateNotes: 'privateNotes',
  activities: 'activities',
  plannedActivities: 'plannedActivities',
  medications: 'medications',
  vitals: 'vitals',
  clientSatisfaction: 'clientSatisfaction',
  workerNotes: 'workerNotes',
  supervisorReview: 'supervisorReview',
  reviewedAt: 'reviewedAt',
  reviewedBy: 'reviewedBy',
  billableTime: 'billableTime',
  billingRate: 'billingRate',
  totalCost: 'totalCost',
  invoiceId: 'invoiceId',
  documentationComplete: 'documentationComplete',
  cancellationReason: 'cancellationReason',
  rescheduledFrom: 'rescheduledFrom',
  rescheduledTo: 'rescheduledTo',
  carePlanId: 'carePlanId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedAt: 'deletedAt',
  version: 'version',
  dataClassification: 'dataClassification'
};

exports.Prisma.CarePlanScalarFieldEnum = {
  id: 'id',
  clientId: 'clientId',
  name: 'name',
  description: 'description',
  status: 'status',
  priority: 'priority',
  category: 'category',
  goals: 'goals',
  objectives: 'objectives',
  expectedOutcomes: 'expectedOutcomes',
  standardActivities: 'standardActivities',
  specialInstructions: 'specialInstructions',
  medicationReminders: 'medicationReminders',
  emergencyProtocols: 'emergencyProtocols',
  startDate: 'startDate',
  endDate: 'endDate',
  reviewDate: 'reviewDate',
  lastReviewDate: 'lastReviewDate',
  initialAssessment: 'initialAssessment',
  progressNotes: 'progressNotes',
  goalsAchieved: 'goalsAchieved',
  challengesFaced: 'challengesFaced',
  diagnosisCodes: 'diagnosisCodes',
  treatmentPlan: 'treatmentPlan',
  restrictionsLimitations: 'restrictionsLimitations',
  safetyConsiderations: 'safetyConsiderations',
  primaryCaregiver: 'primaryCaregiver',
  supervising: 'supervising',
  familyContacts: 'familyContacts',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  nextReviewBy: 'nextReviewBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedAt: 'deletedAt',
  version: 'version',
  dataClassification: 'dataClassification'
};

exports.Prisma.BudgetScalarFieldEnum = {
  id: 'id',
  clientId: 'clientId',
  name: 'name',
  description: 'description',
  status: 'status',
  budgetType: 'budgetType',
  totalAllocated: 'totalAllocated',
  totalSpent: 'totalSpent',
  totalCommitted: 'totalCommitted',
  remaining: 'remaining',
  periodStart: 'periodStart',
  periodEnd: 'periodEnd',
  fiscalYear: 'fiscalYear',
  personalCare: 'personalCare',
  medicalServices: 'medicalServices',
  transportation: 'transportation',
  homeModifications: 'homeModifications',
  emergencyFund: 'emergencyFund',
  other: 'other',
  personalCareSpent: 'personalCareSpent',
  medicalServicesSpent: 'medicalServicesSpent',
  transportationSpent: 'transportationSpent',
  homeModificationsSpent: 'homeModificationsSpent',
  emergencyFundSpent: 'emergencyFundSpent',
  otherSpent: 'otherSpent',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  lastReviewDate: 'lastReviewDate',
  nextReviewDate: 'nextReviewDate',
  autoRenew: 'autoRenew',
  warningThreshold: 'warningThreshold',
  criticalThreshold: 'criticalThreshold',
  alertsEnabled: 'alertsEnabled',
  fundingSource: 'fundingSource',
  authorizationNumber: 'authorizationNumber',
  authorizationExpiry: 'authorizationExpiry',
  notes: 'notes',
  restrictions: 'restrictions',
  approvalRequired: 'approvalRequired',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedAt: 'deletedAt',
  version: 'version',
  dataClassification: 'dataClassification'
};

exports.Prisma.BudgetExpenseScalarFieldEnum = {
  id: 'id',
  budgetId: 'budgetId',
  visitId: 'visitId',
  description: 'description',
  category: 'category',
  amount: 'amount',
  expenseDate: 'expenseDate',
  approvedBy: 'approvedBy',
  approvedAt: 'approvedAt',
  status: 'status',
  receiptUrl: 'receiptUrl',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  deletedAt: 'deletedAt',
  version: 'version',
  dataClassification: 'dataClassification'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  entityType: 'entityType',
  entityId: 'entityId',
  action: 'action',
  oldValues: 'oldValues',
  newValues: 'newValues',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  sessionId: 'sessionId',
  requestId: 'requestId',
  endpoint: 'endpoint',
  reason: 'reason',
  approvalRequired: 'approvalRequired',
  approvedBy: 'approvedBy',
  dataAccessed: 'dataAccessed',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  CLIENT: 'CLIENT',
  WORKER: 'WORKER',
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR'
};

exports.DataClassification = exports.$Enums.DataClassification = {
  PUBLIC: 'PUBLIC',
  INTERNAL: 'INTERNAL',
  PII: 'PII',
  PHI: 'PHI'
};

exports.VisitStatus = exports.$Enums.VisitStatus = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
  RESCHEDULED: 'RESCHEDULED'
};

exports.CarePlanStatus = exports.$Enums.CarePlanStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  DISCONTINUED: 'DISCONTINUED'
};

exports.BudgetStatus = exports.$Enums.BudgetStatus = {
  ACTIVE: 'ACTIVE',
  EXHAUSTED: 'EXHAUSTED',
  EXPIRED: 'EXPIRED',
  SUSPENDED: 'SUSPENDED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Profile: 'Profile',
  Visit: 'Visit',
  CarePlan: 'CarePlan',
  Budget: 'Budget',
  BudgetExpense: 'BudgetExpense',
  AuditLog: 'AuditLog'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
