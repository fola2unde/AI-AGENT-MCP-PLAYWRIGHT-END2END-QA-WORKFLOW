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

  test('TC-AC2-007: Verify form field input validation with special characters', async ({ page }) => {
    // 1. Navigate to checkout information page
    // expect: Checkout page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Enter special characters in First Name field: '@#$%^&*()'
    // expect: Field accepts or rejects special characters appropriately
    await page.locator('[data-test="firstName"]').fill('@#$%^&*()');

    // 3. Enter valid name in First Name: 'Jean-Pierre'
    // expect: First Name accepts hyphenated name
    await page.locator('[data-test="firstName"]').clear();
    await page.locator('[data-test="firstName"]').fill('Jean-Pierre');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('Jean-Pierre');

    // 4. Fill other fields with valid data and submit
    // expect: Form submission succeeds with valid names
    // expect: Hyphenated and special names are handled correctly
    await page.locator('[data-test="lastName"]').fill('Dupont');
    await page.locator('[data-test="postalCode"]').fill('75001');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  });
});
