import { memo } from 'react';
import { HiExclamationTriangle } from 'react-icons/hi2';
import Button from './Button';

function ErrorFallback({ message = 'Something went wrong', onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                <HiExclamationTriangle className="w-8 h-8 text-danger-500" />
            </div>
            <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-200 mb-2">
                Oops! Something went wrong
            </h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-md">
                {message}
            </p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline">
                    Try Again
                </Button>
            )}
        </div>
    );
}

export default memo(ErrorFallback);
