// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('AC1 - Cart Review', () => {
  test.beforeEach(async ({ page }) => {
    // Login to SauceDemo with test credentials
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // Wait for products page to load
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-AC1-002: Verify multiple items cart display', async ({ page }) => {
    // 1. Login to SauceDemo with credentials: username 'standard_user', password 'secret_sauce'
    // expect: User is successfully logged in
    // expect: Products page is displayed
    await expect(page.locator('text=Products')).toBeVisible();

    // 2. Add three different products to cart: Sauce Labs Backpack, Sauce Labs Bolt T-Shirt, and Sauce Labs Onesie
    // expect: All three products are added
    // expect: Cart badge shows count of 3
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');

    // 3. Navigate to cart page
    // expect: Cart page displays all 3 items
    // expect: Each item shows name, price, and quantity
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // 4. Verify each item's details are correct
    // expect: All product names are accurate
    // expect: All prices match original product prices
    // expect: Quantities are correct for each item
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sauce Labs Onesie' })).toBeVisible();

    // 5. Verify total price calculation for multiple items
    // expect: Total is sum of all individual item prices
    // expect: Price breakdown is clear and accurate
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('text=$15.99')).toBeVisible();
    await expect(page.locator('text=$7.99')).toBeVisible();
  });
});
