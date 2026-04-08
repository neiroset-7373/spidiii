import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: '../public/index.html'
    }
  },
  server: {
    port: 3000,
    open: true
  }
});