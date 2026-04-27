import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  }

  return (
    <div
      className="pt-32 pb-24 min-h-screen flex items-center justify-center"
      data-testid="register-page"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="sketch-box bg-white/60 p-8 md:p-12 relative">
          {/* Decorative Pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-800 rounded-full shadow-md z-20 border-2 border-white/50"></div>

          <h1 className="text-6xl font-bold text-amber-900 mb-8 font-['Amatic_SC'] text-center">
            Register
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-['Patrick_Hand'] text-stone-600 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                data-testid="register-name"
                className="w-full px-4 py-3 border-2 border-stone-300 rounded-md bg-white/80 font-['Indie_Flower'] text-lg focus:border-orange-500 focus:outline-none transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Gautam"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-['Patrick_Hand'] text-stone-600 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                data-testid="register-email"
                className="w-full px-4 py-3 border-2 border-stone-300 rounded-md bg-white/80 font-['Indie_Flower'] text-lg focus:border-orange-500 focus:outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="chai@lover.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-['Patrick_Hand'] text-stone-600 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                data-testid="register-password"
                className="w-full px-4 py-3 border-2 border-stone-300 rounded-md bg-white/80 font-['Indie_Flower'] text-lg focus:border-orange-500 focus:outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••"
              />
            </div>
            {error && (
              <p
                className="text-red-600 text-sm font-['Patrick_Hand']"
                data-testid="register-error"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              data-testid="register-submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-full shadow-lg transition-all transform hover:scale-[1.02] text-2xl font-['Amatic_SC'] tracking-wider"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center font-['Patrick_Hand'] text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
