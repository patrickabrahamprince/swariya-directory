# Deployment Guide - Swariya Wedding Directory

## Complete Step-by-Step Setup (30 minutes)

### Part 1: Local Setup (5 minutes)

1. **Install Node.js** (if you haven't already)
   - Download from [nodejs.org](https://nodejs.org)
   - Choose LTS version

2. **Download the project**
   - Extract the swariya-directory folder to your computer

3. **Open in VS Code**
   ```bash
   code swariya-directory
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create .env.local file**
   - Copy `.env.local.example` to `.env.local`
   - Leave empty for now (we'll fill it later)

6. **Test locally**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000
   - Everything should work with sample data

---

### Part 2: Setup Supabase Database (10 minutes)

1. **Create Supabase account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with Google (takes 30 seconds)

2. **Create new project**
   - Click "New Project"
   - Name: `swariya-wedding`
   - Region: Choose closest to India (Mumbai/Singapore)
   - Wait 2-3 minutes for setup

3. **Create tables**
   - Go to SQL Editor
   - Copy this SQL and run it:

```sql
-- Create vendors table
CREATE TABLE vendors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  sub_category VARCHAR(100),
  city VARCHAR(100),
  area VARCHAR(100),
  description TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  min_price INTEGER,
  max_price INTEGER,
  rating DECIMAL(3,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  experience_years INTEGER,
  team_size INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  vendor_id BIGINT REFERENCES vendors(id) ON DELETE CASCADE,
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_vendors_city ON vendors(city);
CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_vendors_featured ON vendors(featured);
CREATE INDEX idx_vendors_status ON vendors(status);
CREATE INDEX idx_reviews_vendor_id ON reviews(vendor_id);

-- Add some sample vendors
INSERT INTO vendors (name, category, sub_category, city, area, description, min_price, max_price, rating, review_count, experience_years, team_size, verified, status) 
VALUES 
  ('The Grand Palace', 'Venues', 'Banquet Halls', 'Bangalore', 'Whitefield', 'Luxury banquet hall with 500+ capacity', 300000, 1000000, 4.8, 245, 15, 25, true, 'approved'),
  ('Royal Catering Co', 'Catering', 'North Indian', 'Bangalore', 'Indiranagar', 'Premium catering with diverse cuisines', 500, 5000, 4.6, 180, 12, 20, true, 'approved'),
  ('Click Moments Photography', 'Photography', 'Wedding Photography', 'Bangalore', 'HSR', 'Professional wedding photography', 25000, 500000, 4.9, 320, 8, 15, true, 'approved');
```

4. **Get API keys**
   - Go to Settings → API
   - Copy `Project URL`
   - Copy `anon public` key

5. **Update .env.local**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

6. **Test the database**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000/vendors
   - Should see sample vendors from database

---

### Part 3: Deploy to Vercel (10 minutes)

1. **Create GitHub account** (if you don't have one)
   - Go to [github.com](https://github.com)
   - Sign up (takes 2 minutes)

2. **Upload to GitHub**
   - In VS Code terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Swariya wedding directory"
   ```
   - Go to GitHub → New Repository
   - Copy the commands and paste in terminal:
   ```bash
   git remote add origin https://github.com/yourusername/swariya-directory
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (1 click)
   - Click "New Project"
   - Select your repository
   - Add Environment Variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = [paste from Supabase]
     NEXT_PUBLIC_SUPABASE_ANON_KEY = [paste from Supabase]
     ```
   - Click "Deploy"
   - **Wait 2-3 minutes**
   - Your site is LIVE! 🎉

4. **Get your domain**
   - Vercel gives you a free `.vercel.app` domain
   - Or connect your own domain `swariya.com`

---

## After Deployment

### Add More Vendors

**Option 1: Manual (Admin Panel)**
- Visit `yoursite.com/admin`
- Click "Add Vendor"
- Fill form and save
- Instantly appears on site and indexed by Google

**Option 2: Bulk Import (CSV)**
- Prepare CSV with vendor data
- Use Supabase dashboard to import

**Option 3: Vendor Self-Registration**
- Add signup form in admin
- Vendors register themselves
- Admin approves

### Enable Search Engine Indexing

1. **Submit to Google Search Console**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your domain
   - Submit sitemap: `yoursite.com/sitemap.xml`

2. **Submit to Bing Webmaster**
   - Go to [bing.com/webmasters](https://bing.com/webmasters)
   - Add your site
   - Wait for indexing (1-2 weeks)

3. **Monitor rankings**
   - Track keywords you want to rank for
   - Add blog posts for backlinks
   - Improve vendor reviews

---

## Troubleshooting

### Site won't load locally
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Database connection error
- Check `.env.local` has correct Supabase keys
- Ensure network access is allowed in Supabase
- Test connection in Supabase dashboard

### Deployment fails
- Check GitHub repo is public
- Verify environment variables in Vercel
- Check build logs in Vercel dashboard

---

## Free Tools to Use

| Tool | Purpose | Cost |
|------|---------|------|
| **Vercel** | Hosting | Free up to 100GB |
| **Supabase** | Database | Free up to 500MB |
| **GitHub** | Code storage | Free public repos |
| **Google Search Console** | SEO tracking | Free |
| **Crawl.AI** | Web scraping | Free tier |
| **Ubersuggest** | Keyword research | Free tier |

---

## Next: Add Vendor Data

Now that your site is live, populate vendors:

1. **Get vendor contact info**
   - Search Google Maps for "wedding venues Bangalore"
   - Use Crawl.AI to scrape basic info
   - Build CSV with vendor details

2. **Bulk import to Supabase**
   - Go to Supabase → Table → Import Data
   - Upload CSV
   - Data instantly appears on site

3. **Reach out to vendors**
   - Send emails with signup link
   - Offer featured listing discounts
   - Build community of vendors

---

## Success Metrics

Track these to measure SEO success:

- **Google indexing**: Check in Search Console
- **Keyword rankings**: Track in Google Console
- **Organic traffic**: Monitor in Vercel Analytics
- **User engagement**: Pages per session, bounce rate
- **Vendor growth**: New vendors added per month

Good luck! 🚀
