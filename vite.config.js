import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
  base: '/cx-italia-2026/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wednesday: resolve(__dirname, 'wednesday.html'),
        thursday: resolve(__dirname, 'thursday.html'),
        friday: resolve(__dirname, 'friday.html'),
        saturday: resolve(__dirname, 'saturday.html'),
        sunday: resolve(__dirname, 'sunday.html'),
      },
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['background.jpg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'CX Italia 2026',
        short_name: 'CX Italia',
        description: 'Event program for CX Italia 2026 - Dolomittene & Venezia',
        theme_color: '#a01f1f',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,png}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
