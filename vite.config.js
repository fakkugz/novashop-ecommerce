import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/novashop-ecommerce/',
  plugins: [
    react(),
    compression(),
    visualizer({ open: true })
  ],
  build: {
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];
          }
        }
      }
    }
  },
});
