import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

export default function Layout() {
    const [cartOpen, setCartOpen] = useState(false);

    const handleCartOpen = useCallback(() => setCartOpen(true), []);
    const handleCartClose = useCallback(() => setCartOpen(false), []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onCartOpen={handleCartOpen} />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
            <CartSidebar isOpen={cartOpen} onClose={handleCartClose} />
        </div>
    );
}
