import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getFromStorage, setToStorage } from '../utils/storage';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);
const WISHLIST_KEY = 'primecart_wishlist';

export function WishlistProvider({ children }) {
    const [items, setItems] = useState(() => getFromStorage(WISHLIST_KEY, []));

    useEffect(() => {
        setToStorage(WISHLIST_KEY, items);
    }, [items]);

    const addToWishlist = useCallback((product) => {
        setItems((prev) => {
            if (prev.some((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
        toast.success(`Added to wishlist`);
    }, []);

    const removeFromWishlist = useCallback((id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success('Removed from wishlist');
    }, []);

    const isInWishlist = useCallback(
        (id) => items.some((item) => item.id === id),
        [items]
    );

    const toggleWishlist = useCallback(
        (product) => {
            if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
        },
        [isInWishlist, removeFromWishlist, addToWishlist]
    );

    const value = useMemo(
        () => ({ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }),
        [items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist]
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within WishlistProvider');
    return context;
}
