import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart, HiHeart, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, truncateText } from '../../utils/formatters';
import Rating from '../ui/Rating';
import Badge from '../ui/Badge';

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const wishlisted = isInWishlist(product.id);

    const handleAddToCart = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
        },
        [addToCart, product]
    );

    const handleToggleWishlist = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
        },
        [toggleWishlist, product]
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-surface-200 dark:border-surface-700 transition-all duration-300">
                    {/* Wishlist button */}
                    <button
                        onClick={handleToggleWishlist}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform cursor-pointer"
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        {wishlisted ? (
                            <HiHeart className="w-5 h-5 text-accent-500" />
                        ) : (
                            <HiOutlineHeart className="w-5 h-5 text-surface-400 group-hover:text-accent-500 transition-colors" />
                        )}
                    </button>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                        <Badge variant="primary">{product.category}</Badge>
                    </div>

                    {/* Image */}
                    <div className="relative p-6 pt-12 pb-4 bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-700 dark:to-surface-800">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>

                    {/* Info */}
                    <div className="p-4 pt-2 space-y-2">
                        <h3 className="text-sm font-medium text-surface-800 dark:text-surface-200 line-clamp-2 leading-snug min-h-[2.5rem]">
                            {truncateText(product.title, 55)}
                        </h3>

                        <Rating rate={product.rating.rate} count={product.rating.count} />

                        <div className="flex items-center justify-between pt-1">
                            <span className="text-lg font-bold text-surface-900 dark:text-white">
                                {formatPrice(product.price)}
                            </span>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="p-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-colors cursor-pointer"
                                aria-label="Add to cart"
                            >
                                <HiOutlineShoppingBag className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default memo(ProductCard);
