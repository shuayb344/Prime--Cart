import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
    useDocumentTitle('Page Not Found');
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-8xl font-black text-primary-600 dark:text-primary-400 mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
                    Page Not Found
                </h2>
                <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Button onClick={() => navigate('/')} size="lg">
                    Go Home
                </Button>
            </motion.div>
        </div>
    );
}
