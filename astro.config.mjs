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
    // Leave out form thank-you pages (any path ending in /success/), the two
    // redirect pages, and the noindex legal pages. The redirect names are
    // anchored to the site root so that /nwb-dandi-guide/ (the redirect) is
    // dropped while the real guide at /guides/nwb-dandi-guide/ stays in.
    sitemap({
      filter: (url) => !/^\/((.*\/)?success|book-intro|nwb-dandi-guide|legal\/.*)\/?$/.test(new URL(url).pathname),
    }),
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
