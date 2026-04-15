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

  test('TC-AC2-006: Verify all fields empty validation', async ({ page }) => {
    // 1. Login, add product to cart, and navigate to checkout information page
    // expect: Checkout information page is displayed
    // expect: All fields are empty
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('');

    // 2. Click 'Continue' button without entering any data
    // expect: Page does not advance
    // expect: Error message is displayed
    await page.locator('[data-test="continue"]').click();
    await expect(page).not.toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // 3. Verify error message is clear and specific
    // expect: Error indicates which fields are required
    // expect: Message is user-friendly
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toBeTruthy();
  });
});
