import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/books': {
        target: 'http://localhost:5000', // Backend server URL
        changeOrigin: true, // Adjust the request origin to match the target
        secure: false, // Use false if the backend doesn't use HTTPS
      },
    },
  },
});
