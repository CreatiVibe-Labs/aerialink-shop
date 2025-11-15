# Error Tracking Guide - Payment & Order Creation

## Kahan Error Dikhega? 🔍

### 1. **Browser Console (F12)**
- Browser mein F12 press karein
- Console tab open karein
- Order create karte waqt ye logs dikhenge:
  - `=== CREATE PAYMENT SESSION ===`
  - Cart items, amounts, customer details
  - `=== CREATING ORDER ===`
  - Order API request & response

### 2. **Order Confirmation Page (RED ERROR BOX)**
Agar order creation fail ho to page pe **RED BOX** dikhega:

```
⚠️ Order Creation Error

Error Details:
[Full API error message yahan dikhega]

Note: Your payment was successful, but we encountered an error while creating your order.

[Copy Error Details Button]
```

**Error Box Dikhne Ki Condition:**
- URL mein `?status=error&error=...` ho
- Example: `/checkout/order-confirmation?status=error&error=Order%20API%20Error...`

### 3. **VS Code Terminal (Server Logs)**
Jahan `npm run dev` run ho raha hai:

**Payment Session Create Karte Waqt:**
```
=== CREATE PAYMENT SESSION ===
Amount: 5000
Shipping: 500
Tax: 450
Subtotal: 4050
Cart Items: [...]
Customer: {...}
Session Metadata: {...}
```

**Payment Success Ke Baad:**
```
Payment successful, creating order...
=== CREATING ORDER ===
API URL: https://dashboard.aerialinkshop.jp/api/guest/orders
Request Headers: {...}
Request Body: {...}
Response Status: 422 Unprocessable Entity (or other error)
```

**Agar Error Ho:**
```
=== ORDER API ERROR ===
Status: 422
Status Text: Unprocessable Entity
Error Response: {"message": "...", "errors": {...}}
Parsed Error: {...}

=== CRITICAL: FAILED TO CREATE ORDER ===
Order Error: Error: Order API Error (422): {...}
```

**Success Case:**
```
=== ORDER CREATED SUCCESSFULLY ===
Order Result: {...}
Order creation completed successfully
```

## Kaise Test Karein? 🧪

1. **Terminal Check:**
   ```bash
   # Ensure server is running
   npm run dev
   ```
   
2. **Order Place Karein:**
   - Checkout pe jao
   - Form fill karo
   - "Place Order" click karo
   - Payment confirm karo

3. **Errors Check Karein:**
   - **Terminal**: Server logs check karo
   - **Browser Console**: F12 → Console tab
   - **Order Page**: Red error box dekho (agar error ho)

## Common Errors & Solutions 🔧

### Error: "variant_id is required"
- **Cause**: Cart items mein size_id missing hai
- **Fix**: Product page se properly size select karo

### Error: 401 Unauthorized
- **Cause**: Invalid/missing auth token
- **Fix**: Check if user is logged in properly

### Error: 422 Unprocessable Entity
- **Cause**: Invalid data format
- **Fix**: Check terminal logs for which field is invalid

### Error: 500 Internal Server Error
- **Cause**: Backend API issue
- **Fix**: Check backend API logs

## Quick Debug Commands 🛠️

```javascript
// Browser Console mein run karo to check cart items
localStorage.getItem('cart_items')

// Check auth token
document.cookie.split(';').find(c => c.includes('token'))

// Check current URL params on order page
new URLSearchParams(window.location.search).get('error')
```

## Error Flow Diagram 📊

```
Checkout Form Submit
    ↓
Create Payment Session (/api/payments/create-session)
    ↓ [Logs: Session data, metadata]
Komoju Payment Page
    ↓
Payment Success
    ↓
Callback (/api/payments/payment-successfull)
    ↓ [Logs: Creating order...]
Order API Call (/guest/orders)
    ↓
    ├─ Success → Order Confirmation (status=success)
    │   └─ [Logs: Order created successfully]
    │
    └─ Error → Order Confirmation (status=error&error=...)
        └─ [Logs: CRITICAL ERROR + Error details]
        └─ [Page: RED ERROR BOX visible]
```

## Contact Support 📞
Agar error samajh nahi aa raha to:
1. Terminal se pura error copy karo
2. Browser console screenshot lo
3. Order confirmation page ka error box screenshot lo
4. Support ko send karo with all details
