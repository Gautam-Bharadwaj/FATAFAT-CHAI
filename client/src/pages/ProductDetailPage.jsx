import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPost } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    apiGet(`/api/products/${id}`)
      .then(setProduct)
      .catch((e) => setError(e.message));
  }, [id]);

  async function addToCart() {
    if (!token) {
      navigate('/login');
      return;
    }
    await apiPost('/api/cart', { productId: id, quantity: 1 }, token);
    await refreshCart();
  }

  if (error || !product) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <p className="text-stone-600 font-['Patrick_Hand'] text-2xl">{error || 'Loading…'}</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen" data-testid="product-detail">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="sketch-box bg-white/60 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-stone-800 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] opacity-20 transform rotate-2"></div>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-80 object-contain mx-auto drop-shadow-2xl rounded-2xl transform rotate-1 hover:scale-105 transition-transform duration-500"
                  data-testid="product-detail-image"
                />
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-6xl font-bold font-['Amatic_SC'] text-amber-900 mb-4" data-testid="product-detail-name">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-orange-800 my-4 font-['Amatic_SC']" data-testid="product-detail-price">
                ₹{product.price}
              </p>
              <p className="text-stone-700 mb-8 text-lg font-['Indie_Flower'] leading-relaxed" data-testid="product-detail-description">
                {product.description}
              </p>
              <button
                type="button"
                data-testid="add-to-cart"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-full shadow-lg transition-all transform hover:scale-[1.02] text-xl font-['Patrick_Hand'] uppercase tracking-wider"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
