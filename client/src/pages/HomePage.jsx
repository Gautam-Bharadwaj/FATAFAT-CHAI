import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <h1 className="text-3xl font-bold text-amber-900 mb-4">Fatafat Chai</h1>
      <p className="text-stone-700 mb-6">
        Fast, authentic chai — delivered to your door.
      </p>
      <Link to="/products" className="text-orange-700 underline">
        Browse products
      </Link>
    </div>
  );
}
