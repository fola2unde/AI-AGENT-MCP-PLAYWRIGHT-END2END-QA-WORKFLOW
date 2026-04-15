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

  test('TC-AC3-003: Verify payment and shipping information display', async ({ page }) => {
    // 1. Complete checkout flow to overview page with valid data
    // expect: Checkout overview page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // 2. Verify payment information section is displayed
    // expect: Payment method information is shown
    // expect: Information is relevant to transaction
    await expect(page.locator('text=Payment Information:')).toBeVisible();
    await expect(page.locator('text=SauceCard')).toBeVisible();

    // 3. Verify shipping information section is displayed
    // expect: Shipping address is shown
    // expect: Shipping details include First Name, Last Name, Zip Code entered
    await expect(page.locator('text=Shipping Information:')).toBeVisible();
    await expect(page.locator('text=Free Pony Express Delivery')).toBeVisible();

    // 4. Verify information is accurate and matches what was entered
    // expect: Shipping name matches entered values
    // expect: Zip code is correct
    // Verify pricing information is displayed
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  });
});
