import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'build/**',
        '.next/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/tests/**',
        '**/*.config.ts',
        '**/*.config.js',
        '**/playwright.config.ts',
        '**/vitest.config.ts',
        '**/tailwind.config.ts',
        '**/postcss.config.js',
        '**/next.config.js',
        '**/.eslintrc.js',
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
})