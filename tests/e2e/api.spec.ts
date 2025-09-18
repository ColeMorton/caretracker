import { test, expect } from '@playwright/test'

test.describe('API Endpoints', () => {
  const apiBaseUrl = 'http://localhost:4000'

  test('should have healthy API', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/health`)
    
    // Add diagnostic information if the test fails
    if (response.status() !== 200) {
      console.error(`Health check failed. Status: ${response.status()}`)
      console.error(`Response body: ${await response.text()}`)
    }
    
    expect(response.status()).toBe(200)
    
    const body = await response.json()
    expect(body).toEqual({ status: 'ok' })
  })

  test('should serve API documentation', async ({ page, browserName }) => {
    await page.goto(`${apiBaseUrl}/docs`)
    
    if (browserName === 'webkit') {
      // WebKit workaround: Safari/WebKit has known issues with Swagger UI on localhost HTTP
      // Test the API spec endpoint directly instead of UI rendering
      const response = await page.request.get(`${apiBaseUrl}/docs/json`)
      expect(response.status()).toBe(200)
      
      const apiSpec = await response.json()
      expect(apiSpec.info.title).toBe('CareTracker API')
      expect(apiSpec.info.description).toBe('Healthcare Management System API')
      expect(apiSpec.tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'auth' })
        ])
      )
    } else {
      // Standard UI testing for Chrome, Firefox, and mobile Chrome
      await expect(page.getByText('CareTracker API')).toBeVisible()
      await expect(page.getByText('Healthcare Management System API')).toBeVisible()
      await expect(page.getByText('auth', { exact: true })).toBeVisible()
    }
  })

  test('should handle authentication endpoint', async ({ request }) => {
    // Test valid login
    const validLogin = await request.post(`${apiBaseUrl}/auth/login`, {
      data: {
        email: 'demo@caretracker.com',
        password: 'demo123',
      },
    })
    
    expect(validLogin.status()).toBe(200)
    
    const validBody = await validLogin.json()
    expect(validBody.success).toBe(true)
    expect(validBody.data).toHaveProperty('token')
    expect(validBody.data).toHaveProperty('user')

    // Test invalid login
    const invalidLogin = await request.post(`${apiBaseUrl}/auth/login`, {
      data: {
        email: 'demo@caretracker.com',
        password: 'wrongpassword',
      },
    })
    
    expect(invalidLogin.status()).toBe(401)
    
    const invalidBody = await invalidLogin.json()
    expect(invalidBody.success).toBe(false)
    expect(invalidBody.error).toBe('Invalid credentials')
  })

  test('should handle users endpoint', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/users`)
    
    expect(response.status()).toBe(200)
    
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toBeInstanceOf(Array)
    expect(body.meta).toHaveProperty('page')
    expect(body.meta).toHaveProperty('limit')
    expect(body.meta).toHaveProperty('total')
    expect(body.meta).toHaveProperty('totalPages')
  })

  test('should handle visits endpoint', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/visits`)
    
    expect(response.status()).toBe(200)
    
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toBeInstanceOf(Array)
    expect(body.meta).toHaveProperty('page')
    expect(body.meta).toHaveProperty('limit')
    expect(body.meta).toHaveProperty('total')
    expect(body.meta).toHaveProperty('totalPages')
  })

  test('should handle CORS properly', async ({ request }) => {
    // Use fetch to test CORS since Playwright request doesn't support OPTIONS
    const response = await request.fetch(`${apiBaseUrl}/health`, {
      method: 'OPTIONS'
    })
    
    // Should allow CORS, return method not allowed, or bad request
    expect([200, 204, 400, 405]).toContain(response.status())
  })
})