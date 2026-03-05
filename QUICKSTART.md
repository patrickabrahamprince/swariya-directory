# ⚡ Quick Start (5 Minutes)

## 1️⃣ Clone to VS Code

```bash
# Open terminal and run:
git clone https://github.com/yourusername/swariya-directory.git
cd swariya-directory
npm install
```

## 2️⃣ Setup Environment

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 3️⃣ Run Locally

```bash
npm run dev
```

Visit: http://localhost:3000

## 4️⃣ Deploy to Vercel

```bash
git push
# Then:
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Select repo
# 4. Add env vars
# 5. Deploy
```

**Done! Your site is live in 2 minutes** 🚀

---

## Pages Available

- **Homepage**: `/` (search bar, featured vendors)
- **Vendor Listing**: `/vendors` (search & filter)
- **Vendor Detail**: `/vendors/[id]` (reviews, details)
- **Admin Panel**: `/admin` (manage vendors)

---

## Add Vendors

1. Go to `/admin`
2. Click "Add Vendor"
3. Fill details
4. Submit
5. Instantly indexed by Google ✅

---

## Cost

- **Hosting**: FREE (Vercel)
- **Database**: FREE (Supabase)
- **Domain**: FREE (.vercel.app) or $12/year (.com)

**Total: $0 - $12/year** 💰

---

Need detailed setup? See `DEPLOYMENT.md`
