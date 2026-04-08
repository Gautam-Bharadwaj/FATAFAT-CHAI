import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    return <p className="text-red-600 pt-32 text-center">{error}</p>;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen" data-testid="products-page">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-amber-900 mb-4 font-['Amatic_SC']">
            Our Teas
          </h1>
          <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full opacity-60"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
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
              className="cursor-pointer sketch-box bg-white/60 relative group"
            >
              <div className="h-48 flex items-center justify-center mb-6 overflow-hidden rounded-lg">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full object-contain transition-all duration-500 transform group-hover:scale-110"
                    data-testid="product-image"
                  />
                )}
              </div>
              <h3
                className="text-4xl font-bold font-['Amatic_SC'] text-amber-900 mb-2"
                data-testid="product-name"
              >
                {p.name}
              </h3>
              <p className="text-stone-600 mb-6 text-lg leading-snug">
                {p.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-2xl font-bold text-orange-800"
                  data-testid="product-price"
                >
                  ₹{p.price}
                </span>
                <button
                  onClick={(e) => handleAdd(p, e)}
                  className="sketch-btn text-sm py-2 px-6"
                  data-testid="add-to-cart"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
