# Phase 3: Frontend Development & User Experience

**Phase Status**: 🟡 READY TO START
**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Duration**: Week 3
**Dependencies**: Phase 1 (Foundation) ✅, Phase 2 (Backend API) 🟡

## Phase Overview

Phase 3 transforms the basic application scaffolds into fully functional, healthcare-focused user interfaces. This phase implements responsive designs, state management, accessibility compliance, and Progressive Web App capabilities while integrating with the backend API from Phase 2.

## Objectives & Deliverables

### Primary Objectives
- [ ] **UI Component Library**: Build shared healthcare-specific components with design system
- [ ] **State Management**: Implement TanStack Query with Zustand for optimal data fetching and caching
- [ ] **User Interfaces**: Complete all three applications with role-specific workflows
- [ ] **Progressive Web App**: Mobile-optimized PWA for care workers with offline capabilities
- [ ] **Accessibility Compliance**: WCAG 2.2 AA compliance for healthcare accessibility
- [ ] **Real-Time Features**: WebSocket integration for live updates and notifications

### Success Criteria
- [ ] All user workflows functional across three applications
- [ ] WCAG 2.2 AA accessibility compliance achieved
- [ ] PWA installation and offline functionality working
- [ ] Real-time updates working across connected clients
- [ ] Mobile responsiveness on all target devices
- [ ] Performance: Lighthouse scores >90 for all applications

## Technical Specifications

### Shared Component Library

#### Design System Foundation
```typescript
// Design tokens for healthcare applications
export const designTokens = {
  colors: {
    // Healthcare brand colors
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a'
    },
    // Healthcare-specific semantic colors
    success: '#10b981',  // Positive health outcomes
    warning: '#f59e0b',  // Caution/attention needed
    error: '#ef4444',    // Critical/emergency
    info: '#6366f1',     // Information/guidance
    // Accessibility-compliant grays
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    }
  },
  typography: {
    // Medical-grade readability
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }]
    }
  },
  spacing: {
    // 8px grid system
    0: '0px',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    12: '3rem',    // 48px
    16: '4rem'     // 64px
  }
} as const;
```

#### Core UI Components
```typescript
// Healthcare-specific form components
interface FormFieldProps {
  readonly label: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly helpText?: string;
  readonly 'aria-describedby'?: string;
}

// Medical data input with validation
export const MedicalDataInput = ({
  label,
  required,
  error,
  helpText,
  ...props
}: FormFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>

      <input
        id={inputId}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
        className={`
          block w-full rounded-md border-0 py-1.5 px-3
          text-gray-900 shadow-sm ring-1 ring-inset
          ${error
            ? 'ring-red-300 focus:ring-red-500'
            : 'ring-gray-300 focus:ring-blue-600'
          }
          focus:ring-2 focus:ring-inset
          disabled:cursor-not-allowed disabled:bg-gray-50
        `}
        {...props}
      />

      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {helpText && (
        <p id={helpId} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
};

// Visit status indicator with accessibility
export const VisitStatusBadge = ({
  status,
  className
}: {
  readonly status: VisitStatus;
  readonly className?: string;
}) => {
  const statusConfig = {
    SCHEDULED: {
      label: 'Scheduled',
      color: 'bg-blue-100 text-blue-800',
      icon: ClockIcon
    },
    IN_PROGRESS: {
      label: 'In Progress',
      color: 'bg-yellow-100 text-yellow-800',
      icon: PlayIcon
    },
    COMPLETED: {
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircleIcon
    },
    CANCELLED: {
      label: 'Cancelled',
      color: 'bg-red-100 text-red-800',
      icon: XCircleIcon
    }
  } as const;

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${config.color} ${className}
      `}
      role="status"
      aria-label={`Visit status: ${config.label}`}
    >
      <Icon className="mr-1 h-3 w-3" aria-hidden="true" />
      {config.label}
    </span>
  );
};

