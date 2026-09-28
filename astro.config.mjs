// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkGalleries from './src/plugins/remark-galleries.mjs';
import rehypeImageSize from './src/plugins/rehype-image-size.mjs';

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
    // The gallery and image-size plugins are remark/rehype plugins, so keep the
    // unified processor instead of Astro's newer default.
    processor: unified({ remarkPlugins: [remarkGalleries], rehypePlugins: [rehypeImageSize] }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
