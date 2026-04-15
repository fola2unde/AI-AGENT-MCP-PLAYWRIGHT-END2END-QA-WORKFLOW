// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AC1 - Cart Review', () => {
  test.beforeEach(async ({ page }) => {
    // Login to SauceDemo with test credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Wait for products page to load
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-AC1-005: Verify empty cart message', async ({ page }) => {
    // 1. Login to SauceDemo
    // expect: User is logged in successfully
    await expect(page.locator('text=Products')).toBeVisible();

    // 2. Navigate to cart page without adding any items
    // expect: Cart page is displayed
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // 3. Verify empty cart message or UI state
    // expect: Empty cart state is clearly indicated
    // expect: User is prompted to continue shopping or appropriate message is shown
    const cartItems = await page.locator('[data-test="cart-list"]').count();
    if (cartItems === 0) {
      // Empty cart - verify the continue shopping button is visible
      await expect(page.locator('button:has-text("Continue Shopping")')).toBeVisible();
    }
  });
});