// Data table with accessibility and keyboard navigation
export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading,
  emptyMessage = 'No data available',
  onRowClick,
  selectedRowId
}: DataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300" role="table">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                {...(column.sortable && {
                  tabIndex: 0,
                  role: 'button',
                  'aria-sort': sortColumn === column.key
                    ? sortDirection
                    : 'none',
                  onClick: () => handleSort(column.key),
                  onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort(column.key);
                    }
                  }
                })}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <SortIcon column={column.key} currentSort={sortColumn} direction={sortDirection} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                <LoadingSpinner />
                <span className="sr-only">Loading data...</span>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row.id as string}
                className={`
                  hover:bg-gray-50 cursor-pointer transition-colors
                  ${selectedRowId === row.id ? 'bg-blue-50' : ''}
                `}
                onClick={() => onRowClick?.(row)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onRowClick?.(row);
                  }
                }}
                tabIndex={0}
                role="row"
                aria-selected={selectedRowId === row.id}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    role="gridcell"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
```

### State Management Architecture

#### TanStack Query Integration
```typescript
// API client with type safety
class APIClient {
  private readonly baseURL: string;
  private accessToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.accessToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new APIError(error.error.code, error.error.message, response.status);
    }

    return response.json();
  }

  // Visit API methods
  async getVisits(filters: VisitFilters): Promise<PaginatedResponse<Visit>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    const response = await this.request<Visit[]>(`/visits?${params}`);
    return response;
  }

  async createVisit(visitData: CreateVisitRequest): Promise<Visit> {
    const response = await this.request<Visit>('/visits', {
      method: 'POST',
      body: JSON.stringify(visitData)
    });
    return response.data;
  }

  async updateVisit(id: string, updates: UpdateVisitRequest): Promise<Visit> {
    const response = await this.request<Visit>(`/visits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return response.data;
  }
}

// React Query hooks with optimistic updates
export const useVisits = (filters: VisitFilters) => {
  return useQuery({
    queryKey: ['visits', filters],
    queryFn: () => apiClient.getVisits(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true
  });
};

export const useCreateVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiClient.createVisit,
    onMutate: async (newVisit) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['visits'] });

      // Snapshot previous value
      const previousVisits = queryClient.getQueryData(['visits']);

      // Optimistically update
      queryClient.setQueryData(['visits'], (old: any) => {
        if (!old) return old;

        const optimisticVisit = {
          ...newVisit,
          id: `temp-${Date.now()}`,
          status: 'SCHEDULED',
          createdAt: new Date().toISOString()
        };

        return {
          ...old,
          data: [optimisticVisit, ...old.data],
          meta: {
            ...old.meta,
            total: old.meta.total + 1
          }
        };
      });

      return { previousVisits };
    },
    onError: (err, newVisit, context) => {
      // Rollback on error
      queryClient.setQueryData(['visits'], context?.previousVisits);
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    }
  });
};
```

#### Zustand Store for Global State
```typescript
// Authentication store
interface AuthState {
  readonly user: User | null;
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // State
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  // Actions
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.login(email, password);

      set({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isLoading: false
      });

      // Set token for API client
      apiClient.setAuthToken(response.accessToken);

      // Store refresh token securely
      await secureStorage.setItem('refreshToken', response.refreshToken);

    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false
      });
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      error: null
    });

    apiClient.setAuthToken('');
    secureStorage.removeItem('refreshToken');
  },

  refreshAccessToken: async () => {
    const { refreshToken } = get();
    if (!refreshToken) throw new Error('No refresh token available');

    try {
      const response = await apiClient.refreshToken(refreshToken);

      set({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      });

      apiClient.setAuthToken(response.accessToken);
      await secureStorage.setItem('refreshToken', response.refreshToken);

    } catch (error) {
      // Refresh failed, logout user
      get().logout();
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

// Notification store for real-time updates
interface NotificationState {
  readonly notifications: Notification[];
  readonly unreadCount: number;
}

interface NotificationActions {
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => set((state) => {
    const newNotification = {
      ...notification,
      id: `notification-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };

    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    };
  }),

  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: Math.max(0, state.unreadCount - 1)
  })),

  removeNotification: (id) => set((state) => {
    const notification = state.notifications.find(n => n.id === id);
    return {
      notifications: state.notifications.filter(n => n.id !== id),
      unreadCount: notification && !notification.read
        ? Math.max(0, state.unreadCount - 1)
        : state.unreadCount
    };
  }),

  clearAll: () => set({ notifications: [], unreadCount: 0 })
}));
```

### Application-Specific Implementations

#### Client Portal (Web App)
```typescript
// Client dashboard with healthcare focus
export default function ClientDashboard() {
  const { user } = useAuthStore();
  const { data: upcomingVisits, isLoading } = useVisits({
    clientId: user?.id,
    status: 'SCHEDULED',
    limit: 5
  });
  const { data: budgetInfo } = useBudget(user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Upcoming Visits"
            value={upcomingVisits?.meta.total || 0}
            icon={CalendarIcon}
            color="blue"
            trend={{ value: 12, direction: 'up', label: 'vs last month' }}
          />
          <MetricCard
            title="Budget Remaining"
            value={budgetInfo?.remaining || 0}
            icon={CurrencyDollarIcon}
            color="green"
            format="currency"
          />
          <MetricCard
            title="Care Hours This Month"
            value={budgetInfo?.hoursUsed || 0}
            icon={ClockIcon}
            color="purple"
            format="hours"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Visits */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Visits</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/visits')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <VisitListSkeleton />
              ) : upcomingVisits?.data.length ? (
                <VisitList visits={upcomingVisits.data} compact />
              ) : (
                <EmptyState
                  icon={CalendarIcon}
                  title="No upcoming visits"
                  description="Your next visit will appear here when scheduled."
                  action={
                    <Button onClick={() => router.push('/visits/new')}>
                      Schedule Visit
                    </Button>
                  }
                />
              )}
            </CardContent>
          </Card>

          {/* Budget Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetChart data={budgetInfo} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// Visit calendar with accessibility
export function VisitCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const { data: visits } = useVisits({
    dateFrom: startOfMonth(selectedDate).toISOString(),
    dateTo: endOfMonth(selectedDate).toISOString()
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Visit Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <ViewToggle value={view} onChange={setView} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{
            hasVisit: visits?.data.map(v => new Date(v.scheduledAt)) || []
          }}
          modifiersClassNames={{
            hasVisit: 'bg-blue-100 text-blue-900'
          }}
          className="rounded-md border"
        />

        {/* Visit details for selected date */}
        {selectedDate && (
          <VisitDetailsPanel
            date={selectedDate}
            visits={visits?.data.filter(v =>
              isSameDay(new Date(v.scheduledAt), selectedDate)
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
```

#### Care Worker PWA
```typescript
// Mobile-optimized PWA for care workers
export default function WorkerDashboard() {
  const { user } = useAuthStore();
  const { data: todayVisits } = useVisits({
    workerId: user?.id,
    dateFrom: startOfDay(new Date()).toISOString(),
    dateTo: endOfDay(new Date()).toISOString()
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Status Bar */}
      <div className={`
        px-4 py-2 text-sm font-medium text-center
        ${isOnline ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
      `}>
        {isOnline ? 'Connected' : 'Offline Mode'}
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Good morning, {user?.profile?.firstName}
              </h1>
              <p className="text-sm text-gray-500">
                {formatDate(new Date(), 'EEEE, MMMM d')}
              </p>
            </div>
            <NotificationBadge />
          </div>
        </div>
      </header>

      {/* Today's Schedule */}
      <main className="px-4 py-6 space-y-6">
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Today's Schedule ({todayVisits?.data.length || 0} visits)
          </h2>

          {todayVisits?.data.length ? (
            <div className="space-y-3">
              {todayVisits.data.map((visit) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  onCheckin={() => handleCheckin(visit.id)}
                  onCheckout={() => handleCheckout(visit.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CalendarIcon}
              title="No visits scheduled"
              description="Your schedule for today is clear."
            />
          )}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionCard
              icon={ClockIcon}
              title="Clock In/Out"
              description="Track your work hours"
              onClick={() => router.push('/timesheet')}
            />
            <QuickActionCard
              icon={DocumentTextIcon}
              title="Add Note"
              description="Quick visit documentation"
              onClick={() => router.push('/notes/new')}
            />
            <QuickActionCard
              icon={PhoneIcon}
              title="Emergency Contact"
              description="Call emergency services"
              onClick={() => window.location.href = 'tel:911'}
              urgent
            />
            <QuickActionCard
              icon={MapPinIcon}
              title="Navigation"
              description="Get directions to next visit"
              onClick={() => openNavigation()}
            />
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

// Offline-capable visit check-in
export function VisitCheckinForm({ visitId }: { readonly visitId: string }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [formData, setFormData] = useState<CheckinFormData>({
    arrivalTime: new Date().toISOString(),
    notes: '',
    activities: []
  });

  const checkinMutation = useMutation({
    mutationFn: (data: CheckinFormData) => apiClient.checkinVisit(visitId, data),
    onSuccess: () => {
      toast.success('Successfully checked in to visit');
      router.push('/visits');
    },
    onError: (error) => {
      if (!isOnline) {
        // Store for offline sync
        storeForOfflineSync('checkin', { visitId, ...formData });
        toast.success('Check-in saved offline. Will sync when connected.');
      } else {
        toast.error('Failed to check in: ' + error.message);
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Arrival Time
        </label>
        <input
          type="datetime-local"
          value={formatDateForInput(formData.arrivalTime)}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            arrivalTime: new Date(e.target.value).toISOString()
          }))}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Activities (select all that apply)
        </label>
        <ActivityCheckboxList
          value={formData.activities}
          onChange={(activities) => setFormData(prev => ({ ...prev, activities }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300"
          placeholder="Any additional notes about the visit..."
        />
      </div>

      <div className="flex space-x-3">
        <Button
          type="submit"
          disabled={checkinMutation.isLoading}
          className="flex-1"
        >
          {checkinMutation.isLoading ? 'Checking In...' : 'Check In'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>

      {!isOnline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <div className="flex">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You're offline. Your check-in will be saved and synced when you reconnect.
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
```

## Implementation Tasks

### Shared Component Library
- [ ] **Design System**
  - [ ] Design tokens definition (colors, typography, spacing)
  - [ ] Component documentation with Storybook
  - [ ] Accessibility testing for all components
  - [ ] Dark mode support for healthcare environments

- [ ] **Core Components**
  - [ ] Form components with validation feedback
  - [ ] Data display components (tables, cards, lists)
  - [ ] Navigation components (breadcrumbs, pagination)
  - [ ] Feedback components (alerts, toasts, modals)
  - [ ] Healthcare-specific components (status badges, metrics)

### State Management Implementation
- [ ] **TanStack Query Setup**
  - [ ] Query client configuration with caching strategies
  - [ ] Custom hooks for all API endpoints
  - [ ] Optimistic updates for better UX
  - [ ] Error handling and retry logic
  - [ ] Background refetching strategies

- [ ] **Zustand Stores**
  - [ ] Authentication store with token refresh
  - [ ] Notification store for real-time updates
  - [ ] UI state store (modals, sidebars, themes)
  - [ ] Offline sync store for PWA capabilities

### Application Development
- [ ] **Client Portal (Web)**
  - [ ] Dashboard with key metrics and upcoming visits
  - [ ] Visit calendar with scheduling capabilities
  - [ ] Budget tracking and financial overview
  - [ ] Profile management and preferences
  - [ ] Document library and care plan access

- [ ] **Care Worker PWA**
  - [ ] Mobile-optimized dashboard
  - [ ] Visit check-in/check-out functionality
  - [ ] Offline data synchronization
  - [ ] GPS navigation integration
  - [ ] Voice note recording capabilities

- [ ] **Admin Dashboard**
  - [ ] User management interface
  - [ ] System analytics and reporting
  - [ ] Audit log viewer
  - [ ] Configuration management
  - [ ] Emergency contact directory

### Progressive Web App Features
- [ ] **PWA Configuration**
  - [ ] Service worker for offline functionality
  - [ ] App manifest for installation
  - [ ] Push notification setup
  - [ ] Background sync for data updates

- [ ] **Offline Capabilities**
  - [ ] Offline data storage with IndexedDB
  - [ ] Sync queue for offline actions
  - [ ] Conflict resolution strategies
  - [ ] Offline indicator and feedback

### Accessibility Implementation
- [ ] **WCAG 2.2 Compliance**
  - [ ] Keyboard navigation support
  - [ ] Screen reader compatibility
  - [ ] High contrast mode support
  - [ ] Focus management and indication
  - [ ] Alt text and ARIA labels

- [ ] **Healthcare Accessibility**
  - [ ] Large text support for vision impairments
  - [ ] Voice control compatibility
  - [ ] Cognitive accessibility patterns
  - [ ] Emergency access features

## Validation & Testing

### Component Testing
```typescript
// Component testing with accessibility
describe('MedicalDataInput', () => {
  it('should render with proper accessibility attributes', () => {
    render(
      <MedicalDataInput
        label="Blood Pressure"
        required
        error="Invalid format"
        helpText="Enter as systolic/diastolic (e.g., 120/80)"
      />
    );

    const input = screen.getByLabelText(/blood pressure/i);
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid format');
    expect(screen.getByText(/enter as systolic/i)).toBeInTheDocument();
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<MedicalDataInput label="Test Input" />);

    const input = screen.getByLabelText(/test input/i);
    await user.tab();
    expect(input).toHaveFocus();
  });
});
```

### Integration Testing
```typescript
// State management integration tests
describe('Visit Management Integration', () => {
  it('should optimistically update visits on creation', async () => {
    const { result } = renderHook(() => useCreateVisit(), {
      wrapper: createQueryWrapper()
    });

    const visitData = {
      clientId: 'client-1',
      workerId: 'worker-1',
      scheduledAt: '2025-01-01T10:00:00Z',
      activities: ['Personal care']
    };

    act(() => {
      result.current.mutate(visitData);
    });

    // Check optimistic update
    const { result: visitsResult } = renderHook(() => useVisits({}), {
      wrapper: createQueryWrapper()
    });

    expect(visitsResult.current.data?.data).toContainEqual(
      expect.objectContaining({
        clientId: 'client-1',
        workerId: 'worker-1'
      })
    );
  });
});
```

### PWA Testing
```typescript
// PWA functionality testing
describe('PWA Functionality', () => {
  beforeEach(() => {
    // Mock service worker
    global.navigator.serviceWorker = {
      register: jest.fn().mockResolvedValue({}),
      ready: Promise.resolve({})
    };
  });

  it('should register service worker', async () => {
    await registerServiceWorker();
    expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js');
  });

  it('should handle offline state', () => {
    // Simulate offline
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    render(<WorkerDashboard />);
    expect(screen.getByText(/offline mode/i)).toBeInTheDocument();
  });

  it('should store data for offline sync', async () => {
    const data = { visitId: 'visit-1', notes: 'Test note' };
    await storeForOfflineSync('checkin', data);

    const stored = await getOfflineData('checkin');
    expect(stored).toContainEqual(expect.objectContaining(data));
  });
});
```

### Accessibility Testing
```typescript
// Automated accessibility testing
describe('Accessibility Compliance', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<ClientDashboard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<DataTable data={mockData} columns={mockColumns} />);

    // Tab through all interactive elements
    await user.tab();
    expect(screen.getByRole('button', { name: /sort/i })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('row')).toHaveFocus();
  });

  it('should announce dynamic content changes', async () => {
    render(<NotificationToast />);

    const liveRegion = screen.getByRole('status');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });
});
```

## Success Metrics

### Functional Requirements
- [ ] **UI Completeness**: All planned user interfaces implemented
- [ ] **State Management**: Real-time data synchronization working
- [ ] **PWA Functionality**: Offline capabilities and installability
- [ ] **Cross-browser Support**: Chrome, Firefox, Safari, Edge compatibility
- [ ] **Mobile Responsiveness**: Optimal experience on all device sizes

### Performance Requirements
- [ ] **Lighthouse Scores**: >90 for Performance, Accessibility, Best Practices, SEO
- [ ] **Bundle Size**: <500KB initial JavaScript bundle
- [ ] **Load Time**: <2 seconds for initial page load
- [ ] **Runtime Performance**: <100ms for user interactions
- [ ] **Memory Usage**: <50MB peak memory usage

### Accessibility Requirements
- [ ] **WCAG 2.2 AA**: Full compliance across all interfaces
- [ ] **Screen Reader**: 100% compatibility with NVDA, JAWS, VoiceOver
- [ ] **Keyboard Navigation**: All functionality accessible via keyboard
- [ ] **Color Contrast**: 4.5:1 minimum ratio for all text
- [ ] **Focus Management**: Logical tab order and visible focus indicators

### Quality Gates
- [ ] **Component Tests**: 95%+ coverage for UI components
- [ ] **Integration Tests**: All user workflows covered
- [ ] **Accessibility Tests**: Automated axe testing passing
- [ ] **Performance Budget**: Bundle size and performance metrics met
- [ ] **Browser Testing**: Cross-browser compatibility verified

---

*Phase 3 delivers production-ready healthcare user interfaces with enterprise-grade state management, accessibility compliance, and mobile-optimized Progressive Web App capabilities.*