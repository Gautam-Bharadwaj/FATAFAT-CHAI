import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleMenu() {
    setMobileOpen((prev) => !prev);
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 bg-[#f8f5e6]/90 backdrop-blur-md shadow-sm"
      data-testid="navbar"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group relative h-10 w-40"
          data-testid="nav-home"
          onClick={closeMenu}
        >
          <img
            src="/assets/87467283395.png"
            alt="Fatafat Chai"
            className="absolute top-1/2 left-0 -translate-y-1/2 h-28 w-auto max-w-none object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12 items-center">
          <Link
            to="/"
            className="text-lg hover:text-orange-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-lg hover:text-orange-600 transition-colors"
            data-testid="nav-products"
          >
            Our Blends
          </Link>
          <Link
            to="/cart"
            className="text-lg hover:text-orange-600 transition-colors"
            data-testid="nav-cart"
          >
            Cart
            {itemCount > 0 && (
              <span
                data-testid="cart-count"
                className="ml-1 text-orange-700 font-bold"
              >
                ({itemCount})
              </span>
            )}
          </Link>
          {!user ? (
            <Link
              to="/login"
              data-testid="nav-login"
              className="sketch-btn text-sm font-bold tracking-wider hover:scale-105"
            >
              Login
            </Link>
          ) : (
            <>
              <span
                data-testid="nav-user-name"
                className="font-['Patrick_Hand'] text-lg text-stone-700"
              >
                {user.name || user.email}
              </span>
              <button
                type="button"
                data-testid="nav-logout"
                onClick={logout}
                className="sketch-btn text-sm font-bold tracking-wider hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-amber-900 z-50"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 bg-[#f8f5e6] z-40 transition-transform duration-500 flex flex-col items-center justify-center space-y-8 md:hidden ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Link
            to="/"
            onClick={closeMenu}
            className="text-4xl font-['Amatic_SC'] font-bold text-amber-900"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={closeMenu}
            className="text-4xl font-['Amatic_SC'] font-bold text-amber-900"
          >
            Our Blends
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            className="text-4xl font-['Amatic_SC'] font-bold text-orange-600"
          >
            Your Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
          {!user ? (
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-4xl font-['Amatic_SC'] font-bold text-amber-900"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="text-4xl font-['Amatic_SC'] font-bold text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
