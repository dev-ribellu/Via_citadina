Prépare une mise en ligne sur l'hébergement web OVH :
1. Vérifie que `.env` existe et contient `PUBLIC_SHEETS_ENDPOINT` (sans afficher sa valeur),
   et que `.env` n'est pas commité.
2. Vérifie que le domaine a remplacé `via-citadina.example` dans `astro.config.mjs`
   et `public/robots.txt`, et signale les éléments `a-completer` restants dans les pages légales.
3. Lance `npm run build` et vérifie qu'il n'y a pas d'erreur, et que `dist/.htaccess` est présent.
4. Rappelle les étapes d'envoi FTP de `dist/` vers `www` décrites dans `DEPLOIEMENT-OVH.md`.
