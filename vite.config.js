import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Example: Specifies the output directory
    sourcemap: true,  // Example: Generates source maps
    // Add more build options here
  },
  server: {
    port: 3000,  // Example: Defines the development server port
    open: true,  // Example: Automatically opens the browser on server start
    // Add more server options here
  }
})
