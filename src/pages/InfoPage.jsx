import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    HiOutlineQuestionMarkCircle,
    HiOutlineTruck,
    HiOutlineArrowPath,
    HiOutlineBuildingOffice2,
    HiOutlineBriefcase,
    HiOutlineNewspaper,
    HiOutlineArrowLeft,
} from 'react-icons/hi2';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Button from '../components/ui/Button';

const pages = {
    'help-center': {
        title: 'Help Center',
        icon: HiOutlineQuestionMarkCircle,
        hero: "We're here to help",
        content: [
            {
                heading: 'Frequently Asked Questions',
                items: [
                    { q: 'How do I track my order?', a: "Once your order ships, you'll receive a tracking number via email. Use it on our tracking page to see real-time updates." },
                    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Cash on Delivery for eligible regions.' },
                    { q: 'Can I change my order after placing it?', a: 'You can modify your order within 1 hour of placement. Contact our support team for assistance.' },
                    { q: 'How do I contact support?', a: 'Reach us at support@primecart.com or use the live chat feature available 24/7.' },
                ],
            },
        ],
    },
    shipping: {
        title: 'Shipping Information',
        icon: HiOutlineTruck,
        hero: 'Fast & reliable shipping',
        content: [
            {
                heading: 'Shipping Options',
                items: [
                    { q: 'Standard Shipping (5-7 business days)', a: 'Free on all orders over $50. $4.99 for orders under $50.' },
                    { q: 'Express Shipping (2-3 business days)', a: '$9.99 flat rate. Available for most US addresses.' },
                    { q: 'Next-Day Delivery', a: '$14.99 flat rate. Order by 2 PM EST for next-day arrival. Available in select metro areas.' },
                    { q: 'International Shipping', a: 'We ship to over 50 countries. Rates and delivery times vary by destination. Customs duties may apply.' },
                ],
            },
        ],
    },
    returns: {
        title: 'Returns & Refunds',
        icon: HiOutlineArrowPath,
        hero: 'Hassle-free returns',
        content: [
            {
                heading: 'Return Policy',
                items: [
                    { q: '30-Day Returns', a: 'Not satisfied? Return any unused item within 30 days of delivery for a full refund.' },
                    { q: 'How to Start a Return', a: 'Log into your account, go to Order History, and select "Return Item". Print the prepaid shipping label.' },
                    { q: 'Refund Timeline', a: "Refunds are processed within 5-7 business days after we receive your return. You'll get an email confirmation." },
                    { q: 'Exchanges', a: 'Want a different size or color? We offer free exchanges. Just start a return and place a new order.' },
                ],
            },
        ],
    },
    about: {
        title: 'About PrimeCart',
        icon: HiOutlineBuildingOffice2,
        hero: 'Our story',
        content: [
            {
                heading: 'Who We Are',
                items: [
                    { q: 'Mission', a: 'PrimeCart is dedicated to making quality products accessible to everyone. We curate the best products from trusted brands and deliver them to your doorstep.' },
                    { q: 'Founded', a: 'Established in 2024, PrimeCart has grown from a small startup to serving customers across 50+ countries with thousands of products.' },
                    { q: 'Our Values', a: 'Customer-first mindset, transparency in pricing, sustainable practices, and continuous innovation drive everything we do.' },
                    { q: 'Team', a: 'Our team of 200+ passionate individuals works across engineering, design, logistics, and customer support to deliver the best shopping experience.' },
                ],
            },
        ],
    },
    careers: {
        title: 'Careers',
        icon: HiOutlineBriefcase,
        hero: 'Join our team',
        content: [
            {
                heading: 'Open Positions',
                items: [
                    { q: 'Senior Frontend Engineer - Remote', a: 'Build and scale our React-based storefront. 5+ years experience with modern JavaScript, React, and state management. Competitive salary + equity.' },
                    { q: 'Product Designer - New York', a: 'Design beautiful, intuitive shopping experiences. Proficiency in Figma and a strong portfolio required. Hybrid work model available.' },
                    { q: 'Full Stack Developer - Remote', a: 'Work across our Node.js backend and React frontend. Experience with REST APIs, PostgreSQL, and cloud infrastructure preferred.' },
                    { q: 'Customer Success Manager - London', a: 'Help our customers get the most out of PrimeCart. Strong communication skills and e-commerce experience preferred.' },
                ],
            },
        ],
    },
    blog: {
        title: 'Blog',
        icon: HiOutlineNewspaper,
        hero: 'Latest from PrimeCart',
        content: [
            {
                heading: 'Recent Posts',
                items: [
                    { q: '🛍️ The Future of Online Shopping in 2026', a: 'From AI-powered recommendations to AR try-ons, discover the trends shaping e-commerce this year. Read about how PrimeCart is leading the charge.' },
                    { q: '🎨 How We Redesigned Our Checkout Flow', a: 'A deep dive into our UX research, A/B testing, and the design decisions that led to a 35% increase in checkout completion rates.' },
                    { q: '🌱 Our Sustainability Commitment', a: 'Learn about our carbon-neutral shipping initiative, recyclable packaging program, and partnerships with eco-friendly brands.' },
                    { q: '⚡ Performance Eng: Making PrimeCart Faster', a: 'How we reduced page load times by 60% using code splitting, edge caching, and image optimization techniques.' },
                ],
            },
        ],
    },
};

export default function InfoPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const page = pages[slug];

    useDocumentTitle(page?.title || 'Page Not Found');

    if (!page) {
        return null; // Let the useEffect redirect or handle missing page
    }

    const { title, icon: Icon, hero, content } = page;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 mb-8 transition-colors cursor-pointer"
            >
                <HiOutlineArrowLeft className="w-4 h-4" />
                Back
            </button>

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-2">
                    {title}
                </h1>
                <p className="text-surface-500 dark:text-surface-400 text-lg">
                    {hero}
                </p>
            </motion.div>

            {/* Content */}
            {content.map((section, sIdx) => (
                <motion.div
                    key={sIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (sIdx + 1) }}
                >
                    <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-6">
                        {section.heading}
                    </h2>
                    <div className="space-y-4 mb-10">
                        {section.items.map((item, iIdx) => (
                            <div
                                key={iIdx}
                                className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5 hover:shadow-md transition-shadow"
                            >
                                <h3 className="font-medium text-surface-800 dark:text-surface-200 mb-2">
                                    {item.q}
                                </h3>
                                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}

            {/* CTA */}
            <div className="text-center py-8 border-t border-surface-200 dark:border-surface-700">
                <p className="text-surface-500 dark:text-surface-400 mb-4">
                    Have more questions?
                </p>
                <Button onClick={() => navigate('/')}>
                    Back to Shopping
                </Button>
            </div>
        </div>
    );
}
