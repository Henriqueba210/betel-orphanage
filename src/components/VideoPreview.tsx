import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoPreviewProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onClick?: () => void;
  poster?: string;
}

export default function VideoPreview({
  src,
  alt,
  caption,
  className = "",
  onClick,
  poster
}: VideoPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video load events
  const handleLoadStart = () => {
    setIsLoaded(false);
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load video when it comes into view
            video.load();
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  if (isError) {
    return (
      <div className={`bg-base-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🎥</div>
          <p className="text-sm text-base-content/60">Video not available</p>
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
          <div className="text-base-content/30">Loading video...</div>
        </div>
      )}

      {/* Video poster/thumbnail */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        poster={poster}
        preload="metadata"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        muted
        style={{
          aspectRatio: '16/9',
        }}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center cursor-pointer">
        <div className="bg-white/90 hover:bg-white text-black p-4 rounded-full transition-all duration-300 hover:scale-110">
          <Play size={24} fill="black" className="ml-1" />
        </div>
      </div>

      {/* Caption overlay */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-sm">{caption}</p>
        </div>
      )}
    </motion.div>
  );
} 