import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the built /dist folder works on any static host or sub-path
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
