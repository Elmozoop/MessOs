import { test, expect } from '@playwright/test';

test.describe('Smart Mess Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    await expect(page).toHaveTitle(/Smart Mess|MessOS/);
  });

  test('should navigate to student dashboard', async ({ page }) => {
    await page.goto('/student');
    await expect(page.locator('h2')).toContainText('Hello');
  });

  test('should navigate to admin dashboard', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('h2')).toContainText('Hello, Admin');
  });

  test('should toggle theme', async ({ page }) => {
    const themeButton = page
      .locator(
        'button[aria-label*="theme"], button:has(svg.lucide-sun), button:has(svg.lucide-moon)'
      )
      .first();
    if (await themeButton.isVisible()) {
      await themeButton.click();
      await expect(page.locator('html')).toHaveClass(/dark|light/);
    }
  });
});
