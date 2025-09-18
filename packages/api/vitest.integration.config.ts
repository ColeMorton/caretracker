import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/integration/setup.ts'],
    include: ['tests/integration/**/*.test.ts'],
    testTimeout: 30000, // Longer timeout for integration tests
    hookTimeout: 30000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/tests/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@caretracker/database': path.resolve(__dirname, '../database/src'),
      '@caretracker/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
})