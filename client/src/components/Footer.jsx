export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 py-16 mt-12 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/bg-parchment.png')] mix-blend-overlay"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-5xl font-bold text-amber-50 mb-4 font-['Amatic_SC']">Fatafat Chai</h2>
          <p className="text-stone-400 max-w-sm text-lg">
            Brewing stories, one cup at a time. Join us on a journey of flavor, tradition, and warmth.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-amber-100 mb-6 font-['Patrick_Hand']">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-orange-400 transition-colors">Shop All</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Wholesale</a></li>
            <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold text-amber-100 mb-6 font-['Patrick_Hand']">Stay Updated</h4>
          <form className="flex border-b border-stone-600 pb-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent w-full outline-none text-stone-100 placeholder-stone-500 font-['Indie_Flower'] text-lg"
            />
            <button className="text-orange-500 hover:text-orange-400 font-bold">→</button>
          </form>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-stone-700 text-stone-500 text-sm relative z-10">
        © 2024 Fatafat Chai. Made in India 🇮🇳
      </div>
    </footer>
  );
}
