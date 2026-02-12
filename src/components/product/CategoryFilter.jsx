import { memo } from 'react';
import { capitalize } from '../../utils/formatters';

function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onCategoryChange(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${!activeCategory
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                        : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeCategory === category
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                            : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
                        }`}
                >
                    {capitalize(category)}
                </button>
            ))}
        </div>
    );
}

export default memo(CategoryFilter);
