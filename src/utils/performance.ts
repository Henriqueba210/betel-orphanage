// Performance optimization utilities

export const IMAGE_SIZES = {
  thumbnail: 400,
  small: 800,
  medium: 1200,
  large: 1600,
  hero: 1920,
} as const;

export const VIDEO_QUALITIES = {
  low: { width: 640, height: 360 },
  medium: { width: 1280, height: 720 },
  high: { width: 1920, height: 1080 },
} as const;

// Generate responsive image srcset
export function generateImageSrcSet(src: string, sizes: number[] = [400, 800, 1200, 1600]): string {
  return sizes
    .map(size => `${src}?w=${size} ${size}w`)
    .join(', ');
}

// Generate responsive sizes attribute
export function generateSizesAttribute(breakpoints: Record<string, string>): string {
  return Object.entries(breakpoints)
    .map(([query, size]) => `(${query}) ${size}`)
    .join(', ');
}

// Default responsive sizes for gallery grid
export const GALLERY_SIZES = generateSizesAttribute({
  'max-width: 768px': '100vw',
  'max-width: 1024px': '50vw',
  'max-width: 1536px': '33vw',
  'default': '25vw',
});

// Default responsive sizes for hero images
export const HERO_SIZES = generateSizesAttribute({
  'max-width: 768px': '100vw',
  'max-width: 1024px': '100vw',
  'max-width: 1536px': '100vw',
  'default': '100vw',
});

// Intersection Observer options for lazy loading
export const LAZY_LOAD_OPTIONS = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1,
} as const;

// Image loading strategies
export const LOADING_STRATEGIES = {
  LAZY: 'lazy',
  EAGER: 'eager',
  PRIORITY: 'eager',
} as const;

// Video preload strategies
export const VIDEO_PRELOAD_STRATEGIES = {
  NONE: 'none',
  METADATA: 'metadata',
  AUTO: 'auto',
} as const;

// Performance monitoring
export function measureImageLoadTime(src: string): Promise<number> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(loadTime);
    };
    
    img.onerror = () => {
      resolve(-1); // Error loading
    };
    
    img.src = src;
  });
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if device supports WebP
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Check if device supports AVIF
export function supportsAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 1);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}

// Get optimal image format based on browser support
export async function getOptimalImageFormat(): Promise<'webp' | 'avif' | 'jpeg'> {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpeg';
} 