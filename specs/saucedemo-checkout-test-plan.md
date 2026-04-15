# SauceDemo E-commerce Checkout Test Plan - SCRUM-101

## Application Overview

The SauceDemo e-commerce application checkout workflow testing covers the complete purchase journey from product selection through order confirmation. This test plan validates the cart review, checkout information entry, order overview, order completion, and error handling acceptance criteria. The application is tested using standard_user credentials to ensure a realistic user experience across all checkout stages.

## Test Scenarios

### 1. AC1 - Cart Review

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-AC1-001: Verify single item cart display

**File:** `tests/ac1-cart-review/single-item-cart.spec.ts`

**Steps:**
  1. Login to SauceDemo with credentials: username 'standard_user', password 'secret_sauce'
    - expect: User is successfully logged in
    - expect: Products page is displayed
  2. Click on first product (Sauce Labs Backpack) to view details
    - expect: Product details are displayed
    - expect: Add to Cart button is visible
  3. Click 'Add to Cart' button
    - expect: Product is added to cart
    - expect: Cart badge shows count of 1
  4. Click on the shopping cart icon in the header
    - expect: Cart page is displayed
    - expect: Cart contains 1 item
  5. Verify cart item details are displayed correctly
    - expect: Item name 'Sauce Labs Backpack' is visible
    - expect: Item price is displayed
    - expect: Item quantity shows 1
    - expect: Description/details about the product are visible
  6. Verify total price calculation
    - expect: Total price is calculated correctly based on item price
    - expect: Subtotal and any additional fees are clearly shown
  7. Verify navigation options in cart
    - expect: 'Continue Shopping' button is available
    - expect: 'Checkout' button is available

#### 1.2. TC-AC1-002: Verify multiple items cart display

**File:** `tests/ac1-cart-review/multiple-items-cart.spec.ts`

**Steps:**
  1. Login to SauceDemo with credentials: username 'standard_user', password 'secret_sauce'
    - expect: User is successfully logged in
    - expect: Products page is displayed
  2. Add three different products to cart: Sauce Labs Backpack, Sauce Labs Bolt T-Shirt, and Sauce Labs Onesie
    - expect: All three products are added
    - expect: Cart badge shows count of 3
  3. Navigate to cart page
    - expect: Cart page displays all 3 items
    - expect: Each item shows name, price, and quantity
  4. Verify each item's details are correct
    - expect: All product names are accurate
    - expect: All prices match original product prices
    - expect: Quantities are correct for each item
  5. Verify total price calculation for multiple items
    - expect: Total is sum of all individual item prices
    - expect: Price breakdown is clear and accurate

#### 1.3. TC-AC1-003: Verify cart with quantity variations

**File:** `tests/ac1-cart-review/quantity-variations.spec.ts`

**Steps:**
  1. Login to SauceDemo with credentials: username 'standard_user', password 'secret_sauce'
    - expect: User is successfully logged in
  2. Add one product and try to modify quantity if quantity selector is available
    - expect: Product is added to cart
    - expect: Quantity can be modified or displays correctly
  3. Add the same product multiple times to increase cart quantity
    - expect: Cart shows updated quantity
    - expect: Total price reflects quantity multiplier
  4. Remove one item from cart and verify cart updates
    - expect: Cart quantity decreases
    - expect: Total price recalculates correctly

#### 1.4. TC-AC1-004: Verify continue shopping navigation

**File:** `tests/ac1-cart-review/continue-shopping.spec.ts`

**Steps:**
  1. Login and add at least one product to cart
    - expect: Product is added successfully
  2. Navigate to cart page
    - expect: Cart page is displayed with items
  3. Click 'Continue Shopping' button
    - expect: User is redirected to products page
    - expect: Cart count is maintained in header
  4. Add another product to cart
    - expect: New product is added
    - expect: Cart count increases
  5. Verify cart maintains previous items
    - expect: Both previous and new items are in cart
    - expect: Cart total is updated correctly

