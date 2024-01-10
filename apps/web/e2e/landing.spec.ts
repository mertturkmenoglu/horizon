import { test, expect } from '@playwright/test';
import { DEV_URL } from '.';

test('should have title Horizon', async ({ page }) => {
  await page.goto(DEV_URL);
  await expect(page).toHaveTitle(/Horizon/);
});

test('clicking get started should redirect to /login', async ({ page }) => {
  await page.goto(DEV_URL);
  await expect(page).toHaveTitle(/Horizon/);
  await page.getByText('Get Started').click();
  await expect(page.url()).toBe(DEV_URL + '/login');
});
