# ReviewHub — AI Builder Prompt
## App Skeleton Generation Guide for Google AI Studio

---

## YOUR ROLE

You are a senior frontend developer. Your job is to scaffold the **complete folder structure and all page/component code** for a web application called **ReviewHub** — an academic reviewer and quiz platform.

You will build the **frontend skeleton only**. Do NOT implement any backend, authentication logic, database calls, API keys, or Firebase integration. All data should come from **mock/placeholder data** defined in a local file. The backend will be wired in separately later.

---

## TECH STACK (STRICT — DO NOT DEVIATE)

| Layer | Technology |
|---|---|
| Framework | **React 18 + Vite** |
| Language | **JavaScript (JSX)** — no TypeScript |
| Styling | **Tailwind CSS v3** |
| Routing | **React Router v6** |
| State | **React useState / useContext only** — no Redux, no Zustand |
| Icons | **Lucide React** |
| Mock data | Local JS file (`src/data/mockData.js`) |
| No backend | No Firebase, no API calls, no .env files |

---

## DESIGN SYSTEM

The app has a **friendly, academic** aesthetic. Follow these rules exactly:

### Fonts
Import from Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Lora:wght@500;600&display=swap" rel="stylesheet"/>
```
- **Headings / brand names**: `font-family: 'Lora', serif`
- **All other text**: `font-family: 'Nunito', sans-serif`

Set these as Tailwind custom fonts in `tailwind.config.js`:
```js
fontFamily: {
  sans: ['Nunito', 'sans-serif'],
  serif: ['Lora', 'serif'],
}
```

### Theme System (CSS Variables + Tailwind)
The app supports **5 color presets** and a **dark mode**. Store the active theme in a React Context (`ThemeContext`). Apply the theme by setting a `data-theme` attribute on `<body>` and reading CSS variables.

Define these CSS variables in `src/index.css`:

```css
:root {
  --brand: hsl(215, 72%, 52%);
  --brand-soft: hsl(215, 72%, 96%);
  --brand-mid: hsl(215, 60%, 42%);
  --bg: #f5f6fa;
  --surface: #ffffff;
  --surface2: #f0f2f8;
  --border: rgba(0,0,0,0.08);
  --text: #1a1d2e;
  --text2: #5a6070;
  --text3: #9099ae;
}

[data-theme="forest"] { --brand: hsl(150,60%,38%); --brand-soft: hsl(150,60%,96%); --brand-mid: hsl(150,55%,28%); }
[data-theme="sunset"] { --brand: hsl(22,90%,52%);  --brand-soft: hsl(22,90%,96%);  --brand-mid: hsl(22,80%,40%); }
[data-theme="rose"]   { --brand: hsl(345,72%,52%); --brand-soft: hsl(345,72%,96%); --brand-mid: hsl(345,60%,42%); }
[data-theme="violet"] { --brand: hsl(265,65%,55%); --brand-soft: hsl(265,65%,96%); --brand-mid: hsl(265,55%,42%); }

