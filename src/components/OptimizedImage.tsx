import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  caption, 
  className = "", 
  onClick,
  priority = false 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Handle image load events
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  if (isError) {
    return (
      <div className={`bg-base-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm text-base-content/60">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center">
          <div className="text-base-content/30">Loading...</div>
        </div>
      )}

      {/* Standard image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          // Prevent layout shift
          aspectRatio: '16/9',
        }}
      />

      {/* Caption overlay */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-sm">{caption}</p>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
} 