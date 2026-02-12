import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import ErrorFallback from '../components/ui/ErrorFallback';
import EmptyState from '../components/ui/EmptyState';
import ProductGrid from '../components/product/ProductGrid';
import SearchBar from '../components/product/SearchBar';
import CategoryFilter from '../components/product/CategoryFilter';
import SortDropdown from '../components/product/SortDropdown';
import Pagination from '../components/product/Pagination';

const ITEMS_PER_PAGE = 8;

export default function HomePage() {
    useDocumentTitle('Shop');

    const { products, categories, loading, error } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [sortBy, setSortBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearch = useDebounce(searchQuery, 300);

    // Reset page when filters change
    const handleSearchChange = useCallback((val) => {
        setSearchQuery(val);
        setCurrentPage(1);
    }, []);

    const handleCategoryChange = useCallback((cat) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    }, []);

    const handleSortChange = useCallback((val) => {
        setSortBy(val);
        setCurrentPage(1);
    }, []);

    // Filter + Sort logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (activeCategory) {
            result = result.filter((p) => p.category === activeCategory);
        }

        // Search filter
        if (debouncedSearch) {
            const query = debouncedSearch.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case 'name':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return result;
    }, [products, activeCategory, debouncedSearch, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, currentPage]);

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ErrorFallback message={error} onRetry={() => window.location.reload()} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                    <HiOutlineSparkles className="w-4 h-4" />
                    Discover Amazing Products
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-3">
                    Shop the{' '}
                    <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                        Best Deals
                    </span>
                </h1>
                <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
                    Browse our curated collection of quality products at unbeatable prices.
                </p>
            </motion.div>

            {/* Filters row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <SearchBar value={searchQuery} onChange={handleSearchChange} />
                <SortDropdown value={sortBy} onChange={handleSortChange} />
            </div>

            {/* Categories */}
            <div className="mb-8">
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />
            </div>

            {/* Results count */}
            {!loading && (
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
                    Showing {paginatedProducts.length} of {filteredProducts.length} products
                </p>
            )}

            {/* Product grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            ) : paginatedProducts.length === 0 ? (
                <EmptyState
                    icon={HiOutlineSparkles}
                    title="No products found"
                    description="Try adjusting your search or filter to find what you're looking for."
                    actionLabel="Clear Filters"
                    onAction={() => {
                        setSearchQuery('');
                        setActiveCategory(null);
                        setSortBy('default');
                        setCurrentPage(1);
                    }}
                />
            ) : (
                <ProductGrid products={paginatedProducts} />
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
