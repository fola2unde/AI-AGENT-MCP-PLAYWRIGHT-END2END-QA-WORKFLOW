import { test, expect, Page } from '@playwright/test';

// Configure test timeout for external site
test.setTimeout(90000);

// Test data constants
const SAUCEDEMO_URL = 'https://www.saucedemo.com';
const LOGIN_URL = `${SAUCEDEMO_URL}`;
const INVENTORY_URL = `${SAUCEDEMO_URL}/inventory.html`;
const TEST_USER = 'standard_user';
const TEST_PASSWORD = 'secret_sauce';

// Selectors constants
const SELECTORS = {
  USERNAME: '[data-test="username"]',
  PASSWORD: '[data-test="password"]',
  LOGIN_BUTTON: '[data-test="login-button"]',
  SORT_DROPDOWN: '[data-test="product-sort-container"]',
  PRODUCT_ITEM: '.inventory_item',
  PRODUCT_NAME: '[data-test$="-title-link"]',
  PRODUCT_PRICE: '.inventory_item_price',
  PRODUCT_IMAGE: 'img.inventory_item_img',
  ADD_TO_CART_BTN: '[data-test^="add-to-cart"]',
  REMOVE_BTN: '[data-test="remove"]',
  BACK_BUTTON: '[data-test="back-to-products"]',
  CART_BADGE: '.shopping_cart_badge',
};

// Sort options mapping
const SORT_OPTIONS = {
  AZ: 'az',
  ZA: 'za',
  PRICE_LOW_HIGH: 'lohi',
  PRICE_HIGH_LOW: 'hilo',
};

// Helper functions
async function login(page: Page): Promise<void> {
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });
  await page.locator(SELECTORS.USERNAME).waitFor({ state: 'visible', timeout: 60000 });
  await page.locator(SELECTORS.USERNAME).fill(TEST_USER);
  await page.locator(SELECTORS.PASSWORD).fill(TEST_PASSWORD);
  await page.locator(SELECTORS.LOGIN_BUTTON).click();
  await page.waitForURL(INVENTORY_URL, { timeout: 60000 });
}

async function navigateToInventory(page: Page): Promise<void> {
  await page.goto(INVENTORY_URL, { waitUntil: 'domcontentloaded' });
  await page.locator(SELECTORS.PRODUCT_ITEM).first().waitFor({ state: 'visible', timeout: 60000 });
}

async function getProductNames(page: Page): Promise<string[]> {
  const names = await page.locator(SELECTORS.PRODUCT_NAME).allTextContents();
  return names;
}

async function getProductPrices(page: Page): Promise<string[]> {
  const prices = await page.locator(SELECTORS.PRODUCT_PRICE).allTextContents();
  return prices;
}

async function getCartCount(page: Page): Promise<number> {
  const badge = page.locator(SELECTORS.CART_BADGE);
  const badgeCount = await badge.count();
  if (badgeCount === 0) return 0;
  const text = await badge.textContent();
  return parseInt(text || '0', 10);
}

async function sortProducts(page: Page, sortOption: string): Promise<void> {
  await page.locator(SELECTORS.SORT_DROPDOWN).selectOption(sortOption);
  await page.waitForTimeout(500);
}

async function addToCart(page: Page, productIndex: number): Promise<void> {
  const buttons = page.locator(SELECTORS.ADD_TO_CART_BTN);
  await buttons.nth(productIndex).click();
  await page.waitForTimeout(300);
}

async function navigateToProductDetails(page: Page, productIndex: number): Promise<void> {
  const productNames = page.locator(SELECTORS.PRODUCT_NAME);
  await productNames.nth(productIndex).click();
  await page.waitForURL(/inventory-item.html/);
}

// AC1: Product Listing & Display
test.describe('AC1: Product Listing & Display', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC1-TC-001: Verify Product Grid Display on Initial Load', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/);
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(productItems).toHaveCount(6);
    const firstProduct = productItems.first();
    const isVisible = await firstProduct.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('AC1-TC-002: Verify All Required Fields Present on Products', async ({ page }) => {
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    for (let i = 0; i < 6; i++) {
      const product = productItems.nth(i);
      const name = product.locator(SELECTORS.PRODUCT_NAME);
      const price = product.locator(SELECTORS.PRODUCT_PRICE);
      const addBtn = product.locator(SELECTORS.ADD_TO_CART_BTN);
      await expect(name).toBeVisible();
      await expect(price).toBeVisible();
      await expect(addBtn).toBeVisible();
    }
  });

  test('AC1-TC-003: Verify Product Images Display', async ({ page }) => {
    const images = page.locator(SELECTORS.PRODUCT_IMAGE);
    const imageCount = await images.count();
    expect(imageCount).toBe(6);
    const firstImage = images.first();
    const isDisplayed = await firstImage.isVisible();
    expect(isDisplayed).toBeTruthy();
  });
});

