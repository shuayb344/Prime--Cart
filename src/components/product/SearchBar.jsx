import { memo } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';

function SearchBar({ value, onChange }) {
    return (
        <div className="relative w-full max-w-md">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer"
                >
                    <HiOutlineXMark className="w-4 h-4 text-surface-400" />
                </button>
            )}
        </div>
    );
}

export default memo(SearchBar);
