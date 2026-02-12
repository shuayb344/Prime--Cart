import { memo } from 'react';

function Badge({ children, variant = 'default', className = '' }) {
    const variants = {
        default: 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300',
        primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
        success: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        accent: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    };

    return (
        <span
            className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[variant]} ${className}
      `}
        >
            {children}
        </span>
    );
}

export default memo(Badge);
