import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPlus, HiMinus, HiOutlineTrash } from 'react-icons/hi2';
import { useCart } from '../../context/CartContext';
import { formatPrice, truncateText } from '../../utils/formatters';

function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    const handleIncrease = useCallback(
        () => updateQuantity(item.id, item.quantity + 1),
        [item.id, item.quantity, updateQuantity]
    );

    const handleDecrease = useCallback(
        () => updateQuantity(item.id, item.quantity - 1),
        [item.id, item.quantity, updateQuantity]
    );

    const handleRemove = useCallback(
        () => removeFromCart(item.id),
        [item.id, removeFromCart]
    );

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
        >
            {/* Image */}
            <Link to={`/product/${item.id}`} className="shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-surface-50 dark:bg-surface-700 p-2 flex items-center justify-center">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                    />
                </div>
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <Link
                        to={`/product/${item.id}`}
                        className="text-sm sm:text-base font-medium text-surface-800 dark:text-surface-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2"
                    >
                        {truncateText(item.title, 60)}
                    </Link>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 capitalize">
                        {item.category}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleDecrease}
                            className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors cursor-pointer"
                        >
                            <HiMinus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">
                            {item.quantity}
                        </span>
                        <button
                            onClick={handleIncrease}
                            className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-700 flex items-center justify-center hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors cursor-pointer"
                        >
                            <HiPlus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex items-center gap-3">
                        <span className="text-base sm:text-lg font-bold text-surface-900 dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                            onClick={handleRemove}
                            className="p-2 rounded-lg text-surface-400 hover:text-danger-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                            aria-label="Remove item"
                        >
                            <HiOutlineTrash className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default memo(CartItem);
