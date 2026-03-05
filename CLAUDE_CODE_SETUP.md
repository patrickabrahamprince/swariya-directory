# 🤖 Claude Code Setup for VS Code

This guide helps you use Claude AI directly in VS Code to build the wedding directory faster.

## Installation

### 1. Install Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

### 2. Authenticate

```bash
claude-code auth login
```

Follow the prompts to sign in with your Claude account.

### 3. Verify Installation

```bash
claude-code --version
```

---

## Usage in Your Project

### Quick Start Commands

**Generate a component:**
```bash
claude-code generate "Create a VendorCard component that shows vendor name, rating, price range"
```

**Fix code:**
```bash
claude-code fix app/page.tsx "Search bar is not filtering vendors correctly"
```

**Write tests:**
```bash
claude-code test app/vendors/page.tsx "Create unit tests"
```

**Explain code:**
```bash
claude-code explain app/vendors/[id]/page.tsx
```

**Optimize:**
```bash
claude-code optimize app/vendors/page.tsx "Make this page faster"
```

---

## Custom VS Code Extension Prompts

Add these to your VS Code settings (`settings.json`):

```json
{
  "claude.prompts": {
    "buildVendorPage": {
      "description": "Build vendor detail page",
      "prompt": "Create a vendor detail page at app/vendors/[id]/page.tsx with: vendor info, photo gallery, pricing, reviews section, and 'Request Quote' button. Use Tailwind CSS. Make it mobile-responsive."
    },
    "addReviewSystem": {
      "description": "Add review system",
      "prompt": "Create a review submission and display system for vendors. Include: review form (name, email, rating, comment), review list (sorted by newest), average rating calculation, and 'helpful' count."
    },
    "createAdminPanel": {
      "description": "Build admin dashboard",
      "prompt": "Create admin dashboard at app/admin/page.tsx with: vendor statistics, add vendor form, vendor management table (with approve/reject/feature actions), and analytics."
    },
    "setupDatabase": {
      "description": "Setup Supabase",
      "prompt": "Create complete Supabase setup instructions including: SQL table schemas for vendors and reviews, database connection code, and example queries."
    }
  }
}
```

---

## Recommended Workflow

### Step 1: Initialize with Claude

```bash
# Let Claude understand your project
cd swariya-directory
claude-code init
```

### Step 2: Build Features One by One

```bash
# Feature 1: Enhanced vendor listing
claude-code generate "Improve vendor listing with pagination and sorting options"

# Feature 2: Database integration
claude-code generate "Create Supabase database integration for vendors table"

# Feature 3: Payment integration
claude-code generate "Add Razorpay payment integration for featured listings"
```

### Step 3: Debug & Optimize

```bash
claude-code fix app/vendors/page.tsx "Search is slow with 1000+ vendors"
claude-code optimize lib/seo.ts "Improve schema generation performance"
```

---

## Project-Specific Prompts

### For Homepage
```
Create an improved homepage with:
- Dynamic search bar with suggestions
- Featured vendors carousel
- City selector (10 major cities)
- Quick stats (vendors, reviews, events)
- Call-to-action buttons

Use sample data first, then connect to Supabase later.
```

### For Vendor Listing
```
Build vendor listing page with:
- Filter sidebar (city, category, rating, budget)
- Grid/list view toggle
- Sorting options (newest, top rated, most reviews)
- Pagination (12 per page)
- "Load more" button
- Responsive on mobile

Include Supabase query integration.
```

### For Admin Panel
```
Create admin dashboard with:
- Vendor management table
- Add/edit/delete vendors
- Feature/unfeature vendors
- View analytics (revenue, vendor count)
- Pending approvals
- Generate revenue reports

Add role-based access control.
```

### For Database
```
Setup Supabase with:
- Vendors table (id, name, category, city, pricing, rating, etc.)
- Reviews table (id, vendor_id, author, rating, comment)
- Database indexes for fast queries
- Row-level security policies
- Example data seeding

Create TypeScript types for all tables.
```

---

## Advanced: Custom Tasks

Create `.claude/tasks/build-vendor-feature.md`:

