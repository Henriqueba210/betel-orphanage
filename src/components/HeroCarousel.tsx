import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const slides = [
  {
    id: 1,
    image: '/images/page_1_img_1.png',
    title: 'Centro de Acolhimento Betel',
    subtitle: 'Oferecendo esperança e um lar para crianças órfãs em Moçambique',
    buttonText: 'Saiba Mais'
  },
  {
    id: 2,
    image: '/images/page_11_img_1.jpeg',
    title: 'Construindo o Futuro',
    subtitle: 'Acompanhe o progresso da construção do nosso centro',
    buttonText: 'Ver Galeria'
  },
  {
    id: 3,
    image: '/images/page_14_img_1.jpeg',
    title: 'Junte-se à Nossa Missão',
    subtitle: 'Sua doação faz a diferença na vida de uma criança',
    buttonText: 'Doar Agora'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isUserInteracting) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isUserInteracting]);

  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Resume auto-advance after 10 seconds of no interaction
    timeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 10000);
  };

  const nextSlide = () => {
    handleUserInteraction();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    handleUserInteraction();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    handleUserInteraction();
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="hero min-h-screen"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  {slides[currentSlide].title}
                </h1>
                <p className="mb-5">
                  {slides[currentSlide].subtitle}
                </p>
                <motion.button 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slides[currentSlide].buttonText}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white border-none rounded-full w-12 h-12 flex items-center justify-center z-10 transition-all duration-200"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        ❮
      </motion.button>
      <motion.button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white border-none rounded-full w-12 h-12 flex items-center justify-center z-10 transition-all duration-200"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        ❯
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Preload next images for smooth transitions */}
      <div className="hidden">
        {slides.map((slide, index) => (
          <OptimizedImage
            key={index}
            src={slide.image}
            alt={slide.title}
            priority={index === 0} // Only preload first image
          />
        ))}
      </div>
    </section>
  );
} 