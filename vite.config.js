import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path: for a root domain or Vercel/Netlify deploy, keep as '/'.
// For GitHub Pages project sites, set to '/<repo-name>/' before building.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    sourcemap: false,
  },
})
