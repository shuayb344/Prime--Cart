# 🛒 PrimeCart — Modern E-Commerce Web Application

A production-level, scalable e-commerce web application built with React, demonstrating strong frontend engineering fundamentals, clean architecture, and modern UI/UX design.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 🔗 Live Demo

> **[Live Demo](#)** 

## 📸 Screenshots

> 

## ✨ Features

### Core
- **Product Listing** — Responsive grid with images, prices, ratings, and category badges
- **Category Filtering** — Filter by category with active state and clear option
- **Real-time Search** — Debounced, case-insensitive product search
- **Product Details** — Dedicated page with full description, quantity selector, and related products
- **Cart System** — Add/remove items, quantity controls, subtotal/tax/total calculations, localStorage persistence
- **Checkout** — Multi-step form with field validation, payment method selector, and order confirmation

### Extra Features
- 🤍 **Wishlist System** — Save favorite products with persistence
- 📄 **Pagination** — Client-side pagination (8 products/page) with smart page windowing
- 🔀 **Product Sorting** — Price (low/high), rating, and alphabetical
- 🔔 **Toast Notifications** — Feedback on cart/wishlist actions
- 🛒 **Animated Cart Sidebar** — Slide-in panel with Framer Motion
- 💀 **Skeleton Loaders** — Custom shimmer placeholders on every loading state
- 🎬 **Page Transitions** — Smooth enter/exit animations via AnimatePresence
- 🏷️ **SEO Titles** — Dynamic `document.title` updates per page

### UI/UX
- 🌙 **Dark/Light Mode** — Toggle with system preference detection and persistence
- 📱 **Mobile-First Responsive** — Fully responsive from 320px to 4K
- ♿ **Accessible** — Proper ARIA labels, keyboard navigation, focus states
- ✨ **Micro-animations** — Hover effects, card lifts, button springs

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library (functional components + hooks only) |
| **Vite 7** | Build tool with HMR |
| **Tailwind CSS v4** | Utility-first styling with custom theme |
| **React Router** | Client-side routing |
| **Context API + useReducer** | State management (cart, theme, wishlist) |
| **Framer Motion** | Animations and page transitions |
| **react-hot-toast** | Toast notifications |
| **react-icons** | Icon library (Heroicons set) |
| **Fake Store API** | Product data source |
| **localStorage** | Cart, wishlist, and theme persistence |

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable primitives
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorFallback.jsx
│   │   ├── Rating.jsx
│   │   └── Skeleton.jsx
│   ├── layout/           # App shell
│   │   ├── CartSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── product/          # Product domain
│   │   ├── CategoryFilter.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── RelatedProducts.jsx
│   │   ├── SearchBar.jsx
│   │   └── SortDropdown.jsx
│   └── cart/             # Cart domain
│       ├── CartItem.jsx
│       └── CartSummary.jsx
├── pages/                # Route-level components (lazy-loaded)
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── WishlistPage.jsx
│   └── NotFoundPage.jsx
├── context/              # Global state
│   ├── CartContext.jsx
│   ├── ThemeContext.jsx
│   └── WishlistContext.jsx
├── hooks/                # Custom hooks
│   ├── useDebounce.js
│   ├── useDocumentTitle.js
│   └── useProducts.js
├── services/             # API layer
│   └── api.js
├── utils/                # Helpers
│   ├── formatters.js
│   └── storage.js
├── App.jsx               # Routes + transitions
└── main.jsx              # Entry + providers
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/primecart.git
cd primecart

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## ⚡ Performance

- **Code Splitting** — All pages are lazy-loaded with `React.lazy` + `Suspense`
- **Memoization** — `React.memo` on leaf components, `useMemo` for filtered lists, `useCallback` for handlers
- **Bundle Size** — Main bundle ~127KB gzipped, pages split into ~1-3KB chunks each
- **Optimized Re-renders** — Context values memoized, proper key usage in lists

## 🧪 Edge Cases Handled

- API error fallback with retry button
- Empty search results with clear-filters action
- Empty cart and wishlist with CTA
- Invalid product ID shows 404
- Loading skeletons everywhere (home, product detail, page transitions)
- Cart persistence across browser sessions

## 📄 License

MIT © 2026
