import { test, expect } from '@playwright/test'

test.describe('API Endpoints', () => {
  const apiBaseUrl = 'http://localhost:3001'

  test('should have healthy API', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/health`)
    
    expect(response.status()).toBe(200)
    
    const body = await response.json()
    expect(body).toEqual({ status: 'ok' })
  })

  test('should serve API documentation', async ({ page }) => {
    await page.goto(`${apiBaseUrl}/docs`)
    
    // Check that Swagger UI loads
    await expect(page.locator('.swagger-ui')).toBeVisible()
    
    // Check for API title
    await expect(page.locator('text=CareTracker API')).toBeVisible()
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
    const response = await request.options(`${apiBaseUrl}/health`)
    
    // Should allow CORS or return method not allowed
    expect([200, 204, 405]).toContain(response.status())
  })
})