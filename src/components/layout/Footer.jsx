import { memo } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Shop: [
            { label: 'All Products', to: '/' },
            { label: 'Cart', to: '/cart' },
            { label: 'Wishlist', to: '/wishlist' },
        ],
        Support: [
            { label: 'Help Center', to: '/info/help-center' },
            { label: 'Shipping', to: '/info/shipping' },
            { label: 'Returns', to: '/info/returns' },
        ],
        Company: [
            { label: 'About', to: '/info/about' },
            { label: 'Careers', to: '/info/careers' },
            { label: 'Blog', to: '/info/blog' },
        ],
    };

    return (
        <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                                PrimeCart
                            </span>
                        </Link>
                        <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                            Your one-stop shop for quality products at great prices.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-surface-900 dark:text-surface-100 mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 pt-8 border-t border-surface-200 dark:border-surface-800 text-center">
                    <p className="text-sm text-surface-400 dark:text-surface-500">
                        © {currentYear} PrimeCart. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default memo(Footer);
