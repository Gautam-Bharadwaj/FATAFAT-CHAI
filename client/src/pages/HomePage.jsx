import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiGet } from '../api/client';

const STORY_STEPS = [
  {
    num: '01',
    title: 'The Departure',
    text: "Gautam packed his bags for his Master's degree abroad. New city, new dreams. But as the flight took off, he realized he left behind the one thing he loved most—his morning 'Tapri' chai.",
    image: '/assets/tea-garden.png',
    imageAlt: 'Leaving Home',
    caption: 'Memory of Home',
    numColor: 'text-stone-200',
    nodeColor: 'bg-stone-500',
  },
  {
    num: '02',
    title: 'The Craving',
    text: 'Weeks passed. The coffee was too bitter, the tea bags too weak. He missed the ginger punch of Mumbai and the saffron warmth of Kashmir. The taste of his state was nowhere to be found.',
    image: '/assets/gautam-winter.png',
    imageAlt: 'Homesick in Winter',
    numColor: 'text-orange-200',
    nodeColor: 'bg-amber-800',
    imageClass: 'sepia-[50%]',
  },
  {
    num: '03',
    title: 'The Discovery',
    text: "Then a care package arrived via Fatafat. Not just tea, but a collection. 'Mumbai Cutting', 'Kolkata Bhar', 'Jaipur Masala'. Authentic, state-specific blends in travel-friendly packs.",
    image: '/assets/chai-pouch-premium.png',
    imageAlt: 'Fatafat Packs',
    numColor: 'text-green-200',
    nodeColor: 'bg-green-600',
  },
  {
    num: '04',
    title: "Every State's Soul",
    text: "He brewed the 'Mumbai Cutting'. The aroma of crushed cardamom filled his tiny apartment. It wasn't artificial flavor; it was the real soil of Maharashtra coming alive in hot water.",
    image: '/assets/chai-ingredients.png',
    imageAlt: 'Authentic Spices',
    numColor: 'text-orange-200',
    nodeColor: 'bg-orange-500',
  },
  {
    num: '05',
    title: 'Home in a Cup',
    text: "Now, Gautam doesn't miss the taste anymore. Whether he wants the zest of Gujarat or the spice of South India, Fatafat brings every state to his cup.",
    image: '/assets/cozy-cup.png',
    imageAlt: 'Home in a Cup',
    caption: 'Feeling at Home',
    numColor: 'text-yellow-200',
    nodeColor: 'bg-amber-600',
    showCTA: true,
  },
];

const REVIEWS = [
  {
    text: '"Finally, a chai that tastes like home. The ginger hit is real!"',
    author: '- Priya S.',
    style: {
      borderRadius: '2px 25px 5px 20px / 20px 5px 25px 5px',
      boxShadow: '5px 5px 0px rgba(0,0,0,0.05)',
    },
    hoverClass: 'hover:-rotate-1',
  },
  {
    text: '"The packaging is beautiful and the taste is even better. Love the Elaichi."',
    author: '- Rahul M.',
    style: {
      borderRadius: '25px 5px 20px 2px / 5px 25px 2px 20px',
      boxShadow: '5px 5px 0px rgba(0,0,0,0.05)',
    },
    hoverClass: 'hover:rotate-1',
  },
  {
    text: '"Instant chai usually sucks. This one actually rocks. My office staple now."',
    author: '- Aman K.',
    style: {
      borderRadius: '5px 20px 2px 25px / 25px 2px 20px 5px',
      boxShadow: '5px 5px 0px rgba(0,0,0,0.05)',
    },
    hoverClass: 'hover:-rotate-1',
  },
];

const SPICES = [
  { name: 'Ginger', image: '/assets/ginger.png' },
  { name: 'Cardamom', image: '/assets/cardamom.png' },
  { name: 'Tulsi', image: '/assets/tulsi.png' },
  { name: 'Cinnamon', image: '/assets/cinnamon.png' },
  { name: 'Black Pepper', image: '/assets/pepper.png', dataName: 'Pepper' },
  { name: 'Clove', image: '/assets/clove.png' },
  { name: 'Fennel', image: '/assets/fennel.png' },
];

const basePrices = { plain: 450, one: 450, two: 450 };
const addOnPrices = { plain: 0, one: 70, two: 140 };

