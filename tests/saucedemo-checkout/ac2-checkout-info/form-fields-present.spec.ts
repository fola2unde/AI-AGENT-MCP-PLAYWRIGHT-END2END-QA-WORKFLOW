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

  test('TC-AC2-001: Verify checkout form fields are present', async ({ page }) => {
    // 1. Login to SauceDemo and add product to cart
    // expect: Product is added to cart
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    // 2. Navigate to cart and click 'Checkout' button
    // expect: Checkout information page is displayed
    await expect(page.locator('text=Checkout: Your Information')).toBeVisible();

    // 3. Verify all required form fields are visible
    // expect: First Name field is present and visible
    // expect: Last Name field is present and visible
    // expect: Zip/Postal Code field is present and visible
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  });
});
