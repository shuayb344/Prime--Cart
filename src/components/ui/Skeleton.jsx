import { memo } from 'react';

function Skeleton({ className = '', variant = 'rect' }) {
    const base = 'skeleton-shimmer rounded';

    const shapes = {
        rect: 'w-full h-4',
        circle: 'w-10 h-10 rounded-full',
        image: 'w-full h-48 rounded-lg',
        card: 'w-full h-80 rounded-xl',
        text: 'w-3/4 h-4',
        title: 'w-1/2 h-6',
        button: 'w-24 h-10 rounded-lg',
    };

    return <div className={`${base} ${shapes[variant]} ${className}`} />;
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-surface-50 dark:bg-surface-900 rounded-2xl overflow-hidden shadow-sm border border-surface-200 dark:border-surface-800 p-4 space-y-4">
            <Skeleton variant="image" className="h-56" />
            <Skeleton variant="text" className="w-2/3" />
            <Skeleton variant="title" className="w-1/3" />
            <div className="flex items-center gap-2">
                <Skeleton variant="rect" className="w-20 h-4" />
                <Skeleton variant="rect" className="w-12 h-4" />
            </div>
            <Skeleton variant="button" className="w-full" />
        </div>
    );
}

export default memo(Skeleton);
