import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import OptimizedVideo from './OptimizedVideo';

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  type: 'image' | 'video';
}

interface GalleryGridProps {
  items: GalleryItem[];
  title: string;
  description: string;
}

export default function GalleryGrid({ items, title, description }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [videoCaption, setVideoCaption] = useState('');

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideoLightbox = (src: string, caption: string) => {
    setVideoSrc(src);
    setVideoCaption(caption);
    setVideoLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const closeVideoLightbox = () => {
    setVideoLightboxOpen(false);
  };

  const goToPrevious = () => {
    setLightboxIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setLightboxIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeVideoLightbox();
    } else if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-base-content/70">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card bg-base-100 shadow-xl overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <figure className="relative h-48">
              {item.type === 'image' ? (
                <OptimizedImage
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  className="w-full h-full"
                  onClick={() => openLightbox(index)}
                  priority={index < 4} // Load first 4 images with priority
                />
              ) : (
                <OptimizedVideo
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  className="w-full h-full"
                  onClick={() => openVideoLightbox(item.src, item.caption)}
                  muted={true}
                />
              )}
            </figure>
            
            <div className="card-body p-4">
              <p className="text-sm text-base-content/70">{item.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-6xl max-h-full p-4">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            
            <div className="flex items-center justify-between w-full">
              <button 
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <OptimizedImage
                src={items[lightboxIndex]?.src}
                alt={items[lightboxIndex]?.alt}
                className="max-w-full max-h-[80vh] object-contain"
                priority={true}
              />
              
              <button 
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2"
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <p className="text-white text-center mt-4 text-lg">
              {items[lightboxIndex]?.caption}
            </p>
            
            <div className="text-white text-center mt-2 text-sm">
              {lightboxIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      {videoLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button 
              onClick={closeVideoLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2"
              aria-label="Close video lightbox"
            >
              <X size={32} />
            </button>
            
            <OptimizedVideo
              src={videoSrc}
              alt="Video"
              caption={videoCaption}
              className="max-w-full max-h-[80vh]"
              autoplay={true}
              muted={false}
            />
            
            <p className="text-white text-center mt-4 text-lg">
              {videoCaption}
            </p>
          </div>
        </div>
      )}
    </>
  );
} 