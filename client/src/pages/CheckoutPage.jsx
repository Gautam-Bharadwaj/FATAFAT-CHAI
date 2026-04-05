import { useState } from 'react';

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div data-testid="order-confirmation">
        <p className="text-xl font-semibold text-green-700">
          Thank you! Your order is confirmed.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="checkout-page">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Shipping address
          </label>
          <textarea
            id="address"
            data-testid="checkout-address"
            className="border w-full px-2 py-1"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          data-testid="checkout-submit"
          className="px-4 py-2 bg-orange-600 text-white rounded"
        >
          Place order
        </button>
      </form>
    </div>
  );
}
