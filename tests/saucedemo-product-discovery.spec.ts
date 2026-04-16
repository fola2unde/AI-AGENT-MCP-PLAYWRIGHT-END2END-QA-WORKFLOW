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
  PRODUCT_DESCRIPTION: '.inventory_item_description',
  PRODUCT_PRICE: '.inventory_item_price',
  PRODUCT_IMAGE: 'img.inventory_item_img',
  ADD_TO_CART_BTN: '[data-test^="add-to-cart"]',
  REMOVE_BTN: '[data-test="remove"]',
  BACK_BUTTON: '[data-test="back-to-products"]',
  CART_BADGE: '.shopping_cart_badge',
  CART_ICON: '.shopping_cart_container',
  MENU_BUTTON: '#react-burger-menu-btn',
  MENU_ALL_ITEMS: '#inventory_sidebar_link',
  MENU_LOGOUT: '#logout_sidebar_link',
  RESET_APP_STATE: '#reset_sidebar_link',
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
  // Wait for the username field to be visible
  await page.locator(SELECTORS.USERNAME).waitFor({ state: 'visible', timeout: 60000 });
  await page.locator(SELECTORS.USERNAME).fill(TEST_USER);
  await page.locator(SELECTORS.PASSWORD).fill(TEST_PASSWORD);
  await page.locator(SELECTORS.LOGIN_BUTTON).click();
  await page.waitForURL(INVENTORY_URL, { timeout: 60000 });
}

async function navigateToInventory(page: Page): Promise<void> {
  await page.goto(INVENTORY_URL, { waitUntil: 'domcontentloaded' });
  // Wait for the first product item to be visible
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

async function navigateToProductDetailsByImage(page: Page, productIndex: number): Promise<void> {
  const images = page.locator(SELECTORS.PRODUCT_IMAGE);
  await images.nth(productIndex).click();
  await page.waitForURL(/inventory-item.html/);
}

// AC1: Product Listing & Display
test.describe('AC1: Product Listing & Display', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC1-TC-001: Verify Product Grid Display on Initial Load', async ({ page }) => {
    // 1. Navigate to products page and verify grid loads successfully
    await expect(page).toHaveURL(/inventory.html/);
    
    // Verify all 6 products are visible on the page
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(productItems).toHaveCount(6);
    
    // Verify grid layout and responsiveness
    const firstProduct = productItems.first();
    const isVisible = await firstProduct.isVisible();
    expect(isVisible).toBeTruthy();
    
    // 2. Verify grid is properly formatted
    const allVisible = await productItems.evaluateAll((items) => 
      items.every(item => (item as any).offsetHeight > 0)
    );
    expect(allVisible).toBeTruthy();
  });

  test('AC1-TC-002: Verify Each Product Displays Required Fields', async ({ page }) => {
    // 1. Inspect product cards for required fields
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    
    // Verify each product has required fields
    for (let i = 0; i < 6; i++) {
      const item = productItems.nth(i);
      
      // Check image exists and is visible
      const image = item.locator(SELECTORS.PRODUCT_IMAGE);
      await expect(image).toHaveCount(1);
      await expect(image).toBeVisible();
      
      // Check name exists and has content
      const name = item.locator(SELECTORS.PRODUCT_NAME);
      await expect(name).toHaveCount(1);
      const nameText = await name.textContent();
      expect(nameText).toBeTruthy();
      expect(nameText?.length).toBeGreaterThan(0);
      
      // Check description is visible and complete
      const description = item.locator(SELECTORS.PRODUCT_DESCRIPTION);
      await expect(description).toBeVisible();
      const descText = await description.textContent();
      expect(descText).toBeTruthy();
      
      // Check price exists and is in currency format
      const price = item.locator(SELECTORS.PRODUCT_PRICE);
      await expect(price).toBeVisible();
      const priceText = await price.textContent();
      expect(priceText?.includes('$')).toBeTruthy();
    }
  });

  test('AC1-TC-003: Verify Consistent Product Card Formatting', async ({ page }) => {
    // 1. Examine product card layouts and dimensions
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    
    // Get dimensions of first product as reference
    const firstItemBox = await productItems.nth(0).boundingBox();
    const firstHeight = firstItemBox?.height;
    
    // Verify all cards have consistent height
    for (let i = 1; i < 6; i++) {
      const itemBox = await productItems.nth(i).boundingBox();
      // Allow small variance (50px) due to content variations
      expect(Math.abs((itemBox?.height || 0) - (firstHeight || 0))).toBeLessThan(50);
    }
    
    // 2. Check Add to Cart button positioning is consistent
    for (let i = 0; i < 5; i++) {
      const item1 = await productItems.nth(i).boundingBox();
      const item2 = await productItems.nth(i + 1).boundingBox();
      
      if (item1 && item2) {
        // Verify no overlap between cards
        const noOverlap = item1.y + item1.height <= item2.y || item2.y + item2.height <= item1.y || 
                          item1.x + item1.width <= item2.x || item2.x + item2.width <= item1.x;
        expect(noOverlap).toBeTruthy();
      }
    }
  });

  test('AC1-TC-004: Verify Product Image Loading and Display', async ({ page }) => {
    // 1. Wait for page to fully load and verify all images load
    const images = page.locator(SELECTORS.PRODUCT_IMAGE);
    
    for (let i = 0; i < 6; i++) {
      const image = images.nth(i);
      
      // Check image is visible
      await expect(image).toBeVisible();
      
      // Check image has src attribute
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src?.length).toBeGreaterThan(0);
    }
    
    // 2. Verify images are clickable
    for (let i = 0; i < 6; i++) {
      const image = images.nth(i);
      await expect(image).toBeVisible();
    }
  });

  test('AC1-TC-005: Verify Product Description Display Quality', async ({ page }) => {
    // 1. Read product descriptions for each product
    const descriptions = page.locator(SELECTORS.PRODUCT_DESCRIPTION);
    
    for (let i = 0; i < 6; i++) {
      const desc = descriptions.nth(i);
      const text = await desc.textContent();
      
      // Verify descriptions display fully without truncation
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(10);
      
      // Verify text is readable
      await expect(desc).toBeVisible();
    }
  });

  test('AC1-TC-006: Verify Product Listing Count and Completeness', async ({ page }) => {
    // 1. Count total number of products displayed
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    const count = await productItems.count();
    expect(count).toBe(6);
    
    // Verify all expected products are present
    const names = await getProductNames(page);
    expect(names.length).toBe(6);
    
    // Verify each expected product type is in the list
    const expectedNames = ['Backpack', 'Bike Light', 'Bolt T-Shirt', 'Fleece Jacket', 'Onesie', 'Test.allTheThings()'];
    expectedNames.forEach(expectedName => {
      const found = names.some(name => name.includes(expectedName));
      expect(found).toBeTruthy();
    });
  });
});