```markdown
# Build Vendor Profile Feature

## Objective
Create a complete vendor profile page with all vendor information, gallery, reviews, and booking options.

## Context
- Using Next.js 14 with App Router
- Styling with Tailwind CSS
- Database: Supabase PostgreSQL
- Reviews system already in place

## Requirements
1. Vendor detail page at `/vendors/[id]`
   - Display vendor info (name, category, city, description)
   - Photo gallery with lightbox
   - Pricing information and packages
   - Experience and team size
   
2. Reviews section
   - Display vendor reviews
   - Star rating visualization
   - Average rating calculation
   - "Write Review" button
   
3. Call-to-action
   - "Request Quote" button
   - "Save to Wishlist" button
   - Contact information
   
4. Mobile responsive
5. SEO optimized (meta tags, schema)
6. Fast loading (images optimized)

## Acceptance Criteria
- Page loads in < 2 seconds
- All interactive elements work
- Mobile looks good on all devices
- Reviews load from database
- Schema markup validates

## Related Files
- app/vendors/[id]/page.tsx (main page)
- lib/seo.ts (schema generation)
- tailwind.config.js (styling config)
```

---

## Shortcuts for Common Tasks

### Setup Project
```bash
claude-code run "Setup:
1. Install dependencies
2. Create .env.local from example
3. Test local build
4. List any missing configs"
```

### Database Tasks
```bash
claude-code run "Database:
1. Show Supabase connection code
2. Create vendor query examples
3. Setup type definitions
4. Create migration files"
```

### Deployment
```bash
claude-code run "Deployment:
1. Optimize build size
2. Check performance metrics
3. Verify SEO setup
4. Generate deployment checklist"
```

### Testing
```bash
claude-code run "Testing:
1. Create unit test examples
2. Setup testing library
3. Create API test examples
4. Setup CI/CD pipeline"
```

---

## VS Code Integration

### Install Claude Code Extension

1. Open VS Code
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Search "Install Extensions"
4. Search "Claude Code"
5. Click Install

### Keyboard Shortcuts

Add to `.vscode/keybindings.json`:

```json
[
  {
    "key": "alt+c",
    "command": "claude-code.generate",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+x",
    "command": "claude-code.fix",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+t",
    "command": "claude-code.test",
    "when": "editorTextFocus"
  }
]
```

Now use:
- **Alt+C**: Generate code
- **Alt+X**: Fix code
- **Alt+T**: Write tests

---

## Example: Build a Feature with Claude Code

### Command
```bash
claude-code generate "Build vendor search with filters for city, category, and price range"
```

### What Claude Will Do
1. ✅ Analyze your existing code structure
2. ✅ Create filtered search component
3. ✅ Add filter UI (sidebar)
4. ✅ Implement filtering logic
5. ✅ Connect to database queries
6. ✅ Style with Tailwind
7. ✅ Add TypeScript types
8. ✅ Create tests

### Output
- New/updated files
- Explanation of changes
- How to test
- Optimization suggestions

---

## Tips for Best Results

### Be Specific
❌ "Create a search page"
✅ "Create a vendor search page with filters for city (dropdown), category (checkbox), and price range (slider). Show results as cards with image, name, rating, and price."

### Include Context
❌ "Fix the slow query"
✅ "The vendor listing page loads 1000+ vendors and it's slow. Use pagination or lazy loading. Database is Supabase PostgreSQL."

### Request Multiple Things
```bash
claude-code generate "
Create three features:
1. Vendor filter sidebar
2. Featured badge on vendor cards
3. 'Load more' pagination button
Use existing styling and components.
"
```

### Ask for Optimization
```bash
claude-code optimize "
Optimize vendor search:
- Add caching for frequently searched cities
- Implement pagination (12 per page)
- Add search debouncing
- Use database indexes
"
```

---

## Troubleshooting

### Claude Code not found
```bash
npm install -g @anthropic-ai/claude-code
claude-code --version
```

### Authentication fails
```bash
claude-code auth logout
claude-code auth login
```

### Can't access files
Make sure you're in the project directory:
```bash
cd swariya-directory
claude-code generate "..."
```

### Want to see what Claude sees
```bash
claude-code analyze
```

---

## Next Steps

1. **Today**: Install Claude Code & run first command
2. **This week**: Build 3-4 features using Claude Code
3. **Next week**: Deploy and test with real data
4. **Ongoing**: Use Claude Code for optimization & debugging

---

## Example Commands to Run Now

```bash
# 1. Analyze your project
claude-code analyze

# 2. Generate vendor card component
claude-code generate "Create a reusable VendorCard component showing name, rating, price, and action buttons"

# 3. Create admin features
claude-code generate "Add admin panel features: vendor approval workflow, featured listing toggle, analytics dashboard"

# 4. Setup database
claude-code generate "Create complete Supabase setup: schemas, queries, TypeScript types, and example data"

# 5. Optimize performance
claude-code optimize "Improve database queries, add caching, optimize images"
```

---

Start with any of these commands and Claude will help you build! 🚀
