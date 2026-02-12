import { useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineShoppingBag,
    HiOutlineHeart,
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineBars3,
    HiOutlineXMark,
} from 'react-icons/hi2';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';

function Navbar({ onCartOpen }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount } = useCart();
    const { isDark, toggleTheme } = useTheme();
    const { items: wishlistItems } = useWishlist();
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Shop' },
        { to: '/wishlist', label: 'Wishlist' },
        { to: '/cart', label: 'Cart' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-surface-950/80 border-b border-surface-200 dark:border-surface-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                            PrimeCart
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(link.to)
                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400'
                                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-800'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                        </button>

                        <Link
                            to="/wishlist"
                            className="relative p-2.5 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        >
                            <HiOutlineHeart className="w-5 h-5" />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={onCartOpen}
                            className="relative p-2.5 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
                            aria-label="Open cart"
                        >
                            <HiOutlineShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <motion.span
                                    key={cartCount}
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                                >
                                    {cartCount > 99 ? '99+' : cartCount}
                                </motion.span>
                            )}
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={onCartOpen}
                            className="relative p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer"
                        >
                            <HiOutlineShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer"
                        >
                            {mobileOpen ? <HiOutlineXMark className="w-6 h-6" /> : <HiOutlineBars3 className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden border-t border-surface-200 dark:border-surface-800"
                        >
                            <div className="py-3 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.to)
                                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400'
                                                : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => { toggleTheme(); setMobileOpen(false); }}
                                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800 cursor-pointer"
                                >
                                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}

export default memo(Navbar);
