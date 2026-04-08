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
  if (error) return <p className="text-red-600 pt-32 text-center">{error}</p>;

  return (
    <div className="pt-32 pb-24 min-h-screen" data-testid="cart-page">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-black text-amber-900 mb-8 font-['Amatic_SC'] text-center">
          Your Cart
        </h1>

        <div className="max-w-4xl mx-auto sketch-box bg-white/60 p-8 relative">
          {/* Decorative Pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-800 rounded-full shadow-md z-20 border-2 border-white/50"></div>

          <div className="flex flex-col items-center justify-center py-8">
            {cart.items.length === 0 ? (
              <div className="text-center py-12 text-stone-400 font-['Patrick_Hand'] text-2xl">
                Your cart is empty... <br />
                <Link to="/products" className="text-orange-600 underline">
                  Go shopping!
                </Link>
              </div>
            ) : (
              <>
                <div className="w-full space-y-6 mb-12">
                  {cart.items.map((line) => (
                    <CartItem
                      key={line.itemId}
                      itemId={line.itemId}
                      name={line.product.name}
                      price={line.product.price}
                      quantity={line.quantity}
                      image={line.product.image}
                      onQuantityChange={(q) => handleQty(line.itemId, q)}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>

                {/* Summary Section */}
                <div className="w-full border-t-2 border-dashed border-stone-300 pt-8 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-['Patrick_Hand'] text-stone-600">
                      Subtotal
                    </span>
                    <span className="text-2xl font-bold font-['Amatic_SC'] text-stone-800">
                      ₹{cart.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-['Patrick_Hand'] text-stone-600">
                      Shipping
                    </span>
                    <span className="text-xl font-['Patrick_Hand'] text-green-600">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-200">
                    <span className="text-3xl font-bold font-['Amatic_SC'] text-amber-900">
                      Total
                    </span>
                    <span
                      className="text-5xl font-bold font-['Amatic_SC'] text-orange-700"
                      data-testid="cart-subtotal"
                    >
                      ₹{cart.subtotal}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
                    <Link
                      to="/checkout"
                      data-testid="checkout-link"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-full shadow-lg transition-all transform hover:scale-[1.02] hover:rotate-1 text-2xl font-['Amatic_SC'] tracking-wider text-center"
                    >
                      Proceed to Checkout
                    </Link>
                    <p className="text-center text-stone-400 font-['Patrick_Hand'] text-sm">
                      Secure Payment • Fast Delivery
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