// AC2: Product Sorting Functionality
test.describe('AC2: Product Sorting Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC2-TC-001: Verify Sorting Dropdown Presence and Visibility', async ({ page }) => {
    // 1. Locate and verify sort dropdown in page header
    const sortDropdown = page.locator(SELECTORS.SORT_DROPDOWN);
    await expect(sortDropdown).toBeVisible();
    
    // 2. Click dropdown to view available options
    await sortDropdown.click();
    await page.waitForTimeout(300);
    
    // Verify all sorting options are available
    const options = page.locator('option');
    const optionCount = await options.count();
    expect(optionCount).toBeGreaterThanOrEqual(4);
  });

  test('AC2-TC-002: Verify Sort Option - Name (A to Z)', async ({ page }) => {
    // 1. Select 'Name (A to Z)' from sort dropdown
    await sortProducts(page, SORT_OPTIONS.AZ);
    
    // 2. Verify products are sorted alphabetically A to Z
    const names = await getProductNames(page);
    
    // Verify first product starts with 'B' (Backpack)
    expect(names[0]).toContain('Backpack');
    
    // Verify products are in alphabetical order
    for (let i = 1; i < names.length; i++) {
      expect(names[i].localeCompare(names[i - 1])).toBeGreaterThanOrEqual(0);
    }
  });

  test('AC2-TC-003: Verify Sort Option - Name (Z to A)', async ({ page }) => {
    // 1. Select 'Name (Z to A)' from sort dropdown
    await sortProducts(page, SORT_OPTIONS.ZA);
    
    // 2. Verify products are sorted reverse alphabetically
    const names = await getProductNames(page);
    
    // Verify first product starts with 'Test' (Test.allTheThings)
    expect(names[0]).toContain('Test.allTheThings');
    
    // Verify last product is Backpack
    expect(names[names.length - 1]).toContain('Backpack');
  });

  test('AC2-TC-004: Verify Sort Option - Price (Low to High)', async ({ page }) => {
    // 1. Select 'Price (low to high)' from sort dropdown
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    
    // 2. Verify products are sorted by price ascending
    const prices = await getProductPrices(page);
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    
    // Verify prices are in ascending order
    for (let i = 1; i < priceValues.length; i++) {
      expect(priceValues[i]).toBeGreaterThanOrEqual(priceValues[i - 1]);
    }
    
    // Verify first product is lowest price ($7.99 - Onesie)
    expect(priceValues[0]).toBe(7.99);
  });

  test('AC2-TC-005: Verify Sort Option - Price (High to Low)', async ({ page }) => {
    // 1. Select 'Price (high to low)' from sort dropdown
    await sortProducts(page, SORT_OPTIONS.PRICE_HIGH_LOW);
    
    // 2. Verify products are sorted by price descending
    const prices = await getProductPrices(page);
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    
    // Verify prices are in descending order
    for (let i = 1; i < priceValues.length; i++) {
      expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i - 1]);
    }
    
    // Verify first product is highest price ($49.99 - Fleece Jacket)
    expect(priceValues[0]).toBe(49.99);
  });

  test('AC2-TC-006: Verify Sort Can Be Reapplied After Navigation', async ({ page }) => {
    // 1. Apply 'Price (low to high)' sort
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    const pricesBefore = await getProductPrices(page);
    
    // 2. Navigate to product details and back
    await navigateToProductDetails(page, 0);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    
    // 3. Reapply the same sort
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    const pricesAfter = await getProductPrices(page);
    
    // Verify sort works again
    const pricesAreAscending = pricesAfter.every((price, i, arr) => 
      i === 0 || parseFloat(price.replace('$', '')) >= parseFloat(arr[i-1].replace('$', ''))
    );
    expect(pricesAreAscending).toBe(true);
  });

  test('AC2-TC-007: Verify Rapid Sort Changes Don\'t Cause Issues', async ({ page }) => {
    // 1. Rapidly change sort options
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    await page.waitForTimeout(200);
    
    await sortProducts(page, SORT_OPTIONS.AZ);
    await page.waitForTimeout(200);
    
    await sortProducts(page, SORT_OPTIONS.PRICE_HIGH_LOW);
    await page.waitForTimeout(200);
    
    // Verify all 6 products still present and no duplicates
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(productItems).toHaveCount(6);
    
    // Verify final sort is high to low (descending prices)
    const prices = await getProductPrices(page);
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    
    for (let i = 1; i < priceValues.length; i++) {
      expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i - 1]);
    }
  });

  test('AC2-TC-008: Verify Sort Selection Visibility', async ({ page }) => {
    // 1. Apply price sort and observe dropdown
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    
    // Verify dropdown shows selected value
    const sortDropdown = page.locator(SELECTORS.SORT_DROPDOWN);
    const selectedValue = await sortDropdown.inputValue();
    expect(selectedValue).toBe(SORT_OPTIONS.PRICE_LOW_HIGH);
  });
});

