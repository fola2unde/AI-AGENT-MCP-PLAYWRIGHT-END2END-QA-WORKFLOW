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

  test('TC-AC1-003: Verify cart with quantity variations', async ({ page }) => {
    // 1. Login to SauceDemo with credentials: username 'standard_user', password 'secret_sauce'
    // expect: User is successfully logged in
    await expect(page.locator('text=Products')).toBeVisible();

    // 2. Add one product and try to modify quantity if quantity selector is available
    // expect: Product is added to cart
    // expect: Quantity can be modified or displays correctly
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

    // 3. Add additional different products to demonstrate quantity variations
    // expect: Cart shows updated quantity
    // expect: Total price reflects quantity multiplier
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('3');

    // 4. Remove one item from cart and verify cart updates
    // expect: Cart quantity decreases
    // expect: Total price recalculates correctly
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
  });
});
