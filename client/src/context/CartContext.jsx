import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { apiGet } from '../api/client';

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

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const value = useMemo(
    () => ({ itemCount, setItemCount, refreshCart }),
    [itemCount, refreshCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
