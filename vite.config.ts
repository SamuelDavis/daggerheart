/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: 'Daggerheart Character Sheets',
        short_name: 'Daggerheart',
        description: 'Build and manage Daggerheart characters from the SRD.',
        theme_color: '#7a1f2b',
        background_color: '#f9f6f1',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}'],
      },
    }),
  ],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
