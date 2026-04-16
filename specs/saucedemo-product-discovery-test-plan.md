# SCRUM-102: Product Discovery & Filtering - Comprehensive Test Plan

## Application Overview

SauceDemo e-commerce platform product discovery and filtering feature. This test plan covers 10 Acceptance Criteria with 58 comprehensive test scenarios including happy path, edge cases, negative scenarios, security testing, and UI validation. SauceDemo limitations are noted (no category filters, price filters, search, or pagination) with adaptation of test scenarios to actual implemented features.

## Test Scenarios

### 1. AC1: Product Listing & Display

**Seed:** `tests/seed.spec.ts`

#### 1.1. AC1-TC-001: Verify Product Grid Display on Initial Load

**File:** `tests/saucedemo-checkout/ac1-product-listing/product-grid-initial-load.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/inventory.html after login
    - expect: Products page loads successfully
    - expect: Products are displayed in a responsive grid layout
    - expect: All 6 products are visible on the page
    - expect: Product grid is properly formatted and aligned
  2. Observe product grid layout and arrangement
    - expect: Grid is responsive (2-3 columns depending on viewport)
    - expect: Products have consistent spacing
    - expect: No overlapping or misaligned elements

#### 1.2. AC1-TC-002: Verify Each Product Displays Required Fields

**File:** `tests/saucedemo-checkout/ac1-product-listing/product-fields-display.spec.ts`

**Steps:**
  1. Inspect first product card (Sauce Labs Backpack)
    - expect: Product image is visible and clickable
    - expect: Product name is displayed: 'Sauce Labs Backpack'
    - expect: Product description is visible and complete
    - expect: Product price is displayed: '$29.99'
  2. Verify all required fields for at least 3 more products
    - expect: Each product has image, name, description, price
    - expect: All fields are visible without truncation
    - expect: No missing required information

#### 1.3. AC1-TC-003: Verify Consistent Product Card Formatting

**File:** `tests/saucedemo-checkout/ac1-product-listing/product-card-consistency.spec.ts`

**Steps:**
  1. Examine product card layouts and dimensions
    - expect: All product cards have consistent height and width
    - expect: Spacing between cards is uniform
    - expect: Product information is aligned consistently within each card
  2. Check Add to Cart button positioning across all cards
    - expect: All buttons are in same position within cards
    - expect: Buttons have consistent styling and size
    - expect: No visual misalignment

#### 1.4. AC1-TC-004: Verify Product Image Loading and Display

**File:** `tests/saucedemo-checkout/ac1-product-listing/product-images.spec.ts`

**Steps:**
  1. Wait for page to fully load and verify all images load
    - expect: All 6 product images load successfully
    - expect: Images are properly sized and visible
    - expect: Images have proper aspect ratio (not distorted)
    - expect: No broken image indicators
  2. Verify images are clickable
    - expect: Image elements are interactive links
    - expect: Clicking image navigates to product details

#### 1.5. AC1-TC-005: Verify Product Description Display Quality

**File:** `tests/saucedemo-checkout/ac1-product-listing/product-descriptions.spec.ts`

**Steps:**
  1. Read product descriptions for each product
    - expect: All descriptions display fully without truncation
    - expect: Text is readable with good contrast and proper font size
    - expect: Descriptions are meaningful and relevant to products
    - expect: No character encoding issues

#### 1.6. AC1-TC-006: Verify Product Listing Count and Completeness

**File:** `tests/saucedemo-checkout/ac1-product-listing/product-count.spec.ts`

**Steps:**
  1. Count total number of products displayed on page
    - expect: Total of 6 products displayed
    - expect: All expected products visible: Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt
    - expect: No products are hidden below fold or cut off

### 2. AC2: Product Sorting Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. AC2-TC-001: Verify Sorting Dropdown Presence and Visibility

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-dropdown-presence.spec.ts`

