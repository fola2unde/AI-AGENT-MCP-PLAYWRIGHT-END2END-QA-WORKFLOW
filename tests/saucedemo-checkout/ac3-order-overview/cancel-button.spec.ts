// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AC3 - Order Overview', () => {
  test.beforeEach(async ({ page }) => {
    // Login and proceed to checkout overview page
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Navigate to checkout overview
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
  });

  test('TC-AC3-004: Verify Cancel button on overview page', async ({ page }) => {
    // 1. Complete checkout flow to overview page
    // expect: Checkout overview page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // 2. Locate and verify Cancel button is present
    // expect: Cancel button is visible and clickable
    const cancelButton = page.locator('button:has-text("Cancel")');
    await expect(cancelButton).toBeVisible();

    // 3. Click Cancel button
    // expect: User is taken back to inventory page
    // expect: Items remain in cart
    await cancelButton.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // Verify cart badge still shows the item was in cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  });
});
