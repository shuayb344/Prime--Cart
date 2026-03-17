import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { getFromStorage, setToStorage } from '../utils/storage';

interface ThemeContextType {
    theme: string;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);
const THEME_KEY = 'primecart_theme';

function getInitialTheme(): string {
    const stored = getFromStorage<string | null>(THEME_KEY, null);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<string>(getInitialTheme);

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
