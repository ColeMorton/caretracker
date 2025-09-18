import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts', './tests/integration/setup.ts'],
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/tests/**',
        'src/server.ts', // Entry point, tested via integration
      ],
      thresholds: {
        global: {
          branches: 85,
          functions: 90,
          lines: 92,
          statements: 92
        },
        // Critical healthcare components require higher coverage
        'src/repositories/**': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95
        },
        'src/services/**': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95
        },
        'src/schemas/**': {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100
        }
      }
    },
    testTimeout: 10000,
    pool: 'forks',
    maxConcurrency: 4, // Limit concurrency for database tests
  },
  esbuild: {
    target: 'node18',
    format: 'esm',
  },
  optimizeDeps: {
    include: ['fastify', '@fastify/autoload'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@caretracker/database': path.resolve(__dirname, '../database/src'),
      '@caretracker/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
})