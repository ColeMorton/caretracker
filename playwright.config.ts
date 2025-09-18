import { defineConfig, devices } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['html'], ['github']]
    : [['list'], ['html', { open: 'never' }]],
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: [
    {
      command: 'pnpm --filter @caretracker/web dev',
      port: 3000,
      reuseExistingServer: true,
      timeout: 120000,
    },
    {
      command: 'pnpm --filter @caretracker/mobile-web dev',
      port: 3001,
      reuseExistingServer: true,
      timeout: 120000,
    },
    {
      command: 'pnpm --filter @caretracker/admin dev',
      port: 3002,
      reuseExistingServer: true,
      timeout: 120000,
    },
    {
      command: process.env.CI 
        ? 'pnpm --filter @caretracker/api dev:ci'
        : 'pnpm --filter @caretracker/api dev',
      port: 4000,
      reuseExistingServer: true,
      timeout: 120000,
      env: {
        NODE_ENV: 'test',
        DATABASE_URL: process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/caretracker_test',
        PORT: '4000',
        JWT_SECRET: process.env.JWT_SECRET || 'ci-test-secret-key-for-testing-only',
        HOST: '0.0.0.0',
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      },
    },
  ],
})