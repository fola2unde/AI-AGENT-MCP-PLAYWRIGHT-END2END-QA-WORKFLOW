// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AC2 - Checkout Information Entry', () => {
  test.beforeEach(async ({ page }) => {
    // Login to SauceDemo with test credentials and add product to cart
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // Add a product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // Navigate to checkout
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.locator('[data-test="checkout"]').click();
  });

  test('TC-AC2-005: Verify mandatory field validation - empty Zip Code', async ({ page }) => {
    // 1. Login, add product to cart, and navigate to checkout information page
    // expect: Checkout information page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Enter First Name: 'John' and Last Name: 'Doe'
    // expect: Both fields have values
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');

    // 3. Leave Zip Code field empty
    // expect: Zip Code field remains empty

    // 4. Click 'Continue' button
    // expect: Page does not advance
    // expect: Error message indicates Zip Code is required
    await page.locator('[data-test="continue"]').click();
    await expect(page).not.toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('text=Error: Postal Code is required')).toBeVisible();
  });
});
