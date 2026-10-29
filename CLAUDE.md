# Via Citadina – Site collectif

## Contexte
Site web du collectif politique « Via Citadina » (Corse). Réaction au rejet par le
Sénat du processus d'autonomie. Objectif : collecter des contributions citoyennes
pour un « projet de société pour la Corse » et des coordonnées de personnes
souhaitant rejoindre la démarche.

## Objectif technique
Page unique (one-page) + pages légales. Un formulaire envoie toutes les
données vers un Google Sheet via Google Apps Script (Web App).

## Stack
- Astro + Tailwind CSS (site statique)
- Google Apps Script pour la réception des données
- Déploiement : hébergement web OVH (envoi FTP de `dist/` dans `www`, voir `DEPLOIEMENT-OVH.md`)

## Identité visuelle
- Logo : /public/logo-via-citadina.png (tour génoise rouge + texte VIA CITADINA
  en dégradé rouge → rose → orange → jaune → vert)
- Couleurs : rouge #E8202A, rose #D6246E, orange #EE7A1B, jaune #F5A81C,
  vert vif #7AB929, vert #1FA83C. Fond blanc, texte gris très foncé #1A1A1A.
- Typo : sans-serif géométrique grasse (Poppins / Montserrat) pour les titres,
  Inter pour le texte.
- Style : sobre, moderne, chaleureux, beaucoup d'espace blanc.

## Ton éditorial
Digne, ferme, positif, tourné vers l'avenir. Pas d'insulte, pas de
victimisation excessive. Message clé : « Pas de résignation, mais réappropriation
démocratique. » Tutoiement interdit, vouvoiement/« nous » inclusif.

## Formulaire – champs
Contributions :
- Thématique (select : Langue & culture, Économie, Logement & foncier, Environnement,
  Éducation, Santé, Jeunesse, Démocratie & institutions, Autre)
- Proposition (textarea, requis)
- Comment la concrétiser ? (textarea)
Coordonnées (optionnelles) :
- Prénom, Nom, Email, Téléphone, Commune, Souhaite être recontacté (checkbox),
  Souhaite participer à des rencontres (checkbox)
- Consentement RGPD (checkbox, requis si coordonnées fournies)
- Honeypot caché « website »

## Règles
- Ne jamais committer d'URL secrète ou de clé : utiliser `.env` (PUBLIC_SHEETS_ENDPOINT).
- Accessibilité WCAG AA (contraste, labels, focus, navigation clavier).
- Mobile-first.
- Aucune dépendance de tracking tiers sans consentement.
- Toujours valider côté client ET côté Apps Script.
- Textes en français ; prévoir clés i18n pour ajouter le corse.

## Commandes
- `npm run dev` : développement
- `npm run build` : build pour OVH (avec l'URL Apps Script de `.env`, ne pas committer ce `dist/`)
- `npm run build:depot` : build sans URL Apps Script, seul `dist/` à committer sur GitHub
- `/deploy` : déploiement
- `/audit` : audit accessibilité/SEO/RGPD

## Texte du manifeste
Le texte du manifeste est dans `src/content/manifeste.md` — ne pas le réécrire
sans demande explicite, seulement corriger la typographie.
