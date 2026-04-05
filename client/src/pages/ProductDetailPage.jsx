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
    return <p className="text-red-600">{error || 'Loading…'}</p>;
  }

  return (
    <div data-testid="product-detail">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="max-h-64 mx-auto mb-4"
          data-testid="product-detail-image"
        />
      ) : null}
      <h1 className="text-3xl font-bold" data-testid="product-detail-name">
        {product.name}
      </h1>
      <p
        className="text-xl text-amber-800 my-2"
        data-testid="product-detail-price"
      >
        ₹{product.price}
      </p>
      <p
        className="text-stone-700 mb-6"
        data-testid="product-detail-description"
      >
        {product.description}
      </p>
      <button
        type="button"
        data-testid="add-to-cart"
        className="px-4 py-2 bg-orange-600 text-white rounded"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
