const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
    return res.json();
}

export async function fetchProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
    return res.json();
}

export async function fetchCategories() {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    return res.json();
}

export async function fetchProductsByCategory(category) {
    const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error(`Failed to fetch category ${category}: ${res.status}`);
    return res.json();
}
