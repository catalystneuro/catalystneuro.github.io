/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    server: {
      deps: {
        // react-syntax-highlighter ships a CJS build that require()s ESM-only
        // deps (refractor), throwing ERR_REQUIRE_ESM under Node 18 in CI.
        // Inlining lets vitest transform it through Vite (ESM) instead.
        inline: ['react-syntax-highlighter'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
      ],
    },
  },
})
