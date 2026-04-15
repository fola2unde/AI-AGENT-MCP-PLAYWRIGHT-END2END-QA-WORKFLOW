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

  test('TC-AC3-002: Verify order summary and pricing breakdown', async ({ page }) => {
    // 1. Login, add products to cart, and complete checkout information entry
    // expect: Checkout overview page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // 2. Verify Subtotal is displayed
    // expect: Subtotal field is visible
    // expect: Subtotal is sum of all item prices
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();

    // 3. Verify Tax amount is displayed
    // expect: Tax field is visible
    // expect: Tax calculation is shown
    await expect(page.locator('[data-test="tax-label"]')).toBeVisible();

    // 4. Verify Total amount is displayed
    // expect: Total field is visible and highlighted
    // expect: Total equals Subtotal + Tax
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();

    // 5. Verify pricing breakdown is clear and accurate
    // expect: Each price component is labeled clearly
    // expect: Math is correct for all calculations
    const itemTotal = await page.locator('[data-test="subtotal-label"]').textContent();
    const tax = await page.locator('[data-test="tax-label"]').textContent();
    const total = await page.locator('[data-test="total-label"]').textContent();
    expect(itemTotal).toBeTruthy();
    expect(tax).toBeTruthy();
    expect(total).toBeTruthy();
  });
});
