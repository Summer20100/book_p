import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      outDir: 'dist',
      manifest: {
        name: 'PhoheBook',
        short_name: 'BOOK',
        description: 'PhoneBook of my collegues',
        theme_color: '#ffffff',
        icons: [
          {
            src: "assets/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "assets/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "assets/icons/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "assets/icons/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any"
          },

          {
            src: "assets/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "assets/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "assets/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "maskable any"
          }

        ],
      }
    })
  ],
  server: {
    host: '0.0.0.0',
  }
})
