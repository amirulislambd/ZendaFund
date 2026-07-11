# ZendaFund Roadmap (3.5 Days)

## Goal
Finish a strong, submission-ready crowdfunding platform within 3.5 days by focusing on the most important features first.

---

## Requirement Alignment for Both Assignments
This roadmap is built to satisfy two separate briefs at the same time:

## Architecture and Performance Principles
The project should follow Next.js-first development practices throughout:
- Prefer Server Components whenever the data is fetched or rendered on the server
- Keep client components limited to interactive UI such as forms, sliders, and menus
- Use Next.js built-in image optimization, route handling, and metadata support
- Use lightweight motion effects rather than heavy animation libraries
- Keep the experience smooth on mobile and slower networks
- Ensure the app remains accessible, responsive, and fast across devices

### Recommended usage of Next.js features
- Use the Image component for all campaign and hero images
- Use metadata and SEO-friendly page structure where possible
- Keep layouts modular and route-based
- Use server-safe data loading for public content and dashboards when possible
- Use client components only for interactions that require state or browser APIs

### Motion guideline
- Use subtle motion for hero sections, cards, and transitions
- Avoid overusing animation so the experience stays professional and performant
- If framer-motion is used, keep it light and purposeful

### Assignment A — TypeScript / Next.js UI Project
Requirements to cover:
- Next.js + TypeScript frontend
- Tailwind CSS styling with a maximum of 3 primary colors
- Responsive landing page with meaningful sections
- Explore page with cards, filters, sorting, and skeletons
- Details page with structured content
- Auth pages with validation and demo credentials
- Additional pages such as About and Contact
- Clean UI/UX and professional presentation

### Assignment B — Junior MERN / Crowdfunding Platform
Requirements to cover:
- Crowdfunding platform with Supporter, Creator, and Admin roles
- Campaign discovery, contribution, approval, and management flow
- Creator dashboard with campaign creation and review actions
- Supporter dashboard with contribution tracking and credits
- Admin dashboard for approvals, user management, and withdrawals
- Notifications, role-based access, and secure project structure
- GitHub commit discipline, README quality, and deployment readiness

### Merge Strategy
The project should be implemented so that:
- The frontend satisfies the TypeScript assignment requirements
- The platform logic satisfies the crowdfunding assessment requirements
- The same UI and architecture can support both without conflict

### Requirement Coverage Map
- Public experience: landing page, hero slider, explore page, campaign details
- User experience: login/register, protected pages, role-based navigation
- Business logic: campaign creation, approvals, support contributions, credits, withdrawals
- Submission quality: README, GitHub commits, deployment, demo credentials, environment variables

---

## Day 1 — Foundation + Core UI
### Priority
Set up the project and build the public experience quickly.

### Tasks
- Initialize the Next.js + TypeScript project
- Configure Tailwind CSS and the main color theme
- Build the base layout: navbar, footer, and responsive container
- Create landing page with hero section and 4–5 meaningful sections
- Build the explore campaigns page with campaign cards
- Create campaign details page
- Add loading skeletons for cards and pages
- Structure reusable components so server-rendered sections are separated from client-only interactions
- Start using Next.js Image optimization for visual content

### Deliverable
A working public website with polished UI and campaign browsing.

---

## Day 2 — Authentication + Core Functional Flow
### Priority
Make the platform usable with real user actions.

### Tasks
- Create login and registration pages
- Add validation and basic error handling
- Add demo login buttons for admin, creator, and supporter
- Implement auth persistence across reloads
- Build campaign creation form for creators
- Add contribution form for supporters
- Add basic campaign approval flow concept
- Keep interactive forms in client components while using server components for static or data-driven sections

### Deliverable
Users can sign up, log in, create campaigns, and contribute.

---

## Day 3 — Dashboards + Role-Based Access
### Priority
Complete the main role-based features.

### Tasks
- Build supporter dashboard
- Build creator dashboard
- Build admin dashboard
- Add protected routes based on role
- Add simple filters and search on explore page
- Add basic notifications or status messages
- Keep dashboard data and route-level content server-oriented where possible
- Keep animations subtle and purposeful to preserve performance

### Deliverable
A complete multi-role experience with dashboards and access control.

---

## Day 3.5 — Polish + Submission Ready
### Priority
Make the project look professional and submission-ready.

### Tasks
- Fix responsiveness issues
- Improve spacing, alignment, and card consistency
- Add final content and remove placeholder text
- Test main flows: login, register, create campaign, contribute
- Prepare README with project summary, features, and demo credentials
- Deploy the app and collect the live link
- Review the app for server vs client component separation
- Confirm that Next.js optimizations are being used effectively

### Deliverable
A polished app ready to submit.

---

## Must-Have Features for This Timeline
- Responsive landing page
- Explore page with campaigns
- Campaign details page
- Login and registration
- Creator campaign creation
- Supporter contribution flow
- Role-based dashboards
- Basic admin approval flow
- Clean UI and deployment

---

## Nice-to-Have If Time Allows
- Advanced filters
- Notifications system
- Withdrawal flow
- Payment history
- Better admin management panel

---

## Final Checklist
- [ ] Project setup completed
- [ ] Landing page built
- [ ] Explore and details pages built
- [ ] Authentication completed
- [ ] Creator flow completed
- [ ] Supporter flow completed
- [ ] Dashboards completed
- [ ] Responsive UI checked
- [ ] README prepared
- [ ] App deployed

## GitHub Submission Plan
- Create a GitHub repository for the project
- Add the remote with:

```bash
git remote add origin https://github.com/amirulislambd/ZendaFund.git
```

- Commit in small, meaningful steps
- Push regularly after each completed section
- Keep the repository history clear for submission
