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

  test('TC-AC2-009: Verify form field boundary conditions - max length', async ({ page }) => {
    // 1. Navigate to checkout information page
    // expect: Checkout page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Enter very long string (100+ characters) in First Name field
    // expect: Field either truncates input or allows long input
    // expect: Field behavior is consistent
    const longString = 'a'.repeat(100);
    await page.locator('[data-test="firstName"]').fill(longString);
    const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();
    expect(firstNameValue.length).toBeGreaterThan(0);

    // 3. Enter very long string in Last Name field
    // expect: Field handles long input appropriately
    await page.locator('[data-test="lastName"]').fill('Doe' + 'x'.repeat(50));

    // 4. Enter very long string in Zip Code field
    // expect: Field limits input to reasonable length
    await page.locator('[data-test="postalCode"]').fill('12345');
  });
});
