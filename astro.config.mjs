// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Remplacer par le domaine définitif avant la mise en ligne.
const SITE = 'https://via-citadina.example';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