#### 1.5. TC-AC1-005: Verify empty cart message

**File:** `tests/ac1-cart-review/empty-cart.spec.ts`

**Steps:**
  1. Login to SauceDemo
    - expect: User is logged in successfully
  2. Navigate to cart page without adding any items
    - expect: Cart page is displayed
  3. Verify empty cart message or UI state
    - expect: Empty cart state is clearly indicated
    - expect: User is prompted to continue shopping or appropriate message is shown

### 2. AC2 - Checkout Information Entry

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC-AC2-001: Verify checkout form fields are present

**File:** `tests/ac2-checkout-info/form-fields-present.spec.ts`

**Steps:**
  1. Login to SauceDemo and add product to cart
    - expect: Product is added to cart
  2. Navigate to cart and click 'Checkout' button
    - expect: Checkout information page is displayed
  3. Verify all required form fields are visible
    - expect: First Name field is present and visible
    - expect: Last Name field is present and visible
    - expect: Zip/Postal Code field is present and visible
  4. Verify form fields are labeled correctly
    - expect: Each field has clear label text
    - expect: Required field indicators are shown if applicable

#### 2.2. TC-AC2-002: Verify successful form submission with valid data

**File:** `tests/ac2-checkout-info/valid-form-submission.spec.ts`

**Steps:**
  1. Login and add product to cart, then click Checkout
    - expect: Checkout information page is displayed
  2. Enter First Name: 'John' in First Name field
    - expect: First Name field accepts input
    - expect: Text 'John' is displayed in field
  3. Enter Last Name: 'Doe' in Last Name field
    - expect: Last Name field accepts input
    - expect: Text 'Doe' is displayed in field
  4. Enter Zip Code: '12345' in Zip/Postal Code field
    - expect: Zip Code field accepts numeric input
    - expect: Text '12345' is displayed in field
  5. Click 'Continue' button
    - expect: User is redirected to checkout overview page
    - expect: No error messages are displayed

#### 2.3. TC-AC2-003: Verify mandatory field validation - empty First Name

**File:** `tests/ac2-checkout-info/empty-first-name-validation.spec.ts`

**Steps:**
  1. Login, add product to cart, and navigate to checkout information page
    - expect: Checkout information page is displayed
    - expect: All form fields are empty
  2. Leave First Name field empty
    - expect: First Name field remains empty
  3. Enter Last Name: 'Doe'
    - expect: Last Name field has value 'Doe'
  4. Enter Zip Code: '12345'
    - expect: Zip Code field has value '12345'
  5. Click 'Continue' button
    - expect: Page does not advance to checkout overview
    - expect: Error message appears indicating First Name is required
    - expect: Error message is prominently displayed

#### 2.4. TC-AC2-004: Verify mandatory field validation - empty Last Name

**File:** `tests/ac2-checkout-info/empty-last-name-validation.spec.ts`

**Steps:**
  1. Login, add product to cart, and navigate to checkout information page
    - expect: Checkout information page is displayed
  2. Enter First Name: 'John'
    - expect: First Name field has value 'John'
  3. Leave Last Name field empty
    - expect: Last Name field remains empty
  4. Enter Zip Code: '12345'
    - expect: Zip Code field has value '12345'
  5. Click 'Continue' button
    - expect: Page does not advance
    - expect: Error message indicates Last Name is required

#### 2.5. TC-AC2-005: Verify mandatory field validation - empty Zip Code

**File:** `tests/ac2-checkout-info/empty-zip-code-validation.spec.ts`

**Steps:**
  1. Login, add product to cart, and navigate to checkout information page
    - expect: Checkout information page is displayed
  2. Enter First Name: 'John' and Last Name: 'Doe'
    - expect: Both fields have values
  3. Leave Zip Code field empty
    - expect: Zip Code field remains empty
  4. Click 'Continue' button
    - expect: Page does not advance
    - expect: Error message indicates Zip Code is required

#### 2.6. TC-AC2-006: Verify all fields empty validation

