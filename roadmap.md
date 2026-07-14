# ZendaFund — Full Implementation Plan & Master Task List

## Requirement Alignment for Both Assignments
This roadmap is built to satisfy two separate briefs at the same time:
- **Assignment A — TypeScript / Next.js UI Project:** Responsive landing page, explore page, details page, auth, clean UI.
- **Assignment B — Junior MERN / Crowdfunding Platform:** Supporter, Creator, and Admin roles, campaign discovery, contribution, approval, management flow, dashboards.

## Architecture and Performance Principles
- Prefer Server Components whenever the data is fetched or rendered on the server
- Keep client components limited to interactive UI such as forms, sliders, and menus
- Use Next.js built-in image optimization, route handling, and metadata support
- Use subtle motion for hero sections, cards, and transitions
- Keep the experience smooth on mobile and slower networks

---

## 🔗 Combined Requirement Coverage

| Assignment A চাহিদা | Assignment B চাহিদা | ZendaFund Solution |
|---------------------|---------------------|-------------------|
| Next.js + TypeScript | MERN Stack | Next.js + TypeScript + MongoDB |
| Tailwind CSS (≤3 colors) | Any CSS | Tailwind v4, Emerald/Slate/Teal |
| Responsive Landing (7+ sections) | Engaging Homepage | 8 sections with animation |
| Explore page (filter, sort, search) | Campaign Discovery | `/explore` with full filters |
| Details page | Campaign Details + Contribute | `/campaign/[id]` |
| Auth (login, register, validation) | 3-role auth + JWT | better-auth + MongoDB (httpOnly cookie session) |
| Dashboard | 3-role dashboards | `/dashboard/[role]/...` |
| Protected routes | Role-based access | Middleware + session |
| Protected `/items/add` | Add New Campaign | Creator → `/dashboard/creator/add-campaign` |
| Protected `/items/manage` | My Campaigns + Manage Campaigns | Creator + Admin tables |
| About + Contact pages | — | `/about` + `/contact` |
| Recharts / Chart.js (dashboard stats) | Dashboard stats cards | Recharts in role dashboards |
| Skeleton loaders | — | All listing pages |
| 4 cards per row (desktop) | Campaign cards | Explore + Home grids |
| Demo credentials | Demo login buttons | Admin/Creator/Supporter buttons |
| Navbar: 3+ routes (logged out), 5+ (logged in) | Navbar spec | Dynamic navbar via `useSession` |
| README (10+ bullets) | README | Single comprehensive README |
| Live deployment | Vercel deployment | Vercel |
| — | 20 client commits | Tracked in Git |
| — | 12 server commits | `src/app/api/` commits |
| — | Notification system | `/api/notifications` + bell icon |
| — | Stripe payment | Credit purchase + Withdrawal |
| — | imgBB image upload | Registration + Campaign form |
| — | Pagination | My Contributions page |
| — | Env variables | `.env.local` properly |
| — | localStorage access-token | better-auth cookie session (secure alternative) |

---

## 📦 PHASE 0 — Dependencies & Setup

- [x] Next.js 16 + TypeScript project initialized
- [x] Tailwind CSS v4 configured
- [x] Swiper installed
- [x] MongoDB URI in `.env`
- [x] better-auth credentials in `.env`
- [x] Google OAuth credentials in `.env`
- [x] Install remaining dependencies:
  - [x] `better-auth` package
  - [x] `mongodb` driver
  - [ ] `stripe` + `@stripe/stripe-js`
  - [ ] `axios`
  - [x] `lucide-react`
  - [ ] `react-hot-toast`
  - [ ] `framer-motion`
- [x] Fix `.env` format (MongoDB URI malformed)
- [ ] Create `.env.local` with all keys properly
- [ ] Add Stripe test keys to `.env.local`
- [ ] Add imgBB API key to `.env.local`

---

## 🗄️ PHASE 1 — Database & Auth Backend

- [ ] `src/lib/mongodb.ts` — connection singleton
- [x] Type Definitions: `Campaign`, `User` interfaces
- [ ] Type Definitions: `Contribution`, `Notification`, `Withdrawal`, `Payment` interfaces
- [x] `src/lib/auth.ts` — better-auth config with MongoDB adapter & Google OAuth
- [x] `src/lib/auth-client.ts` — single auth client + `inferAdditionalFields` plugin
- [x] `customSession` plugin — expose `role`, `credits`, `profilePic` in session
- [x] `src/app/api/auth/[...all]/route.ts` — auth handler
- [x] Email + Password registration & login (better-auth)
- [ ] Middleware: `src/middleware.ts` — protect `/dashboard/*` routes

