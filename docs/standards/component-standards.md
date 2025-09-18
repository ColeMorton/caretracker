# React/Next.js Component Standards (2025)

## Overview

This document defines component development standards for CareTracker's React/Next.js applications, emphasizing accessibility, performance, type safety, and healthcare-specific UI patterns.

## Core Principles

### 1. Healthcare-First Design
- **Accessibility compliance** (WCAG 2.1 AA minimum)
- **High contrast** and readable interfaces
- **Error prevention** over error correction
- **Clear visual hierarchy** for critical information

### 2. Type Safety and Performance
- **TypeScript strict mode** for all components
- **Server Components by default** in Next.js 14
- **Minimal client-side JavaScript**
- **Optimistic UI updates** where appropriate

### 3. Consistency and Reusability
- **Design system compliance** with shadcn/ui
- **Compound component patterns** for complex UI
- **Consistent naming conventions**
- **Comprehensive documentation**

## Component Architecture

### 1. Directory Structure

```
packages/ui/src/
├── components/
│   ├── primitives/          # Basic building blocks
│   │   ├── button/
│   │   ├── input/
│   │   └── card/
│   ├── composite/           # Complex composed components
│   │   ├── visit-card/
│   │   ├── patient-form/
│   │   └── schedule-grid/
│   ├── layout/              # Layout components
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── page-container/
│   └── healthcare/          # Healthcare-specific components
│       ├── vital-signs/
│       ├── medication-list/
│       └── care-plan-view/
├── hooks/                   # Shared React hooks
├── utils/                   # Utility functions
├── types/                   # Component-specific types
└── styles/                  # Global styles and tokens
```

### 2. Component Types and Patterns

#### Server Components (Default)
```typescript
// ✅ Good: Server Component for data fetching
import { getPatientVisits } from '@/lib/api'
import { VisitCard } from '@/components/visit-card'

interface VisitListProps {
  readonly patientId: string
}

export async function VisitList({ patientId }: VisitListProps): Promise<JSX.Element> {
  const visits = await getPatientVisits(patientId)

  return (
    <section aria-label="Recent visits">
      <h2 className="text-xl font-semibold mb-4">Recent Visits</h2>
      <div className="space-y-4">
        {visits.map((visit) => (
          <VisitCard key={visit.id} visit={visit} />
        ))}
      </div>
    </section>
  )
}
```

#### Client Components (When Needed)
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface VisitActionButtonsProps {
  readonly visitId: string
  readonly currentStatus: VisitStatus
}

export function VisitActionButtons({
  visitId,
  currentStatus
}: VisitActionButtonsProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleStartVisit = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await startVisit(visitId)
      toast({ title: 'Visit started successfully' })
    } catch (error) {
      toast({
        title: 'Failed to start visit',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleStartVisit}
        disabled={isLoading || currentStatus !== 'SCHEDULED'}
        aria-describedby="visit-status"
      >
        {isLoading ? 'Starting...' : 'Start Visit'}
      </Button>
    </div>
  )
}
```

## Component Standards

### 1. Naming Conventions

#### Component Names
- **PascalCase** for component names
- **Descriptive** and healthcare-specific
- **Noun-based** for data components
- **Verb-based** for action components

```typescript
// ✅ Good
export function PatientProfile({ patient }: PatientProfileProps) { }
export function ScheduleVisitForm({ onSubmit }: ScheduleVisitFormProps) { }
export function MedicationList({ medications }: MedicationListProps) { }

// ❌ Avoid
export function patient({ data }: any) { }
export function scheduleForm({ onClick }: any) { }
export function meds({ list }: any) { }
```

#### File Names
- **kebab-case** for file names
- **Descriptive** and component-specific
- Include **component type** suffix where helpful

```
// ✅ Good
patient-profile.tsx
schedule-visit-form.tsx
medication-list.tsx
visit-status-badge.tsx

// ❌ Avoid
PatientProfile.tsx
scheduleForm.tsx
meds.tsx
badge.tsx
```

### 2. Props and TypeScript

#### Props Interface Definition
```typescript
// ✅ Good: Explicit, readonly props interface
interface PatientCardProps {
  readonly patient: {
    readonly id: string
    readonly name: string
    readonly dateOfBirth: Date
    readonly medicalRecordNumber: string
  }
  readonly onViewDetails?: (patientId: string) => void
  readonly showActions?: boolean
  readonly className?: string
}

export function PatientCard({
  patient,
  onViewDetails,
  showActions = true,
  className
}: PatientCardProps): JSX.Element {
  // Component implementation
}
```

#### Children and Composition
```typescript
// ✅ Good: Explicit children typing
interface AlertProps {
  readonly children: React.ReactNode
  readonly variant: 'info' | 'warning' | 'error' | 'success'
  readonly title?: string
}

