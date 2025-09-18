# ADR-0002: Frontend State Management Strategy

**Status**: Accepted
**Date**: 2025-09-18
**Deciders**: Frontend Team, UX Team, Architecture Review Board
**Technical Story**: State management solution for React/Next.js healthcare applications

## Context and Problem Statement

CareTracker's frontend applications (client portal, care worker PWA, admin dashboard) require robust state management for healthcare data, user sessions, real-time updates, and offline capabilities. The solution must handle complex data relationships, provide excellent developer experience, and maintain performance across all devices.

## Decision Drivers

* **Data Fetching**: Healthcare data requires caching, synchronization, and offline support
* **Real-time Updates**: Care schedules and visit status need live updates
* **Developer Experience**: Type-safe state management with excellent DevTools
* **Bundle Size**: Minimal impact on application load times
* **Performance**: Efficient re-renders and memory usage
* **Offline Support**: Care workers need offline-first capabilities
* **Testing**: Easy to test and mock in unit/integration tests
* **Server State vs Client State**: Clear separation of concerns

## Considered Options

* **TanStack Query + Zustand** - Specialized server/client state management
* **Redux Toolkit** - Traditional predictable state container with modern DX
* **Jotai** - Bottom-up atomic state management
* **SWR + Zustand** - Alternative server state + client state combination
* **Valtio** - Proxy-based mutable state management
* **React Context + useReducer** - Built-in React state management

## Decision Outcome

**Chosen option**: "TanStack Query + Zustand", because it provides optimal separation between server state (TanStack Query) and client state (Zustand) with excellent TypeScript support and healthcare-specific features.

### Consequences

#### Positive

* **Server State Excellence**: TanStack Query handles caching, synchronization, and background updates perfectly
* **Offline Support**: Built-in offline mutation queuing for care worker PWA
* **Real-time Integration**: Easy WebSocket integration for live updates
* **TypeScript Native**: Full type safety across entire state layer
* **DevTools**: Excellent debugging experience with React Query DevTools
* **Performance**: Minimal re-renders and efficient memory usage
* **Testing**: Easy to mock and test server/client state separately
* **Bundle Size**: Combined ~20KB, smaller than Redux ecosystem

#### Negative

* **Learning Curve**: Two state libraries instead of one unified solution
* **Architecture Complexity**: Need clear guidelines on server vs client state
* **Documentation**: Less unified documentation compared to single-library solutions
* **Team Training**: Requires understanding of two different paradigms

### Implementation Notes

#### TanStack Query Setup
```typescript
// Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Healthcare-specific retry logic
        if (error.status === 401) return false
        return failureCount < 3
      }
    },
    mutations: {
      retry: false, // No retry for mutations in healthcare
    }
  }
})
```

#### Zustand Store Pattern
```typescript
// Client state store
interface AppStore {
  user: User | null
  theme: 'light' | 'dark'
  notifications: Notification[]
  setUser: (user: User | null) => void
  toggleTheme: () => void
  addNotification: (notification: Notification) => void
}

const useAppStore = create<AppStore>((set) => ({
  user: null,
  theme: 'light',
  notifications: [],
  setUser: (user) => set({ user }),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  }))
}))
```

#### State Separation Guidelines
* **Server State (TanStack Query)**: User data, visits, schedules, care plans
* **Client State (Zustand)**: UI state, themes, notifications, form state
* **URL State (Next.js Router)**: Pagination, filters, modal state

## Validation

* **Performance Metrics**: Monitor component re-render counts and memory usage
* **Developer Experience**: Team survey on development speed and debugging experience
* **Bundle Size**: Track total state management bundle impact
* **Cache Hit Rate**: Monitor TanStack Query cache effectiveness
* **Offline Functionality**: Test offline mutation queuing in care worker app

## Links

* [TanStack Query Documentation](https://tanstack.com/query/latest)
* [Zustand Documentation](https://github.com/pmndrs/zustand)
* [TanStack Query + Zustand Integration Guide](https://tkdodo.eu/blog/working-with-zustand)
* [Healthcare State Management Patterns](https://github.com/caretracker/state-patterns)
* Refined by [ADR-0003](0003-authentication-architecture.md) - Authentication state management