---

## 🏠 PHASE 2 — Home Page (7+ Sections)

- [x] Section 1: HeroSection — Swiper slider (3 slides, animation ✅)
- [ ] Section 2: Top Funded Campaigns (top 6 by `raisedAmount`)
- [ ] Section 3: How It Works — 3-step visual flow
- [ ] Section 4: Explore by Category — category grid with icons
- [ ] Section 5: Platform Impact (Stats) — animated counters
- [ ] Section 6: Testimonials — Swiper slider (static, 4–5 testimonials)
- [ ] Section 7: Call to Action (CTA)
- [ ] Section 8: Newsletter signup (bonus)
- [ ] Add `framer-motion` entrance animations on scroll

---

## 🧭 PHASE 3 — Navbar & Footer

### Navbar
- [x] Logo + ZendaFund name & Basic nav links
- [x] Connect to auth state (logged-in vs logged-out) via `useSession`
- [x] **Logged-out view:** Home, Explore, Login, Register, Join as Developer (5 routes)
- [x] **Logged-in view:** Home, Explore, Dashboard, Credits badge, Profile dropdown, Join as Developer, Sign Out (6+ routes)
- [x] Profile dropdown shows: name, email, role badge, Dashboard link, Sign Out button
- [x] Role-based dashboard link (`/dashboard/supporter|creator|admin`)
- [x] Avatar from `profilePic` or Google `image`
- [x] Fully responsive mobile menu (hamburger)

### Footer
- [x] Basic footer exists
- [ ] Add social links (LinkedIn, GitHub, Facebook)
- [ ] Working links only

---

## 🔍 PHASE 4 — Explore & Campaign Details Pages

### Explore Page (`/explore`)
- [x] Basic card grid exists
- [x] Connect to real DB data (approved campaigns)
- [x] Make search & category filter functional
- [ ] Add sort: by deadline / by amount raised / by newest
- [ ] Add skeleton loader while data loads
- [ ] Show progress bar on each card
- [ ] Desktop: 4 cards per row (uniform card size)
- [ ] Implement pagination (or infinite scroll)

### Campaign Details Page (`/campaign/[id]`)
- [x] Show all campaign fields (image, title, goal, raised, etc.)
- [x] Contribution form (only for logged-in Supporters)
- [x] Save contribution: date, amount, status "pending", deduct credits
- [ ] Deadline countdown timer
- [ ] Related campaigns section (same category)

---

## 🔐 PHASE 5 — Auth Pages

### Login Page (`/login`)
- [x] Login page created at `/login`
- [x] Email + Password form
- [x] Google Sign-In button
- [x] Demo login buttons (Admin / Creator / Supporter auto-fill)
- [x] Validation & Error handling
- [ ] Redirect to `/dashboard` after login (currently redirects to `/`)

### Register Page (`/register`)
- [x] Register page created at `/register`
- [x] Name, Email, Profile Picture upload field
- [x] Password + Confirm Password (with validation)
- [x] Role dropdown (Supporter / Creator)
- [x] Google Sign-Up button
- [x] On success → assigns default credits & redirects
- [ ] imgBB actual upload integration

---

## 📊 PHASE 6 — Dashboard Layout

- [ ] Sidebar: Logo, Credits, User avatar, Role, Username, Notification bell, Navigation links
- [ ] Mobile-responsive sidebar (collapsible)
- [ ] Persist auth after reload on private route (better-auth cookie session)
- [ ] Install `recharts` for dashboard stat charts (Assignment A requirement)

---

## 👤 PHASE 7 — Supporter Dashboard

- [ ] **Home:** Stats (Total contributions, pending, approved amount) + Approved Contributions Table
- [ ] **Explore Campaigns:** Campaign cards with View Details button
- [ ] **My Contributions:** Table + Pagination
- [ ] **Purchase Credit:** Stripe credit packages (100 credits = $10, etc.)
- [ ] **Payment History:** Table of all payments

---

## 🎨 PHASE 8 — Creator Dashboard

