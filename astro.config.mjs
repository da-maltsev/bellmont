// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://da-maltsev.github.io/bellmont',
  base: '/bellmont',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
