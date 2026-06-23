// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.joshenglish.com',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],

  // Preserve the old Jekyll post URL (category/date permalink) by redirecting
  // it to the new clean slug. Emitted as a meta-refresh page, since GitHub
  // Pages has no server-side redirects.
  redirects: {
    '/self/2024/09/26/who-am-i.html': '/blog/who-am-i/',
  },

  markdown: {
    // Dual Shiki themes; CSS in global.css swaps them with the color-mode toggle.
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