[data-theme="dark"] {
  --bg: #12131a; --surface: #1c1e2a; --surface2: #252838;
  --border: rgba(255,255,255,0.08); --text: #e8eaf2;
  --text2: #9099ae; --text3: #5a6070;
}
```

The ThemeContext should expose: `{ theme, setTheme, isDark, toggleDark }`.

**Important:** Admin and User store their theme preferences **separately** (two different context state keys or localStorage keys: `adminTheme` and `userTheme`). Admin changing their theme does NOT affect what the user sees.

---

## FOLDER STRUCTURE

Generate exactly this structure:

```
reviewhub/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   ├── ThemeContext.jsx         ← theme state (preset + dark mode)
│   │   └── AuthContext.jsx          ← mock auth state (currentUser, role)
│   ├── data/
│   │   └── mockData.js              ← ALL placeholder data lives here
│   ├── layouts/
│   │   ├── AdminLayout.jsx          ← sidebar + topbar wrapper for admin pages
│   │   └── UserLayout.jsx           ← sidebar + topbar wrapper for user pages
│   ├── components/
│   │   ├── shared/
│   │   │   ├── ThemePicker.jsx      ← color swatch + dark mode toggle panel
│   │   │   ├── Sidebar.jsx          ← base sidebar shell (used by both layouts)
│   │   │   ├── Topbar.jsx           ← base topbar shell
│   │   │   ├── Badge.jsx            ← status badge component
│   │   │   ├── StatCard.jsx         ← metric summary card
│   │   │   ├── Modal.jsx            ← reusable modal wrapper
│   │   │   └── Toast.jsx            ← notification toast
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx     ← admin-specific nav links
│   │   │   ├── ProductTable.jsx     ← products list with edit/access actions
│   │   │   ├── UserList.jsx         ← recent users widget
│   │   │   ├── ActivityLog.jsx      ← recent activity feed
│   │   │   ├── QuickActions.jsx     ← 4-button quick action grid
│   │   │   ├── AddProductModal.jsx  ← form modal to add a product
│   │   │   ├── AddUserModal.jsx     ← form modal to add a user
│   │   │   └── GrantAccessModal.jsx ← modal to assign products to a user
│   │   └── user/
│   │       ├── UserSidebar.jsx      ← user nav with their products listed
│   │       ├── HeroBanner.jsx       ← personalized greeting + hero stats
│   │       ├── ProductCard.jsx      ← product card with progress bar + modules
│   │       ├── ScoreHistory.jsx     ← recent quiz scores table
│   │       ├── StreakTracker.jsx    ← 7-day study streak widget
│   │       ├── UpNext.jsx           ← upcoming modules list
│   │       └── QuizModal.jsx        ← full quiz flow (question → result screen)
│   ├── pages/
│   │   ├── Landing.jsx              ← public landing/marketing page
│   │   ├── Login.jsx                ← login form page
│   │   ├── Signup.jsx               ← signup form page
│   │   ├── ForgotPassword.jsx       ← forgot password page
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx   ← main overview with stats
│   │   │   ├── Products.jsx         ← full products management page
│   │   │   ├── Users.jsx            ← full user management page
│   │   │   ├── AccessLicenses.jsx   ← access/license overview page
│   │   │   ├── ModulesContent.jsx   ← modules and content management
│   │   │   ├── Analytics.jsx        ← usage analytics page
│   │   │   └── Settings.jsx         ← admin settings page
│   │   └── user/
│   │       ├── UserDashboard.jsx    ← user home with hero + products
│   │       ├── MyScores.jsx         ← full score history page
│   │       ├── Progress.jsx         ← progress tracking page
│   │       └── ProductDetail.jsx    ← single product: module list + quiz entry
│   └── routes/
│       ├── AdminRoute.jsx           ← route guard: redirects if not admin
│       └── UserRoute.jsx            ← route guard: redirects if not logged in
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ROUTING MAP

Configure routes in `App.jsx` using React Router v6:

```
/                     → Landing.jsx          (public)
/login                → Login.jsx            (public)
/signup               → Signup.jsx           (public)
/forgot-password      → ForgotPassword.jsx   (public)

/admin                → redirect to /admin/dashboard
/admin/dashboard      → AdminDashboard.jsx   (wrapped in AdminLayout, guarded by AdminRoute)
/admin/products       → Products.jsx
/admin/users          → Users.jsx
/admin/access         → AccessLicenses.jsx
/admin/modules        → ModulesContent.jsx
/admin/analytics      → Analytics.jsx
/admin/settings       → Settings.jsx

/dashboard            → UserDashboard.jsx    (wrapped in UserLayout, guarded by UserRoute)
/dashboard/scores     → MyScores.jsx
/dashboard/progress   → Progress.jsx
/dashboard/product/:id → ProductDetail.jsx
```

---

## MOCK AUTH SYSTEM

In `AuthContext.jsx`, create a mock auth context with:

