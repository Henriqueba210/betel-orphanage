import { useState, useEffect, useRef } from 'react';
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
  const [showImage, setShowImage] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle image load events
  const handleLoad = () => {
    console.log(`✅ Image loaded: ${src}`);
    setIsLoaded(true);
    setShowImage(true);
  };

  const handleError = () => {
    console.error(`❌ Image failed to load: ${src}`);
    setIsError(true);
    setShowImage(true); // Show error state
  };

  // Fallback: if image is already loaded (cached), mark as loaded
  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) {
        console.log(`✅ Image already cached: ${src}`);
        setIsLoaded(true);
        setShowImage(true);
      }
    }
  }, [src]);

  // Timeout fallback to prevent infinite loading - shorter timeout for better UX
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded && !isError) {
        console.warn(`⚠️ Image timeout, forcing display: ${src}`);
        setShowImage(true); // Force show image even if onLoad didn't fire
        setIsLoaded(true); // Mark as loaded to hide loading state
      }
    }, 1500); // Reduced to 1.5 seconds for better UX

    return () => clearTimeout(timeout);
  }, [isLoaded, isError, src]);

  // Show image after a brief delay to prevent flash
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowImage(true);
    }, 100);

    return () => clearTimeout(showTimeout);
  }, []);

  if (isError) {
    return (
      <div className={`bg-base-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm text-base-content/60">Image not available</p>
          <p className="text-xs text-base-content/40 mt-1">{src}</p>
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
        <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center z-10">
          <div className="text-base-content/30">Loading...</div>
        </div>
      )}

      {/* Standard image */}
      {showImage && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-50'
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
      )}

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