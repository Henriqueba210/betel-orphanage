import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import image from '@astrojs/image';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
      cacheDir: './.cache/image',
      logLevel: 'debug',
      // Generate multiple sizes for responsive images
      sizes: [400, 800, 1200, 1600],
      // Generate WebP and AVIF formats
      formats: ['webp', 'avif'],
      // Quality settings
      quality: 80,
      // Enable lazy loading
      loading: 'lazy',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    // Optimize build performance
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
            'lucide-react': ['lucide-react'],
          },
        },
      },
    },
  },
  // Enable image optimization
  image: {
    serviceEntryPoint: '@astrojs/image/sharp',
    cacheDir: './.cache/image',
  },
});