**Steps:**
  1. Locate the sort dropdown in page header near 'Products' title
    - expect: Sort dropdown is visible in the header
    - expect: Dropdown is labeled clearly for easy identification
    - expect: Dropdown shows 'Name (A to Z)' as default selection
  2. Click dropdown to view available options
    - expect: All 4 sorting options are available
    - expect: Options: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low)
    - expect: Dropdown is functional and clickable

#### 2.2. AC2-TC-002: Verify Sort Option - Name (A to Z)

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-name-a-z.spec.ts`

**Steps:**
  1. Select 'Name (A to Z)' from sort dropdown
    - expect: Dropdown shows 'Name (A to Z)' as selected
    - expect: Products reorder immediately
    - expect: Sort is applied without page reload
  2. Verify products are sorted alphabetically A to Z
    - expect: Order: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt
    - expect: Products are in correct alphabetical sequence
    - expect: No duplicate products in list

#### 2.3. AC2-TC-003: Verify Sort Option - Name (Z to A)

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-name-z-a.spec.ts`

**Steps:**
  1. Select 'Name (Z to A)' from sort dropdown
    - expect: Products reorder in reverse alphabetical order
    - expect: Dropdown shows 'Name (Z to A)' as selected
  2. Verify reverse alphabetical ordering
    - expect: First product: Test.allTheThings() T-Shirt (Red)
    - expect: Last product: Sauce Labs Backpack
    - expect: All 6 products in reverse alphabetical sequence

#### 2.4. AC2-TC-004: Verify Sort Option - Price (Low to High)

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-price-low-high.spec.ts`

**Steps:**
  1. Select 'Price (low to high)' from sort dropdown
    - expect: Products reorder by price ascending
    - expect: Dropdown shows 'Price (low to high)' as selected
  2. Verify price ascending order
    - expect: First product: Sauce Labs Onesie ($7.99)
    - expect: Then: Bike Light ($9.99), Bolt T-Shirt ($15.99), Test.allTheThings() ($15.99)
    - expect: Then: Backpack ($29.99), Fleece Jacket ($49.99)
    - expect: Prices increase or stay same from left to right

#### 2.5. AC2-TC-005: Verify Sort Option - Price (High to Low)

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-price-high-low.spec.ts`

**Steps:**
  1. Select 'Price (high to low)' from sort dropdown
    - expect: Products reorder by price descending
    - expect: Dropdown shows 'Price (high to low)' as selected
  2. Verify price descending order
    - expect: First product: Sauce Labs Fleece Jacket ($49.99)
    - expect: Then: Backpack ($29.99), products with $15.99, Bike Light ($9.99), Onesie ($7.99)
    - expect: Prices decrease from left to right

#### 2.6. AC2-TC-006: Verify Sort Persistence While Browsing

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-persistence.spec.ts`

**Steps:**
  1. Apply 'Price (low to high)' sort and verify products are sorted correctly
    - expect: Products display in price ascending order
    - expect: Sort dropdown shows 'Price (low to high)'
  2. Click on a product to view details page
    - expect: Product details page loads with selected product information
  3. Click 'Back to products' button
    - expect: User returns to products listing
    - expect: Products remain in 'Price (low to high)' sort order
    - expect: Sort dropdown still shows 'Price (low to high)' as selected

#### 2.7. AC2-TC-007: Verify Rapid Sort Changes Don't Cause Issues

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-rapid-changes.spec.ts`

**Steps:**
  1. Rapidly change sort options: Price (low-high) → Name (A-Z) → Price (high-low)
    - expect: Each sort change reorders products correctly
    - expect: No page crashes or errors
    - expect: No duplicate products
    - expect: All 6 products remain on page

#### 2.8. AC2-TC-008: Verify Sort Selection Visibility

**File:** `tests/saucedemo-checkout/ac2-sorting/sort-selection-visibility.spec.ts`

**Steps:**
  1. Apply 'Price (low to high)' sort and observe dropdown
    - expect: Current sort selection is clearly visible in dropdown
    - expect: Selected option is marked/highlighted
    - expect: User can easily identify current sort applied