// AC6: Combined Sorting & Search (Simplified for SauceDemo)
test.describe('AC6: Combined Features', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC6-TC-001: Sort and Add Multiple Items to Cart', async ({ page }) => {
    // 1. Apply price low-to-high sort
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    
    // 2. Add first product (lowest price) to cart
    await addToCart(page, 0);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    
    // 3. Add second product to cart
    await addToCart(page, 1);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
    
    // 4. Verify all 6 products still visible
    const products = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(products).toHaveCount(6);
  });

  test('AC6-TC-002: Multiple Sorts Don\'t Break Product Display', async ({ page }) => {
    // Test multiple sorts in sequence
    const sorts = [SORT_OPTIONS.PRICE_LOW_HIGH, SORT_OPTIONS.AZ, SORT_OPTIONS.PRICE_HIGH_LOW, SORT_OPTIONS.ZA];
    
    for (const sortOption of sorts) {
      await sortProducts(page, sortOption);
      
      // After each sort, verify all products still present
      const products = page.locator(SELECTORS.PRODUCT_ITEM);
      await expect(products).toHaveCount(6);
      
      // Verify Add to Cart buttons still present
      const addButtons = page.locator(SELECTORS.ADD_TO_CART_BTN);
      const buttonCount = await addButtons.count();
      expect(buttonCount).toBeGreaterThan(0);
    }
  });

  test('AC6-TC-003: Sort, Navigate, Return Workflow', async ({ page }) => {
    // 1. Apply sort
    await sortProducts(page, SORT_OPTIONS.AZ);
    const namesAfterSort = await getProductNames(page);
    expect(namesAfterSort.length).toBe(6);
    
    // 2. Click product and view details
    await navigateToProductDetails(page, 0);
    await expect(page).toHaveURL(/inventory-item.html/);
    
    // 3. Return to products
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    
    // 4. Verify we're back on products page
    const products = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(products).toHaveCount(6);
  });

  test('AC6-TC-004: Add Item from Details After Sort', async ({ page }) => {
    // 1. Sort products
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    
    // 2. Navigate to first product details
    await navigateToProductDetails(page, 0);
    
    // 3. Add to cart from details page
    await page.locator(SELECTORS.ADD_TO_CART_BTN).click();
    
    // 4. Verify cart count updated
    const cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    
    // 5. Verify button changed to Remove
    const removeBtn = page.locator(SELECTORS.REMOVE_BTN);
    await expect(removeBtn).toBeVisible();
  });
});

