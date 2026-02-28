import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://masar-api-emhwehcgh5a8bwhh.italynorth-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})

