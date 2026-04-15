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
    
    // Add products to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    
    // Navigate to checkout overview
    await page.goto('https://www.saucedemo.com/cart.html');
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
  });

  test('TC-AC3-001: Verify checkout overview page displays all items', async ({ page }) => {
    // 1. Login and add two products to cart (Backpack and T-Shirt)
    // expect: Both products added to cart
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // 2. Navigate to cart and click Checkout
    // expect: Checkout information page is displayed

    // 3. Enter valid checkout information: First Name, Last Name, Zip Code
    // expect: All fields are filled with valid data

    // 4. Click 'Continue' button
    // expect: User is redirected to checkout overview page

    // 5. Verify checkout overview page displays all cart items
    // expect: Both products are listed on overview page
    // expect: Product names are correct
    // expect: Product prices are displayed
    await expect(page.locator('text=Checkout: Overview')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();
    await expect(page.locator('text=$29.99')).toBeVisible();
  });
});
