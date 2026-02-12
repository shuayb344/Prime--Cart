import { memo } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4 text-center"
        >
            {Icon && (
                <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6">
                    <Icon className="w-10 h-10 text-surface-400 dark:text-surface-500" />
                </div>
            )}
            <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-2">
                {title}
            </h3>
            {description && (
                <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-sm">
                    {description}
                </p>
            )}
            {actionLabel && onAction && (
                <Button onClick={onAction}>{actionLabel}</Button>
            )}
        </motion.div>
    );
}

export default memo(EmptyState);
