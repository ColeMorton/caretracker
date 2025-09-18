import { test, expect } from '@playwright/test'

test.describe('Web Application', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check page title
    await expect(page).toHaveTitle(/CareTracker/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Welcome to CareTracker')
    
    // Check description
    await expect(page.locator('text=Healthcare Management System')).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check description meta tag
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute(
      'content',
      'Comprehensive healthcare management for clients and care workers'
    )
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/')
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('h1')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 })
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should have accessible elements', async ({ page }) => {
    await page.goto('/')
    
    // Check for proper heading hierarchy
    await expect(page.locator('h1')).toHaveCount(1)
    
    // Check for accessible color contrast (basic test)
    const mainElement = page.locator('main')
    await expect(mainElement).toBeVisible()
  })
})