import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineCheckCircle,
    HiOutlineCreditCard,
    HiOutlineBanknotes,
} from 'react-icons/hi2';
import { useCart } from '../context/CartContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice, truncateText } from '../utils/formatters';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card',
};

function validateForm(form) {
    const errors = {};
    if (!form.firstName.trim()) errors.firstName = 'First name is required';
    if (!form.lastName.trim()) errors.lastName = 'Last name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errors.email = 'Invalid email address';
    if (!form.address.trim()) errors.address = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.zip.trim()) errors.zip = 'ZIP code is required';
    return errors;
}

export default function CheckoutPage() {
    useDocumentTitle('Checkout');
    const navigate = useNavigate();
    const { items, subtotal, tax, total, clearCart } = useCart();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const validationErrors = validateForm(form);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setProcessing(true);
            // Simulate processing
            setTimeout(() => {
                clearCart();
                setProcessing(false);
                setSubmitted(true);
            }, 1500);
        },
        [form, clearCart]
    );

    if (items.length === 0 && !submitted) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <EmptyState
                    icon={HiOutlineCreditCard}
                    title="Nothing to checkout"
                    description="Add items to your cart first."
                    actionLabel="Go Shopping"
                    onAction={() => navigate('/')}
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AnimatePresence mode="wait">
                {submitted ? (
                    /* Success Screen */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-lg mx-auto text-center py-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
                        >
                            <HiOutlineCheckCircle className="w-14 h-14 text-success-500" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-3">
                            Order Placed! 🎉
                        </h1>
                        <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-sm mx-auto">
                            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                        </p>
                        <Button onClick={() => navigate('/')} size="lg">
                            Continue Shopping
                        </Button>
                    </motion.div>
                ) : (
                    /* Checkout Form */
                    <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-8">
                            Checkout
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                                {/* Contact */}
                                <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6">
                                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                                        Contact Information
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField
                                            label="First Name"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            error={errors.firstName}
                                        />
                                        <InputField
                                            label="Last Name"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            error={errors.lastName}
                                        />
                                        <div className="sm:col-span-2">
                                            <InputField
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                error={errors.email}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping */}
                                <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6">
                                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                                        Shipping Address
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <InputField
                                                label="Address"
                                                name="address"
                                                value={form.address}
                                                onChange={handleChange}
                                                error={errors.address}
                                            />
                                        </div>
                                        <InputField
                                            label="City"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            error={errors.city}
                                        />
                                        <InputField
                                            label="ZIP Code"
                                            name="zip"
                                            value={form.zip}
                                            onChange={handleChange}
                                            error={errors.zip}
                                        />
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6">
                                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                                        Payment Method
                                    </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === 'card'
                                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-950'
                                                    : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={form.paymentMethod === 'card'}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <HiOutlineCreditCard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                            <span className="text-sm font-medium text-surface-800 dark:text-surface-200">
                                                Credit Card
                                            </span>
                                        </label>
                                        <label
                                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === 'cash'
                                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-950'
                                                    : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cash"
                                                checked={form.paymentMethod === 'cash'}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <HiOutlineBanknotes className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                            <span className="text-sm font-medium text-surface-800 dark:text-surface-200">
                                                Cash on Delivery
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <Button type="submit" size="lg" className="w-full" loading={processing}>
                                    {processing ? 'Processing…' : `Pay ${formatPrice(total)}`}
                                </Button>
                            </form>

                            {/* Order Summary */}
                            <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6 h-fit sticky top-24">
                                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                                    Order Summary
                                </h3>
                                <div className="space-y-3 mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-12 h-12 object-contain rounded-lg bg-surface-50 dark:bg-surface-700 p-1"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-surface-700 dark:text-surface-300 truncate">
                                                    {truncateText(item.title, 30)}
                                                </p>
                                                <p className="text-xs text-surface-500">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-surface-200 dark:border-surface-700 pt-3 space-y-2 text-sm">
                                    <div className="flex justify-between text-surface-600 dark:text-surface-400">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-surface-600 dark:text-surface-400">
                                        <span>Tax</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                    <div className="flex justify-between text-surface-600 dark:text-surface-400">
                                        <span>Shipping</span>
                                        <span className="text-success-500 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-surface-900 dark:text-white pt-2 border-t border-surface-200 dark:border-surface-700">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function InputField({ label, name, type = 'text', value, onChange, error }) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2.5 rounded-xl border ${error
                        ? 'border-danger-500 focus:ring-danger-500'
                        : 'border-surface-200 dark:border-surface-700 focus:ring-primary-500'
                    } bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
            />
            {error && (
                <p className="mt-1 text-xs text-danger-500">{error}</p>
            )}
        </div>
    );
}
