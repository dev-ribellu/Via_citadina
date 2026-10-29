# Mettre le site en ligne sur OVH

Le site est statique : on le construit sur l'ordinateur, puis on envoie le
dossier `dist/` sur l'hébergement OVH. Aucun Node.js n'est nécessaire chez OVH.

## Ce qu'il faut avant de commencer

- Une offre d'**hébergement web** OVH (Perso, Pro…) liée au nom de domaine.
- Les **identifiants FTP** : espace client OVH › Web Cloud › Hébergements ›
  votre hébergement › onglet **FTP-SSH** (serveur, login, mot de passe).
  Le mot de passe se (ré)initialise depuis ce même onglet.
- Un logiciel FTP, par exemple **FileZilla** (gratuit).
- Le fichier `.env` rempli avec l'URL Apps Script (voir `apps-script/GUIDE.md`).

## Avant le premier envoi

1. Remplacer `https://via-citadina.example` par le vrai domaine dans
   `astro.config.mjs` et `public/robots.txt`.
2. Compléter les éléments surlignés des pages légales.

## À chaque mise à jour

1. Construire le site :
   ```bash
   npm run build
   ```
2. Ouvrir FileZilla et se connecter avec les identifiants FTP OVH
   (protocole **SFTP** si l'offre le permet, sinon FTP avec TLS).
3. Côté serveur, ouvrir le dossier **`www`** : c'est la racine du site.
4. Côté ordinateur, ouvrir le dossier **`dist`** du projet.
5. Sélectionner **tout le contenu** de `dist` (y compris le fichier caché
   `.htaccess`) et le glisser dans `www`. Accepter d'écraser les fichiers.
6. Ouvrir le site dans un navigateur et envoyer une contribution de test.

Astuce FileZilla : menu **Serveur › Forcer l'affichage des fichiers cachés**
pour voir et envoyer `.htaccess`.

## HTTPS

Dans l'espace client OVH › votre hébergement › **Multisite**, vérifier que le
certificat **SSL** (Let's Encrypt, gratuit) est actif pour le domaine et le
`www`. Le fichier `.htaccess` fourni redirige ensuite tout le trafic vers HTTPS.

## En cas de problème

| Symptôme | Cause probable |
| --- | --- |
| Page OVH « Site en construction » | Fichiers envoyés ailleurs que dans `www`, ou ancien `index.html` d'OVH resté en place. |
| Mise en page cassée | Le dossier `_astro` n'a pas été envoyé. |
| Le formulaire dit « pas encore relié » | `.env` vide au moment du build : le remplir, refaire `npm run build`, renvoyer `dist`. |
| Erreur « trop de redirections » | Le SSL n'est pas actif côté OVH alors que `.htaccess` force HTTPS. |
