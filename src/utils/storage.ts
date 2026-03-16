export function getFromStorage<T>(key: string, fallback: T): T {
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function setToStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.warn(`Failed to save ${key} to localStorage`);
    }
}

export function removeFromStorage(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch {
        console.warn(`Failed to remove ${key} from localStorage`);
    }
}