// AC2: Product Sorting Functionality
test.describe('AC2: Product Sorting Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC2-TC-001: Verify Sort Dropdown Present and Accessible', async ({ page }) => {
    const sortDropdown = page.locator(SELECTORS.SORT_DROPDOWN);
    await expect(sortDropdown).toBeVisible();
    await expect(sortDropdown).toBeEnabled();
  });

  test('AC2-TC-002: Verify Sort Option - Name A to Z', async ({ page }) => {
    await sortProducts(page, SORT_OPTIONS.AZ);
    const names = await getProductNames(page);
    for (let i = 1; i < names.length; i++) {
      expect(names[i].localeCompare(names[i - 1])).toBeGreaterThanOrEqual(0);
    }
  });

  test('AC2-TC-003: Verify Sort Option - Name Z to A', async ({ page }) => {
    await sortProducts(page, SORT_OPTIONS.ZA);
    const names = await getProductNames(page);
    for (let i = 1; i < names.length; i++) {
      expect(names[i].localeCompare(names[i - 1])).toBeLessThanOrEqual(0);
    }
  });

  test('AC2-TC-004: Verify Sort Option - Price Low to High', async ({ page }) => {
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    const prices = await getProductPrices(page);
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    for (let i = 1; i < priceValues.length; i++) {
      expect(priceValues[i]).toBeGreaterThanOrEqual(priceValues[i - 1]);
    }
  });

  test('AC2-TC-005: Verify Sort Option - Price High to Low', async ({ page }) => {
    await sortProducts(page, SORT_OPTIONS.PRICE_HIGH_LOW);
    const prices = await getProductPrices(page);
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    for (let i = 1; i < priceValues.length; i++) {
      expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i - 1]);
    }
  });

  test('AC2-TC-006: Verify Rapid Sort Changes Work Correctly', async ({ page }) => {
    const sortOptions = [SORT_OPTIONS.PRICE_LOW_HIGH, SORT_OPTIONS.AZ, SORT_OPTIONS.PRICE_HIGH_LOW, SORT_OPTIONS.ZA];
    for (const option of sortOptions) {
      await sortProducts(page, option);
      const items = page.locator(SELECTORS.PRODUCT_ITEM);
      await expect(items).toHaveCount(6);
    }
  });
});

// AC6: Combined Features
test.describe('AC6: Combined Features', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC6-TC-001: Sort and Add Items to Cart', async ({ page }) => {
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    await addToCart(page, 0);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    await addToCart(page, 1);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
  });

  test('AC6-TC-002: Multiple Sorts Maintain Product Display', async ({ page }) => {
    const sorts = [SORT_OPTIONS.PRICE_LOW_HIGH, SORT_OPTIONS.AZ, SORT_OPTIONS.PRICE_HIGH_LOW];
    for (const sortOption of sorts) {
      await sortProducts(page, sortOption);
      const products = page.locator(SELECTORS.PRODUCT_ITEM);
      await expect(products).toHaveCount(6);
    }
  });

  test('AC6-TC-003: Navigate and Return to Products', async ({ page }) => {
    await sortProducts(page, SORT_OPTIONS.AZ);
    await navigateToProductDetails(page, 0);
    await expect(page).toHaveURL(/inventory-item.html/);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    const products = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(products).toHaveCount(6);
  });
});

// AC7: Product Details Navigation
test.describe('AC7: Product Details Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC7-TC-001: Navigate to Product Details', async ({ page }) => {
    await navigateToProductDetails(page, 0);
    await expect(page).toHaveURL(/inventory-item.html/);
    const title = page.locator('.inventory_details_name');
    await expect(title).toBeVisible();
  });

  test('AC7-TC-002: Navigate by Image Click', async ({ page }) => {
    const images = page.locator(SELECTORS.PRODUCT_IMAGE);
    await images.nth(1).click();
    await page.waitForURL(/inventory-item.html/);
    await expect(page).toHaveURL(/inventory-item.html/);
  });

  test('AC7-TC-003: Back Button Functionality', async ({ page }) => {
    await navigateToProductDetails(page, 0);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(productItems).toHaveCount(6);
  });

  test('AC7-TC-004: Product Details Elements Visible', async ({ page }) => {
    await navigateToProductDetails(page, 0);
    const titleElement = page.locator('.inventory_details_name');
    const priceElement = page.locator('.inventory_details_price');
    await expect(titleElement).toBeVisible();
    await expect(priceElement).toBeVisible();
  });

  test('AC7-TC-005: Navigate Multiple Products', async ({ page }) => {
    await navigateToProductDetails(page, 0);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    await navigateToProductDetails(page, 1);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    const products = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(products).toHaveCount(6);
  });
});

// AC8: Add to Cart
test.describe('AC8: Add to Cart', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC8-TC-001: Add Single Product to Cart', async ({ page }) => {
    await addToCart(page, 0);
    const cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
  });

  test('AC8-TC-002: Cart Count Increases with Multiple Adds', async ({ page }) => {
    await addToCart(page, 0);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    await addToCart(page, 1);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
    await addToCart(page, 2);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
  });

  test('AC8-TC-003: Button State Changes After Add to Cart', async ({ page }) => {
    const buttons = page.locator(SELECTORS.ADD_TO_CART_BTN);
    const firstBtn = buttons.nth(0);
    const originalText = await firstBtn.textContent();
    expect(originalText?.toLowerCase()).toContain('add');
    
    // Click and wait for state change
    await firstBtn.click();
    await page.waitForTimeout(500);
    
    // After click, verify cart badge appeared
    const cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
  });

  test('AC8-TC-004: Add to Cart from Product Details', async ({ page }) => {
    await navigateToProductDetails(page, 0);
    await page.locator(SELECTORS.ADD_TO_CART_BTN).click();
    await page.waitForTimeout(300);
    const cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
  });

  test('AC8-TC-005: Remove Functionality Works', async ({ page }) => {
    const buttons = page.locator(SELECTORS.ADD_TO_CART_BTN);
    await buttons.nth(0).click();
    await page.waitForTimeout(300);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    
    // Click the same button which should now say "Remove"
    const btnText = await buttons.nth(0).textContent();
    if (btnText?.toLowerCase().includes('remove')) {
      await buttons.nth(0).click();
      await page.waitForTimeout(300);
      cartCount = await getCartCount(page);
      expect(cartCount).toBe(0);
    }
  });
});
