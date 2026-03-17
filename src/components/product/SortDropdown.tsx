import { memo } from 'react';
import { HiOutlineFunnel } from 'react-icons/hi2';

type SortValue = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

interface SortOption {
    value: SortValue;
    label: string;
}

const SORT_OPTIONS: SortOption[] = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'A → Z' },
];

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

function SortDropdown({ value, onChange }: SortDropdownProps) {
    return (
        <div className="relative flex items-center gap-2">
            <HiOutlineFunnel className="w-4 h-4 text-surface-400" />
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg px-3 py-2 pr-8 text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default memo(SortDropdown);
