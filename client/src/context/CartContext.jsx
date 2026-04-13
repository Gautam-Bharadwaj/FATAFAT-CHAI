import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { apiGet, apiPost, apiDelete } from '../api/client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [itemCount, setItemCount] = useState(0);

  const refreshCart = useCallback(async () => {
    if (!token) {
      setItemCount(0);
      return;
    }
    try {
      const data = await apiGet('/api/cart', token);
      const count = (data.items || []).reduce(
        (s, i) => s + (i.quantity || 0),
        0
      );
      setItemCount(count);
    } catch {
      setItemCount(0);
    }
  }, [token]);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      if (!token) return false;
      try {
        await apiPost('/api/cart', { productId, quantity }, token);
        await refreshCart();
        return true;
      } catch (err) {
        console.error('Add to cart failed:', err);
        return false;
      }
    },
    [token, refreshCart]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      if (!token) return false;
      try {
        await apiDelete(`/api/cart/${itemId}`, token);
        await refreshCart();
        return true;
      } catch (err) {
        console.error('Remove from cart failed:', err);
        return false;
      }
    },
    [token, refreshCart]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshCart();
  }, [refreshCart]);

  const value = useMemo(
    () => ({ itemCount, setItemCount, refreshCart, addToCart, removeFromCart }),
    [itemCount, refreshCart, addToCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
