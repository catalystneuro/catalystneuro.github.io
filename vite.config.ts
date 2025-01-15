import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        '404': path.resolve(__dirname, '404.html'),
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    mdx(),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {},
    'Buffer': ['buffer', 'Buffer'],
  },
  optimizeDeps: {
    include: ['buffer'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  assetsInclude: ["**/*.md"],
}));
