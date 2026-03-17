import { createContext, useContext, useReducer, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { getFromStorage, setToStorage } from '../utils/storage';
import toast from 'react-hot-toast';
import { Product, CartItem } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
    tax: number;
    total: number;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = 'primecart_cart';

type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, quantity = 1 } = action.payload;
            const existing = state.find((item) => item.id === product.id);
            if (existing) {
                return state.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...state, { ...product, quantity }];
        }
        case 'REMOVE_ITEM':
            return state.filter((item) => item.id !== action.payload);
        case 'UPDATE_QUANTITY':
            if (action.payload.quantity <= 0) {
                return state.filter((item) => item.id !== action.payload.id);
            }
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, dispatch] = useReducer(
        cartReducer,
        [],
        () => getFromStorage<CartItem[]>(CART_STORAGE_KEY, [])
    );

    useEffect(() => {
        setToStorage(CART_STORAGE_KEY, items);
    }, [items]);

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
        toast.success(`${product.title.slice(0, 30)} added to cart`);
    }, []);

    const removeFromCart = useCallback((id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
        toast.success('Item removed from cart');
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const cartCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    const tax = useMemo(() => subtotal * 0.08, [subtotal]);
    const total = useMemo(() => subtotal + tax, [subtotal, tax]);

    const value = useMemo(
        () => ({
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            subtotal,
            tax,
            total,
        }),
        [items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, tax, total]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