export function Alert({ children, variant, title }: AlertProps): JSX.Element {
  return (
    <div
      className={cn('rounded-lg border p-4', variantStyles[variant])}
      role="alert"
      aria-labelledby={title ? 'alert-title' : undefined}
    >
      {title && (
        <h3 id="alert-title" className="font-medium mb-2">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </div>
  )
}
```

### 3. Accessibility Standards

#### Semantic HTML
```typescript
// ✅ Good: Proper semantic structure
export function PatientNavigationCard({ patient }: PatientNavigationCardProps): JSX.Element {
  return (
    <article className="bg-white rounded-lg shadow">
      <header className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {patient.profile.firstName} {patient.profile.lastName}
        </h2>
        <p className="text-sm text-gray-600">
          MRN: {patient.profile.medicalRecordNumber}
        </p>
      </header>

      <section className="p-4">
        <h3 className="sr-only">Patient Actions</h3>
        <nav aria-label="Patient actions">
          <ul className="space-y-2">
            <li>
              <Link
                href={`/patients/${patient.id}/visits`}
                className="block hover:bg-gray-50 p-2 rounded"
              >
                View Visits
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </article>
  )
}
```

#### ARIA Labels and Descriptions
```typescript
// ✅ Good: Comprehensive ARIA support
interface VisitStatusBadgeProps {
  readonly status: VisitStatus
  readonly scheduledAt: Date
}

export function VisitStatusBadge({ status, scheduledAt }: VisitStatusBadgeProps): JSX.Element {
  const statusConfig = {
    SCHEDULED: { color: 'blue', label: 'Scheduled' },
    IN_PROGRESS: { color: 'green', label: 'In Progress' },
    COMPLETED: { color: 'gray', label: 'Completed' },
    CANCELLED: { color: 'red', label: 'Cancelled' }
  } as const

  const config = statusConfig[status]
  const timeDescription = formatTimeDescription(scheduledAt, status)

  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', {
        'bg-blue-100 text-blue-800': config.color === 'blue',
        'bg-green-100 text-green-800': config.color === 'green',
        'bg-gray-100 text-gray-800': config.color === 'gray',
        'bg-red-100 text-red-800': config.color === 'red',
      })}
      aria-label={`Visit status: ${config.label}. ${timeDescription}`}
    >
      {config.label}
    </span>
  )
}
```

### 4. Error Handling and Loading States

#### Error Boundaries
```typescript
'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  readonly children: ReactNode
  readonly fallback?: (error: Error) => ReactNode
}