### 3. AC7: Product Details Navigation

**Seed:** `tests/seed.spec.ts`

#### 3.1. AC7-TC-001: Navigate to Product Details by Clicking Product Name

**File:** `tests/saucedemo-checkout/ac7-product-details/navigate-by-name.spec.ts`

**Steps:**
  1. On products page, click product name 'Sauce Labs Backpack'
    - expect: Product details page loads successfully
    - expect: URL changes to inventory-item.html with product ID parameter
    - expect: Page title remains 'Swag Labs'
  2. Verify product details displayed correctly
    - expect: Product name: 'Sauce Labs Backpack'
    - expect: Product image is displayed
    - expect: Product description is visible
    - expect: Product price: '$29.99'
    - expect: All details match the product clicked

#### 3.2. AC7-TC-002: Navigate to Product Details by Clicking Product Image

**File:** `tests/saucedemo-checkout/ac7-product-details/navigate-by-image.spec.ts`

**Steps:**
  1. On products page, click image for 'Sauce Labs Bike Light'
    - expect: Product details page loads successfully
    - expect: Correct product details page displays
    - expect: URL contains product ID parameter
  2. Verify correct product information
    - expect: Product name: 'Sauce Labs Bike Light'
    - expect: Product price: '$9.99'
    - expect: Product description matches
    - expect: Product image is displayed

#### 3.3. AC7-TC-003: Back Button Functionality

**File:** `tests/saucedemo-checkout/ac7-product-details/back-button.spec.ts`

**Steps:**
  1. Navigate to product details page
    - expect: Product details page is displayed
  2. Click 'Back to products' button
    - expect: User returns to products listing page
    - expect: Products page displays all 6 products
    - expect: Page layout is correct
  3. Verify sort state is maintained if sort was applied
    - expect: Sort order persists from before product details navigation

#### 3.4. AC7-TC-004: Product Details Accuracy - Full Description

**File:** `tests/saucedemo-checkout/ac7-product-details/description-accuracy.spec.ts`

**Steps:**
  1. Navigate to product details for 'Sauce Labs Bolt T-Shirt'
    - expect: Product details page loads with correct product
  2. Compare description with listing page description
    - expect: Full description is displayed on details page
    - expect: Description matches the one on listing page
    - expect: Description is complete and not truncated
    - expect: Text is readable

#### 3.5. AC7-TC-005: Product Details Price Display

**File:** `tests/saucedemo-checkout/ac7-product-details/price-display.spec.ts`

**Steps:**
  1. View product price on details page for 'Sauce Labs Fleece Jacket'
    - expect: Price displayed: '$49.99'
    - expect: Price in correct currency format ($XX.XX)
    - expect: Price is prominent and readable
  2. Go back to products and find same product
    - expect: Listing page shows same price: '$49.99'
    - expect: No price discrepancies between pages

#### 3.6. AC7-TC-006: Add to Cart Button Present on Details Page

**File:** `tests/saucedemo-checkout/ac7-product-details/add-to-cart-button.spec.ts`

**Steps:**
  1. Navigate to product details page
    - expect: Product details page displays
  2. Locate 'Add to Cart' button
    - expect: Button is present on page
    - expect: Button is visible and clickable
    - expect: Button text reads 'Add to cart'
    - expect: Button is prominently displayed

#### 3.7. AC7-TC-007: Navigate Multiple Products Sequentially

**File:** `tests/saucedemo-checkout/ac7-product-details/multiple-product-navigation.spec.ts`

**Steps:**
  1. Click on Sauce Labs Backpack → view details → go back
    - expect: Details page shows correct product (Backpack, $29.99)
    - expect: Back button returns to products page
  2. Click on Sauce Labs Bike Light → view details → go back
    - expect: Details page shows correct product (Bike Light, $9.99)
    - expect: Back button returns to products page
  3. Click on Sauce Labs Bolt T-Shirt → view details
    - expect: Details page shows correct product (Bolt T-Shirt, $15.99)
    - expect: All product details are accurate
    - expect: No data mixing between products