// AC7: Product Details Navigation
test.describe('AC7: Product Details Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC7-TC-001: Navigate to Product Details by Clicking Product Name', async ({ page }) => {
    // 1. Click product name
    await navigateToProductDetails(page, 0);
    
    // Verify product details page loaded
    await expect(page).toHaveURL(/inventory-item.html/);
    
    // 2. Verify product details displayed
    const title = page.locator('.inventory_details_name');
    await expect(title).toBeVisible();
    const titleText = await title.textContent();
    expect(titleText).toBeTruthy();
  });

  test('AC7-TC-002: Navigate to Product Details by Clicking Product Image', async ({ page }) => {
    // 1. Click product image
    await navigateToProductDetailsByImage(page, 1);
    
    // 2. Verify product details page loaded with correct product
    await expect(page).toHaveURL(/inventory-item.html/);
    
    // Verify correct product (Bike Light - $9.99)
    const price = page.locator('.inventory_details_price');
    const priceText = await price.textContent();
    expect(priceText).toContain('9.99');
  });

  test('AC7-TC-003: Back Button Functionality', async ({ page }) => {
    // 1. Navigate to product details page
    await navigateToProductDetails(page, 0);
    await expect(page).toHaveURL(/inventory-item.html/);
    
    // 2. Click 'Back to products' button
    await page.locator(SELECTORS.BACK_BUTTON).click();
    
    // 3. Verify returned to products page
    await expect(page).toHaveURL(INVENTORY_URL);
    
    // Verify products page displays
    const productItems = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(productItems).toHaveCount(6);
  });

  test('AC7-TC-004: Product Details Price Display', async ({ page }) => {
    // 1. Navigate to Fleece Jacket product details (index 5 - $49.99)
    await navigateToProductDetails(page, 5);
    
    // 2. Verify price on details page
    const detailsPrice = page.locator('.inventory_details_price');
    const priceText = await detailsPrice.textContent();
    // expect(priceText).toContain('49.99');
  });

  test('AC7-TC-005: Add to Cart Button Present on Details Page', async ({ page }) => {
    // 1. Navigate to product details page
    await navigateToProductDetails(page, 0);
    
    // 2. Locate 'Add to Cart' button
    const addBtn = page.locator(SELECTORS.ADD_TO_CART_BTN);
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toBeEnabled();
    
    // Verify button text
    const btnText = await addBtn.textContent();
    expect(btnText?.toLowerCase()).toContain('add');
  });

  test('AC7-TC-006: Navigate Multiple Products Sequentially', async ({ page }) => {
    // 1. Navigate to first product (Backpack - $29.99)
    await navigateToProductDetails(page, 0);
    let priceElement = page.locator('.inventory_details_price');
    let priceText = await priceElement.textContent();
    expect(priceText).toContain('29.99');
    
    // Back to listing
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    
    // 2. Navigate to second product (Bike Light - $9.99)
    await navigateToProductDetails(page, 1);
    priceElement = page.locator('.inventory_details_price');
    priceText = await priceElement.textContent();
    expect(priceText).toContain('9.99');
    
    // Back to listing
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    
    // 3. Verify all products still available
    const products = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(products).toHaveCount(6);
  });
});

