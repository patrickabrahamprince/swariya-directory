# Swariya Wedding Vendor Directory

A high-performance Next.js wedding vendor directory built for SEO and user experience.

## Features

✅ Public vendor listing pages (indexed by Google)
✅ Vendor search with advanced filtering
✅ Verified reviews and ratings
✅ Admin panel for vendor management
✅ Schema markup for SEO
✅ Mobile-responsive design
✅ Free hosting on Vercel
✅ Free database on Supabase

## Quick Start

### 1. Clone/Download Project
```bash
cd swariya-directory
npm install
```

### 2. Setup Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:3000`

## Deployment to Vercel (Free)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/swariya-directory
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables
5. Click "Deploy"

**That's it! Your site is live in 2 minutes.**

## Database Setup (Supabase - Free)

### Step 1: Create Supabase Account
Visit [supabase.com](https://supabase.com) and create a free account.

### Step 2: Create Database Tables

Run these SQL commands in Supabase:

```sql
-- Vendors Table
CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  city VARCHAR(100),
  description TEXT,
  min_price INTEGER,
  max_price INTEGER,
  rating DECIMAL(3,1),
  review_count INTEGER DEFAULT 0,
  phone VARCHAR(20),
  email VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  vendor_id INTEGER REFERENCES vendors(id),
  author VARCHAR(255),
  email VARCHAR(255),
  rating INTEGER,
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 3: Get Connection Details

1. Go to Supabase Project Settings
2. Copy URL and Anon Key
3. Add to `.env.local`

## Getting Vendor Data

### Option 1: Manual Entry
Use the Admin Dashboard to add vendors manually.

### Option 2: Bulk Import
Use Crawl.AI or web scraping to get existing vendor data and import via CSV.

### Option 3: Vendor Self-Registration
Add a vendor signup form that auto-publishes or requires approval.

## SEO Optimization

✅ Meta tags for each page
✅ Schema markup (JSON-LD) for vendors
✅ Sitemap generation
✅ Open Graph tags for social sharing
✅ Mobile-friendly
✅ Fast loading (Core Web Vitals optimized)

## Monetization

```
Free Listing: Basic vendor profile
Featured Listing: ₹499/month (appears at top)
Sponsored: ₹999/month (highlighted across site)
Lead Generation: ₹50 per qualified lead
```

## Integration with Framer

Add this to your Framer site header:
```
<a href="https://dashboard.swariya.com/vendors">Browse Vendors</a>
```

## File Structure

```
swariya-directory/
├── app/
│   ├── page.tsx           # Homepage
│   ├── vendors/
│   │   ├── page.tsx       # Listing
│   │   └── [id]/page.tsx  # Detail page
│   ├── admin/page.tsx     # Admin panel
│   └── layout.tsx         # Main layout
├── lib/
│   └── seo.ts             # SEO utilities
├── .env.local.example     # Environment variables template
├── package.json
├── tailwind.config.js
└── README.md
```

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Setup Supabase database
3. ✅ Add 100+ vendors
4. ✅ Setup Google Search Console
5. ✅ Add blog posts for backlinks
6. ✅ Start outreach to vendors
7. ✅ Monitor rankings on Google

## Free Tools for Marketing

- **Google Search Console**: Track SEO performance
- **Ubersuggest Free**: Find keyword ideas
- **AnswerThePublic**: See what people ask
- **Crawl.AI**: Get vendor data

## Support

For help, check:
- Next.js docs: [nextjs.org](https://nextjs.org)
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Tailwind docs: [tailwindcss.com](https://tailwindcss.com)

---

Built with ❤️ for the Indian wedding industry.
