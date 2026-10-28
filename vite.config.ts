import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const plugins = [react(), tailwindcss()];

  if (mode === 'analyze') {
    const { visualizer } = await import('rollup-plugin-visualizer');
    plugins.push(visualizer({
      filename: 'bundle-analysis/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }));
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@context': resolve(__dirname, './src/context'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@utils': resolve(__dirname, './src/utils'),
        '@types': resolve(__dirname, './src/types'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            charts: ['recharts'],
            animations: ['framer-motion'],
            icons: ['lucide-react'],
            utils: ['clsx', 'tailwind-merge'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 5173,
      host: true,
    },
  };
});