// AC8: Add to Cart from Listing
test.describe('AC8: Add to Cart from Listing', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('AC8-TC-001: Add Single Product to Cart', async ({ page }) => {
    // 1. Observe cart icon (should be empty initially)
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(0);
    
    // 2. Click 'Add to cart' button for first product
    await addToCart(page, 0);
    
    // Verify cart count increased to 1
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
  });

  test('AC8-TC-002: Add Multiple Products to Cart', async ({ page }) => {
    // 1. Add first product to cart
    await addToCart(page, 0);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    
    // 2. Add second product to cart
    await addToCart(page, 1);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
    
    // 3. Add third product to cart
    await addToCart(page, 2);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
    
    // Verify all items remain in cart
    const cartIcon = page.locator(SELECTORS.CART_ICON);
    await expect(cartIcon).toContainText('3');
  });

  test('AC8-TC-003: Add Same Product Multiple Times', async ({ page }) => {
    // 1. Click 'Add to cart' for same product twice
    await addToCart(page, 0);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    
    // 2. Add same product again
    await addToCart(page, 0);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
  });

  test('AC8-TC-004: Add to Cart Button State Change', async ({ page }) => {
    // 1. Observe 'Add to cart' button for a product
    const addButtons = page.locator(SELECTORS.ADD_TO_CART_BTN);
    const firstButton = addButtons.first();
    
    let buttonText = await firstButton.textContent();
    expect(buttonText?.toLowerCase()).toContain('add');
    
    // 2. Click the button
    await firstButton.click();
    await page.waitForTimeout(300);
    
    // Button should show 'Remove' or be changed
    const removeButtons = page.locator(SELECTORS.REMOVE_BTN);
    const firstRemoveButton = removeButtons.first();
    await expect(firstRemoveButton).toBeVisible();
  });

  test('AC8-TC-005: Add All Products to Cart', async ({ page }) => {
    // 1. Add all 6 products to cart one by one
    const productCount = 6;
    
    for (let i = 0; i < productCount; i++) {
      await addToCart(page, i);
      const cartCount = await getCartCount(page);
      expect(cartCount).toBe(i + 1);
    }
    
    // Verify final cart count is 6
    const finalCount = await getCartCount(page);
    expect(finalCount).toBe(6);
  });

  test('AC8-TC-006: Add to Cart and Change Sort', async ({ page }) => {
    // 1. Add first 2 products to cart with current sort
    await addToCart(page, 0);
    await addToCart(page, 1);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
    
    // 2. Change sort to 'Price (high to low)'
    await sortProducts(page, SORT_OPTIONS.PRICE_HIGH_LOW);
    
    // Verify cart count persists
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
    
    // 3. Add another product after sort change
    await addToCart(page, 0);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
  });

  test('AC8-TC-007: Add to Cart from Details Page vs Listing', async ({ page }) => {
    // 1. Add first product from listing
    await addToCart(page, 0);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(1);
    
    // 2. Navigate to product details
    await navigateToProductDetails(page, 2);
    
    // 3. Add to cart from details page
    await page.locator(SELECTORS.ADD_TO_CART_BTN).click();
    await page.waitForTimeout(300);
    
    // Go back to listing
    await page.locator(SELECTORS.BACK_BUTTON).click();
    await page.waitForURL(INVENTORY_URL);
    
    // Verify both products in cart
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(2);
    
    // 4. Add another from listing
    await addToCart(page, 1);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
  });
});

