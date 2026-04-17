# User Story: SCRUM-103 - Shopping Cart Management

## Story Title
As a customer, I want to manage items in my shopping cart so that I can review and modify my selections before checkout.

## Story Description
Implement comprehensive shopping cart functionality that allows customers to add products, update quantities, remove items, view cart contents with pricing details, and proceed to checkout. The cart should provide real-time updates, persist across sessions, and offer a seamless shopping experience with clear feedback on cart operations.

## Application URL
https://www.saucedemo.com

## Test Credentials
- Username: `standard_user`
- Password: `secret_sauce`

## Prerequisites & Testing Environment
- Tester must be able to access https://www.saucedemo.com
- Login functionality must be working (prerequisite: SCRUM-100)
- Product discovery features must be functional (prerequisite: SCRUM-102)
- Products must be available on the product listing page
- Cart state must be properly initialized on user login
- Clean browser session recommended before testing (clear cache/cookies)
- Test data: SauceDemo provides consistent test product set across sessions

## Acceptance Criteria

### AC1: Add Product to Cart
- GIVEN I am logged in and viewing the products page
- WHEN I click the "Add to Cart" button for a product
- THEN the product should be added to my shopping cart
- AND the cart badge/counter should increase by one
- AND a visual confirmation (message or animation) should appear
- AND I should remain on the products page
- AND I should be able to add multiple different products
- AND adding the same product multiple times should increase quantity or show separate entries based on implementation

### AC2: View Cart Contents
- GIVEN I have added one or more products to my cart
- WHEN I click on the cart icon/link
- THEN I should be navigated to the cart page
- AND I should see all items in my cart with: product name, unit price, quantity, and line total
- AND the cart should display a subtotal of all items
- AND the cart should show an accurate item count
- AND the page should display a clear "Proceed to Checkout" button
- AND the page should display a "Continue Shopping" button

### AC3: Update Product Quantity
- GIVEN I am on the cart page with items
- WHEN I access quantity controls for a product
- THEN I should see controls to increase or decrease quantity (+ and - buttons, or input field)
- AND modifying quantity should update the line total immediately
- AND the subtotal should recalculate automatically
- AND quantity should not go below 1 or above reasonable limits
- AND invalid quantity entries should be handled gracefully with error messages

### AC4: Remove Product from Cart
- GIVEN I am on the cart page with items
- WHEN I click the "Remove" or "Delete" button for a product
- THEN that product should be removed from my cart
- AND the cart should recalculate totals
- AND the cart item count should decrease
- AND a confirmation or visual feedback should be provided
- AND if removing the last item, the cart should show as empty with a message

### AC5: Empty Cart State
- GIVEN my cart is empty
- WHEN I navigate to the cart page
- THEN I should see an empty cart message
- AND no products should be displayed
- AND there should NOT be a "Proceed to Checkout" button
- AND there should be a prominent "Continue Shopping" button or link to return to products
- AND the cart badge should show 0 or be hidden

### AC6: Cart Price Calculations
- GIVEN I have products in my cart with various quantities
- WHEN I view the cart page
- THEN the line total for each product should be calculated correctly (unit price × quantity)
- AND the subtotal should be the sum of all line totals
- AND all calculations should be accurate to at least two decimal places
- AND currency formatting should be consistent and clear
- AND when quantities are modified, calculations should update in real-time

### AC7: Cart Persistence Across Pages
- GIVEN I have added products to my cart
- WHEN I navigate away from the cart (e.g., back to products, to product details)
- THEN my cart contents should be preserved
- AND the cart badge should still show the current item count
- AND when I return to the cart, all items should still be there
- AND cart totals should be unchanged

### AC8: Continue Shopping Navigation
- GIVEN I am on the cart page
- WHEN I click the "Continue Shopping" button
- THEN I should be navigated back to the products listing page
- AND my cart should remain intact with all items
- AND the cart badge should still reflect the current item count
- AND filters and sort preferences from before should be maintained if applicable

