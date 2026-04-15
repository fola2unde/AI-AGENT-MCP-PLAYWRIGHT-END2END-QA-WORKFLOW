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

  test('TC-AC2-010: Verify form persists data after error', async ({ page }) => {
    // 1. Navigate to checkout information page
    // expect: Checkout page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Enter First Name: 'John' and Zip Code: '12345', but leave Last Name empty
    // expect: First Name and Zip Code fields have values
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 3. Click 'Continue' button
    // expect: Error message appears for missing Last Name
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('text=Error: Last Name is required')).toBeVisible();

    // 4. Verify previously entered data is still visible
    // expect: First Name 'John' is still in field
    // expect: Zip Code '12345' is still in field
    // expect: Last Name field is empty
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('');
  });
});
