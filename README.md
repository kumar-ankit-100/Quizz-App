# 🎯 CausalFunnel Quiz App

Welcome to the **CausalFunnel Quiz App** – a modern, interactive quiz platform designed to test your knowledge with carefully crafted questions.  
This application was built as part of the **CausalFunnel Software Engineer Intern** position coding assignment.  

It demonstrates **full-stack development skills** using:
- Next.js
- Tailwind CSS
- Redux (state management)
- Clerk (authentication)
- Prisma + Neon (database)
- OpenTDB API (dynamic questions)

The app features a sleek, responsive UI with dark/light mode, resizable panels, animations, and a detailed report system.

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Setup Instructions](#setup-instructions)
5. [Project Structure](#project-structure)
6. [How It Works (Step-by-Step)](#how-it-works-step-by-step)
7. [Judgment Criteria Fulfillment](#judgment-criteria-fulfillment)
8. [Assumptions and Implementation Choices](#assumptions-and-implementation-choices)
9. [Bonus Features](#bonus-features)
10. [Deployment](#deployment)
11. [Challenges and Solutions](#challenges-and-solutions)
12. [Future Improvements](#future-improvements)
13. [Contact](#contact)

---

## 🧠 Overview

This quiz app allows users to take a **15-question trivia quiz** fetched from the OpenTDB API.  
Users start by signing in with **Clerk authentication**, then answer within **30 minutes**.  
After completion, a **detailed report** shows:
- Side-by-side answers (user vs correct)
- Score breakdown with charts (pie + bar)
- Performance analysis

**Hosted on:** Vercel/Netlify → [https://quizz-app-az25.vercel.app](#)  
**Repository:** [github.com/your-username/causalfunnel-quiz-app](#)

### Key Highlights
- 🎲 Dynamic questions (OpenTDB API, shuffled, HTML-decoded)
- 🔐 Secure Authentication (Clerk + social logins)
- 🧩 State Management (Redux)
- 🗄️ Database: Prisma + Neon
- 🎨 UI/UX: Tailwind, Framer Motion, responsive design
- 📊 Report System: Recharts for analytics

---

## 🌟 Features

### 🏁 Start Page
- Beautiful welcome screen with quiz details and instructions
- “Start Quiz” button → redirects to sign-in if unauthenticated

### 🔐 Authentication
- Clerk-based sign-in/signup (email + Google/Facebook/LinkedIn)
- Motivational headlines like “Unlock Your Potential”

### 🧩 Quiz Interface
- Left panel: question, options, mark/clear, next/prev buttons
- Right panel: navigator with question status + submit button
- 30-minute timer with auto-submit
- Mobile menu + resizable divider (40–80% width)

### 📈 Report Page
- Score summary, pie/bar charts, performance feedback
- Side-by-side comparison of answers

### 🗂️ All Quizzes
- Lists past quizzes (sorted by date)
- “View Report” button for details

### 🌗 Theme Toggle
- Light/Dark mode with smooth transitions

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js, React, Tailwind CSS, Framer Motion, Recharts |
| **State Management** | Redux Toolkit |
| **Authentication** | Clerk (email + social logins) |
| **Backend** | Next.js API Routes |
| **Database** | Prisma ORM + Neon PostgreSQL |
| **API Source** | OpenTDB API |
| **Fonts** | Inter, Playfair Display |
| **Deployment** | Vercel/Netlify |
| **Language** | TypeScript |

---

## 🧩 Setup Instructions

### ✅ Prerequisites
- Node.js v18+
- Git
- Clerk + Neon + OpenTDB accounts

### ⚡ Clone & Install
```bash
git clone https://github.com/your-username/causalfunnel-quiz-app.git
cd causalfunnel-quiz-app
npm install
```

### 🧾 Configure Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
DATABASE_URL=postgresql://user:pass@neon-host/db
```

### 🗄️ Setup Prisma
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 🚀 Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 🏗️ Build & Deploy
```bash
npm run build
```
Deploy via **Vercel/Netlify**, add environment variables in dashboard.

---

## 🧱 Project Structure

```bash
src/
├── app/
│   ├── api/quiz/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── quiz/
│       ├── page.tsx
│       └── report/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── QuizLeft.tsx
│   ├── QuizRight.tsx
│   ├── ReportSummary.tsx
│   ├── ReportCharts.tsx
│   ├── ThemeToggle.tsx
│   └── ...
├── features/quiz/quizSlice.ts
├── lib/
│   ├── db.ts
│   └── store.ts
├── providers/
│   ├── ClerkProvider.tsx
│   ├── ReduxProvider.tsx
│   └── ThemeProvider.tsx
└── types/index.ts
```

---

## 🔄 How It Works (Step-by-Step)

### 🏠 Home/Start Page
- Displays welcome message & quiz info
- “Start Quiz” → checks authentication → redirects to `/quiz`

### 🔐 Authentication
- `/sign-in` & `/sign-up` with social logins
- Protected routes using Clerk middleware

### 🧩 Quiz Page
- Fetches 15 questions via `/api/quiz`
- Timer (30 mins) auto-submits
- Mark for review, navigate between questions
- Submits to DB via Prisma

### 📊 Report Page
- Displays score summary, charts, analysis, question review

### 🗂️ All Quizzes Page
- Lists all past quizzes with “View Report”

---

## ✅ Judgment Criteria Fulfillment

- ✔️ Full functionality (auth, timer, navigation, report)
- 🧠 Bug-free and responsive
- 🧩 Modular, reusable TypeScript components
- ♻️ Clean code structure

---

## 🧭 Assumptions & Implementation Choices

- Clerk for secure auth (instead of email-only)
- OpenTDB API for reliable question source
- Prisma + Neon for persistent storage
- Tailwind + Framer Motion for sleek UI

---

## 🏆 Bonus Features

- Responsive across all devices
- Smooth animations
- Dark/light mode
- Resizable panels
- Social logins (Google/Facebook/LinkedIn)
- “All quizzes” list with sorting

---

## ☁️ Deployment

**Platform:** Vercel  
**Steps:**
1. Connect GitHub repo  
2. Add env vars  
3. Deploy 🚀  

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|------------|-----------|
| Hydration mismatch | Added mounted checks |
| API HTML entities | Used `he` for decoding |
| Timer cleanup | Handled via useEffect |
| Auth protection | Clerk middleware |
| DB connection | Prisma retry mechanism |

---

## 🚀 Future Improvements

- Category selection for quizzes
- Leaderboard
- Profile + history
- Real-time timer sync

---

## 📬 Contact

**Developer:** Ankit  
**Email:** kumar.ankitr0321@gmail.com  
**GitHub:** [github.com/ankit/causalfunnel-quiz-app](#)  
**Deployment:** [https://quizz-app-az25.vercel.app/](#)