**File:** `tests/ac2-checkout-info/all-fields-empty-validation.spec.ts`

**Steps:**
  1. Login, add product to cart, and navigate to checkout information page
    - expect: Checkout information page is displayed
    - expect: All fields are empty
  2. Click 'Continue' button without entering any data
    - expect: Page does not advance
    - expect: Error message is displayed
  3. Verify error message is clear and specific
    - expect: Error indicates which fields are required
    - expect: Message is user-friendly

#### 2.7. TC-AC2-007: Verify form field input validation with special characters

**File:** `tests/ac2-checkout-info/special-characters-validation.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Enter special characters in First Name field: '@#$%^&*()'
    - expect: Field accepts or rejects special characters appropriately
  3. Enter valid name in First Name: 'Jean-Pierre'
    - expect: First Name accepts hyphenated name
  4. Fill other fields with valid data and submit
    - expect: Form submission succeeds with valid names
    - expect: Hyphenated and special names are handled correctly

#### 2.8. TC-AC2-008: Verify Zip Code field accepts numeric input

**File:** `tests/ac2-checkout-info/zip-code-numeric-validation.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Enter text in Zip Code field: 'ABCDE'
    - expect: Field behavior with non-numeric input is clear
    - expect: Field accepts or rejects letters appropriately
  3. Enter valid zip code: '90210'
    - expect: Field accepts numeric zip code
  4. Complete form with valid data and submit
    - expect: Form submission succeeds

#### 2.9. TC-AC2-009: Verify form field boundary conditions - max length

**File:** `tests/ac2-checkout-info/field-max-length.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Enter very long string (100+ characters) in First Name field
    - expect: Field either truncates input or allows long input
    - expect: Field behavior is consistent
  3. Enter very long string in Last Name field
    - expect: Field handles long input appropriately
  4. Enter very long string in Zip Code field
    - expect: Field limits input to reasonable length

#### 2.10. TC-AC2-010: Verify form persists data after error

**File:** `tests/ac2-checkout-info/form-data-persistence.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Enter First Name: 'John' and Zip Code: '12345', but leave Last Name empty
    - expect: First Name and Zip Code fields have values
  3. Click 'Continue' button
    - expect: Error message appears for missing Last Name
  4. Verify previously entered data is still visible
    - expect: First Name 'John' is still in field
    - expect: Zip Code '12345' is still in field
    - expect: Last Name field is empty

### 3. AC3 - Order Overview

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC-AC3-001: Verify checkout overview page displays all items

**File:** `tests/ac3-order-overview/overview-items-display.spec.ts`

**Steps:**
  1. Login and add two products to cart (Backpack and T-Shirt)
    - expect: Both products added to cart
  2. Navigate to cart and click Checkout
    - expect: Checkout information page is displayed
  3. Enter valid checkout information: First Name, Last Name, Zip Code
    - expect: All fields are filled with valid data
  4. Click 'Continue' button
    - expect: User is redirected to checkout overview page
  5. Verify checkout overview page displays all cart items
    - expect: Both products are listed on overview page
    - expect: Product names are correct
    - expect: Product prices are displayed

#### 3.2. TC-AC3-002: Verify order summary and pricing breakdown

**File:** `tests/ac3-order-overview/pricing-breakdown.spec.ts`

**Steps:**
  1. Login, add products to cart, and complete checkout information entry
    - expect: Checkout overview page is displayed
  2. Verify Subtotal is displayed
    - expect: Subtotal field is visible
    - expect: Subtotal is sum of all item prices
  3. Verify Tax amount is displayed
    - expect: Tax field is visible
    - expect: Tax calculation is shown
  4. Verify Total amount is displayed
    - expect: Total field is visible and highlighted
    - expect: Total equals Subtotal + Tax
  5. Verify pricing breakdown is clear and accurate
    - expect: Each price component is labeled clearly
    - expect: Math is correct for all calculations

#### 3.3. TC-AC3-003: Verify payment and shipping information display

