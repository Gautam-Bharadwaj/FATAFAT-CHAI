import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { apiDelete, apiGet, apiPatch } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { token } = useAuth();
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const data = await apiGet('/api/cart', token);
      setCart(data);
    } catch (e) {
      setError(e.message);
    }
  }, [token, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleQty(itemId, qty) {
    if (qty < 1) return;
    await apiPatch(`/api/cart/${itemId}`, { quantity: qty }, token);
    await load();
    await refreshCart();
  }

  async function handleRemove(itemId) {
    await apiDelete(`/api/cart/${itemId}`, token);
    await load();
    await refreshCart();
  }

  if (!token) return null;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div data-testid="cart-page">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((line) => (
            <CartItem
              key={line.itemId}
              itemId={line.itemId}
              name={line.product.name}
              price={line.product.price}
              quantity={line.quantity}
              onQuantityChange={(q) => handleQty(line.itemId, q)}
              onRemove={handleRemove}
            />
          ))}
          <p className="text-right font-bold mt-4" data-testid="cart-subtotal">
            Subtotal: ₹{cart.subtotal}
          </p>
          <Link
            to="/checkout"
            data-testid="checkout-link"
            className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded"
          >
            Checkout
          </Link>
        </>
      )}
    </div>
  );
}
