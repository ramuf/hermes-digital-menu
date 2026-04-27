# Digital Menu System Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a full-stack digital menu system featuring a mobile-first customer menu and a secure admin dashboard for real-time menu management.

**Architecture:**
- **Frontend & API:** Next.js (App Router) with `next-intl` for localized routing and static translations.
- **Database:** SQLite for local development, migrating to PostgreSQL for production.
- **ORM:** Prisma for database schema management and type-safe queries.
- **Styling:** Tailwind CSS for a responsive, restaurant-grade UI.
- **Deployment:** Vercel (recommended) for seamless Next.js integration.
- **i18n Strategy:** Dynamic translation tables for menu content; JSON dictionaries for UI labels. Support for PT, FR, ES, EN.

**Tech Stack:** Next.js 14+, Tailwind CSS, Prisma, SQLite/PostgreSQL, next-intl, TypeScript, Lucide-React (icons).

---

## Milestone 1: Foundation & Data Layer

### Task 1: Project Initialization
**Objective:** Setup the Next.js project with TypeScript and Tailwind.
**Files:**
- Create: Project root via `npx create-next-app@latest .`
**Steps:**
1. Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app`
2. Verify: Run `npm run dev` and ensure the default page loads.
3. Commit: `git commit -m "chore: initialize next.js project"`

### Task 2: Prisma & SQLite Setup
**Objective:** Initialize Prisma and configure SQLite as the local database.
**Files:**
- Create: `prisma/schema.prisma`
- Create: `.env`
**Steps:**
1. Install Prisma: `npm install prisma --save-dev` and `npm install @prisma/client`.
2. Initialize Prisma: `npx prisma init --datasource-provider sqlite`.
3. Configure `.env` with `DATABASE_URL="file:./dev.db"`.
4. Commit: `git commit -m "feat: setup prisma with sqlite"`

### Task 3: Database Schema Design (i18n Ready)
**Objective:** Define models for Categories and Items with translation support.
**Files:**
- Modify: `prisma/schema.prisma`
**Steps:**
1. Define `Category` model: `id`, `sortOrder`.
2. Define `CategoryTranslation` model: `id, categoryId (FK), lang (PT|FR|ES|EN), name`.
3. Define `MenuItem` model: `id, categoryId (FK), price, imageUrl, isAvailable, sortOrder`.
4. Define `MenuItemTranslation` model: `id, menuItemId (FK), lang (PT|FR|ES|EN), name, description`.
5. Run migration: `npx prisma migrate dev --name init_i18n`.
6. Create a Prisma client singleton in `lib/prisma.ts`.
7. Commit: `git commit -m "feat: define i18n database schema"`

### Task 4: Internationalization (i18n) Setup
**Objective:** Configure `next-intl` for routing and static UI translations.
**Files:**
- Create: `i18n.ts`, `navigation.ts`, `middleware.ts`
- Create: `messages/en.json`, `messages/pt.json`, `messages/es.json`, `messages/fr.json`
**Steps:**
1. Install `next-intl`.
2. Setup localized folder structure: `app/[locale]/layout.tsx` and `app/[locale]/page.tsx`.
3. Implement the middleware to detect browser language and redirect to the correct locale.
4. Commit: `git commit -m "feat: setup next-intl for static translations"`

---

## Milestone 2: Customer Frontend (The Menu)

### Task 4: Menu Data Fetching Logic
**Objective:** Implement a server component to fetch categories and items.
**Files:**
- Create: `app/menu/page.tsx`
- Create: `lib/menu-service.ts`
**Steps:**
1. Write `getMenuData()` in `lib/menu-service.ts` to fetch categories and joined items.
2. Implement a basic list render in `app/menu/page.tsx`.
3. Commit: `git commit -m "feat: implement menu data fetching"`

### Task 5: Responsive Menu UI (Mobile-First)
**Objective:** Build a polished, appetizing menu interface.
**Files:**
- Modify: `app/menu/page.tsx`
- Create: `components/menu/CategoryNav.tsx`
- Create: `components/menu/MenuItem.tsx`
**Steps:**
1. Build a horizontal scrolling category navigation.
2. Build menu item cards with price and availability badges.
3. Implement "Filter by Category" functionality.
4. Commit: `git commit -m "feat: design responsive menu UI"`

---

## Milestone 3: Admin Dashboard

### Task 6: Admin Authentication
**Objective:** Create a secure login page for restaurant owners.
**Files:**
- Create: `app/admin/login/page.tsx`
- Create: `middleware.ts`
**Steps:**
1. Implement Supabase Auth login form.
2. Create `middleware.ts` to protect all `/admin/*` routes.
3. Commit: `git commit -m "feat: add admin authentication"`

### Task 7: Category Management (CRUD)
**Objective:** Allow admins to add/edit/delete categories.
**Files:**
- Create: `app/admin/categories/page.tsx`
- Create: `components/admin/CategoryForm.tsx`
**Steps:**
1. Build a table listing all categories.
2. Implement "Add Category" and "Edit Category" modals.
3. Implement "Delete Category" with confirmation.
4. Commit: `git commit -m "feat: add category management"`

### Task 8: Menu Item Management (CRUD)
**Objective:** Allow admins to manage individual dishes and prices.
**Files:**
- Create: `app/admin/items/page.tsx`
- Create: `components/admin/ItemForm.tsx`
**Steps:**
1. Build an item list with category filtering.
2. Implement a comprehensive item form (Name, Price, Desc, Category).
3. Add a "Quick Toggle" for `is_available` status.
4. Commit: `git commit -m "feat: add item management"`

---

## Milestone 4: Polish & Extras

### Task 9: QR Code Generation
**Objective:** Generate a unique URL for the menu.
**Files:**
- Create: `app/admin/qr/page.tsx`
**Steps:**
1. Implement a page that displays the menu URL.
2. Use a library (e.g., `qrcode.react`) to render a downloadable QR code.
3. Commit: `git commit -m "feat: add QR code generator"`

### Task 10: Final UX & PWA Setup
**Objective:** Make the menu feel like a native app.
**Files:**
- Create: `app/manifest.ts`
- Create: `app/icons/`
**Steps:**
1. Configure Web App Manifest for PWA support.
2. Add loading skeletons for the menu fetch.
3. Final accessibility audit.
4. Commit: `git commit -m "feat: finalize PWA and UX"`
