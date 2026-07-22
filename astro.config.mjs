// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkGalleries from './src/plugins/remark-galleries.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://catalystneuro.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkGalleries],
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
