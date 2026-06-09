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
  ssr: {
    // react-syntax-highlighter ships ESM with extensionless relative imports
    // that Node's resolver rejects when externalized. Bundle it for SSG so
    // Vite/Rollup resolves those imports instead.
    noExternal: ["react-syntax-highlighter"],
  },
  ssgOptions: {
    entry: "src/main.tsx",
    // Emit /route/index.html (matches the prior layout and the SPA redirects).
    dirStyle: "nested",
    // Concrete paths for dynamic routes come from each route's getStaticPaths().
    includeAllRoutes: false,
  },
  build: {
    assetsDir: 'assets',
    copyPublicDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
      output: {
        assetFileNames: (assetInfo) => {
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
