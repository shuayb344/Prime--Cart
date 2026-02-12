import { memo } from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary:
        'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary:
        'bg-surface-200 text-surface-800 hover:bg-surface-300 focus:ring-surface-400 dark:bg-surface-700 dark:text-surface-200 dark:hover:bg-surface-600',
    outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950',
    ghost:
        'text-surface-600 hover:bg-surface-100 focus:ring-surface-400 dark:text-surface-400 dark:hover:bg-surface-800',
    danger:
        'bg-danger-500 text-white hover:bg-red-600 focus:ring-red-500',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
};

function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    ...props
}) {
    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            disabled={disabled || loading}
            className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${variants[variant]} ${sizes[size]} ${className}
      `}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </motion.button>
    );
}

export default memo(Button);