**File:** `tests/ac3-order-overview/payment-shipping-info.spec.ts`

**Steps:**
  1. Complete checkout flow to overview page with valid data
    - expect: Checkout overview page is displayed
  2. Verify payment information section is displayed
    - expect: Payment method information is shown
    - expect: Information is relevant to transaction
  3. Verify shipping information section is displayed
    - expect: Shipping address is shown
    - expect: Shipping details include First Name, Last Name, Zip Code entered
  4. Verify information is accurate and matches what was entered
    - expect: Shipping name matches entered values
    - expect: Zip code is correct

#### 3.4. TC-AC3-004: Verify Cancel button on overview page

**File:** `tests/ac3-order-overview/cancel-button.spec.ts`

**Steps:**
  1. Complete checkout flow to overview page
    - expect: Checkout overview page is displayed
  2. Locate and verify Cancel button is present
    - expect: Cancel button is visible and clickable
  3. Click Cancel button
    - expect: User is taken back to cart page
    - expect: Items remain in cart

#### 3.5. TC-AC3-005: Verify Finish button on overview page

**File:** `tests/ac3-order-overview/finish-button.spec.ts`

**Steps:**
  1. Complete checkout flow to overview page
    - expect: Checkout overview page is displayed
    - expect: All order details are visible
  2. Locate and verify Finish button is present
    - expect: Finish button is visible and prominent
  3. Verify Finish button is enabled
    - expect: Finish button is clickable
    - expect: Button is not disabled

#### 3.6. TC-AC3-006: Verify overview page with single item

**File:** `tests/ac3-order-overview/single-item-overview.spec.ts`

**Steps:**
  1. Login and add only one product (Sauce Labs Backpack) to cart
    - expect: Product is added
  2. Proceed through checkout information to overview page
    - expect: Checkout overview page is displayed
  3. Verify single item is displayed correctly
    - expect: Product details are complete and accurate
    - expect: Price calculation is correct

#### 3.7. TC-AC3-007: Verify overview page with multiple items

**File:** `tests/ac3-order-overview/multiple-items-overview.spec.ts`

**Steps:**
  1. Login and add three products to cart
    - expect: All three products are added
  2. Proceed through checkout to overview page
    - expect: Checkout overview page displays all items
  3. Verify each item is listed with correct details
    - expect: All product names are correct
    - expect: All quantities are shown
    - expect: All individual prices are correct
  4. Verify total calculation includes all items
    - expect: Total price is sum of all items
    - expect: Tax is calculated on correct subtotal

### 4. AC4 - Order Completion

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC-AC4-001: Verify successful order completion

**File:** `tests/ac4-order-completion/successful-order-completion.spec.ts`

**Steps:**
  1. Login to SauceDemo with standard_user
    - expect: User is logged in successfully
  2. Add product to cart
    - expect: Product is added
  3. Navigate to cart and click Checkout
    - expect: Checkout information page is displayed
  4. Fill checkout form with: First Name: 'John', Last Name: 'Doe', Zip Code: '12345'
    - expect: All fields are filled
  5. Click Continue to proceed to overview
    - expect: Checkout overview page is displayed
  6. Click Finish button
    - expect: Order confirmation page is displayed
  7. Verify order confirmation page is reached
    - expect: User is on order confirmation/completion page
    - expect: Page URL reflects completion (e.g., checkout-complete)

#### 4.2. TC-AC4-002: Verify success message on completion

**File:** `tests/ac4-order-completion/success-message.spec.ts`

**Steps:**
  1. Complete entire checkout process and click Finish
    - expect: Order confirmation page is displayed
  2. Verify success message is displayed
    - expect: Success message is visible on page
    - expect: Message confirms order completion
  3. Verify message text is clear and user-friendly
    - expect: Message explicitly states order was successful
    - expect: Message may include order details or next steps

#### 4.3. TC-AC4-003: Verify Back Home button on completion page

