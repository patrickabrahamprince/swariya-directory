# 💰 Monetization Plan

## Revenue Streams

### 1. Featured Listings
- **Free**: Basic vendor profile
- **Featured**: ₹499/month → Top of search results
- **Premium**: ₹999/month → Featured + homepage + email

### 2. Sponsored Results
- **Top Position**: ₹1,999/month
- **Category Sponsor**: ₹1,499/month

### 3. Lead Generation
- **Pay-per-lead**: ₹50-100 per qualified lead
- Couples get vendor quotes, vendors pay

### 4. Advertising
- **Homepage banner**: ₹5,000/month
- **Category ads**: ₹2,000/month

---

## Revenue Projection

| Month | Vendors | Avg Monthly Fee | Revenue |
|-------|---------|-----------------|---------|
| M1 | 50 | ₹200 | ₹10K |
| M3 | 200 | ₹250 | ₹50K |
| M6 | 500 | ₹300 | ₹1.5L |
| M12 | 1000 | ₹350 | ₹3.5L |

---

## How to Implement

### Step 1: Setup Payment
```javascript
// Use Razorpay API
const handlePayment = async (vendorId, amount) => {
  const response = await fetch('/api/payment/create', {
    method: 'POST',
    body: JSON.stringify({ vendorId, amount })
  })
}
```

### Step 2: Create Vendor Dashboard
- Payment history
- Active subscriptions
- Usage analytics

### Step 3: Email Invoices
- Monthly invoices
- Payment receipts
- Renewal reminders

---

## Acquisition Strategy

1. **Cold outreach** (High conversion)
   - Email 100 vendors
   - Offer 1-month free trial
   - Expected: 30% conversion → 30 featured listings

2. **In-app messaging**
   - Show "Upgrade to Featured" badge
   - Expected: 5-10% of vendors

3. **Partnership offers**
   - 3-month bundle discount
   - Expected: 20% higher value

---

## First 100 Vendors

**Target**: Get 100 vendors in Month 1

**Strategy**:
1. Email 200 wedding venues in Bangalore
2. Offer 50% discount first month
3. Expected signups: 30-50
4. Repeat in other cities

**Timeline**: 1 month to 100 vendors

---

## Long-term (Year 1)

- 1000+ vendors across 10+ cities
- ₹35L+ monthly revenue
- Profitability threshold: 500 vendors @ ₹300 avg

Goal: **Break even by Month 6** ✅
