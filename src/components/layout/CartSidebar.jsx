import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineXMark, HiPlus, HiMinus, HiOutlineTrash, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '../../context/CartContext';
import { formatPrice, truncateText } from '../../utils/formatters';
import Button from '../ui/Button';

function CartSidebar({ isOpen, onClose }) {
    const { items, removeFromCart, updateQuantity, subtotal, cartCount } = useCart();

    const handleOverlayClick = useCallback(() => onClose(), [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleOverlayClick}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-50 dark:bg-surface-900 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800 bg-white/50 dark:bg-surface-900/50 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <HiOutlineShoppingBag className="w-5 h-5 text-primary-600" />
                                <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                                    Cart ({cartCount})
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
                            >
                                <HiOutlineXMark className="w-5 h-5 text-surface-500" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <HiOutlineShoppingBag className="w-16 h-16 text-surface-300 dark:text-surface-600 mb-4" />
                                    <p className="text-surface-500 dark:text-surface-400 font-medium">
                                        Your cart is empty
                                    </p>
                                    <p className="text-sm text-surface-400 dark:text-surface-500 mt-1">
                                        Add items to get started
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 p-3 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-100 dark:border-surface-700/50 shadow-sm"
                                        >
                                            <div className="w-16 h-16 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">
                                                    {truncateText(item.title, 35)}
                                                </p>
                                                <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">
                                                    {formatPrice(item.price)}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-md bg-surface-200 dark:bg-surface-700 flex items-center justify-center hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors cursor-pointer"
                                                    >
                                                        <HiMinus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-md bg-surface-200 dark:bg-surface-700 flex items-center justify-center hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors cursor-pointer"
                                                    >
                                                        <HiPlus className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="ml-auto p-1.5 rounded-md text-danger-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                                                    >
                                                        <HiOutlineTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-surface-200 dark:border-surface-800 px-6 py-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-surface-500 dark:text-surface-400">Subtotal</span>
                                    <span className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <Link to="/cart" onClick={onClose}>
                                    <Button variant="outline" className="w-full">
                                        View Cart
                                    </Button>
                                </Link>
                                <Link to="/checkout" onClick={onClose}>
                                    <Button className="w-full mt-2">Checkout</Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default memo(CartSidebar);
