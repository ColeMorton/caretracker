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
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter @caretracker/mobile-web dev',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter @caretracker/admin dev',
      port: 3002,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter @caretracker/api dev',
      port: 3001,
      reuseExistingServer: !process.env.CI,
      env: {
        NODE_ENV: 'test',
        DATABASE_URL: 'postgresql://test:test@localhost:5432/caretracker_test',
      },
    },
  ],
})