# MeetConnect Frontend 🎯

> React frontend for MeetConnect — A Mock Interview Scheduling Platform built with React, Redux Toolkit and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)

---

## 🌐 Live App
```
https://meet-connect-umber.vercel.app
```

---

## 📸 Pages

| Page | Route | Auth Required |
|---|---|---|
| Login | /login | ❌ |
| Signup | /signup | ❌ |
| About | /about | ❌ |
| Dashboard | / | ✅ |
| My Interviews | /my-interviews | ✅ |
| Practice Resources | /practice | ✅ |
| My Profile | /profile | ✅ |

---

## 📁 Folder Structure
```
meetconnect-client/
├── public/
└── src/
    ├── components/
    │   ├── Header.jsx               # Sticky navbar with user dropdown
    │   ├── Footer.jsx               # Footer with quick links
    │   └── InterviewCard.jsx        # Reusable interview card component
    ├── pages/
    │   ├── Login.jsx                # Login with validation
    │   ├── Signup.jsx               # Register with validation
    │   ├── Dashboard.jsx            # Schedule interview + FAQ + Stats
    │   ├── MyInterviews.jsx         # Upcoming and Completed tabs
    │   ├── PracticeResource.jsx     # Questions + Blog sidebar
    │   ├── MyProfile.jsx            # Profile view and edit
    │   └── About.jsx                # About page
    ├── redux/
    │   ├── store.js                 # Redux store configuration
    │   └── slices/
    │       ├── authSlice.js         # Auth state and actions
    │       ├── interviewSlice.js    # Interview state and actions
    │       └── practiceSlice.js     # Practice state and actions
    ├── routes/
    │   └── ProtectedRoute.jsx       # JWT auth guard for routes
    ├── utils/
    │   ├── api.js                   # Axios instance with interceptors
    │   └── validators.js            # Form validation helpers
    ├── App.jsx                      # Route configuration
    ├── index.css                    # Tailwind base styles
    └── main.jsx                     # App entry point
```

---

## ⚙️ Local Setup

### 1. Install Dependencies
```bash
cd meetconnect-client
npm install
```

### 2. Create `.env` file
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

App runs on:
```
http://localhost:5173
```

---

## 🚀 Deployment on Vercel
```
Root Directory   → meetconnect-client
Framework        → Vite
Build Command    → npm run build
Output Directory → dist
```

### Environment Variables on Vercel
```
VITE_API_URL → https://meet-connect-backend-nz6c.onrender.com/api
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI Framework |
| Redux Toolkit | 2.0.1 | State Management |
| Redux Thunk | 3.1.0 | Async Middleware |
| React Router DOM | 6.21.1 | Client-side Routing |
| Tailwind CSS | 3.4.1 | Styling |
| Axios | 1.6.2 | HTTP Client |
| React Toastify | 9.1.3 | Toast Notifications |
| React Icons | 4.12.0 | Icon Library |
| Vite | 5.0.8 | Build Tool |

---

## ✨ Key Features

- JWT authentication with protected routes
- Schedule mock interviews with expert interviewers
- View upcoming and completed interviews with filtering
- Browse 75+ practice questions across 5 categories with pagination
- Blog sidebar with curated interview prep articles
- Edit personal profile with validation
- Fully responsive across mobile, tablet and desktop
- Toast notifications for all user actions
- Form validation on all input fields

---

## 🔒 Security

- JWT token stored in localStorage
- Token auto-injected on every API request via Axios interceptors
- Auto logout and redirect on token expiry
- Protected routes redirect unauthenticated users to login
- All form inputs validated before API calls

---

## 📱 Responsive Design

Built mobile-first with Tailwind CSS. Hamburger navigation on mobile, full navbar on desktop. All pages adapt to any screen size.

---

## 👥 Author

Built with ❤️ by **Anubhab Dash**
