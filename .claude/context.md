# Claude Context - Swariya Wedding Directory

## Project Overview
Building Swariya - a SEO-focused wedding vendor directory for India.

**Goal**: Rank #1 on Google for "wedding vendors in [city]".

## Tech Stack
- **Frontend**: Next.js 14 + React 18 (TypeScript)
- **Styling**: Tailwind CSS (NO external UI libraries)
- **Database**: Supabase PostgreSQL (FREE tier)
- **Hosting**: Vercel (FREE tier)

## Current Status
✅ Project structure created
✅ 4 main pages built (homepage, listing, detail, admin)
✅ Review system with star ratings
✅ Admin management panel
✅ Responsive design (mobile-first)
✅ Ready for database integration

## Database Tables (Supabase)

### vendors
- id, name, category, sub_category, city, area
- description, phone, email, website
- min_price, max_price, rating, review_count
- experience_years, team_size
- featured (bool), verified (bool), status
- created_at, updated_at

### reviews
- id, vendor_id, author_name, author_email
- rating (1-5), comment, created_at

## Next Features to Build
1. **Database Integration** → Connect pages to Supabase
2. **Vendor Signup** → Self-registration form
3. **Payment Integration** → Razorpay for featured listings
4. **Blog Section** → Content for SEO
5. **Email Notifications** → SendGrid integration

## Code Standards
- Use TypeScript (strict mode)
- Functional components with React hooks
- Tailwind CSS only (no CSS files)
- SEO optimization (meta, schema, sitemap)
- Mobile-first responsive design
- Performance optimized

## When Using Claude Code

### Good Prompts
✅ "Create a database connection function to fetch vendors from Supabase"
✅ "Add Razorpay payment integration for featured listings"
✅ "Create a vendor signup form with validation"
✅ "Write blog section with SEO optimization"

### What Claude Can Do
✅ Generate components and pages
✅ Create database queries and migrations
✅ Add new features and integrations
✅ Optimize performance
✅ Fix bugs and issues
✅ Write tests
✅ Create documentation

## File Locations
- Pages: app/*/page.tsx
- Styles: Tailwind classes (no .css files)
- Types: lib/types.ts (create if needed)
- Database: lib/db.ts (to create)
- Utilities: lib/*.ts

## Quick Build Commands

```bash
# Generate a component
claude-code generate "Create a SearchInput component..."

# Fix a bug
claude-code fix "Vendor listing shows duplicate results"

# Write tests
claude-code test "app/vendors/page.tsx"

# Optimize
claude-code optimize "Improve database queries"
```

## SEO Strategy
- Each vendor = unique indexed page
- Each review = fresh content
- Blog posts for backlinks
- Schema markup on all pages
- Fast loading times
- Mobile responsive

## Success Metrics
- Month 1: 50 vendors, 100 visits
- Month 3: 200 vendors, 2K visits
- Month 6: 500 vendors, 5K visits
- Month 12: 1000+ vendors, 15K visits

---

Copy this context and share with Claude when asking for help!
