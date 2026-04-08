import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      {/* Background Overlay Layers */}
      <div className="bg-overlay-stain" aria-hidden="true"></div>
      <div className="bg-splatters" aria-hidden="true"></div>
      <div className="bg-splatters-bottom" aria-hidden="true"></div>
      <div className="bg-vignette" aria-hidden="true"></div>
      <div className="bg-noise-grain" aria-hidden="true"></div>

      {/* Floating Particles */}
      <div className="floating-particle particle-1">🍃</div>
      <div className="floating-particle particle-2">🌿</div>
      <div className="floating-particle particle-3">✨</div>
      <div className="floating-particle particle-4">🍂</div>
      <div className="floating-particle particle-5">🍃</div>

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
