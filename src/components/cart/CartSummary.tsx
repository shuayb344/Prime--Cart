import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import Button from '../ui/Button';

function CartSummary() {
    const { subtotal, tax, total, cartCount } = useCart();

    return (
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-5">
                Order Summary
            </h3>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Shipping</span>
                    <span className="text-success-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-surface-600 dark:text-surface-400">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-surface-200 dark:border-surface-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-surface-900 dark:text-white">
                            Total
                        </span>
                        <span className="text-xl font-bold text-surface-900 dark:text-white">
                            {formatPrice(total)}
                        </span>
                    </div>
                </div>
            </div>

            <Link to="/checkout" className="block mt-6">
                <Button className="w-full" size="lg">
                    Proceed to Checkout
                </Button>
            </Link>

            <Link to="/" className="block mt-3">
                <Button variant="ghost" className="w-full" size="md">
                    Continue Shopping
                </Button>
            </Link>
        </div>
    );
}

export default memo(CartSummary);