```js
// Two mock users — switch between them for testing
const mockUsers = {
  admin: {
    uid: 'admin-001',
    name: 'Admin',
    email: 'admin@reviewhub.com',
    role: 'admin',
    avatar: 'A',
  },
  user: {
    uid: 'user-001',
    name: 'Maria Reyes',
    email: 'maria@email.com',
    role: 'user',
    avatar: 'MR',
    activeProducts: ['prod-001', 'prod-002', 'prod-003'],
  },
};
```

Expose: `{ currentUser, role, login, logout }`.

The `login()` function should accept a role string (`'admin'` or `'user'`) and set the mock user accordingly — **no real password check**. This will be replaced by Firebase Auth later.

On the Login page, include two visible "demo login" buttons:
- **"Login as Admin"** → sets role to admin → redirects to `/admin/dashboard`
- **"Login as User"** → sets role to user → redirects to `/dashboard`

Route guards (`AdminRoute`, `UserRoute`) should redirect to `/login` if no user is set.

---

## MOCK DATA FILE

In `src/data/mockData.js`, export the following:

```js
export const products = [
  { id: 'prod-001', name: 'NLE Reviewer Pro', category: 'Licensure', exam: 'Nursing Licensure Exam', icon: '📋', iconBg: '#eff6ff', status: 'active', userCount: 12, moduleCount: 8, description: 'Comprehensive review covering all NLE subjects.' },
  { id: 'prod-002', name: 'Bar Exam Drills', category: 'Licensure', exam: 'Philippine Bar Examination', icon: '⚖️', iconBg: '#f0fdf4', status: 'active', userCount: 8, moduleCount: 6, description: 'Bar exam-style questions across all law subjects.' },
  { id: 'prod-003', name: 'Gen. Knowledge Hub', category: 'General', exam: 'Mixed Topics', icon: '🧠', iconBg: '#fdf4ff', status: 'active', userCount: 15, moduleCount: 6, description: 'Wide-ranging questions for general aptitude prep.' },
  { id: 'prod-004', name: 'Civil Engineering Quiz', category: 'Licensure', exam: 'Board Exam Series', icon: '🏗️', iconBg: '#fefce8', status: 'active', userCount: 6, moduleCount: 10, description: 'Full-coverage board exam drills for civil engineers.' },
  { id: 'prod-005', name: 'IT Certification Prep', category: 'Certification', exam: 'CompTIA, AWS, Cisco', icon: '🖥️', iconBg: '#fff7ed', status: 'draft', userCount: 9, moduleCount: 12, description: 'Prep for major IT certification exams.' },
];

export const modules = {
  'prod-001': [
    { id: 'm1', name: 'Fundamentals of Nursing', questionCount: 30, status: 'done' },
    { id: 'm2', name: 'Medical-Surgical Nursing', questionCount: 35, status: 'done' },
    { id: 'm3', name: 'OB Nursing', questionCount: 28, status: 'done' },
    { id: 'm4', name: 'Pediatric Nursing (Part 1)', questionCount: 25, status: 'done' },
    { id: 'm5', name: 'Pediatric Nursing (Part 2)', questionCount: 25, status: 'current' },
    { id: 'm6', name: 'Community Health Nursing', questionCount: 30, status: 'pending' },
    { id: 'm7', name: 'Psychiatric Nursing', questionCount: 28, status: 'pending' },
    { id: 'm8', name: 'Mock Board Exam', questionCount: 100, status: 'pending' },
  ],
  // Add similar module arrays for prod-002 and prod-003
};

export const sampleQuestions = [
  {
    id: 'q1',
    productId: 'prod-001',
    moduleId: 'm5',
    question: 'A 4-year-old child is admitted with epiglottitis. Which position is most appropriate?',
    options: ['Supine', 'Trendelenburg', 'Sitting upright (tripod position)', 'Side-lying'],
    answer: 2,
    explanation: 'Sitting upright reduces airway obstruction and eases breathing in epiglottitis.',
  },
  {
    id: 'q2',
    productId: 'prod-001',
    moduleId: 'm5',
    question: 'Which vaccine is given at birth to prevent tuberculosis?',
    options: ['OPV', 'MMR', 'BCG', 'Hepatitis B'],
    answer: 2,
    explanation: 'BCG is given at birth or as early as possible to protect against tuberculosis.',
  },
  // Add at least 5 questions total
];

export const users = [
  { uid: 'user-001', name: 'Maria Reyes', email: 'maria@email.com', avatar: 'MR', avatarColor: '#4f87d4', joinedDaysAgo: 2, status: 'active', activeProducts: ['prod-001', 'prod-002', 'prod-003'] },
  { uid: 'user-002', name: 'Juan Santos', email: 'juan@email.com', avatar: 'JS', avatarColor: '#22c55e', joinedDaysAgo: 4, status: 'active', activeProducts: ['prod-001'] },
  { uid: 'user-003', name: 'Ana Lim', email: 'ana@email.com', avatar: 'AL', avatarColor: '#f59e0b', joinedDaysAgo: 7, status: 'pending', activeProducts: [] },
  { uid: 'user-004', name: 'Rico Cruz', email: 'rico@email.com', avatar: 'RC', avatarColor: '#14b8a6', joinedDaysAgo: 14, status: 'active', activeProducts: ['prod-001', 'prod-003'] },
];

export const scores = [
  { id: 's1', userId: 'user-001', productId: 'prod-001', moduleId: 'm4', score: 89, total: 100, passed: true, date: 'Today' },
  { id: 's2', userId: 'user-001', productId: 'prod-003', moduleId: 'm5', score: 92, total: 100, passed: true, date: 'Yesterday' },
  { id: 's3', userId: 'user-001', productId: 'prod-002', moduleId: 'm2', score: 76, total: 100, passed: false, date: '3 days ago' },
  { id: 's4', userId: 'user-001', productId: 'prod-001', moduleId: 'm3', score: 84, total: 100, passed: true, date: '5 days ago' },
];

export const activityLog = [
  { id: 'a1', type: 'access_granted', message: 'Access granted to Maria Reyes for NLE Reviewer Pro', time: '2 minutes ago', dotColor: '#22c55e' },
  { id: 'a2', type: 'product_added', message: 'New product IT Certification Prep added — saved as draft', time: '1 hour ago', dotColor: '#4f87d4' },
  { id: 'a3', type: 'user_registered', message: 'New user Ana Lim registered — awaiting access assignment', time: '3 hours ago', dotColor: '#f59e0b' },
  { id: 'a4', type: 'quiz_completed', message: 'Juan Santos completed NLE Reviewer Pro — Module 3 with 94%', time: '5 hours ago', dotColor: '#14b8a6' },
  { id: 'a5', type: 'license_expiring', message: 'License for Rico Cruz expires in 7 days — consider renewal', time: 'Yesterday', dotColor: '#ef4444' },
];

export const userProgress = {
  'user-001': {
    streak: 7,
    totalModulesCompleted: 34,
    studyHoursThisMonth: 14,
    overallProgress: 68,
    bestScore: 92,
    productProgress: {
      'prod-001': { progress: 68, bestScore: 89, attempts: 4 },
      'prod-002': { progress: 32, bestScore: 76, attempts: 2 },
      'prod-003': { progress: 85, bestScore: 92, attempts: 6 },
    },
  },
};

export const adminStats = {
  totalProducts: 7,
  totalUsers: 24,
  licensesGranted: 41,
  avgPassRate: 89,
};
```