export class HealthcareErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to healthcare-compliant error tracking
    console.error('Healthcare component error:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error)
      }

      return (
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-4"
          role="alert"
        >
          <h3 className="text-red-800 font-medium">
            Unable to load healthcare data
          </h3>
          <p className="text-red-600 text-sm mt-1">
            Please refresh the page or contact support if the problem persists.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
```

#### Loading States
```typescript
// ✅ Good: Accessible loading states
interface LoadingSpinnerProps {
  readonly size?: 'sm' | 'md' | 'lg'
  readonly label?: string
}

export function LoadingSpinner({ size = 'md', label = 'Loading' }: LoadingSpinnerProps): JSX.Element {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-blue-600', sizeClasses[size])}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  )
}

// Usage in components
export function PatientList(): JSX.Element {
  const { data: patients, isLoading, error } = usePatients()

  if (error) {
    return (
      <div role="alert" className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">Failed to load patient data</p>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingSpinner label="Loading patient data" />
  }

  return (
    <div>
      {patients?.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
}
```

## Healthcare-Specific Components

### 1. Form Components

#### Patient Information Form
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { patientFormSchema, type PatientFormData } from '@/lib/schemas'

interface PatientFormProps {
  readonly initialData?: Partial<PatientFormData>
  readonly onSubmit: (data: PatientFormData) => Promise<void>
  readonly mode: 'create' | 'edit'
}

export function PatientForm({ initialData, onSubmit, mode }: PatientFormProps): JSX.Element {
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: initialData
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium">Personal Information</legend>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="given-name"
                      aria-describedby="firstName-error"
                    />
                  </FormControl>
                  <FormMessage id="firstName-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="family-name"
                      aria-describedby="lastName-error"
                    />
                  </FormControl>
                  <FormMessage id="lastName-error" />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : `${mode === 'create' ? 'Create' : 'Update'} Patient`}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

### 2. Data Display Components

#### Visit Timeline
```typescript
interface VisitTimelineProps {
  readonly visits: readonly Visit[]
  readonly patientId: string
}

export function VisitTimeline({ visits, patientId }: VisitTimelineProps): JSX.Element {
  const sortedVisits = visits.toSorted((a, b) =>
    new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
  )

  return (
    <section aria-labelledby="visit-timeline-heading">
      <h2 id="visit-timeline-heading" className="text-xl font-semibold mb-6">
        Visit Timeline
      </h2>

      <div className="space-y-4">
        {sortedVisits.map((visit, index) => (
          <article
            key={visit.id}
            className="relative pl-8 pb-8 last:pb-0"
          >
            {/* Timeline line */}
            {index < sortedVisits.length - 1 && (
              <div
                className="absolute left-3 top-8 w-0.5 h-full bg-gray-200"
                aria-hidden="true"
              />
            )}

            {/* Timeline dot */}
            <div
              className={cn(
                'absolute left-0 top-1 w-6 h-6 rounded-full border-2 bg-white',
                {
                  'border-green-500': visit.status === 'COMPLETED',
                  'border-blue-500': visit.status === 'SCHEDULED',
                  'border-yellow-500': visit.status === 'IN_PROGRESS',
                  'border-red-500': visit.status === 'CANCELLED'
                }
              )}
              aria-hidden="true"
            />

            {/* Visit content */}
            <div className="bg-white rounded-lg border p-4">
              <header className="flex justify-between items-start mb-2">
                <h3 className="font-medium">
                  {formatDate(visit.scheduledAt)}
                </h3>
                <VisitStatusBadge
                  status={visit.status}
                  scheduledAt={visit.scheduledAt}
                />
              </header>

              <dl className="text-sm text-gray-600 space-y-1">
                <div>
                  <dt className="sr-only">Healthcare worker</dt>
                  <dd>with {visit.worker.profile.firstName} {visit.worker.profile.lastName}</dd>
                </div>

                {visit.activities.length > 0 && (
                  <div>
                    <dt className="sr-only">Activities</dt>
                    <dd>Activities: {visit.activities.join(', ')}</dd>
                  </div>
                )}

                {visit.notes && (
                  <div>
                    <dt className="sr-only">Notes</dt>
                    <dd>{visit.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
```

## Performance Optimization

### 1. Code Splitting and Lazy Loading
```typescript
// ✅ Good: Lazy load heavy components
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const AdvancedReportsChart = lazy(() =>
  import('@/components/advanced-reports-chart').then(module => ({
    default: module.AdvancedReportsChart
  }))
)

export function ReportsPage(): JSX.Element {
  return (
    <div>
      <h1>Healthcare Reports</h1>

      <Suspense fallback={<LoadingSpinner label="Loading advanced charts" />}>
        <AdvancedReportsChart />
      </Suspense>
    </div>
  )
}
```

### 2. Memoization Patterns
```typescript
'use client'

import { memo, useMemo } from 'react'

interface PatientListProps {
  readonly patients: readonly Patient[]
  readonly searchTerm: string
  readonly sortBy: string
}

export const PatientList = memo(function PatientList({
  patients,
  searchTerm,
  sortBy
}: PatientListProps): JSX.Element {
  const filteredAndSortedPatients = useMemo(() => {
    return patients
      .filter(patient =>
        patient.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .toSorted((a, b) => {
        if (sortBy === 'name') {
          return a.profile.lastName.localeCompare(b.profile.lastName)
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [patients, searchTerm, sortBy])

  return (
    <div className="grid gap-4">
      {filteredAndSortedPatients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
})
```

## Testing Standards

### 1. Component Testing
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PatientForm } from '@/components/patient-form'

describe('PatientForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders all required fields', () => {
    render(<PatientForm onSubmit={mockOnSubmit} mode="create" />)

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create patient/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<PatientForm onSubmit={mockOnSubmit} mode="create" />)

    fireEvent.click(screen.getByRole('button', { name: /create patient/i }))

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits valid form data', async () => {
    render(<PatientForm onSubmit={mockOnSubmit} mode="create" />)

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'John' }
    })
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Doe' }
    })

    fireEvent.click(screen.getByRole('button', { name: /create patient/i }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe'
      })
    })
  })
})
```

### 2. Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'

expect.extend(toHaveNoViolations)

describe('PatientCard Accessibility', () => {
  it('has no accessibility violations', async () => {
    const patient = createTestPatient()
    const { container } = render(<PatientCard patient={patient} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Documentation Standards

### 1. Component Documentation
```typescript
/**
 * PatientCard displays essential patient information in a card format.
 *
 * @component
 * @example
 * ```tsx
 * <PatientCard
 *   patient={patient}
 *   onViewDetails={(id) => router.push(`/patients/${id}`)}
 *   showActions={true}
 * />
 * ```
 */
interface PatientCardProps {
  /** Patient data object containing profile information */
  readonly patient: Patient
  /** Callback fired when user clicks "View Details" */
  readonly onViewDetails?: (patientId: string) => void
  /** Whether to show action buttons (default: true) */
  readonly showActions?: boolean
  /** Additional CSS classes */
  readonly className?: string
}
```

### 2. Storybook Integration
```typescript
// PatientCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { PatientCard } from './patient-card'
import { createTestPatient } from '@/lib/test-utils'

const meta: Meta<typeof PatientCard> = {
  title: 'Healthcare/PatientCard',
  component: PatientCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for displaying patient information with optional actions.'
      }
    }
  },
  argTypes: {
    onViewDetails: { action: 'view details clicked' },
    showActions: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    patient: createTestPatient(),
    showActions: true
  }
}

export const WithoutActions: Story = {
  args: {
    patient: createTestPatient(),
    showActions: false
  }
}

export const LongName: Story = {
  args: {
    patient: createTestPatient({
      profile: {
        firstName: 'Christopher Alexander',
        lastName: 'Vandenberg-Williams'
      }
    }),
    showActions: true
  }
}
```

This comprehensive component standard ensures consistent, accessible, and maintainable React/Next.js components across all CareTracker healthcare applications.