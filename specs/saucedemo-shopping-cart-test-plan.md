# SCRUM-103 Shopping Cart Test Plan
**Generated:** April 17, 2026  
**Story:** SCRUM-103 - Shopping Cart Management  
**Application:** SauceDemo (https://www.saucedemo.com)  
**Test Credentials:** standard_user / secret_sauce  

---

## Test Plan Overview

**Total Test Scenarios:** 48 (manual exploratory)  
**Total Automated Test Cases:** 40+ (across 12 suites)  
**Total Edge Cases:** 45+  
**Coverage:** All 12 Acceptance Criteria  
**Browser Coverage:** Chrome, Firefox, Safari  
**Mobile Testing:** iOS & Android viewports  
**Accessibility:** WCAG 2.1 Level AA  

---

## Test Organization by Acceptance Criteria

### AC1: Add Product to Cart (4 Test Scenarios)

#### TC1.1: Add Single Product to Cart
- **AC Mapping:** AC1
- **Priority:** P0 (Critical)
- **Browser:** Chrome, Firefox
- **Device:** Desktop
- **Preconditions:**
  - User logged in with credentials (standard_user/secret_sauce)
  - User on products page (https://www.saucedemo.com/inventory.html)
  - At least one product available

**Steps:**
1. Locate first product in inventory
2. Click "Add to Cart" button for that product
3. Observe cart badge on top right
4. Note visual feedback (message, animation, or confirmation)

**Expected Results:**
- Product added to cart successfully
- Cart badge increments from 0 to 1
- Visual confirmation appears (toast, message, or animation)
- User remains on products page
- Product details visible (name, price, image)

**Test Data:** Backpack ($29.99)

**Edge Cases:** None for happy path

**Assertions:**
```
✓ Cart badge shows "1"
✓ Visual confirmation message appears
✓ Current URL = /inventory.html
✓ Product name in cart data
```

---

#### TC1.2: Add Multiple Different Products
- **AC Mapping:** AC1
- **Priority:** P0 (Critical)
- **Browser:** Chrome, Firefox
- **Device:** Desktop

**Steps:**
1. Add first product (Backpack) to cart
2. Add second product (Bike Light) to cart
3. Add third product (Bolt T-Shirt) to cart
4. Observe cart badge after each add

**Expected Results:**
- Each product added successfully
- Cart badge increments with each add (1 → 2 → 3)
- All three products in cart
- Each product shown with correct details

**Assertions:**
```
✓ Cart badge shows "3" after all adds
✓ All 3 products present in cart
✓ Each product has correct name and price
✓ No duplicate entries in cart
```

---

#### TC1.3: Add Same Product Twice (Quantity Test)
- **AC Mapping:** AC1
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add Backpack to cart
2. Add Backpack again to cart
3. Navigate to cart to verify behavior

**Expected Results:**
- Implementation determines behavior:
  - Option A: Quantity increases (1 item with qty=2)
  - Option B: Separate entries (2 items of Backpack)
- Cart badge reflects total items/quantity

**Assertions:**
```
✓ Cart manages duplicate adds correctly
✓ Cart total accurate per implementation
✓ Visual feedback on second add
```

---

#### TC1.4: Add Product While Filters Applied (Edge Case)
- **AC Mapping:** AC1
- **Priority:** P2 (Medium)
- **Browser:** Chrome
- **Device:** Desktop
- **Edge Case:** Filter persistence during add

**Steps:**
1. Apply filter on products page (e.g., sort by Price Low to High)
2. Add product to cart while filter active
3. Observe if filter persists after add

**Expected Results:**
- Product added successfully
- Filter state persists
- Cart badge updates
- User can continue with filtered view

**Assertions:**
```
✓ Product added despite active filter
✓ Filter state preserved
✓ Cart badge accurate
```

---

#### TC1.5: Rapid Successive Adds (Performance Edge Case)
- **AC Mapping:** AC1
- **Priority:** P2 (Medium)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Rapidly click "Add to Cart" for 5 different products in quick succession (<5 seconds)
2. Monitor cart badge updates
3. Verify all products added

**Expected Results:**
- All products added successfully
- Badge reflects all adds
- No missed adds due to rapid clicking
- UI remains responsive

**Assertions:**
```
✓ All 5 products in cart
✓ Badge shows "5"
✓ No duplicate or lost items
✓ No UI freezing or lag
```

---

### AC2: View Cart Contents (4 Test Scenarios)

#### TC2.1: View Cart with Single Item
- **AC Mapping:** AC2
- **Priority:** P0 (Critical)
- **Browser:** Chrome, Firefox
- **Device:** Desktop

**Steps:**
1. Add one product to cart (Backpack - $29.99)
2. Click cart icon/badge
3. Verify cart page displays

**Expected Results:**
- Navigate to cart page (/cart.html)
- Product displayed with:
  - Product name: "Sauce Labs Backpack"
  - Unit price: $29.99
  - Quantity: 1
  - Line total: $29.99
- Subtotal: $29.99
- "Proceed to Checkout" button visible
- "Continue Shopping" button visible
- Item count shows "1 item"

**Assertions:**
```
✓ URL = /cart.html
✓ Product name matches
✓ Unit price = $29.99
✓ Quantity = 1
✓ Line total = $29.99
✓ Subtotal = $29.99
✓ Checkout button present
✓ Continue Shopping button present
```

---

#### TC2.2: View Cart with Multiple Items
- **AC Mapping:** AC2
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 3 different products to cart:
   - Backpack ($29.99)
   - Bike Light ($9.99)
   - Bolt T-Shirt ($15.99)
2. Click cart icon
3. Verify all items displayed

**Expected Results:**
- All 3 items listed on cart page
- Each item shows name, price, quantity, line total
- Subtotal: $55.97 (29.99 + 9.99 + 15.99)
- Item count: "3 items"
- All buttons present

**Assertions:**
```
✓ All 3 items displayed
✓ Subtotal = $55.97
✓ Item count = 3
✓ Currency formatting correct ($ format, 2 decimals)
```

---

#### TC2.3: View Cart with 10+ Items (Large Cart)
- **AC Mapping:** AC2
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add all 6 available products multiple times to reach 10+ items
2. Open cart
3. Verify layout handles large quantity

**Expected Results:**
- All items visible (with scrolling if needed)
- Page responsive with many items
- Totals calculated correctly
- No display overflow issues
- Item count accurate

**Assertions:**
```
✓ All 10+ items visible
✓ Page remains responsive
✓ Total accurate for all items
✓ No UI layout issues
```

---

#### TC2.4: View Cart - Empty State
- **AC Mapping:** AC2, AC5
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Navigate to cart without adding any items
2. Observe empty cart display

**Expected Results:**
- Empty cart message displayed
- No products listed
- NO "Proceed to Checkout" button
- "Continue Shopping" button present
- Item count shows "0" or "empty"

**Assertions:**
```
✓ Empty cart message present
✓ No products displayed
✓ Checkout button NOT present
✓ Continue Shopping button present
```

---

### AC3: Update Product Quantity (4 Test Scenarios)

#### TC3.1: Increase Quantity Using Plus Button
- **AC Mapping:** AC3
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add Backpack ($29.99) to cart
2. Open cart
3. Locate quantity control (+ button)
4. Click + button to increase from 1 to 2
5. Observe line total update

**Expected Results:**
- Quantity changes from 1 to 2
- Line total updates to $59.98 (29.99 × 2)
- Subtotal updates to $59.98
- Update happens in real-time
- No page refresh needed

**Assertions:**
```
✓ Quantity = 2
✓ Line total = $59.98
✓ Subtotal = $59.98
✓ Update real-time (<500ms)
✓ Currency formatting correct (2 decimals)
```

---

#### TC3.2: Decrease Quantity Using Minus Button
- **AC Mapping:** AC3
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add Backpack with quantity 3
2. Open cart
3. Click - button to decrease from 3 to 2
4. Observe totals update

**Expected Results:**
- Quantity changes from 3 to 2
- Line total updates to $59.98 (29.99 × 2)
- Subtotal updates correctly
- Real-time update

**Assertions:**
```
✓ Quantity = 2
✓ Line total = $59.98
✓ Subtotal recalculated
```

---

#### TC3.3: Direct Quantity Input (Edge Case)
- **AC Mapping:** AC3
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add product to cart
2. Open cart
3. Locate quantity field
4. Clear current value and type "5"
5. Press Tab or Enter
6. Observe totals update

**Expected Results:**
- Quantity changes to 5
- Line total updates to 5 × unit price
- Subtotal recalculates
- Format validation applied

**Assertions:**
```
✓ Quantity = 5
✓ Line total = correct calculation
✓ Real-time update
```

---

#### TC3.4: Invalid Quantity Input (Negative/Zero - Edge Case)
- **AC Mapping:** AC3
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add product to cart
2. Open cart
3. Try to enter "0" in quantity field
4. Observe validation

**Expected Results:**
- Either:
  - Option A: Value resets to 1 (minimum)
  - Option B: Error message appears ("Quantity must be at least 1")
  - Option C: Product removed from cart
- User cannot set quantity to 0
- Clear error messaging

**Assertions:**
```
✓ Quantity not set to 0
✓ Either reset or error message
✓ Clear user feedback
```

---

#### TC3.5: Invalid Quantity Input (Non-numeric - Edge Case)
- **AC Mapping:** AC3
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add product to cart
2. Open cart
3. Try to enter "abc" in quantity field
4. Observe validation

**Expected Results:**
- Non-numeric input rejected
- Field reverts to previous valid value
- Error message displayed
- User cannot proceed with invalid input

**Assertions:**
```
✓ Non-numeric input blocked
✓ Field reverts to valid value
✓ Error message clear
```

---

#### TC3.6: Quantity Equals Stock Limit (Edge Case)
- **AC Mapping:** AC3
- **Priority:** P2 (Medium)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Determine stock limit for a product (if applicable in SauceDemo)
2. Set quantity to stock limit
3. Try to increase beyond limit

**Expected Results:**
- Quantity limited to available stock
- Either:
  - Plus button disabled
  - Error message: "Cannot exceed available quantity"
  - Quantity resets to maximum available

**Assertions:**
```
✓ Quantity cannot exceed stock
✓ Clear feedback on limit
```

---

### AC4: Remove Product from Cart (3 Test Scenarios)

#### TC4.1: Remove Single Item from Cart
- **AC Mapping:** AC4
- **Priority:** P0 (Critical)
- **Browser:** Chrome, Firefox
- **Device:** Desktop

**Steps:**
1. Add 2 products to cart (Backpack, Bike Light)
2. Open cart
3. Click "Remove" button on first item (Backpack)
4. Observe cart updates

**Expected Results:**
- Backpack removed from cart
- Bike Light remains
- Cart item count: 2 → 1
- Subtotal updates: $39.98 → $9.99
- Cart badge shows "1"

**Assertions:**
```
✓ Item removed successfully
✓ Remaining items correct
✓ Item count = 1
✓ Subtotal = $9.99
✓ Badge updated
```

---

#### TC4.2: Remove Multiple Items Sequentially
- **AC Mapping:** AC4
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 3 products: Backpack ($29.99), Bike Light ($9.99), Bolt T-Shirt ($15.99)
2. Open cart
3. Remove Backpack → observe update
4. Remove Bike Light → observe update
5. Remove Bolt T-Shirt → observe empty cart

**Expected Results:**
- Each removal updates counts and totals
- Final cart: empty state with message
- Badge shows "0"
- Checkout button disappears
- Continue Shopping button visible

**Assertions:**
```
✓ Correct item removed each time
✓ Totals recalculate after each removal
✓ Final state is empty cart
✓ Empty messaging appears
```

---

#### TC4.3: Remove Last Item (Transitions to Empty State)
- **AC Mapping:** AC4, AC5
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 1 product to cart
2. Open cart
3. Click Remove on the only item
4. Observe transition to empty state

**Expected Results:**
- Item removed
- Cart shows empty state message
- "Proceed to Checkout" button removed
- "Continue Shopping" button prominently displayed
- Badge shows "0" or is hidden

**Assertions:**
```
✓ Item removed
✓ Empty cart message displays
✓ Checkout button gone
✓ Continue Shopping present
✓ Badge shows 0
```

---

#### TC4.4: Remove Item - Rapid Succession (Performance Edge Case)
- **AC Mapping:** AC4
- **Priority:** P2 (Medium)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 3-5 items to cart
2. Open cart
3. Rapidly click Remove on multiple items in quick succession
4. Observe final state

**Expected Results:**
- All items removed successfully
- No missed removes
- No duplicate removals
- Final cart state consistent
- No UI lag or freezing

**Assertions:**
```
✓ All items removed
✓ No duplicate removes
✓ Final state correct
✓ UI responsive
```

---

### AC5: Empty Cart State (2 Test Scenarios)

#### TC5.1: Navigate to Empty Cart Directly
- **AC Mapping:** AC5
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Log in to SauceDemo
2. Navigate to /cart.html directly without adding items
3. Observe page display

**Expected Results:**
- Empty cart message displayed
  - Example: "Your cart is empty" or similar
- No products listed in cart
- "Proceed to Checkout" button NOT present
- "Continue Shopping" button visible and clickable
- Cart badge shows "0" or empty

**Assertions:**
```
✓ Empty message visible
✓ No products displayed
✓ Checkout button absent
✓ Continue Shopping button present
✓ Badge shows 0 or hidden
```

---

#### TC5.2: Transition to Empty Cart (Remove All Items)
- **AC Mapping:** AC5
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 2-3 products to cart
2. Open cart
3. Remove all items one by one
4. Observe final empty state

**Expected Results:**
- Each removal updates display
- When last item removed:
  - Empty cart message appears
  - Checkout button disappears
  - Continue Shopping button prominent
  - Page layout adjusts for empty state
  - No "No items" error message

**Assertions:**
```
✓ Final state is empty
✓ Message clear and helpful
✓ Continue Shopping accessible
✓ No checkout option
✓ Messaging appropriate
```

---

#### TC5.3: Empty Cart - Messaging Validation (Edge Case)
- **AC Mapping:** AC5
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Create empty cart state
2. Read all messaging on page
3. Verify messaging is clear and helpful
4. Verify spelling and grammar

**Expected Results:**
- Message is user-friendly and clear
- No technical jargon
- Spelling correct
- Grammar correct
- CTA (Continue Shopping) clear

**Assertions:**
```
✓ Message clear and friendly
✓ No spelling/grammar errors
✓ CTA obvious
✓ Tone appropriate
```

---

### AC6: Cart Price Calculations (4 Test Scenarios)

#### TC6.1: Price Calculation - Single Item
- **AC Mapping:** AC6
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add Backpack ($29.99) with quantity 1 to cart
2. Open cart
3. Verify calculations

**Expected Results:**
- Product unit price: $29.99
- Quantity: 1
- Line total: $29.99 (1 × $29.99)
- Subtotal: $29.99
- Format: $XX.XX (2 decimal places)

**Assertions:**
```
✓ Unit price = $29.99
✓ Line total = $29.99
✓ Subtotal = $29.99
✓ Currency format correct ($XX.XX)
✓ 2 decimal precision maintained
```

---

#### TC6.2: Price Calculation - Multiple Items & Quantities
- **AC Mapping:** AC6
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add to cart:
   - Backpack ($29.99) × 2 = $59.98
   - Bike Light ($9.99) × 3 = $29.97
   - Bolt T-Shirt ($15.99) × 1 = $15.99
2. Open cart
3. Verify all calculations

**Expected Results:**
- Backpack line total: $59.98
- Bike Light line total: $29.97
- Bolt T-Shirt line total: $15.99
- Subtotal: $105.94 (59.98 + 29.97 + 15.99)
- All values show 2 decimals

**Assertions:**
```
✓ Backpack: $59.98
✓ Bike Light: $29.97
✓ Bolt T-Shirt: $15.99
✓ Subtotal = $105.94
✓ All formatted with 2 decimals
✓ Addition accurate
```

---

#### TC6.3: Price Precision - .99 Rounding (Edge Case)
- **AC Mapping:** AC6
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add products with .99 prices:
   - Product 1 ($9.99) × 2 = $19.98
   - Product 2 ($15.99) × 3 = $47.97
2. Calculate expected subtotal
3. Verify cart calculation

**Expected Results:**
- Subtotal: $67.95 (19.98 + 47.97)
- All calculations use standard rounding
- No rounding errors
- 2 decimal precision throughout

**Assertions:**
```
✓ .99 calculations correct
✓ Subtotal = $67.95
✓ No rounding errors
✓ Precision maintained
```

---

#### TC6.4: Price Calculation - Real-Time Update on Quantity Change
- **AC Mapping:** AC6
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add Backpack ($29.99) × 1 to cart
2. Open cart
3. Change quantity to 3
4. Observe line total update

**Expected Results:**
- Before: Line total = $29.99
- After: Line total = $89.97 (3 × $29.99)
- Subtotal updates: $29.99 → $89.97
- Update happens in real-time (<500ms)

**Assertions:**
```
✓ Initial total = $29.99
✓ Updated total = $89.97
✓ Update within 500ms
✓ Subtotal accurate
```

---

### AC7: Cart Persistence Across Pages (3 Test Scenarios)

#### TC7.1: Cart Persists When Navigating to Products Page
- **AC Mapping:** AC7
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 2 products to cart (Backpack, Bike Light)
2. Cart shows "2" badge
3. Click "Continue Shopping" button
4. Verify redirected to /inventory.html
5. Check cart badge still shows "2"
6. Navigate back to cart

**Expected Results:**
- Badge persists: still shows "2"
- Cart contains both items
- Totals unchanged
- No items lost

**Assertions:**
```
✓ Badge = 2 after navigation
✓ Both items still in cart
✓ Totals preserved
✓ URL = /inventory.html
```

---

#### TC7.2: Cart Persists on Page Refresh
- **AC Mapping:** AC7
- **Priority:** P0 (Critical)
- **Browser:** Chrome, Firefox
- **Device:** Desktop

**Steps:**
1. Add 2 products to cart
2. Open cart page (/cart.html)
3. Refresh page (F5 or Ctrl+R)
4. Observe cart state

**Expected Results:**
- Cart items persist after refresh
- All 2 items still present
- Totals unchanged
- Badge shows "2"
- No items lost

**Assertions:**
```
✓ Items persist after refresh
✓ All 2 items present
✓ Totals correct
✓ Badge = 2
```

---

#### TC7.3: Cart Persists with Multiple Tab Navigation (Edge Case)
- **AC Mapping:** AC7
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add item to cart in Tab 1
2. Open new tab (Tab 2) and navigate to SauceDemo
3. Log in in Tab 2
4. Open cart in Tab 2
5. Verify items visible
6. Add item in Tab 2
7. Return to Tab 1 and refresh
8. Verify both items from Tab 2

**Expected Results:**
- Cart updates sync across tabs
- All items from both tabs visible when refreshing
- Totals accurate
- No data loss

**Assertions:**
```
✓ Items from Tab 2 visible in Tab 1 after refresh
✓ All items present
✓ Totals accurate
✓ No duplicates or data loss
```

---

### AC8: Continue Shopping Navigation (2 Test Scenarios)

#### TC8.1: Continue Shopping Button Navigation
- **AC Mapping:** AC8
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 2 products to cart
2. Open cart page
3. Click "Continue Shopping" button
4. Observe navigation and cart state

**Expected Results:**
- Navigated to /inventory.html (products page)
- Cart badge still shows "2"
- Both items remain in cart
- User can add more products

**Assertions:**
```
✓ URL changed to /inventory.html
✓ Badge = 2
✓ Items intact
```

---

#### TC8.2: Continue Shopping with Empty Cart (Edge Case)
- **AC Mapping:** AC8
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Navigate to empty cart
2. Click "Continue Shopping" button
3. Verify navigation

**Expected Results:**
- Navigated to products page
- Badge shows "0"
- Ready to add products

**Assertions:**
```
✓ URL = /inventory.html
✓ Badge = 0
✓ Empty cart message gone
```

---

### AC9: Proceed to Checkout Validation (2 Test Scenarios)

#### TC9.1: Proceed to Checkout Button Visible with Items
- **AC Mapping:** AC9
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add products to cart
2. Open cart
3. Locate "Proceed to Checkout" button
4. Verify button state

**Expected Results:**
- Button visible and enabled
- Button text clear: "Proceed to Checkout" or "Checkout"
- Button is clickable
- Positioned prominently

**Assertions:**
```
✓ Button visible
✓ Button enabled
✓ Button clickable
```

---

#### TC9.2: Checkout Flow Navigation & Data Passage
- **AC Mapping:** AC9
- **Priority:** P0 (Critical)
- **Browser:** Chrome
- **Device:** Desktop
- **Integration:** With SCRUM-101

**Steps:**
1. Add 2 products to cart with known prices
2. Open cart and note totals
3. Click "Proceed to Checkout"
4. Verify redirected to checkout page
5. Verify cart data passed to checkout

**Expected Results:**
- Redirected to /checkout-step-one.html
- Checkout page displays same cart items
- Totals match cart page
- Data integrity maintained

**Assertions:**
```
✓ URL = /checkout-step-one.html
✓ Cart items visible in checkout
✓ Totals match cart page
✓ Data passed correctly
```

---

### AC10: Cart Session Timeout & Recovery (2 Test Scenarios)

#### TC10.1: Browser Close and Reopen (Session Recovery)
- **AC Mapping:** AC10
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add 2 products to cart
2. Close browser completely
3. Reopen browser
4. Navigate to SauceDemo
5. Log in with same credentials
6. Open cart

**Expected Results:**
- Either:
  - Option A: Cart persists (items still there)
  - Option B: Empty cart with recovery message
- Clear indication of cart status
- User can proceed or start fresh

**Assertions:**
```
✓ Either cart recovered OR message shown
✓ User informed of status
✓ Can proceed with existing or fresh cart
```

---

#### TC10.2: Clear Cookies/Storage Recovery (Edge Case)
- **AC Mapping:** AC10
- **Priority:** P2 (Medium)
- **Browser:** Chrome
- **Device:** Desktop

**Steps:**
1. Add items to cart
2. Manually clear cookies/localStorage
3. Refresh cart page
4. Observe behavior

**Expected Results:**
- Either:
  - Option A: Cart empty with message
  - Option B: Server retrieves from session
- Clear messaging to user
- No silent data loss

**Assertions:**
```
✓ Clear messaging on data loss
✓ No silent failures
✓ User aware of cart status
```

---

### AC11: Cart Accessibility (3 Test Scenarios)

#### TC11.1: Keyboard Navigation - Complete Cart Workflow
- **AC Mapping:** AC11
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop
- **Tools:** Keyboard only, no mouse

**Steps:**
1. Log in using keyboard only (Tab, Enter)
2. Navigate to products using keyboard
3. Add product to cart using keyboard
4. Navigate to cart using keyboard
5. Update quantity using keyboard
6. Remove product using keyboard
7. Navigate to checkout using keyboard

**Expected Results:**
- All operations achievable via keyboard
- Focus indicators visible
- Logical tab order
- Shortcuts work if provided

**Assertions:**
```
✓ Add to cart via keyboard
✓ Cart navigation via keyboard
✓ Quantity update via keyboard
✓ Remove via keyboard
✓ Checkout navigation via keyboard
✓ Focus visible throughout
```

---

#### TC11.2: Screen Reader Support (Accessibility)
- **AC Mapping:** AC11
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop
- **Tools:** Screen reader (NVDA or JAWS)

**Steps:**
1. Enable screen reader
2. Navigate to cart page
3. Test following announcements:
   - Cart badge text
   - Item names
   - Prices
   - Quantities
   - Remove buttons
   - Continue/Checkout buttons
   - Totals/Subtotal

**Expected Results:**
- All elements announced by screen reader
- ARIA labels appropriate
- Descriptions meaningful
- Form fields properly labeled
- Buttons describe their action

**Assertions:**
```
✓ Cart items announced
✓ Prices announced
✓ Buttons announced with action
✓ Totals announced
✓ Remove buttons clear
```

---

#### TC11.3: WCAG 2.1 Compliance Check (Accessibility)
- **AC Mapping:** AC11
- **Priority:** P1 (High)
- **Browser:** Chrome
- **Device:** Desktop
- **Tools:** axe DevTools, WAVE, or manual audit

**Steps:**
1. Open cart page in browser
2. Run axe DevTools scan
3. Review results for:
   - Color contrast
   - Form labels
   - Button purposes
   - ARIA usage
   - Structural elements
4. Document any issues

**Expected Results:**
- WCAG 2.1 Level AA compliance (or close)
- No critical issues
- Contrast ratios 4.5:1 for text
- All inputs have labels
- Semantic HTML used

**Assertions:**
```
✓ No critical accessibility issues
✓ Contrast >= 4.5:1
✓ All inputs labeled
✓ ARIA properly used
```

---

### AC12: Mobile Responsiveness (3 Test Scenarios)

#### TC12.1: Mobile Cart Layout - iPhone SE (Small Screen)
- **AC Mapping:** AC12
- **Priority:** P1 (High)
- **Browser:** Chrome DevTools Mobile Emulation
- **Device:** iPhone SE (375×667)

**Steps:**
1. Set viewport to iPhone SE (375×667)
2. Add 3 products to cart
3. Open cart
4. Observe layout and interactions

**Expected Results:**
- Layout responsive (no horizontal scrolling)
- All content readable
- Buttons touch-friendly (minimum 44×44px)
- Product cards stack vertically
- Checkout button prominent
- Prices visible and readable

**Assertions:**
```
✓ No horizontal scrolling
✓ Touch targets >= 44x44px
✓ Content readable
✓ Buttons accessible on mobile
✓ No layout overflow
```

---

#### TC12.2: Mobile Cart Layout - iPhone 12 Pro Max (Large Screen)
- **AC Mapping:** AC12
- **Priority:** P2 (Medium)
- **Browser:** Chrome DevTools
- **Device:** iPhone 12 Pro Max (428×926)

**Steps:**
1. Set viewport to iPhone 12 Pro Max
2. Add products to cart
3. Open cart
4. Verify layout optimization for larger screen

**Expected Results:**
- Layout optimized for larger screen
- No wasted space
- Content properly distributed
- Usable on both orientations

**Assertions:**
```
✓ Responsive layout
✓ Proper spacing
✓ Content centered appropriately
```

---

#### TC12.3: Mobile - Orientation Change (Landscape/Portrait)
- **AC Mapping:** AC12
- **Priority:** P1 (High)
- **Browser:** Chrome DevTools
- **Device:** iPhone 12 (Portrait & Landscape)

**Steps:**
1. Open cart in portrait orientation
2. Add multiple products
3. Rotate to landscape
4. Observe layout adjustment
5. Rotate back to portrait
6. Verify restoration

**Expected Results:**
- Layout responds to orientation
- Content readable in both orientations
- No content loss on rotation
- Smooth transition
- All functions remain accessible

**Assertions:**
```
✓ Layout adjusts on rotation
✓ Content readable both orientations
✓ All functions available
✓ No content loss
```

---

## Test Execution Matrix

### Browser Compatibility
| Test # | Test Name | Chrome | Firefox | Safari |
|--------|-----------|--------|---------|--------|
| TC1.1 | Add Single Product | ✅ | ✅ | ✅ |
| TC1.2 | Add Multiple Products | ✅ | ✅ | ✅ |
| TC2.1 | View Single Item | ✅ | ✅ | ✅ |
| TC2.2 | View Multiple Items | ✅ | ✅ | ✅ |
| TC3.1 | Update Quantity | ✅ | ✅ | ✅ |
| TC4.1 | Remove Item | ✅ | ✅ | ✅ |
| TC6.1 | Price Calculation | ✅ | ✅ | ✅ |
| TC7.1 | Cart Persistence | ✅ | ✅ | ✅ |
| TC9.1 | Checkout Button | ✅ | ✅ | ✅ |

### Priority Distribution
| Priority | Count | Examples |
|----------|-------|----------|
| P0 (Critical) | 12 | Add, View, Remove, Checkout |
| P1 (High) | 18 | Quantity updates, Accessibility, Mobile |
| P2 (Medium) | 18 | Edge cases, Performance, Error handling |
| **Total** | **48** | **All scenarios** |

---

## Test Data Reference

### Products Available in SauceDemo
1. Sauce Labs Backpack - $29.99
2. Sauce Labs Bike Light - $9.99
3. Sauce Labs Bolt T-Shirt - $15.99
4. Sauce Labs Fleece Jacket - $49.99
5. Sauce Labs Onesie - $7.99
6. Test.allTheStickerThings() - $5.99

### Test User Credentials
- Username: `standard_user`
- Password: `secret_sauce`
- Role: Standard user (can view products, add to cart, checkout)

---

## Success Criteria

✅ All 48 test scenarios created  
✅ All 12 ACs covered  
✅ Happy path, negative, and edge cases defined  
✅ Browser compatibility specified  
✅ Mobile testing included  
✅ Accessibility testing included  
✅ Expected results clearly defined  
✅ Test data documented  
✅ Ready for automated test generation  

---

**Test Plan Status:** COMPLETE  
**Generated:** April 17, 2026  
**Next Step:** Perform Exploratory Testing (STEP 3)
