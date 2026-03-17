import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '../context/CartContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';

export default function CartPage() {
    useDocumentTitle('Cart');
    const navigate = useNavigate();
    const { items, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <EmptyState
                    icon={HiOutlineShoppingBag}
                    title="Your cart is empty"
                    description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
                    actionLabel="Start Shopping"
                    onAction={() => navigate('/')}
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white">
                    Shopping Cart
                </h1>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                    Clear All
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}
