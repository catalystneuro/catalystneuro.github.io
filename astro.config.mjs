// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkGalleries from './src/plugins/remark-galleries.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://catalystneuro.com',
  integrations: [
    mdx(),
    // Leave out the newsletter thank-you page and the two redirect pages.
    sitemap({ filter: (url) => !/\/(success|book-intro|nwb-dandi-guide)\/?$/.test(url) }),
  ],
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
