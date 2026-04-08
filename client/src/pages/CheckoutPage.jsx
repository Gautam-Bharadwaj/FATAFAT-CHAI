import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="pt-32 pb-24 min-h-screen flex items-center justify-center"
        data-testid="order-confirmation"
      >
        <div className="sketch-box bg-white/60 p-12 text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-5xl font-bold text-amber-900 font-['Amatic_SC'] mb-4">
            Thank You!
          </h2>
          <p className="text-xl font-['Patrick_Hand'] text-green-700 mb-6">
            Your order is confirmed.
          </p>
          <p className="text-stone-500 font-['Indie_Flower'] text-lg mb-8">
            We&apos;ll brew your chai with love and ship it fast! 🍵
          </p>
          <Link to="/" className="sketch-btn px-8 py-3 text-lg">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen" data-testid="checkout-page">
      <div className="container mx-auto px-6 max-w-lg">
        <div className="sketch-box bg-white/60 p-8 md:p-12 relative">
          {/* Decorative Pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-800 rounded-full shadow-md z-20 border-2 border-white/50"></div>

          <h1 className="text-6xl font-bold text-amber-900 mb-8 font-['Amatic_SC'] text-center">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="address"
                className="block text-lg font-['Patrick_Hand'] text-stone-600 mb-1"
              >
                Shipping Address
              </label>
              <textarea
                id="address"
                data-testid="checkout-address"
                className="w-full px-4 py-3 border-2 border-stone-300 rounded-md bg-white/80 font-['Indie_Flower'] text-lg focus:border-orange-500 focus:outline-none transition-colors"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your delivery address..."
              />
            </div>
            <button
              type="submit"
              data-testid="checkout-submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-full shadow-lg transition-all transform hover:scale-[1.02] text-2xl font-['Amatic_SC'] tracking-wider"
            >
              Place Order
            </button>
            <p className="text-center text-stone-400 font-['Patrick_Hand'] text-sm">
              Secure Payment • Fast Delivery
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
