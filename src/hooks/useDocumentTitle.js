import { useEffect } from 'react';

export function useDocumentTitle(title) {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title ? `${title} | PrimeCart` : 'PrimeCart';
        return () => { document.title = prevTitle; };
    }, [title]);
}