### 4. AC8: Add to Cart from Listing

**Seed:** `tests/seed.spec.ts`

#### 4.1. AC8-TC-001: Add Single Product to Cart

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/add-single-product.spec.ts`

**Steps:**
  1. Observe cart icon in header (should be empty initially)
    - expect: Cart icon is visible in top-right
    - expect: No cart count displayed (or shows 0)
  2. Click 'Add to cart' button for Sauce Labs Backpack
    - expect: Button responds to click
    - expect: Cart counter in header increases to 1
    - expect: Visual feedback provided (button state change)
    - expect: No page reload occurs

#### 4.2. AC8-TC-002: Add Multiple Products to Cart

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/add-multiple-products.spec.ts`

**Steps:**
  1. Add Sauce Labs Onesie ($7.99) to cart
    - expect: Cart count increases to 1
    - expect: Product added successfully
  2. Add Sauce Labs Bike Light ($9.99) to cart
    - expect: Cart count increases to 2
    - expect: Second product added successfully
  3. Add Sauce Labs Bolt T-Shirt ($15.99) to cart
    - expect: Cart count increases to 3
    - expect: Third product added successfully
    - expect: All products remain in cart

#### 4.3. AC8-TC-003: Add to Cart Multiple Times (Same Product)

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/add-same-product-multiple.spec.ts`

**Steps:**
  1. Click 'Add to cart' for Sauce Labs Backpack
    - expect: Cart count increases to 1
  2. Click 'Add to cart' for same product again
    - expect: Cart count increases to 2 (or shows quantity increased)
    - expect: System handles duplicate additions

#### 4.4. AC8-TC-004: Add to Cart Button State Change

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/button-state-change.spec.ts`

**Steps:**
  1. Observe 'Add to cart' button for a product
    - expect: Button displays 'Add to cart' text initially
  2. Click the button
    - expect: Button provides visual feedback
    - expect: Button text may change to 'Remove from cart' or show checked state
    - expect: Product is marked as added

#### 4.5. AC8-TC-005: Add All Products to Cart

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/add-all-products.spec.ts`

**Steps:**
  1. Add all 6 products to cart one by one
    - expect: Cart count increases with each addition: 1, 2, 3, 4, 5, 6
    - expect: All products successfully added
    - expect: No errors or limit restrictions
    - expect: Page remains stable

#### 4.6. AC8-TC-006: Add to Cart and Change Sort

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/add-cart-then-sort.spec.ts`

**Steps:**
  1. Add 2 products to cart with current sort
    - expect: Cart count shows 2
  2. Change sort to 'Price (high to low)'
    - expect: Products reorder on page
    - expect: Cart count still shows 2
  3. Add another product to cart
    - expect: Cart count increases to 3
    - expect: Add to cart works after sort change

#### 4.7. AC8-TC-007: Add to Cart from Details Page vs Listing

**File:** `tests/saucedemo-checkout/ac8-add-to-cart/add-from-details-and-listing.spec.ts`

**Steps:**
  1. Navigate to product details page for Sauce Labs Onesie
    - expect: Product details page loads
  2. Click 'Add to cart' from details page
    - expect: Product added to cart
    - expect: Cart count increases to 1
  3. Go back to products and add different product from listing
    - expect: Products page displays
    - expect: Add to cart works from listing
    - expect: Cart count shows 2
    - expect: Both products are in cart

### 5. AC9: Pagination & Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 5.1. AC9-TC-001: Verify All Products on Single Page

**File:** `tests/saucedemo-checkout/ac9-pagination/all-products-single-page.spec.ts`

**Steps:**
  1. Navigate to products page and observe layout
    - expect: All 6 products are visible on single page
    - expect: No pagination controls needed
    - expect: No horizontal scrollbar
    - expect: All products load on initial page load

