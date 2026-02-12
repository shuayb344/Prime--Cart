import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories(),
                ]);
                if (!cancelled) {
                    setProducts(productsData);
                    setCategories(categoriesData);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { products, categories, loading, error };
}
