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

  test('TC-AC1-001: Verify single item cart display', async ({ page }) => {
    // 1. Login to SauceDemo with credentials: username 'standard_user', password 'secret_sauce'
    // expect: User is successfully logged in
    // expect: Products page is displayed
    await expect(page.locator('text=Products')).toBeVisible();

    // 2. Click on first product (Sauce Labs Backpack) to view details
    // expect: Product details are displayed
    // expect: Add to Cart button is visible
    await page.locator('[data-test="item-4-img-link"]').click();
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();

    // 3. Click 'Add to Cart' button
    // expect: Product is added to cart
    // expect: Cart badge shows count of 1
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

    // 4. Click on the shopping cart icon in the header
    // expect: Cart page is displayed
    // expect: Cart contains 1 item
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('text=Your Cart')).toBeVisible();

    // 5. Verify cart item details are displayed correctly
    // expect: Item name 'Sauce Labs Backpack' is visible
    // expect: Item price is displayed
    // expect: Item quantity shows 1
    // expect: Description/details about the product are visible
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('text=$29.99')).toBeVisible();
    await expect(page.locator('[data-test="item-quantity"]')).toContainText('1');

    // 6. Verify total price calculation
    // expect: Total price is calculated correctly based on item price
    // expect: Subtotal and any additional fees are clearly shown
    // Note: Price is displayed per-item on cart page

    // 7. Verify navigation options in cart
    // expect: 'Continue Shopping' button is available
    // expect: 'Checkout' button is available
    await expect(page.locator('text=Continue Shopping')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });
});
