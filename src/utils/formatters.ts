export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

export function truncateText(text: string | undefined | null, maxLength: number = 50): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

export function capitalize(str: string | undefined | null): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
