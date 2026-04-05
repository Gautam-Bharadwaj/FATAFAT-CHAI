import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="border-b bg-amber-50 px-4 py-3" data-testid="navbar">
      <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <Link
          to="/"
          className="font-bold text-amber-900"
          data-testid="nav-home"
        >
          Fatafat Chai
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/products" data-testid="nav-products">
            Products
          </Link>
          <Link to="/cart" data-testid="nav-cart">
            Cart
            <span
              data-testid="cart-count"
              className="ml-1 text-orange-700 font-bold"
            >
              {itemCount > 0 ? `(${itemCount})` : ''}
            </span>
          </Link>
          {!user ? (
            <Link to="/login" data-testid="nav-login">
              Login
            </Link>
          ) : (
            <>
              <span data-testid="nav-user-name">{user.name || user.email}</span>
              <button type="button" data-testid="nav-logout" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
