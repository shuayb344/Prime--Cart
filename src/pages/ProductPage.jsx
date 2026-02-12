import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HiOutlineShoppingBag,
    HiOutlineHeart,
    HiHeart,
    HiPlus,
    HiMinus,
    HiOutlineArrowLeft,
    HiOutlineTruck,
    HiOutlineShieldCheck,
    HiOutlineArrowPath,
} from 'react-icons/hi2';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice, capitalize } from '../utils/formatters';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ErrorFallback from '../components/ui/ErrorFallback';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useDocumentTitle(product?.title || 'Product');

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                setQuantity(1);
                const data = await fetchProductById(id);
                if (!cancelled) setProduct(data);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [id]);

    const handleAddToCart = useCallback(() => {
        if (product) addToCart(product, quantity);
    }, [product, quantity, addToCart]);

    const handleToggleWishlist = useCallback(() => {
        if (product) toggleWishlist(product);
    }, [product, toggleWishlist]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Skeleton variant="image" className="h-96 rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton variant="title" className="w-3/4 h-8" />
                        <Skeleton variant="text" className="w-1/4 h-6" />
                        <Skeleton variant="rect" className="w-full h-24" />
                        <Skeleton variant="button" className="w-40 h-12" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ErrorFallback
                    message={error || 'Product not found'}
                    onRetry={() => navigate('/')}
                />
            </div>
        );
    }

    const wishlisted = isInWishlist(product.id);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 mb-8 transition-colors cursor-pointer"
            >
                <HiOutlineArrowLeft className="w-4 h-4" />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-surface-800 rounded-3xl p-8 border border-surface-200 dark:border-surface-700 flex items-center justify-center"
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-96 object-contain"
                    />
                </motion.div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        <Badge variant="primary" className="mb-3">
                            {capitalize(product.category)}
                        </Badge>
                        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white leading-tight">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Rating
                            rate={product.rating.rate}
                            count={product.rating.count}
                        />
                        <span className="text-sm text-surface-500 dark:text-surface-400">
                            {product.rating.count} reviews
                        </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-surface-900 dark:text-white">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Quantity
                        </label>
                        <div className="inline-flex items-center border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="w-10 h-10 flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
                            >
                                <HiMinus className="w-4 h-4" />
                            </button>
                            <span className="w-12 h-10 flex items-center justify-center font-semibold text-sm border-x border-surface-200 dark:border-surface-700">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
                            >
                                <HiPlus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button size="lg" onClick={handleAddToCart} className="flex-1">
                            <HiOutlineShoppingBag className="w-5 h-5" />
                            Add to Cart
                        </Button>
                        <Button
                            size="lg"
                            variant={wishlisted ? 'danger' : 'outline'}
                            onClick={handleToggleWishlist}
                        >
                            {wishlisted ? (
                                <HiHeart className="w-5 h-5" />
                            ) : (
                                <HiOutlineHeart className="w-5 h-5" />
                            )}
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-200 dark:border-surface-700">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
                                <HiOutlineTruck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-xs text-surface-500 dark:text-surface-400">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
                                <HiOutlineShieldCheck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-xs text-surface-500 dark:text-surface-400">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
                                <HiOutlineArrowPath className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <span className="text-xs text-surface-500 dark:text-surface-400">Easy Returns</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Related Products */}
            <RelatedProducts category={product.category} excludeId={product.id} />
        </div>
    );
}
