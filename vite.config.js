import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configure server to handle SPA routing (all routes serve index.html)
  server: {
    // Enable history API fallback for development server
    historyApiFallback: true,
  },
  // Configure preview server similarly
  preview: {
    historyApiFallback: true,
  },
})
