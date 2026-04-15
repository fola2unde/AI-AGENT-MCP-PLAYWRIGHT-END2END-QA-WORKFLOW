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

  test('TC-AC2-002: Verify successful form submission with valid data', async ({ page }) => {
    // 1. Login and add product to cart, then click Checkout
    // expect: Checkout information page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Enter First Name: 'John' in First Name field
    // expect: First Name field accepts input
    // expect: Text 'John' is displayed in field
    await page.locator('[data-test="firstName"]').fill('John');
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('John');

    // 3. Enter Last Name: 'Doe' in Last Name field
    // expect: Last Name field accepts input
    // expect: Text 'Doe' is displayed in field
    await page.locator('[data-test="lastName"]').fill('Doe');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Doe');

    // 4. Enter Zip Code: '12345' in Zip/Postal Code field
    // expect: Zip Code field accepts numeric input
    // expect: Text '12345' is displayed in field
    await page.locator('[data-test="postalCode"]').fill('12345');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('12345');

    // 5. Click 'Continue' button
    // expect: User is redirected to checkout overview page
    // expect: No error messages are displayed
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();
  });
});
