import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the built /dist folder works on any static host or sub-path
  base: './',
  build: {
    // Broad tablet/browser compatibility (prevents JS SyntaxError on older
    // Android Chrome / Samsung Internet / iPad Safari and avoids CSS Level-4
    // range media queries like `@media (width >= 721px)` that older tablets drop)
    target: ['es2015', 'chrome64', 'safari12'],
    cssTarget: ['chrome64', 'safari12'],
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