**File:** `tests/ac4-order-completion/back-home-button.spec.ts`

**Steps:**
  1. Complete checkout process and reach order confirmation page
    - expect: Order confirmation page is displayed
  2. Verify 'Back Home' button is present and visible
    - expect: Back Home button is displayed on page
  3. Click 'Back Home' button
    - expect: User is redirected to products/inventory page
    - expect: User is back on main shopping page

#### 4.4. TC-AC4-004: Verify cart is cleared after successful order

**File:** `tests/ac4-order-completion/cart-cleared.spec.ts`

**Steps:**
  1. Complete successful checkout with at least 2 items in cart
    - expect: Order is confirmed
  2. Navigate to cart page (or check cart badge)
    - expect: Navigation to cart is possible
  3. Verify cart is empty
    - expect: Cart shows no items
    - expect: Cart badge shows 0 or is not displayed

#### 4.5. TC-AC4-005: Verify order confirmation with correct order details

**File:** `tests/ac4-order-completion/order-details-confirmation.spec.ts`

**Steps:**
  1. Add product (Sauce Labs Backpack) to cart and proceed to checkout
    - expect: Checkout process begins
  2. Enter checkout information and click Continue
    - expect: Overview page is displayed
  3. Note the order total displayed on overview page
    - expect: Order total is visible
  4. Click Finish to complete order
    - expect: Order confirmation page is displayed
  5. Verify confirmation page shows order summary
    - expect: Confirmation page displays what was ordered
    - expect: Items, quantities, and totals are accurate

### 5. AC5 - Error Handling and Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC-AC5-001: Verify validation error for empty First Name

**File:** `tests/ac5-error-handling/empty-first-name-error.spec.ts`

**Steps:**
  1. Complete checkout information page navigation
    - expect: Checkout information page is displayed
  2. Leave First Name empty and fill Last Name and Zip Code
    - expect: Only First Name is empty
  3. Click Continue
    - expect: Form does not submit
  4. Verify error message for First Name is displayed
    - expect: Error message clearly indicates First Name is required
    - expect: Error is displayed near First Name field

#### 5.2. TC-AC5-002: Verify validation error for empty Last Name

**File:** `tests/ac5-error-handling/empty-last-name-error.spec.ts`

**Steps:**
  1. Complete checkout information page navigation
    - expect: Checkout information page is displayed
  2. Leave Last Name empty and fill First Name and Zip Code
    - expect: Only Last Name is empty
  3. Click Continue
    - expect: Form does not submit
  4. Verify error message for Last Name is displayed
    - expect: Error message indicates Last Name is required
    - expect: Error is positioned near Last Name field

#### 5.3. TC-AC5-003: Verify validation error for empty Zip Code

**File:** `tests/ac5-error-handling/empty-zip-code-error.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Fill First Name and Last Name but leave Zip Code empty
    - expect: Zip Code field is empty
  3. Click Continue
    - expect: Form does not submit
  4. Verify error message for Zip Code is displayed
    - expect: Error message indicates Zip Code is required

#### 5.4. TC-AC5-004: Verify validation error for multiple empty fields

**File:** `tests/ac5-error-handling/multiple-empty-fields-error.spec.ts`

**Steps:**
  1. Navigate to checkout information page with all fields empty
    - expect: Checkout page is displayed with empty form
  2. Click Continue without entering any data
    - expect: Form submission is blocked
  3. Verify error messages are displayed for all missing fields
    - expect: Error message appears for missing First Name
    - expect: Error message appears for missing Last Name
    - expect: Error message appears for missing Zip Code

#### 5.5. TC-AC5-005: Verify error message dismissal or clearing

**File:** `tests/ac5-error-handling/error-message-clearing.spec.ts`

**Steps:**
  1. Navigate to checkout information page and trigger validation error by clicking Continue with empty fields
    - expect: Error message appears
  2. Enter valid data in the field that had the error
    - expect: User enters data in previously empty field
  3. Verify error message clears when field is populated
    - expect: Error message disappears or becomes invalid
    - expect: Field is marked as valid

#### 5.6. TC-AC5-006: Verify invalid input with special characters

**File:** `tests/ac5-error-handling/special-characters-error.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Enter special characters only in First Name: '@#$%'
    - expect: Field accepts or rejects input
  3. Fill Last Name and Zip Code with valid data
    - expect: Other fields are valid
  4. Click Continue
    - expect: Either form validates special character field or shows specific error for invalid format