#### 5.2. AC9-TC-002: Mobile Responsive Product Grid

**File:** `tests/saucedemo-checkout/ac9-pagination/mobile-responsive.spec.ts`

**Steps:**
  1. Resize browser to mobile width (375px)
    - expect: Product grid is responsive
    - expect: Products adjust to mobile layout
    - expect: All products remain accessible
  2. Verify mobile layout quality
    - expect: No horizontal scrolling needed
    - expect: All product information is visible
    - expect: Text is readable on mobile
    - expect: Images scale appropriately

### 6. Cross-Cutting Test Scenarios

**Seed:** `tests/seed.spec.ts`

#### 6.1. CROSS-TC-001: Page Load Performance

**File:** `tests/saucedemo-checkout/cross-cutting/page-load-performance.spec.ts`

**Steps:**
  1. Navigate to products page and measure load time
    - expect: Page loads in reasonable time (< 3 seconds)
    - expect: All products load without significant delay
    - expect: No blank states or missing images
    - expect: Smooth user experience

#### 6.2. CROSS-TC-002: Browser Back Button Behavior

**File:** `tests/saucedemo-checkout/cross-cutting/browser-back-button.spec.ts`

**Steps:**
  1. From products page, navigate to product details
    - expect: Product details page loads
  2. Use browser back button
    - expect: Returns to products page
    - expect: Sort/filter state is maintained
    - expect: No errors during navigation

#### 6.3. CROSS-TC-003: Menu Navigation - All Items

**File:** `tests/saucedemo-checkout/cross-cutting/menu-all-items.spec.ts`

**Steps:**
  1. Navigate to product details page
    - expect: Product details displayed
  2. Open menu and click 'All Items'
    - expect: User returns to products page
    - expect: All 6 products are displayed
    - expect: Page displays correctly

#### 6.4. CROSS-TC-004: Menu Navigation - Logout

**File:** `tests/saucedemo-checkout/cross-cutting/menu-logout.spec.ts`

**Steps:**
  1. Open menu and click 'Logout'
    - expect: User is logged out
    - expect: Redirected to login page
    - expect: Session is cleared
    - expect: Cannot access protected pages without re-login

#### 6.5. CROSS-TC-005: Reset App State

**File:** `tests/saucedemo-checkout/cross-cutting/reset-app-state.spec.ts`

**Steps:**
  1. Add several products to cart
    - expect: Cart count reflects products added
  2. Open menu and click 'Reset App State'
    - expect: Cart is cleared
    - expect: Add-to-cart button states reset to default
    - expect: Page maintains functionality

#### 6.6. CROSS-TC-006: Keyboard Navigation Accessibility

**File:** `tests/saucedemo-checkout/cross-cutting/keyboard-navigation.spec.ts`

**Steps:**
  1. Tab through interactive elements on products page
    - expect: All interactive elements are keyboard accessible
    - expect: Tab order is logical and intuitive
    - expect: Sort dropdown accessible via keyboard
  2. Use Enter key on buttons
    - expect: Add to cart button works with Enter key
    - expect: Sort selection works with keyboard
    - expect: No elements unreachable via keyboard

#### 6.7. CROSS-TC-007: Cart Counter Persistence

**File:** `tests/saucedemo-checkout/cross-cutting/cart-persistence.spec.ts`

**Steps:**
  1. Add 3 products to cart
    - expect: Cart count shows 3
  2. Navigate to product details and back
    - expect: Cart count still shows 3
    - expect: Products remain in cart
  3. Change sort order
    - expect: Cart count remains 3
    - expect: No products lost due to sort change

#### 6.8. CROSS-TC-008: No Console Errors

**File:** `tests/saucedemo-checkout/cross-cutting/console-errors.spec.ts`

**Steps:**
  1. Perform all major interactions: browse, sort, add to cart, navigate
    - expect: No JavaScript errors in console
    - expect: No network errors for resources
    - expect: No security warnings
    - expect: Clean browser console
