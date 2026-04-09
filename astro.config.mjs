// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://da-maltsev.github.io/bellmont',
  base,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