### AC9: Proceed to Checkout Validation
- GIVEN I have items in my cart
- WHEN I click the "Proceed to Checkout" button
- THEN I should be directed to the checkout information page (SCRUM-101 flow)
- AND the checkout page should display my cart items
- AND the checkout page should have access to my current cart totals
- AND the checkout process should be able to retrieve cart contents

### AC10: Cart Session Timeout & Recovery
- GIVEN I am viewing my cart or shopping with items in cart
- WHEN my session times out or browser is closed
- THEN depending on implementation, cart should either persist in localStorage/cookies
- AND upon login again, previous cart contents should be recoverable or maintained
- AND users should be informed if cart data cannot be retrieved
- AND there should be an option to continue with existing cart or start fresh

### AC11: Cart Accessibility
- GIVEN I am on the cart page
- WHEN accessing cart functionality
- THEN all interactive elements should have descriptive labels and ARIA attributes
- AND cart operations should be keyboard navigable
- AND cart totals and item counts should be programmatically announced
- AND screen reader users should understand cart state and operations
- AND form controls should be properly associated with labels

### AC12: Mobile Responsiveness
- GIVEN I am viewing the cart on a mobile or tablet device
- WHEN accessing cart functionality
- THEN the cart layout should be responsive and readable
- AND all buttons and controls should be touch-friendly with adequate spacing
- AND product images and details should scale appropriately
- AND quantity controls should be accessible on small screens
- AND the checkout button should be prominently displayed

## Business Rules
1. Cart is user-specific and associated with login session
2. Products must have valid pricing before being added to cart
3. Out-of-stock products should not be addable to cart
4. Quantity limits should be enforced based on available inventory
5. Cart totals must always reflect current prices (handle price changes)
6. Removing all items should result in an empty cart state
7. Cart modifications should trigger real-time UI updates
8. Cart data should be validated before proceeding to checkout

## Technical Notes
- Use Playwright for test automation
- Test across Chrome, Firefox, and Safari browsers
- Ensure mobile responsiveness for cart layout and controls
- Validate all price calculations with multiple decimal precision
- Test cart persistence using browser storage (localStorage/sessionStorage)
- Implement proper error handling for invalid operations
- Test accessibility compliance (WCAG 2.1 Level AA)
- Verify real-time calculations and UI updates
- Load test cart performance with large item quantities

## Definition of Done
- [ ] All acceptance criteria have comprehensive test cases
- [ ] Manual exploratory testing completed and documented
- [ ] Automated test scripts created using Playwright and passing
- [ ] Cart persistence verified across browser sessions
- [ ] Price calculations validated against test data
- [ ] Mobile responsiveness tested on multiple devices
- [ ] Accessibility testing completed
- [ ] Test results documented with coverage reports
- [ ] Bugs logged for any failures
- [ ] Code committed to repository
- [ ] Integration testing with SCRUM-102 and SCRUM-101 completed

## Out-of-Scope (for this story)
- Payment processing (SCRUM-101)
- Order fulfillment/shipping (backend operations)
- Inventory management (backend admin)
- Wishlist or favorites features
- Coupon/discount code application
- Gift card functionality
- Account management (SCRUM-100)
- Product recommendations
- Cart sharing or collaboration features

## Testing Notes & Assumptions
- **SauceDemo Limitations**: SauceDemo is a demo e-commerce site with simplified cart logic
- **Price Updates**: Assumes product prices remain constant during user session
- **Stock Status**: SauceDemo may not enforce realistic inventory constraints
- **Session Management**: Test across different session lengths and network conditions
- **Browser Storage**: Cart may use localStorage, sessionStorage, or server-side sessions
- **Decimal Precision**: All prices displayed with 2 decimal places
- **Currency**: Tests assume USD currency formatting
- **Cart Limits**: No hard limit on cart items assumed unless specified by application
- **Performance**: Cart should remain responsive with 20+ items

