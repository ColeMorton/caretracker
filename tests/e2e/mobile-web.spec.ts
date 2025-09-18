import { test, expect } from '@playwright/test'

test.describe('Mobile Web Application', () => {
  test('should load the mobile homepage', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Check page title
    await expect(page).toHaveTitle(/CareTracker Mobile/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('CareTracker Mobile')
    
    // Check description
    await expect(page.locator('text=Care Worker Portal')).toBeVisible()
  })

  test('should have PWA manifest', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Check for manifest link
    const manifest = page.locator('link[rel="manifest"]')
    await expect(manifest).toHaveAttribute('href', '/manifest.json')
  })

  test('should be optimized for mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3001')
    
    // Check that content is properly sized for mobile
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    
    // Check for mobile-optimized padding/margins
    const main = page.locator('main')
    await expect(main).toHaveCSS('padding', '24px')
  })

  test('should have proper viewport configuration', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute(
      'content',
      expect.stringContaining('width=device-width')
    )
  })
})