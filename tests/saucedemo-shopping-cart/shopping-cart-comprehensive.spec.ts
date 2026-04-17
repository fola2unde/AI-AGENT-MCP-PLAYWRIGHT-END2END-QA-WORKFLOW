import { test, expect, Page } from '@playwright/test';

// Helper Functions
class CartHelper {
  constructor(private page: Page) {}

  async login(username: string = 'standard_user', password: string = 'secret_sauce') {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.fill('input#user-name', username);
    await this.page.fill('input#password', password);
    await this.page.click('input#login-button');
    await this.page.waitForURL('**/inventory.html');
  }

  async addProductToCart(productName: string) {
    const button = this.page.locator(`button[id*="add-to-cart-sauce-labs-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await button.click();
    await this.page.waitForTimeout(200);
  }

  async viewCart() {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL('**/cart.html');
  }

  async getCartItemCount(): Promise<string> {
    const badge = this.page.locator('.shopping_cart_badge');
    return await badge.textContent() || '0';
  }

  async updateQuantity(productIndex: number, newQuantity: number) {
    const quantityInput = this.page.locator('.cart_quantity').nth(productIndex);
    await quantityInput.fill(newQuantity.toString());
    await this.page.waitForTimeout(100);
  }

  async removeProduct(productIndex: number) {
    const removeButton = this.page.locator('.cart_item_remove button').nth(productIndex);
    await removeButton.click();
    await this.page.waitForTimeout(200);
  }

  async getCartSubtotal(): Promise<string> {
    const subtotal = this.page.locator('.summary_subtotal_label');
    const text = await subtotal.textContent();
    return text?.match(/\$[\d.]+/)?.[0] || '$0.00';
  }

  async getCartItemCount(): Promise<number> {
    const items = await this.page.locator('.cart_item').count();
    return items;
  }

  async proceedToCheckout() {
    await this.page.click('#checkout');
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async continueShop() {
    await this.page.click('#continue-shopping');
    await this.page.waitForURL('**/inventory.html');
  }
}

// Test Configuration
test.describe('SCRUM-103: Shopping Cart Management', () => {
  
  let cartHelper: CartHelper;

  test.beforeEach(async ({ page }) => {
    cartHelper = new CartHelper(page);
    await cartHelper.login();
  });

  // ============================================================================
  // AC1: Add Product to Cart
  // ============================================================================
  test.describe('AC1: Add Product to Cart', () => {
    
    test('TC1.1: Should add single product to cart', async ({ page }) => {
      // GIVEN user is on products page
      // WHEN user clicks "Add to Cart" button
      await cartHelper.addProductToCart('backpack');
      
      // THEN product should be added to cart
      const count = await cartHelper.getCartItemCount();
      expect(count).toBe('1');
      
      // AND cart badge should show 1
      expect(await page.locator('.shopping_cart_badge').textContent()).toBe('1');
      
      // AND user should remain on products page
      expect(page.url()).toContain('/inventory.html');
    });

    test('TC1.2: Should add multiple different products', async ({ page }) => {
      // Add three different products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(200);
      await cartHelper.addProductToCart('bike-light');
      await page.waitForTimeout(200);
      await cartHelper.addProductToCart('bolt-t-shirt');
      
      // Verify count
      const count = await cartHelper.getCartItemCount();
      expect(count).toBe('3');
    });

    test('TC1.5: Should handle rapid successive adds', async ({ page }) => {
      // Rapidly add multiple products
      const products = ['backpack', 'bike-light', 'bolt-t-shirt', 'fleece-jacket', 'onesie'];
      
      for (const product of products) {
        await cartHelper.addProductToCart(product);
      }
      
      // Verify all added
      const count = await cartHelper.getCartItemCount();
      expect(count).toBe('5');
    });
  });

  // ============================================================================
  // AC2: View Cart Contents
  // ============================================================================
  test.describe('AC2: View Cart Contents', () => {
    
    test('TC2.1: Should display single item in cart', async ({ page }) => {
      // Add product and view cart
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Verify cart displays correctly
      const items = await page.locator('.cart_item').count();
      expect(items).toBe(1);
      
      // Verify product details visible
      const productName = await page.locator('.inventory_item_name').first().textContent();
      expect(productName).toContain('Backpack');
      
      // Verify buttons visible
      await expect(page.locator('#checkout')).toBeVisible();
      await expect(page.locator('#continue-shopping')).toBeVisible();
    });

    test('TC2.2: Should display multiple items with correct totals', async ({ page }) => {
      // Add three products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bolt-t-shirt');
      
      await cartHelper.viewCart();
      
      // Verify all items displayed
      const items = await page.locator('.cart_item').count();
      expect(items).toBe(3);
      
      // Verify subtotal: $29.99 + $9.99 + $15.99 = $55.97
      const subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$55.97');
    });

    test('TC2.4: Should show empty cart message', async ({ page }) => {
      // Go directly to empty cart
      await page.goto('https://www.saucedemo.com/cart.html');
      
      // Verify empty message
      const emptyMessage = await page.locator('.cart_empty_container').isVisible();
      expect(emptyMessage).toBeTruthy();
      
      // Verify checkout button not visible
      const checkoutBtn = await page.locator('#checkout').isVisible();
      expect(checkoutBtn).toBeFalsy();
      
      // Verify continue shopping visible
      const continueBtn = await page.locator('#continue-shopping').isVisible();
      expect(continueBtn).toBeTruthy();
    });
  });

  // ============================================================================
  // AC3: Update Product Quantity
  // ============================================================================
  test.describe('AC3: Update Product Quantity', () => {
    
    test('TC3.1: Should increase quantity and recalculate total', async ({ page }) => {
      // Add product and view cart
      await cartHelper.addProductToCart('backpack'); // $29.99
      await cartHelper.viewCart();
      
      // Increase quantity from 1 to 2
      await cartHelper.updateQuantity(0, 2);
      
      // Verify quantity updated
      const quantityValue = await page.locator('.cart_quantity').first().inputValue();
      expect(quantityValue).toBe('2');
      
      // Verify total updated: $29.99 × 2 = $59.98
      const subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$59.98');
    });

    test('TC3.2: Should prevent quantity below 1', async ({ page }) => {
      // Add product
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Try to set quantity to 0
      await cartHelper.updateQuantity(0, 0);
      
      // Verify quantity is not 0
      const quantityValue = await page.locator('.cart_quantity').first().inputValue();
      expect(parseInt(quantityValue)).toBeGreaterThanOrEqual(1);
    });

    test('TC3.3: Should handle direct quantity input', async ({ page }) => {
      // Add product
      await cartHelper.addProductToCart('bike-light'); // $9.99
      await cartHelper.viewCart();
      
      // Set quantity to 5
      await cartHelper.updateQuantity(0, 5);
      
      // Verify total: $9.99 × 5 = $49.95
      const subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$49.95');
    });
  });

  // ============================================================================
  // AC4: Remove Product from Cart
  // ============================================================================
  test.describe('AC4: Remove Product from Cart', () => {
    
    test('TC4.1: Should remove single item from cart', async ({ page }) => {
      // Add two products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light');
      await cartHelper.viewCart();
      
      // Remove first item
      await cartHelper.removeProduct(0);
      
      // Verify only one item remains
      const items = await cartHelper.getCartItemCount();
      expect(items).toBe(1);
      
      // Verify badge updated
      const badge = await cartHelper.getCartItemCount();
      expect(badge).toBe('1');
    });

    test('TC4.3: Should transition to empty state when removing last item', async ({ page }) => {
      // Add one product
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Remove the item
      await cartHelper.removeProduct(0);
      
      // Verify empty state
      const emptyMessage = await page.locator('.cart_empty_container').isVisible();
      expect(emptyMessage).toBeTruthy();
      
      // Verify checkout button hidden
      const checkoutBtn = await page.locator('#checkout').isVisible();
      expect(checkoutBtn).toBeFalsy();
    });
  });

  // ============================================================================
  // AC5: Empty Cart State
  // ============================================================================
  test.describe('AC5: Empty Cart State', () => {
    
    test('TC5.1: Should display empty cart message', async ({ page }) => {
      // Navigate directly to empty cart
      await page.goto('https://www.saucedemo.com/cart.html');
      
      // Verify empty message
      const emptyContainer = await page.locator('.cart_empty_container').isVisible();
      expect(emptyContainer).toBeTruthy();
      
      // Verify no items displayed
      const items = await page.locator('.cart_item').count();
      expect(items).toBe(0);
    });
  });

  // ============================================================================
  // AC6: Cart Price Calculations
  // ============================================================================
  test.describe('AC6: Cart Price Calculations', () => {
    
    test('TC6.1: Should calculate single item total correctly', async ({ page }) => {
      // Add backpack ($29.99)
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Verify price: $29.99 × 1 = $29.99
      const subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$29.99');
    });

    test('TC6.2: Should calculate multiple items correctly', async ({ page }) => {
      // Add products
      await cartHelper.addProductToCart('backpack'); // $29.99
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light'); // $9.99
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bolt-t-shirt'); // $15.99
      
      await cartHelper.viewCart();
      
      // Verify total: $29.99 + $9.99 + $15.99 = $55.97
      const subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$55.97');
    });

    test('TC6.4: Should update total in real-time on quantity change', async ({ page }) => {
      // Add product
      await cartHelper.addProductToCart('backpack'); // $29.99
      await cartHelper.viewCart();
      
      // Initial total should be $29.99
      let subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$29.99');
      
      // Change quantity to 3
      await cartHelper.updateQuantity(0, 3);
      
      // Verify updated total: $29.99 × 3 = $89.97
      subtotal = await cartHelper.getCartSubtotal();
      expect(subtotal).toBe('$89.97');
    });
  });

  // ============================================================================
  // AC7: Cart Persistence Across Pages
  // ============================================================================
  test.describe('AC7: Cart Persistence Across Pages', () => {
    
    test('TC7.1: Should persist cart when navigating to products', async ({ page }) => {
      // Add products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light');
      
      // Verify badge shows 2
      let count = await cartHelper.getCartItemCount();
      expect(count).toBe('2');
      
      // Navigate to products page
      await cartHelper.viewCart();
      await cartHelper.continueShop();
      
      // Verify badge still shows 2
      count = await cartHelper.getCartItemCount();
      expect(count).toBe('2');
    });

    test('TC7.2: Should persist cart on page refresh', async ({ page }) => {
      // Add products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light');
      
      // Go to cart
      await cartHelper.viewCart();
      
      // Verify before refresh
      let items = await cartHelper.getCartItemCount();
      expect(items).toBe(2);
      
      // Refresh page
      await page.reload();
      await page.waitForURL('**/cart.html');
      
      // Verify after refresh
      items = await cartHelper.getCartItemCount();
      expect(items).toBe(2);
    });
  });

  // ============================================================================
  // AC8: Continue Shopping Navigation
  // ============================================================================
  test.describe('AC8: Continue Shopping Navigation', () => {
    
    test('TC8.1: Should navigate to products while preserving cart', async ({ page }) => {
      // Add products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light');
      
      // Go to cart
      await cartHelper.viewCart();
      
      // Click continue shopping
      await cartHelper.continueShop();
      
      // Verify on products page
      expect(page.url()).toContain('/inventory.html');
      
      // Verify badge still shows 2
      const count = await cartHelper.getCartItemCount();
      expect(count).toBe('2');
    });
  });

  // ============================================================================
  // AC9: Proceed to Checkout Validation
  // ============================================================================
  test.describe('AC9: Proceed to Checkout Validation', () => {
    
    test('TC9.1: Should show checkout button only with items', async ({ page }) => {
      // Empty cart should not have checkout button
      await page.goto('https://www.saucedemo.com/cart.html');
      let checkoutVisible = await page.locator('#checkout').isVisible();
      expect(checkoutVisible).toBeFalsy();
      
      // Add product and view cart
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Now checkout button should be visible
      checkoutVisible = await page.locator('#checkout').isVisible();
      expect(checkoutVisible).toBeTruthy();
    });

    test('TC9.2: Should navigate to checkout with cart data', async ({ page }) => {
      // Add products
      await cartHelper.addProductToCart('backpack'); // $29.99
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light'); // $9.99
      
      await cartHelper.viewCart();
      
      // Get cart subtotal
      const cartSubtotal = await cartHelper.getCartSubtotal();
      
      // Proceed to checkout
      await cartHelper.proceedToCheckout();
      
      // Verify on checkout page
      expect(page.url()).toContain('/checkout-step-one.html');
      
      // Verify cart data still present
      const items = await page.locator('.cart_item').count();
      expect(items).toBe(2);
    });
  });

  // ============================================================================
  // AC11: Cart Accessibility
  // ============================================================================
  test.describe('AC11: Cart Accessibility', () => {
    
    test('TC11.1: Should navigate with keyboard only', async ({ page }) => {
      // Tab to first product add button
      await page.keyboard.press('Tab');
      
      // Navigate to add button
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
      }
      
      // Press Enter to add
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      
      // Verify product added
      const count = await cartHelper.getCartItemCount();
      expect(count).toBe('1');
    });

    test('TC11.2: Should have proper focus indicators', async ({ page }) => {
      // Click checkout button
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Verify button has focus styles
      const checkoutBtn = page.locator('#checkout');
      const focusStyle = await checkoutBtn.evaluate(el => 
        window.getComputedStyle(el, ':focus').outline
      );
      
      // Focus indicators should exist
      expect(focusStyle).toBeTruthy();
    });
  });

  // ============================================================================
  // AC12: Mobile Responsiveness
  // ============================================================================
  test.describe('AC12: Mobile Responsiveness', () => {
    
    test('TC12.1: Should display correctly on iPhone SE viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Add products
      await cartHelper.addProductToCart('backpack');
      await page.waitForTimeout(100);
      await cartHelper.addProductToCart('bike-light');
      
      await cartHelper.viewCart();
      
      // Verify layout is responsive
      const cartItem = page.locator('.cart_item').first();
      const box = await cartItem.boundingBox();
      
      // Item should not exceed viewport width
      expect(box!.width).toBeLessThanOrEqual(375);
      
      // Verify touch targets are adequate
      const removeBtn = page.locator('.cart_item_remove button').first();
      const btnBox = await removeBtn.boundingBox();
      expect(btnBox!.width).toBeGreaterThanOrEqual(44);
      expect(btnBox!.height).toBeGreaterThanOrEqual(44);
    });

    test('TC12.3: Should handle orientation change', async ({ page }) => {
      // Set portrait orientation
      await page.setViewportSize({ width: 375, height: 667 });
      
      await cartHelper.addProductToCart('backpack');
      await cartHelper.viewCart();
      
      // Verify in portrait
      let items = await cartHelper.getCartItemCount();
      expect(items).toBe(1);
      
      // Change to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      
      // Wait for layout adjustment
      await page.waitForTimeout(300);
      
      // Verify still visible and functional
      items = await cartHelper.getCartItemCount();
      expect(items).toBe(1);
      
      // Verify content readable
      const cartContent = page.locator('.cart_item');
      await expect(cartContent.first()).toBeVisible();
    });
  });
});

// Browser Configuration (in playwright.config.ts)
/*
export default defineConfig({
  testDir: './tests/saucedemo-shopping-cart',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
*/
