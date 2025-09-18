import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
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
    },
    testTimeout: 10000,
    pool: 'forks',
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