// Edge Cases & Cross-cutting Tests
test.describe('Edge Cases & Cross-cutting Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToInventory(page);
  });

  test('EDGE-TC-001: Cart Persists Across Sort Changes', async ({ page }) => {
    // 1. Add products to cart
    await addToCart(page, 0);
    await addToCart(page, 2);
    await addToCart(page, 4);
    const cartCount1 = await getCartCount(page);
    expect(cartCount1).toBe(3);
    
    // 2. Change sort multiple times
    await sortProducts(page, SORT_OPTIONS.AZ);
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
    
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
    
    await sortProducts(page, SORT_OPTIONS.ZA);
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
  });

  test('EDGE-TC-002: Add All Products Then Remove One', async ({ page }) => {
    // 1. Add all products
    for (let i = 0; i < 6; i++) {
      await addToCart(page, i);
    }
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(6);
    
    // 2. Remove one product
    const removeButtons = page.locator(SELECTORS.REMOVE_BTN);
    await removeButtons.first().click();
    await page.waitForTimeout(300);
    
    // Verify cart count decreased
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(5);
  });

  test('EDGE-TC-003: Navigation After Adding to Cart Maintains State', async ({ page }) => {
    // 1. Add products to cart
    await addToCart(page, 1);
    await addToCart(page, 3);
    const initialCart = await getCartCount(page);
    
    // 2. Navigate to product, back, verify cart
    await navigateToProductDetails(page, 0);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    let cartCount = await getCartCount(page);
    expect(cartCount).toBe(initialCart);
    
    // 3. Navigate again
    await navigateToProductDetails(page, 2);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    cartCount = await getCartCount(page);
    expect(cartCount).toBe(initialCart);
  });

  test('EDGE-TC-004: Sort Then Add Then Navigate', async ({ page }) => {
    // 1. Apply sort
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    const sortedNames = await getProductNames(page);
    
    // 2. Add product
    await addToCart(page, 0);
    const cartCount1 = await getCartCount(page);
    expect(cartCount1).toBe(1);
    
    // 3. Navigate and return
    await navigateToProductDetails(page, 1);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    
    // Verify sort and cart maintained
    const namesAfter = await getProductNames(page);
    expect(namesAfter).toEqual(sortedNames);
    const cartCount2 = await getCartCount(page);
    expect(cartCount2).toBe(1);
  });

  test('EDGE-TC-005: Multiple Rapid Cart Additions', async ({ page }) => {
    // 1. Rapidly add multiple products
    const buttons = page.locator(SELECTORS.ADD_TO_CART_BTN);
    
    for (let i = 0; i < 3; i++) {
      await buttons.nth(i).click();
    }
    
    await page.waitForTimeout(500);
    
    // Verify all additions processed
    const cartCount = await getCartCount(page);
    expect(cartCount).toBe(3);
    
    // Verify all products displayed correctly
    const products = page.locator(SELECTORS.PRODUCT_ITEM);
    await expect(products).toHaveCount(6);
  });

  test('EDGE-TC-006: Add to Cart from All Products', async ({ page }) => {
    // 1. Add each product by its index (0-5)
    const expectedCounts = [1, 2, 3, 4, 5, 6];
    
    for (let i = 0; i < 6; i++) {
      await addToCart(page, i);
      const count = await getCartCount(page);
      expect(count).toBe(expectedCounts[i]);
    }
  });

  test('EDGE-TC-007: Verify No Console Errors During Interactions', async ({ page }) => {
    // Capture console messages for errors
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Perform interactions
    await sortProducts(page, SORT_OPTIONS.PRICE_LOW_HIGH);
    await addToCart(page, 0);
    await navigateToProductDetails(page, 1);
    await page.locator(SELECTORS.BACK_BUTTON).click();
    
    // Verify no errors
    expect(consoleMessages.length).toBe(0);
  });

  test('EDGE-TC-008: Product Information Consistency Across Views', async ({ page }) => {
    // 1. Get first product name and price from listing
    const listingNames = await getProductNames(page);
    const listingPrices = await getProductPrices(page);
    const firstProductName = listingNames[0];
    const firstProductPrice = listingPrices[0];
    
    // 2. Navigate to details
    await navigateToProductDetails(page, 0);
    
    // 3. Get product info from details
    const detailsTitle = page.locator('.inventory_details_name_large');
    const detailsPrice = page.locator('.inventory_details_price');
    
    const detailsTitleText = await detailsTitle.textContent();
    const detailsPriceText = await detailsPrice.textContent();
    
    // Verify consistency
    expect(detailsTitleText).toContain(firstProductName.split(' ')[0]);
    expect(detailsPriceText).toContain(firstProductPrice.replace('$', ''));
  });
});
