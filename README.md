# Sunny Portfolio Admin Dashboard

A real-time workspace dashboard connecting directly to the **`sunnyportfilo`** Firebase Firestore database. Built for managing to-do lists, client works, compensation & pay details, and webpage ratings/testimonials.

---

## 🚀 Features

### 1. **Works & Pay Details Management**
- **Full Work Info**: Title, Client name, Category (Web Dev, UI/UX, Full-Stack, AI tooling, etc.), Deliverables, Deadlines, and Scope description.
- **Pay Details Breakdown**:
  - Total Contract Pay Amount
  - Payment Statuses: `Paid in Full`, `Pending`, `Partial / Milestone`, `Invoiced`
  - Billable Hourly Rate & Hours Logged
  - Multi-Currency Selector (`$`, `₹`, `€`, `£`)
  - Direct 1-click status updates (`Mark Paid`, `Invoice`)
- **Webpage Links**: Direct links to live project demos and client pages.

### 2. **To-Do Lists & Task Management**
- Filter by `All`, `Pending`, `Urgent`, and `Completed`.
- Categorize by `Work`, `Billing & Pay`, `Client Call`, `Deployment`, `Marketing`.
- Priority flags (`Urgent`, `High`, `Medium`, `Low`).
- Due dates and real-time Firestore sync on completion toggle.

### 3. **Webpage Ratings & Client Reviews**
- Aggregates ratings and feedback quotes from web properties (such as `sunnyportfilo.firebaseapp.com` and client portals).
- Visual star score (1.0 to 5.0) and star distribution breakdown chart.
- Verified client review badge.
- Add and delete rating testimonials.

### 4. **Financials & Earnings Overview**
- Revenue Realization Ratio (Paid vs Pending vs Invoiced).
- Total contract volume and hours tracked.
- Project-level financial breakdown.

### 5. **Direct Firebase Integration (`sunnyportfilo`)**
- Modular Firebase v11 SDK with real-time `onSnapshot` listeners.
- Instant synchronization across all connected browser tabs without manual refresh.
- Pre-seeded with realistic data across all collections:
  - `works`: Project info, pay amounts, pay status, deliverables, ratings.
  - `todos`: Action items, priorities, due dates, categories.
  - `ratings`: Client feedback, webpage sources, star scores, review dates.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Plus Jakarta Sans & JetBrains Mono typography
- **Icons**: Lucide React
- **Database**: Firebase Firestore (`sunnyportfilo`)
- **Hosting Ready**: Firebase Hosting & Vercel

---

## 💻 Running Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## 📦 Building for Production

```bash
npm run build
# The optimized bundle is generated in the dist/ folder ready for Firebase Hosting.
```
