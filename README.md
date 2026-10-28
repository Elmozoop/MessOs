<div align="center">

# Smart Mess

**Hostel Food Waste Management System**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Recharts](https://img.shields.io/badge/Recharts-EF6C00?style=for-the-badge&logo=recharts&logoColor=white)](https://recharts.org)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)

_A modern, high-tech platform designed to drastically reduce hostel food wastage by optimizing meal preparation through real-time student confirmations._ 🌿✨

</div>

---

## The Vision

Every day, hostels waste incredible amounts of food simply because they don't know exactly how many students will be eating. **Smart Mess** solves this by providing a gorgeous, seamless interface for students to confirm their meals, giving mess staff the exact data they need to cook the right amount.

## Core Features

| Feature                  | Description                                                                                                                        |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **📱 Student Dashboard** | A highly responsive, mobile-first interface for students to easily confirm or skip upcoming meals with a single tap.               |
| **💻 Admin Portal**      | A powerful desktop dashboard for mess staff to track exact required food quantities based on real-time data.                       |
| **📊 Smart Analytics**   | Visual data insights with Recharts: attendance trends, model accuracy bars, waste breakdown pie charts, and cost savings tracking. |
| **🎨 Premium UI/UX**     | Glassmorphism design with CSS variables, fluid Framer Motion animations, animated navigation indicators, and a sleek dark mode.    |
| **🤖 AI Predictions**    | Machine learning powered attendance forecasting for smarter meal planning and inventory management.                                |
| **♻️ Waste Logging**     | End-of-day waste tracking with categorized breakdowns and historical trends.                                                       |
| **🌙 Theme System**      | Full light/dark mode support with CSS custom properties and system preference detection.                                           |

---

## Tech Stack

| Category            | Technologies                                                  |
| :------------------ | :------------------------------------------------------------ |
| **Framework**       | React 19, TypeScript 5, Vite 7                                |
| **Styling**         | Tailwind CSS 4, CSS Variables, CSS Grid/Flexbox               |
| **Animations**      | Framer Motion 11 (layout animations, gestures, transitions)   |
| **Charts**          | Recharts 2 (Area, Bar, Pie, ResponsiveContainer, Tooltip)     |
| **Routing**         | React Router 7 (data routes, lazy loading)                    |
| **Icons**           | Lucide React                                                  |
| **State**           | React Context API + useReducer                                |
| **Testing**         | Vitest 2 (unit), Playwright 1.64 (E2E), React Testing Library |
| **Linting**         | ESLint 9, TypeScript ESLint, Prettier 3, Husky 9, lint-staged |
| **Bundle Analysis** | vite-plugin-bundle-analyzer                                   |

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # MainLayout, SidebarContent, MobileDrawer
│   └── ui/              # Button, Card, Badge, ProgressBar (with tests)
├── context/
│   ├── DataContext.tsx  # Global state: meals, stats, waste, predictions
│   └── ThemeContext.tsx # Light/dark theme management
├── pages/
│   ├── AdminDashboard.tsx    # Admin portal with full analytics
│   ├── StudentApp.tsx        # Student mobile app shell
│   ├── admin/
│   │   └── Dashboard.tsx     # Admin charts, stats, waste logging
│   └── student/
│       └── StudentDashboard.tsx
├── styles/
│   └── colors.css       # CSS custom properties (light/dark themes)
├── lib/
│   └── utils.js         # cn() utility (clsx + tailwind-merge)
├── types/
│   ├── api.ts           # API response types
│   ├── data.ts          # Domain types (stats, waste, predictions)
│   ├── theme.ts         # Theme types
│   └── index.ts         # Barrel exports
└── test/
    └── setup.ts         # Vitest globals, testing-library config
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+ (or pnpm/yarn)

### Clone & Install

```bash
git clone https://github.com/Elmozoop/MessOs.git
cd MessOs
npm install
```

### Development

```bash
# Start dev server (Vite HMR)
npm run dev

# Type-check only
npm run typecheck

# Run linter
npm run lint

# Run tests (watch mode)
npm run test

# Run tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e
```

### Production Build

```bash
# Type-check + build
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze
```

---

## Available Scripts

| Command                 | Description                         |
| :---------------------- | :---------------------------------- |
| `npm run dev`           | Start development server with HMR   |
| `npm run build`         | Type-check and build for production |
| `npm run preview`       | Preview production build locally    |
| `npm run lint`          | Run ESLint with auto-fix            |
| `npm run typecheck`     | Run TypeScript compiler check       |
| `npm run test`          | Run Vitest unit tests               |
| `npm run test:ui`       | Run Vitest with browser UI          |
| `npm run test:coverage` | Generate coverage report            |
| `npm run test:e2e`      | Run Playwright E2E tests            |
| `npm run analyze`       | Analyze production bundle size      |
| `npm run prepare`       | Install Husky git hooks             |

---

## Key Implementation Details

### Admin Dashboard (`src/pages/admin/Dashboard.tsx`)

- **StatCards** with hover animations and highlight variants
- **Attendance Trend**: Dual-axis AreaChart (waste kg + attendance)
- **Model Accuracy**: Vertical grouped BarChart (predicted vs actual)
- **Waste Breakdown**: Donut PieChart with center percentage display
- **Food Recommendations**: AI-driven quantity calculations per dish
- **Waste Logging**: Form with validation, success animation

### Responsive Layout (`src/components/layout/MainLayout.tsx`)

- Collapsible sidebar (260px desktop, drawer on mobile)
- Animated active nav indicator (`layoutId` with Framer Motion)
- Logo with branded leaf icon and gradient badge
- Bottom navigation section with settings/help
- Mobile-first breakpoint at `lg:` (1024px)

### Theme System (`src/context/ThemeContext.tsx`)

- CSS custom properties in `src/styles/colors.css`
- System preference detection (`prefers-color-scheme`)
- Persisted to `localStorage`
- Zero-flash SSR-safe initialization

### Data Layer (`src/context/DataContext.tsx`)

- Mock data for development (replace with API calls)
- Types: `AdminMealStats`, `WasteDataPoint`, `FoodRecommendation`
- Actions: `logDailyWaste`, `toggleMealConfirmation`
- Ready for React Query / SWR integration

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

- Component rendering and props
- Context provider consumers
- Utility functions (`cn`, formatters)
- User interactions (click, input, form submit)

### E2E Tests (Playwright)

- Admin dashboard load and chart rendering
- Student meal confirmation flow
- Theme toggle persistence
- Mobile responsive behavior
- Accessibility (axe-core integration)

---

## Deployment

### Static Hosting (Vercel/Netlify/Cloudflare Pages)

```bash
npm run build
# Deploy dist/ folder
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes with tests
4. Run `npm run lint` and `npm run test`
5. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
6. Push and open a Pull Request

### Commit Convention

- `feat:` – new feature
- `fix:` – bug fix
- `docs:` – documentation changes
- `style:` – formatting, missing semicolons
- `refactor:` – code restructuring
- `test:` – adding tests
- `chore:` – build process, dependencies

---

## License

MIT License – feel free to use this for your own hostel mess! 🍚

---

## Acknowledgments

- **Recharts** for beautiful, composable charts
- **Framer Motion** for buttery-smooth animations
- **Tailwind CSS** for utility-first styling
- **Lucide** for clean, consistent icons
- **Vite** for lightning-fast development

---

<div align="center">

**Built with ❤️ for reducing food waste in hostels everywhere**

[Report Bug](https://github.com/Elmozoop/MessOs/issues) · [Request Feature](https://github.com/Elmozoop/MessOs/issues)

</div>
