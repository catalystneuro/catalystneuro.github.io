import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
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
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about/index.html'),
        team: path.resolve(__dirname, 'team/index.html'),
        blog: path.resolve(__dirname, 'blog/index.html'),
        software: path.resolve(__dirname, 'software/index.html'),
        openings: path.resolve(__dirname, 'openings/index.html'),
        'funded-projects': path.resolve(__dirname, 'funded-projects/index.html'),
        'nwb-conversions': path.resolve(__dirname, 'nwb-conversions/index.html'),
      }
    }
  },
}));
