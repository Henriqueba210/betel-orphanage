import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Check if we're on the home page
    setIsHomePage(window.location.pathname === '/');

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine text color based on page and scroll state
  const getTextColor = () => {
    if (isHomePage && !isScrolled) {
      return 'text-white'; // White text on home page when not scrolled
    }
    return 'text-base-content'; // Dark text on all other pages or when scrolled
  };

  const textColor = getTextColor();

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-100/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Home</a></li>
            <li><a href="/banking">Informações Bancárias</a></li>
            <li><a href="/gallery">Galeria</a></li>
            <li><a href="/contact">Contactos</a></li>
          </ul>
        </div>
        <a href="/" className={`btn btn-ghost text-xl font-bold ${textColor}`}>Centro Betel</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/" className={`btn btn-ghost ${textColor}`}>Home</a></li>
          <li><a href="/banking" className={`btn btn-ghost ${textColor}`}>Informações Bancárias</a></li>
          <li><a href="/gallery" className={`btn btn-ghost ${textColor}`}>Galeria</a></li>
          <li><a href="/contact" className={`btn btn-ghost ${textColor}`}>Contactos</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <motion.a 
          href="/contact" 
          className="btn btn-primary btn-lg shadow-lg"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          💚 Doar Agora
        </motion.a>
      </div>
    </nav>
  );
} 