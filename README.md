# 🚀 ZendaFund — Hybrid Crowdfunding Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635bff?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **ZendaFund** is a modern, high-performance, and feature-rich hybrid crowdfunding platform. Built using Next.js 15, TypeScript, and MongoDB, it perfectly bridges and satisfies the full requirements of both **Assignment A (Advanced Next.js + TS UI)** and **Assignment B (MERN / Crowdfunding platform with Supporter, Creator, and Admin roles)**.

---

## 🔗 Live Links & Repository Info
*   **Live Web Application:** [ZendaFun](https://zendafun.vercel.app)
*   **GitHub Repository:** [Client-Side](https://github.com/amirulislambd/ZendaFund)
*   **GitHub Repository:** [Server-Side](https://github.com/amirulislambd/ZendaFund-Server)

---

## 🔑 Demo Credentials

Test the role-based dashboard workflows instantly with these pre-configured accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@zendafund.com` | `AdminPass123` |
| **Creator** | `creator@zendafund.com` | `CreatorPass123` |
| **Supporter** | `supporter@zendafund.com` | `SupporterPass123` |

---

## 🎯 Key Features & Highlights (12+ Points)

*   **Unified Next.js Monolith:** Built using the state-of-the-art Next.js 15 App Router and TypeScript, merging frontend interactive layers with API endpoints (`/api/...`) under a unified monolithic repository, ensuring faster response times.
*   **Secure Session Architecture:** Instead of vulnerable local storage tokens, authentication is built using `better-auth` utilizing **secure httpOnly cookies**. This ensures session persistence and robust XSS mitigation on hard page refreshes.
*   **Role-Based Dashboards (RBAC):** Tailored, protected client environments for **Supporter**, **Creator**, and **Admin** roles, fully secured using backend API middleware checks.
*   **Modern Interactive UI (Tailwind v4):** Designed using a premium and persistent Slate/Emerald/Teal aesthetic. Built with interactive Swiper Sliders for the Hero and Testimonial sections without relying on standard filler (Lorem Ipsum) text.
*   **Stripe Credit Purchase System:** Integrated a full checkout experience allowing Supporters to securely buy platform credits ($10 for 100 credits, $25 for 300 credits, etc.) using **Stripe**, which triggers database updates via webhooks.
*   **Business Conversion & Withdrawals:** Automated math checks for platform conversion rates (Supporter buys 10 credits/$1, but Creator withdraws 20 credits/$1). Implemented minimum withdrawals (200 credits limit) and dashboard conversion previews.
*   **Automated Refund Mechanism:** If a Creator deletes an active campaign or rejects a donation, platform credits are automatically refunded to the respective Supporter's wallet balance.
*   **Multi-Channel Notification System:** A real-time database-driven notification collection. Alerts are triggered on major actions (e.g., admin approvals, donation updates, payout success) and are displayed in a floating navbar dropdown.
*   **imgBB Cloud Upload Integration:** Users can instantly upload profile pictures on registration and campaign banners on submission directly to imgBB via standard form actions.
*   **Dynamic Recharts Stats:** Every dashboard includes interactive analytical graphics (Recharts) portraying campaign performance, investment trends, and platform metrics at a glance.
*   **Advanced Search & Category Filters:** The `/explore` page delivers real-time search queries, Category Tabs, deadline sorting mechanisms, and skeleton loaders for an engaging user discovery flow.
*   **Admin Command Center:** Admin features a unified control space to manage global user roles, process pending creator withdrawals, approve/reject newly submitted campaigns, and act on reported items.

---

## ⚙️ Tech Stack

*   **Frontend & Routing:** Next.js 15 (React 19, Server & Client Components)
*   **Styling:** Tailwind CSS v4, Lucide Icons, Swiper Slider
*   **Database:** MongoDB Atlas (via raw client driver with singleton caching)
*   **Authentication:** `better-auth` with MongoDB adapters
*   **Charts & Visuals:** Recharts
*   **Payments & Files:** Stripe SDK & imgBB Client APIs

---

## 🛠️ Installation & Local Setup

### 1. Clone the repository
```bash
git clone [https://github.com/amirulislambd/ZendaFund.git](https://github.com/amirulislambd/ZendaFund.git)
cd ZendaFund

## 🚀 Deployment

The project is pre-configured and optimized for **Vercel** with support for edge runtimes, connection pools, and route optimization. Ensure that you have specified all the relevant `.env` variables inside your Vercel Project Settings prior to launching.
```
---

## ⚖️ License

This project is open-source software licensed under the [MIT License](LICENSE).

---
*Crafted with ❤️ by [Amirul Islam](https://amirulislam.vercel.app).*
