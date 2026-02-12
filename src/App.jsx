import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Skeleton from './components/ui/Skeleton';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25, ease: 'easeInOut' },
};

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <Skeleton variant="title" className="w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedPage({ children }) {
  return (
    <motion.div {...pageTransition}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><HomePage /></AnimatedPage>
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><ProductPage /></AnimatedPage>
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><CartPage /></AnimatedPage>
              </Suspense>
            }
          />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><CheckoutPage /></AnimatedPage>
              </Suspense>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><WishlistPage /></AnimatedPage>
              </Suspense>
            }
          />
          <Route
            path="/info/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><InfoPage /></AnimatedPage>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <AnimatedPage><NotFoundPage /></AnimatedPage>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
