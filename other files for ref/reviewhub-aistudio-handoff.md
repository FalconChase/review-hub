# ReviewHub — AI Studio Handoff Guide
## How to get the best output from the builder prompt

---

## BEFORE YOU START IN AI STUDIO

### Files to upload alongside the prompt
Upload these two HTML files as visual reference when starting your AI Studio session:
- `admin-dashboard.html` ← the admin UI reference
- `user-dashboard.html`  ← the user UI reference

Tell the builder at the top of your session:
> "Use these two HTML files as the exact visual reference for the UI design —
> the colors, layout, sidebar, cards, modals, and theme system.
> Recreate this look and feel in React + Tailwind. Do not invent a new design."

---

## HOW TO RUN THE PROMPT IN AI STUDIO

AI Studio has a context/output limit per response. The full app is too large
to generate in one shot. Use this **session order** to get clean output:

### Step 1 — Paste the full prompt first
Paste the entire `reviewhub-builder-prompt.md` content.
Then say:
> "Acknowledge you understand the full spec. Do not generate any code yet.
> Wait for me to ask for files one group at a time."

### Step 2 — Generate config files first
Ask:
> "Generate these files first:
> package.json, vite.config.js, tailwind.config.js,
> postcss.config.js, index.html"

### Step 3 — Generate context and data
Ask:
> "Now generate:
> src/main.jsx, src/App.jsx, src/index.css,
> src/context/ThemeContext.jsx, src/context/AuthContext.jsx,
> src/data/mockData.js"

### Step 4 — Generate shared components
Ask:
> "Now generate all files in src/components/shared/:
> ThemePicker.jsx, Sidebar.jsx, Topbar.jsx,
> Badge.jsx, StatCard.jsx, Modal.jsx, Toast.jsx"

### Step 5 — Generate layouts
Ask:
> "Now generate:
> src/layouts/AdminLayout.jsx
> src/layouts/UserLayout.jsx"

### Step 6 — Generate admin components
Ask:
> "Now generate all files in src/components/admin/:
> AdminSidebar.jsx, ProductTable.jsx, UserList.jsx,
> ActivityLog.jsx, QuickActions.jsx,
> AddProductModal.jsx, AddUserModal.jsx, GrantAccessModal.jsx"

### Step 7 — Generate user components
Ask:
> "Now generate all files in src/components/user/:
> UserSidebar.jsx, HeroBanner.jsx, ProductCard.jsx,
> ScoreHistory.jsx, StreakTracker.jsx, UpNext.jsx, QuizModal.jsx"

### Step 8 — Generate public pages
Ask:
> "Now generate the public pages:
> src/pages/Landing.jsx, src/pages/Login.jsx,
> src/pages/Signup.jsx, src/pages/ForgotPassword.jsx,
> src/routes/AdminRoute.jsx, src/routes/UserRoute.jsx"

### Step 9 — Generate admin pages
Ask:
> "Now generate all admin pages in src/pages/admin/:
> AdminDashboard.jsx, Products.jsx, Users.jsx,
> AccessLicenses.jsx, ModulesContent.jsx, Analytics.jsx, Settings.jsx"

### Step 10 — Generate user pages
Ask:
> "Now generate all user pages in src/pages/user/:
> UserDashboard.jsx, MyScores.jsx, Progress.jsx, ProductDetail.jsx"

---

## WHAT TO CHECK AFTER GENERATION

Before running `npm run dev`, do a quick scan for these common AI builder mistakes:

| Check | What to look for |
|---|---|
| No TypeScript | Files should be `.jsx` not `.tsx`. No `interface`, `type`, `: string` annotations. |
| No hardcoded colors | Brand colors should use `var(--brand)` not `#4f87d4` directly |
| No Firebase imports | Search the project for `firebase` — should return zero results |
| Router is v6 | `<Routes>` and `<Route element={}>` syntax (not `<Switch>` which is v5) |
| Mock login works | Login page has two demo buttons that redirect correctly |
| Locked products | User sidebar shows locked products greyed out (not hidden) |
| Theme is separate | Admin and user theme keys are different in ThemeContext or localStorage |

---

## HOW TO RUN THE PROJECT

```bash
# Inside the generated folder
npm install
npm run dev
```

Open `http://localhost:5173` — you should land on the Landing page.

Click **Login** → use the demo buttons to log in as Admin or User.

---

## WHAT NOT TO TOUCH (save for Firebase phase)

These are intentionally left as mock/placeholder — do not ask the builder to implement them:

- `login()` function in AuthContext — currently sets a hardcoded user object
- `logout()` function — currently just clears state
- All form submissions (Add Product, Add User, Grant Access) — currently show a toast only
- Score saving after quiz — currently not persisted anywhere
- User signup — currently shows a success message without creating anything

All of these will be replaced with real Firebase calls when you return
to continue development.

---

## WHEN YOU COME BACK FOR THE FIREBASE PHASE

Bring back:
1. The generated folder structure (or a zip of the project)
2. A list of anything the builder did differently from the prompt
3. Your Firebase project name (you'll create it at console.firebase.google.com)

The Firebase integration order will be:
1. Firebase project setup + config file
2. Firebase Auth (replace mock login/signup/forgot password)
3. Firestore collections (Users, Products, Modules, AccessLicenses, Scores)
4. Access control (Firestore rules + route guards using real roles)
5. Quiz score saving to Firestore
6. Admin CRUD operations (add/edit products, grant access)
7. Real-time updates (activity log, user counts)
8. Firebase Storage (for product thumbnails or content files, if needed)

---

## FOLDER STRUCTURE REMINDER

```
reviewhub/
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── UserLayout.jsx
│   ├── components/
│   │   ├── shared/        (7 files)
│   │   ├── admin/         (8 files)
│   │   └── user/          (7 files)
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── admin/         (7 files)
│   │   └── user/          (4 files)
│   └── routes/
│       ├── AdminRoute.jsx
│       └── UserRoute.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

Total: ~40 files. All generated, all runnable, no backend.

---

*Next phase: Firebase backend integration — return here with the generated project.*
