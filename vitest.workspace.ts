import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // Backend packages
  {
    test: {
      name: 'api',
      root: './packages/api',
      environment: 'node',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/**',
          'dist/**',
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/tests/**',
        ],
      },
    },
  },
  {
    test: {
      name: 'database',
      root: './packages/database',
      environment: 'node',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  {
    test: {
      name: 'shared',
      root: './packages/shared',
      environment: 'node',
      globals: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  // Frontend packages
  {
    test: {
      name: 'ui',
      root: './packages/ui',
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  // Frontend apps
  {
    test: {
      name: 'web',
      root: './apps/web',
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  {
    test: {
      name: 'mobile-web',
      root: './apps/mobile-web',
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
  {
    test: {
      name: 'admin',
      root: './apps/admin',
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  },
])