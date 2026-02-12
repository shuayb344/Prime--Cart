import { memo } from 'react';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';

function Rating({ rate = 0, count = 0, showCount = true }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rate));

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {stars.map((filled, i) =>
                    filled ? (
                        <HiStar key={i} className="w-4 h-4 text-amber-400" />
                    ) : (
                        <HiOutlineStar key={i} className="w-4 h-4 text-surface-300 dark:text-surface-600" />
                    )
                )}
            </div>
            {showCount && count > 0 && (
                <span className="text-xs text-surface-500 dark:text-surface-400 ml-1">
                    ({count})
                </span>
            )}
        </div>
    );
}

export default memo(Rating);
