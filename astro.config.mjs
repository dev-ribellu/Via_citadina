// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Par défaut : build pour OVH, à la racine du domaine.
// Remplacer le domaine par le domaine définitif avant la mise en ligne.
// Le workflow GitHub Pages surcharge SITE_URL et BASE_PATH.
const SITE = process.env.SITE_URL ?? 'https://via-citadina.example';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
