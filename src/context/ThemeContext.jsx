import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getFromStorage, setToStorage } from '../utils/storage';

const ThemeContext = createContext(null);
const THEME_KEY = 'primecart_theme';

function getInitialTheme() {
    const stored = getFromStorage(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        setToStorage(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, []);

    const isDark = theme === 'dark';

    const value = useMemo(() => ({ theme, isDark, toggleTheme }), [theme, isDark, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}
