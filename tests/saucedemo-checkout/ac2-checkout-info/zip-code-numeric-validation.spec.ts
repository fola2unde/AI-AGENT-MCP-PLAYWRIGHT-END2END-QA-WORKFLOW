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

  test('TC-AC2-008: Verify Zip Code field accepts numeric input', async ({ page }) => {
    // 1. Navigate to checkout information page
    // expect: Checkout page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Enter text in Zip Code field: 'ABCDE'
    // expect: Field behavior with non-numeric input is clear
    // expect: Field accepts or rejects letters appropriately
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('ABCDE');

    // 3. Enter valid zip code: '90210'
    // expect: Field accepts numeric zip code
    await page.locator('[data-test="postalCode"]').clear();
    await page.locator('[data-test="postalCode"]').fill('90210');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('90210');

    // 4. Complete form with valid data and submit
    // expect: Form submission succeeds
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  });
});