---

## PAGE-BY-PAGE SPECIFICATIONS

### PUBLIC PAGES

#### `Landing.jsx`
- Full marketing/hero page
- Sections: Hero (headline + CTA buttons), Features (3 cards: Licensure, Academic, Certification), How it Works (3 steps), Footer
- CTA buttons: "Get Started" → `/signup`, "Log In" → `/login`
- Use the brand color (`var(--brand)`) as the hero background
- Include the logo mark (square with "R" using Lora font)
- **Do NOT include pricing** — admin grants access manually

#### `Login.jsx`
- Centered card layout
- Fields: Email, Password
- Links: "Forgot password?" → `/forgot-password`, "Sign up" → `/signup`
- Two demo shortcut buttons clearly labeled:
  - `[Login as Admin →]` — fills mock credentials and logs in as admin
  - [Login as User →]` — fills mock credentials and logs in as user
- Show a small note: "Demo mode — backend not connected"

#### `Signup.jsx`
- Fields: First Name, Last Name, Email, Password, Confirm Password
- Link back to `/login`
- On submit: show a success message (no real account creation yet)

#### `ForgotPassword.jsx`
- Single email field
- On submit: show "If this email is registered, a reset link has been sent." (no real email)

---

### ADMIN PAGES (all wrapped in `AdminLayout`)

#### `AdminDashboard.jsx`
- 4 stat cards: Total Products, Total Users, Licenses Granted, Avg. Pass Rate (data from `adminStats`)
- Products table (`ProductTable` component) — shows all products from `mockData`
- Quick Actions grid (`QuickActions` component) — 4 buttons: New Product, Add User, Grant Access, View Reports
- Recent Users widget (`UserList` component)
- Activity Log (`ActivityLog` component)
- All modals: `AddProductModal`, `AddUserModal`, `GrantAccessModal`

#### `Products.jsx`
- Full-page products table with search input
- Columns: Icon, Name, Category, Module Count, User Count, Status, Actions
- Actions per row: Edit (opens `AddProductModal` pre-filled), Grant Access, Archive
- "Add Product" button at top right

#### `Users.jsx`
- Full-page user table with search input
- Columns: Avatar, Name, Email, Status, Products Assigned, Joined, Actions
- Actions: Grant Access, Edit, Deactivate
- "Add User" button at top right

#### `AccessLicenses.jsx`
- Table showing which user has access to which product
- Columns: User, Product, Access Start, Expiry, Status, Revoke button
- "Grant New Access" button

#### `ModulesContent.jsx`
- Left panel: product list selector
- Right panel: module list for selected product
- Each module row shows: name, question count, status badge
- "Add Module" button (opens a simple modal with Name + Question Count fields)

#### `Analytics.jsx`
- Summary stat cards: Total Quiz Attempts, Avg. Score, Pass Rate, Active This Week
- Score distribution table (mock data, no chart library needed — use CSS progress bars)
- Per-product breakdown table

#### `Settings.jsx`
- Platform name field (pre-filled: "ReviewHub")
- Admin email field
- Theme section (links to ThemePicker)
- Placeholder sections for future: Email Notifications, Backup

---

### USER PAGES (all wrapped in `UserLayout`)

#### `UserDashboard.jsx`
- Hero banner (`HeroBanner` component) — personalized greeting, 3 hero stats (Overall Progress, Best Score, Streak)
- 3 stat cards: Active Products, Modules Completed, Study Time This Month
- Products grid (`ProductCard` component × active products only)
- Score history section (`ScoreHistory` component)
- Streak tracker (`StreakTracker` component)
- Up Next widget (`UpNext` component)

#### `MyScores.jsx`
- Full score history table
- Columns: Product, Module, Score, Result (Passed/Review badge), Date
- Filter buttons: All, Passed, Review

#### `Progress.jsx`
- Per-product progress bars
- Streak calendar (last 30 days)
- Modules completed count per product

#### `ProductDetail.jsx`
- Accessed via `/dashboard/product/:id`
- Shows product name, description, category
- Module list: each module as a card with name, question count, status (Done ✓ / Current ▶ / Locked)
- "Start Quiz" button on the current module → opens `QuizModal`

---

### KEY COMPONENTS — DETAILED SPECS

#### `ThemePicker.jsx`
- Renders as a floating panel (positioned near topbar)
- 6 color swatches: Ocean (default), Forest, Sunset, Rose, Violet, Dark
- Dark mode toggle switch below swatches
- Reads/writes from `ThemeContext`
- Used in BOTH AdminLayout and UserLayout topbars

#### `QuizModal.jsx`
- Full quiz experience in a modal
- Props: `questions[]`, `onClose`, `onComplete(score)`
- Internal state: `currentIndex`, `selectedAnswer`, `answered`, `score`, `showResult`
- Screens:
  1. **Quiz screen**: progress bar, question number, question text, 4 option buttons, feedback message (correct/wrong + explanation), Next button
  2. **Result screen**: big percentage score, pass/fail label, correct count text, "Close" and "Try Again" buttons
- Option states: default → selected → correct (green) / wrong (red) after answering
- Score threshold for "Passed": 75%

#### `Modal.jsx` (shared)
- Reusable wrapper: dark overlay, centered card, close on overlay click
- Props: `isOpen`, `onClose`, `title`, `subtitle`, `children`, `actions`

#### `ProductCard.jsx`
- Props: `product`, `progress`, `modules[]`, `onContinue`
- Shows: icon, name, category, description, progress bar, module pills (done/active/pending), best score, Continue button

#### `AdminLayout.jsx`
- Fixed left sidebar (240px) with `AdminSidebar`
- Sticky topbar with page title, search box, notification icon, theme picker icon
- Main content area to the right
- Sidebar has: logo, nav sections (Overview, Manage, Insights, System), admin user chip at bottom

#### `UserLayout.jsx`
- Fixed left sidebar (240px) with `UserSidebar`
- Sticky topbar with page title, notification icon (with dot), theme picker icon
- `UserSidebar` shows: logo, Home/Scores/Progress nav links, "My Products" section listing ONLY the user's active products (from `currentUser.activeProducts`), locked products shown greyed out at bottom

---

## VISUAL REFERENCE

The UI should closely match these visual decisions:

- **Sidebar**: white background, 1px right border, logo at top, nav items with icon + label, active item gets brand-colored background tint
- **Topbar**: white, sticky, page title with subtitle, right-side icon buttons
- **Stat cards**: white card, icon in colored circle (top-left), change badge (top-right), large bold number, label below
- **Product cards**: white card, icon + badge row, Lora serif name, progress bar with percentage, module pills row, bottom strip with meta + CTA button
- **Tables**: no outer border, rows separated by thin border, hover row highlight, compact padding
- **Modals**: blurred dark overlay, white rounded card (max-width 480px), Lora title, form fields with labels, Cancel + Submit buttons
- **Buttons**: primary = brand bg + white text; outline = border + brand text on hover; small variant for inline use
- **Badges**: pill shape, green/amber/red/blue semantic colors with matching soft backgrounds
- **Brand accent color** is always pulled from `var(--brand)` — never hardcoded

---

## IMPORTANT CONSTRAINTS

1. **No Firebase, no API, no environment variables** — all data is from `mockData.js`
2. **No TypeScript** — plain JavaScript and JSX only
3. **No chart libraries** — use CSS-based progress bars for any data visualization
4. **No Redux or external state libraries** — useState and useContext only
5. **No authentication logic** — mock only, AuthContext uses hardcoded users
6. **Tailwind only for layout and spacing** — use CSS variables for brand colors (so they respond to theme changes)
7. **All modals are controlled components** — open/close state lives in the parent page
8. **The quiz modal reads from `sampleQuestions` in mockData** — it does NOT fetch from any API
9. **Theme preference is per-role** — admin theme and user theme are stored separately
10. **Do not add any payment, pricing, or subscription UI** — access is admin-granted only

---

## DELIVERABLE

Generate all files listed in the folder structure above. Every file must be complete and runnable — no `// TODO` placeholders. The app should launch with `npm run dev` and be fully navigable using the mock auth system.

The output should be a complete, copy-pasteable file tree that a developer can drop into a Vite project and run immediately.

---

*This prompt was prepared for iterative Firebase backend integration. The frontend skeleton will be connected to Firebase Auth, Firestore, and Firebase Storage in a subsequent development phase. Do not anticipate or pre-wire any Firebase logic.*