## Related Stories
- **SCRUM-100**: User Authentication & Login (prerequisite)
- **SCRUM-102**: Product Discovery & Filtering (prerequisite for adding items)
- **SCRUM-101**: E-commerce Checkout Process (downstream feature)
- **SCRUM-104**: Order History & Tracking (future feature)

## Story Points Estimate
8-13 points (based on feature complexity, test coverage, and integration points required)

## Priority
**HIGH** - Critical to e-commerce workflow and directly impacts user experience

## Dependencies
- Login functionality must be working (SCRUM-100)
- Product listing must be functional (SCRUM-102)
- Backend cart service/API must be operational
- Database must persist cart state
- Session management infrastructure must be in place

## AC Testing Guidance & Edge Cases

### AC1 (Add Product to Cart)
- Test scenarios: Add single product, add multiple different products, add same product twice
- Edge cases: Add product while filters applied, add product with special pricing, add last remaining item, network lag during add
- Mobile: Verify button accessibility and touch targets on mobile devices
- Performance: Test adding products rapidly in succession

### AC2 (View Cart Contents)
- Test scenarios: View cart after adding 1 item, 5 items, 10+ items
- Edge cases: View cart immediately after adding (timing), display with missing product data, cart with discontinued products
- Format: Verify currency formatting, decimal precision, line breaks and text overflow

### AC3 (Update Quantity)
- Test scenarios: Increase quantity 1-10, decrease quantity, type quantity directly
- Edge cases: Set quantity to 0, negative numbers, non-numeric input, extremely large numbers, quantity equals stock
- Validation: Verify error messages, prevent invalid entries, re-calculate totals immediately

### AC4 (Remove Product)
- Test scenarios: Remove single item, remove multiple items sequentially, remove first/middle/last item
- Edge cases: Remove item during price update, remove item and add again, rapid removal operations
- Confirmation: Test with and without confirmation dialogs

### AC5 (Empty Cart)
- Test scenarios: Navigate to empty cart, empty cart by removing all items, refresh page with empty cart
- Edge cases: Cached empty cart state, server returns different state
- Messaging: Verify appropriate user messaging

### AC6 (Price Calculations)
- Test scenarios: Single item, multiple items, quantities 1-100, mixed prices
- Edge cases: Rounding issues (.99 prices), tax calculations if applicable, price changes during session
- Precision: Verify calculations accurate to 2 decimal places at all times

### AC7 (Cart Persistence)
- Test scenarios: Navigate pages, close/reopen browser, wait time between operations
- Edge cases: Network interruption, multiple browser tabs, session expiration, browser storage cleared
- Verification: Check localStorage/cookies, verify item counts match

### AC8 (Continue Shopping)
- Test scenarios: Continue shopping from cart with 1 item, 10 items, empty cart
- Edge cases: Network lag, rapid clicking, continue while products page loading
- State: Verify all cart data preserved after navigation

### AC9 (Proceed to Checkout)
- Test scenarios: Checkout from cart with 1 item, multiple items, various prices
- Edge cases: Checkout with item that became unavailable, price changes before checkout, session timeout during transition
- Validation: Verify cart data passed to checkout correctly

### AC10 (Session Timeout)
- Test scenarios: Close browser with items in cart, logout and login, wait for session expiration
- Edge cases: Multiple browser tabs with same session, clear cookies manually, different browsers
- Recovery: Verify cart recovery options and messaging

### AC11 (Accessibility)
- Test scenarios: Keyboard navigation of entire cart, screen reader testing, color contrast verification
- Edge cases: Zoom to 200%, high contrast mode, keyboard-only navigation
- Tools: Use accessibility testing tools (axe, WAVE) for compliance

### AC12 (Mobile Responsiveness)
- Test scenarios: Cart on iPhone SE, iPhone 12 Pro Max, Android devices, tablets
- Edge cases: Very small screens, very large screens, landscape/portrait orientation changes
- Touch: Verify touch targets minimum 44x44 pixels, adequate spacing between elements