#### 5.7. TC-AC5-007: Verify Zip Code field validates numeric input

**File:** `tests/ac5-error-handling/non-numeric-zip-validation.spec.ts`

**Steps:**
  1. Navigate to checkout information page
    - expect: Checkout page is displayed
  2. Enter alphabetic characters in Zip Code field: 'ABCDE'
    - expect: Field may accept or reject letters
  3. Fill other fields validly
    - expect: First Name and Last Name are valid
  4. Click Continue
    - expect: Either validation error appears for non-numeric zip code or field accepts input

#### 5.8. TC-AC5-008: Verify error recovery - retry after error

**File:** `tests/ac5-error-handling/error-recovery-retry.spec.ts`

**Steps:**
  1. Navigate to checkout page and submit with all fields empty
    - expect: Error messages appear
  2. Click back or refresh attempt to clear errors
    - expect: Errors may persist or clear depending on implementation
  3. Fill all fields with valid data
    - expect: All fields have values
  4. Click Continue
    - expect: Form successfully submits
    - expect: User advances to overview page

### 6. Navigation and Flow

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC-NAV-001: Verify complete checkout flow from login to completion

**File:** `tests/navigation/complete-flow.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: Login page is displayed
  2. Login with username 'standard_user' and password 'secret_sauce'
    - expect: Login is successful
    - expect: Products page is displayed
  3. Add 'Sauce Labs Backpack' to cart
    - expect: Product is added
    - expect: Cart badge shows 1
  4. Click shopping cart icon
    - expect: Cart page is displayed
  5. Click 'Checkout' button
    - expect: Checkout information page is displayed
  6. Enter: First Name: 'John', Last Name: 'Doe', Zip: '12345'
    - expect: All fields are filled
  7. Click 'Continue'
    - expect: Checkout overview page is displayed
  8. Click 'Finish'
    - expect: Order completion page is displayed
    - expect: Success message is shown

#### 6.2. TC-NAV-002: Verify back button on checkout overview

**File:** `tests/navigation/back-from-overview.spec.ts`

**Steps:**
  1. Complete checkout information entry and reach overview page
    - expect: Checkout overview page is displayed
  2. Click Cancel button on overview page
    - expect: User is taken back to cart page
  3. Verify items are still in cart
    - expect: Cart contains previously added items
    - expect: No checkout process completed

#### 6.3. TC-NAV-003: Verify navigation from products page to cart to checkout

**File:** `tests/navigation/products-to-checkout.spec.ts`

**Steps:**
  1. Login to SauceDemo
    - expect: Products page is displayed
  2. Add product and verify cart badge
    - expect: Cart badge shows item count
  3. Click cart icon to navigate to cart
    - expect: Cart page is displayed
  4. Click Continue Shopping to go back to products
    - expect: Products page is displayed
    - expect: Cart is maintained
  5. Add another product
    - expect: Cart badge updates
  6. Navigate to cart and then Checkout
    - expect: Checkout information page is displayed

#### 6.4. TC-NAV-004: Verify continue shopping maintains cart

**File:** `tests/navigation/continue-shopping-flow.spec.ts`

**Steps:**
  1. Add one product to cart
    - expect: Product is added
  2. Navigate to cart page
    - expect: Cart page shows 1 item
  3. Click Continue Shopping
    - expect: User returns to products page
    - expect: Cart icon still shows 1 item
  4. Add second product
    - expect: Cart badge updates to 2
  5. Navigate to cart
    - expect: Cart shows both products
