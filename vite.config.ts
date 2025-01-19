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
  assetsInclude: ["**/*.md", "src/content/**/*.md"],
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Keep markdown files in their original structure
          if (assetInfo.name && assetInfo.name.endsWith('.md')) {
            return assetInfo.name.replace('src/', '');
          }
          // Keep image names and paths as they are
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return assetInfo.name;
          }
          // For other assets, use hashed names
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
}));