- [ ] **Home:** Stats (Total campaigns, active, raised) + Contributions to Review (Approve/Reject logic)
- [ ] **Add New Campaign:** Form fields + imgBB upload (status "pending")
- [ ] **My Campaigns:** Table + Update/Delete logic (refund approved supporters on delete)
- [ ] **Withdrawals:** Conversion logic (20 credits = $1), min 200 credits, Payment system dropdown
- [ ] **Payment History:** Table of withdrawal requests

---

## 🛡️ PHASE 9 — Admin Dashboard

- [ ] **Home:** Platform stats (Supporters, Creators, Total Credits, Total Payments)
- [ ] **Campaign Approvals:** Pending campaigns → Approve/Reject logic
- [ ] **Withdrawal Requests:** Pending withdrawals → Payment Success logic
- [ ] **Manage Users:** Table + Update Role + Remove User
- [ ] **Manage Campaigns:** Table + Delete Campaign
- [ ] **Reports:** Reported campaigns → Suspend/Delete logic

---

## 🌐 PHASE 10 — API Routes (12+ Server Commits)

- [ ] `GET/POST /api/campaigns`
- [ ] `GET/PATCH/DELETE /api/campaigns/[id]`
- [ ] `GET/POST /api/contributions`
- [ ] `PATCH /api/contributions/[id]`
- [ ] `GET /api/users` & `PATCH/DELETE /api/users/[id]`
- [ ] `GET/POST /api/withdrawals` & `PATCH /api/withdrawals/[id]`
- [ ] `GET/POST /api/notifications`
- [ ] `GET/POST /api/payments`
- [ ] `POST /api/stripe/create-checkout` & `POST /api/stripe/webhook`
- [ ] `GET/POST /api/reports`

---

## 🔔 PHASE 11 — Notification System

- [ ] Notifications collection schema (message, toEmail, actionRoute, time, read)
- [ ] Triggers: Approve/Reject Contribution, Approve/Reject Campaign, Approve Withdrawal, New Contribution
- [ ] Navbar: Notification bell icon + Floating pop-up

---

## 💳 PHASE 12 — Stripe Payment & 🖼️ PHASE 13 — imgBB

- [ ] Implement Stripe checkout session for credits
- [ ] Implement imgBB upload on Registration & Add Campaign

---

## 📄 PHASE 14 — Additional Pages & 📱 PHASE 15 — Responsive Polish

- [ ] About Page & Contact Page
- [ ] Mobile menu, responsive tables, consistent card sizes

---

## 📝 PHASE 16 — README, Submission & 🚀 Deployment

- [ ] Finalize README with 10+ bullet points, credentials, and live URL
- [ ] Test all flows on live site (Vercel)
- [ ] Ensure 20+ Client Commits and 12+ Server Commits are tracked

---

## ⚠️ Requirement Notes & Fixes

| Topic | Requirement | ZendaFund Approach |
|-------|-------------|-------------------|
| Auth token storage | Crowdfunding brief asks for localStorage token | better-auth uses secure httpOnly cookies — satisfies "persist after reload" without XSS risk |
| `/items/add` & `/items/manage` | TypeScript brief protected pages | Mapped to Creator dashboard: Add Campaign + My Campaigns; Admin gets Manage Campaigns |
| Login redirect | Both briefs → Dashboard after login | Update `callbackURL` to `/dashboard/[role]` in LoginForm & RegisterForm |
| Navbar session fields | Show credits, role, avatar | Fixed: single `authClient` + `customSession` + `inferAdditionalFields` |
| Role casing | DB may store `Supporter` / `supporter` | Normalize with `toLowerCase()` in `getDashboardPath()` |
| Charts | Recharts / Chart.js in TypeScript brief | Add Recharts to dashboard home stats (Phase 6–9) |

---

## ✅ Daily Progress Summary

| Day | Focus | Status |
|-----|-------|--------|
| Day 1 | Phase 0 + Phase 1 + Phase 2 + Phase 3 | ⬜ In Progress |
| Day 2 | Phase 4 + Phase 5 + Phase 6 + Phase 7 | ⬜ Not Started |
| Day 3 | Phase 8 + Phase 9 + Phase 10 + Phase 11 | ⬜ Not Started |
| Day 3.5 | Phase 12–17 (Polish + Deploy) | ⬜ Not Started |

---
## GitHub Submission Plan
- Create a GitHub repository for the project
- Add the remote with:
```bash
git remote add origin https://github.com/amirulislambd/ZendaFund.git
```
- Commit in small, meaningful steps
- Push regularly after each completed section
