import { useNavigate } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi2';
import { useWishlist } from '../context/WishlistContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProductGrid from '../components/product/ProductGrid';
import EmptyState from '../components/ui/EmptyState';

export default function WishlistPage() {
    useDocumentTitle('Wishlist');
    const navigate = useNavigate();
    const { items } = useWishlist();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <EmptyState
                    icon={HiOutlineHeart}
                    title="Your wishlist is empty"
                    description="Save items you love by clicking the heart icon on any product."
                    actionLabel="Browse Products"
                    onAction={() => navigate('/')}
                />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-8">
                Wishlist ({items.length})
            </h1>
            <ProductGrid products={items} />
        </div>
    );
}
