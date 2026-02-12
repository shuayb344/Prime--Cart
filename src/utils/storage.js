export function getFromStorage(key, fallback = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

export function setToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.warn(`Failed to save ${key} to localStorage`);
    }
}

export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        console.warn(`Failed to remove ${key} from localStorage`);
    }
}
