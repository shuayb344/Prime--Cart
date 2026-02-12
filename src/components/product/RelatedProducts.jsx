import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../services/api';
import ProductCard from './ProductCard';

function RelatedProducts({ category, excludeId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                const allProducts = await fetchProducts();
                if (!cancelled) {
                    const related = allProducts
                        .filter((p) => p.category === category && p.id !== excludeId)
                        .slice(0, 4);
                    setProducts(related);
                }
            } catch {
                // Silently fail — related products are non-critical
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        if (category) load();
        return () => { cancelled = true; };
    }, [category, excludeId]);

    if (loading || products.length === 0) return null;

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                    Related Products
                </h2>
                <Link
                    to="/"
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                >
                    View All →
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default memo(RelatedProducts);
