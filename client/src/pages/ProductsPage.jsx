import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { apiGet, apiPost } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();
  const { refreshCart } = useCart();

  useEffect(() => {
    apiGet('/api/products')
      .then(setProducts)
      .catch((e) => setError(e.message));
  }, []);

  async function handleAdd(product, e) {
    e.stopPropagation();
    if (!token) {
      navigate('/login');
      return;
    }
    await apiPost('/api/cart', { productId: product._id, quantity: 1 }, token);
    await refreshCart();
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div data-testid="products-page">
      <h1 className="text-2xl font-bold mb-6">Our Teas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/products/${p._id}`)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                navigate(`/products/${p._id}`);
              }
            }}
            data-testid={`product-card-wrap-${p._id}`}
            className="cursor-pointer"
          >
            <ProductCard
              name={p.name}
              price={p.price}
              image={p.image}
              onAddToCart={(e) => handleAdd(p, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
