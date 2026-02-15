export const fetchProducts = async () => { const res = await fetch('/api/products'); return res.json(); };
