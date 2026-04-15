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

  test('TC-AC1-004: Verify continue shopping navigation', async ({ page }) => {
    // 1. Login and add at least one product to cart
    // expect: Product is added successfully
    await expect(page.locator('text=Products')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 2. Navigate to cart page
    // expect: Cart page is displayed with items
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // 3. Click 'Continue Shopping' button
    // expect: User is redirected to products page
    // expect: Cart count is maintained in header
    const cartBadgeBefore = await page.locator('[data-test="shopping-cart-badge"]').textContent();
    await page.locator('button:has-text("Continue Shopping")').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // 4. Add another product to cart
    // expect: New product is added
    // expect: Cart count increases
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');

    // 5. Verify cart maintains previous items
    // expect: Both previous and new items are in cart
    // expect: Cart total is updated correctly
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible();
    await expect(page.locator('text=Sauce Labs Bike Light')).toBeVisible();
  });
});
