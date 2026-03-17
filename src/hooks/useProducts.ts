import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import { Product, Category } from '../types';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            } catch (err: any) {
                if (!cancelled) setError(err.message || 'An error occurred');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    return { products, categories, loading, error };
}