export default function HomePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [currentBase, setCurrentBase] = useState('plain');
  const [selectedSpices, setSelectedSpices] = useState([]);

  useEffect(() => {
    apiGet('/api/products')
      .then((data) => setProducts(data.slice(0, 6)))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const maxSpices = currentBase === 'one' ? 1 : currentBase === 'two' ? 2 : 0;
  const addOn = addOnPrices[currentBase];
  const total = basePrices[currentBase] + (currentBase === 'plain' ? 0 : addOn);

  function handleBaseChange(type) {
    setCurrentBase(type);
    if (type === 'plain') {
      setSelectedSpices([]);
    } else {
      const newMax = type === 'one' ? 1 : 2;
      setSelectedSpices((prev) => prev.slice(0, newMax));
    }
  }

  function handleSpiceToggle(spice) {
    setSelectedSpices((prev) => {
      if (prev.includes(spice)) {
        return prev.filter((s) => s !== spice);
      }
      if (prev.length < maxSpices) {
        return [...prev, spice];
      }
      if (maxSpices === 1) {
        return [spice];
      }
      return prev;
    });
  }

  async function handleAddProduct(product) {
    if (!token) {
      navigate('/login');
      return;
    }
    const success = await addToCart(product._id, 1);
    if (success) {
      alert(`${product.name} added to cart! 🍵`);
    } else {
      alert('Failed to add to cart. Please try again.');
    }
  }

  function handleCustomBuy() {
    // For now, since custom logic isn't in backend, redirect to products or alert
    alert(
      `Custom blend (${selectedSpices.join(', ')}) order functionality is coming soon! For now, try our bestsellers. 🎉`
    );
    navigate('/products');
  }

  return (
    <div data-testid="home-page">
      {/* ═══ HERO SECTION ═══ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
      >
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left z-10">
            <h2 className="text-3xl md:text-5xl font-['Patrick_Hand'] text-stone-500 mb-2 transform -rotate-1">
              Experience Authentic Flavor
            </h2>
            <h1 className="text-7xl md:text-9xl font-['Amatic_SC'] font-bold text-amber-900 leading-none mb-6 drop-shadow-sm">
              The Soul of
              <br />
              <span className="text-orange-700">India&apos;s Streets</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-700 mb-8 font-['Indie_Flower'] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Hand-picked spices, premium Assam tea, and the warmth of a hundred
              suns. Brewed in seconds, savored for hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <a
                href="#shop"
                className="sketch-btn bg-white/50 backdrop-blur-sm animate-scribble"
              >
                Browse Chai Blends
              </a>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="order-1 lg:order-2 relative select-none pointer-events-none">
            <div className="absolute inset-0 bg-orange-200 blur-[80px] opacity-20 rounded-full"></div>
            <img
              src="/assets/chai-branded.png"
              alt="Chai Vendor Illustration"
              className="relative w-full max-w-2xl mx-auto drop-shadow-xl transform hover:scale-[1.01] transition-transform duration-700"
              style={{
                WebkitMaskImage:
                  'radial-gradient(circle at center, black 60%, transparent 100%)',
                maskImage:
                  'radial-gradient(circle at center, black 60%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 text-6xl opacity-20 rotate-12 select-none pointer-events-none">
          ✨
        </div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 -rotate-12 select-none pointer-events-none">
          🌿
        </div>
      </section>

      {/* Section Divider */}
      <div className="sketch-divider container mx-auto"></div>

      {/* ═══ PRODUCT GRID ═══ */}
      <section id="shop" className="section-padding relative">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black text-amber-900 mb-4 font-['Amatic_SC']">
            Our Blends
          </h2>
          <div className="h-1 w-24 bg-amber-600 mx-auto rounded-full opacity-60"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {products.map((product, i) => (
            <div
              key={product._id}
              className={`sketch-box bg-white/60 relative group ${i > 2 ? 'mt-8 md:mt-12' : i > 0 && i <= 2 ? 'mt-8 md:mt-0' : ''}`}
            >
              <div className="h-48 flex items-center justify-center mb-6 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain transition-all duration-500 transform group-hover:scale-110"
                />
              </div>
              <h3 className="text-4xl font-bold font-['Amatic_SC'] text-amber-900 mb-2">
                {product.name}
              </h3>
              <p className="text-stone-600 mb-6 text-lg leading-snug">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-orange-800">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => handleAddProduct(product)}
                  className="sketch-btn text-sm py-2 px-6"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="sketch-divider container mx-auto"></div>

      {/* ═══ STORY SECTION ═══ */}
      <section
        id="story"
        style={{ zoom: 0.85 }}
        className="py-24 relative overflow-hidden bg-[#fdfbf7]"
      >
        {/* Train Track */}
        <div
          className="absolute left-1/2 top-72 bottom-0 w-10 -translate-x-1/2 hidden md:block border-x-4 border-double border-stone-500 bg-stone-900 opacity-95 z-0 shadow-[0_0_15px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent, transparent 14px, #57534e 14px, #57534e 18px)',
          }}
        ></div>

        {/* Toy Train */}
        <div className="absolute left-1/2 -translate-x-1/2 top-72 z-30 hidden md:flex flex-col items-center transform rotate-180 origin-center filter drop-shadow-xl">
          <div className="relative w-full flex justify-center mb-2">
            <div className="absolute -top-12 w-6 h-6 bg-white/40 rounded-full animate-ping delay-75"></div>
            <div className="absolute -top-6 w-4 h-4 bg-white/60 rounded-full animate-ping"></div>
          </div>
          <img
            src="/assets/train.svg"
            className="w-20 h-40 transform scale-110"
            alt="Vintage Steam Train"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 md:mb-32">
            <span className="text-orange-600 font-bold tracking-widest uppercase mb-2 block font-['Patrick_Hand'] text-xl">
              Ideally Yours
            </span>
            <h2 className="text-6xl md:text-8xl font-bold text-amber-900 font-['Amatic_SC'] leading-none">
              A Taste of <span className="text-orange-600">Home</span>
            </h2>
          </div>

          {/* Story Steps */}
          {STORY_STEPS.map((step, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={step.num}
                className={`flex flex-col md:flex-row items-center justify-between ${i < STORY_STEPS.length - 1 ? 'mb-24' : ''} relative group`}
              >
                {isRight ? (
                  <>
                    {/* Text Side (Left) */}
                    <div className="w-full md:w-5/12 text-center md:text-right pr-0 md:pr-12 md:order-1 mb-8 md:mb-0 order-2">
                      <div className="sketch-box bg-white/60 p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative">
                        <span
                          className={`text-8xl absolute -top-10 -right-6 ${step.numColor} font-black font-['Amatic_SC'] select-none -z-10`}
                        >
                          {step.num}
                        </span>
                        <h3 className="text-5xl font-bold text-amber-900 font-['Amatic_SC'] mb-4">
                          {step.title}
                        </h3>
                        <p className="font-['Indie_Flower'] text-xl text-stone-700 leading-relaxed">
                          {step.text}
                        </p>
                        {step.showCTA && (
                          <a
                            href="#shop"
                            className="inline-block sketch-btn px-8 py-3 text-2xl font-bold text-amber-900 hover:scale-105 mt-6"
                          >
                            Find Your State
                          </a>
                        )}
                      </div>
                    </div>
                    {/* Node */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white ${step.nodeColor} shadow-md hidden md:flex items-center justify-center z-20 md:order-2`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    {/* Image Side (Right) */}
                    <div className="w-full md:w-5/12 pl-0 md:pl-12 md:order-3 mb-10 md:mb-0 order-1">
                      <div className="relative">
                        <div className="absolute -inset-4 border-2 border-stone-800 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] opacity-20 transform rotate-2"></div>
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          className={`w-full max-w-sm mx-auto drop-shadow-2xl rounded-2xl transform rotate-2 hover:scale-105 transition-transform duration-500 ${step.imageClass || ''}`}
                        />
                        {step.caption && (
                          <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded text-xs font-['Patrick_Hand']">
                            {step.caption}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image Side (Left) */}
                    <div className="w-full md:w-5/12 pr-0 md:pr-12 mb-10 md:mb-0">
                      <div className="relative">
                        <div className="absolute -inset-4 border-2 border-stone-800 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] opacity-20 transform -rotate-2"></div>
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          className={`w-full max-w-sm mx-auto drop-shadow-2xl rounded-2xl transform -rotate-2 hover:scale-105 transition-transform duration-500 ${step.imageClass || ''}`}
                        />
                      </div>
                    </div>
                    {/* Node */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white ${step.nodeColor} shadow-md hidden md:flex items-center justify-center z-20`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    {/* Text Side (Right) */}
                    <div className="w-full md:w-5/12 text-center md:text-left pl-0 md:pl-12">
                      <div className="sketch-box bg-white/60 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative">
                        <span
                          className={`text-8xl absolute -top-10 -left-6 ${step.numColor} font-black font-['Amatic_SC'] select-none -z-10`}
                        >
                          {step.num}
                        </span>
                        <h3 className="text-5xl font-bold text-amber-900 font-['Amatic_SC'] mb-4">
                          {step.title}
                        </h3>
                        <p className="font-['Indie_Flower'] text-xl text-stone-700 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="section-padding bg-black/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-amber-900 mb-16 font-['Amatic_SC']">
            Chai Lovers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className={`bg-white p-8 shadow-sm relative pt-12 transform ${review.hoverClass} transition-transform duration-300 ${i > 0 ? 'mt-8 md:mt-0' : ''}`}
                style={review.style}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center text-2xl shadow-inner">
                  ❝
                </div>
                <p className="text-stone-600 italic mb-4 text-lg">
                  {review.text}
                </p>
                <h4 className="font-bold text-orange-800 font-['Patrick_Hand'] text-xl">
                  {review.author}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CUSTOM CHAI SECTION ═══ */}
      <section
        id="custom-chai"
        className="py-24 relative overflow-hidden bg-[#faf9f1]"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Product Visual */}
            <div className="relative group">
              <div className="absolute -inset-4 border-2 border-dashed border-stone-300 rounded-3xl animate-pulse opacity-30"></div>
              <div className="sketch-box bg-white p-4 relative overflow-hidden">
                <img
                  src="/assets/chai-pouch-premium.png"
                  alt="Custom Chai Pack"
                  className="w-full h-auto drop-shadow-2xl rounded-xl"
                />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 bg-white/90 backdrop-blur-sm p-4 border-2 border-stone-800 rotate-1 shadow-xl">
                  <p className="font-['Amatic_SC'] text-4xl text-center text-amber-900 font-bold">
                    Specially Crafted For You
                  </p>
                </div>
              </div>
              {/* Decorative Spices */}
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20 pointer-events-none rotate-12">
                <img
                  src="/assets/chai-ingredients.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Customization Controls */}
            <div className="flex flex-col space-y-8">
              <div>
                <h2 className="text-6xl font-black text-amber-900 mb-2 font-['Amatic_SC']">
                  Make Your Own Chai - 400g Pack
                </h2>
                <div className="h-1.5 w-24 bg-orange-500 rounded-full opacity-60"></div>
              </div>

              {/* Base Selection */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {[
                    { type: 'plain', label: 'Plain Assam Tea Gold' },
                    { type: 'one', label: 'Tea + 1 Spice' },
                    { type: 'two', label: 'Tea + 2 Spices' },
                  ].map((opt) => (
                    <button
                      key={opt.type}
                      className={`base-option px-6 py-2 border-2 rounded-md font-bold transition-all text-sm ${
                        currentBase === opt.type
                          ? 'border-orange-600 bg-orange-50 text-orange-900'
                          : 'border-stone-200 bg-white hover:border-orange-300'
                      }`}
                      onClick={() => handleBaseChange(opt.type)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Selection */}
              {currentBase !== 'plain' && (
                <div className="space-y-4">
                  <p className="text-stone-500 font-['Patrick_Hand'] text-xl">
                    Please choose <span>{maxSpices}</span> spice
                    {maxSpices > 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-6">
                    {SPICES.map((spice) => {
                      const isActive = selectedSpices.includes(
                        spice.dataName || spice.name
                      );
                      return (
                        <button
                          key={spice.name}
                          className={`spice-btn flex flex-col items-center gap-2 group ${isActive ? 'active' : ''}`}
                          onClick={() =>
                            handleSpiceToggle(spice.dataName || spice.name)
                          }
                        >
                          <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 overflow-hidden bg-white shadow-sm transition-all flex items-center justify-center relative ${isActive ? 'border-orange-500 shadow-md' : 'border-stone-100 hover:border-orange-400'}`}
                          >
                            <img
                              src={spice.image}
                              alt={spice.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                            {isActive && (
                              <div className="absolute bottom-0 right-1 bg-white border border-stone-200 rounded-full p-0.5 shadow-sm z-10">
                                <svg
                                  className="w-4 h-4 text-orange-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-bold text-stone-700 font-['Patrick_Hand']">
                            {spice.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price Summary */}
              <div className="space-y-6 pt-4 border-t border-stone-200">
                <div className="p-4 border-2 border-stone-800 rounded-sm bg-white/50 text-stone-700 font-['Patrick_Hand'] text-xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                  Selection will add{' '}
                  <span className="text-orange-700 font-bold">
                    ₹{currentBase === 'plain' ? 0 : addOn}
                  </span>{' '}
                  to the price
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-['Patrick_Hand'] text-lg uppercase tracking-widest">
                      Estimated Total
                    </span>
                    <span className="text-5xl font-bold text-amber-900 font-['Amatic_SC']">
                      ₹{total}
                    </span>
                  </div>

                  <button
                    onClick={handleCustomBuy}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-full shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 text-xl font-['Patrick_Hand'] uppercase tracking-wider"
                  >
                    <span>Buy on Website</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                  <p className="text-xs text-center text-stone-400 font-['Patrick_Hand']">
                    Premium Batch • Hand-Packed in 400g Pouches
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
