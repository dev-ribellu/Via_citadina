# Relier le formulaire à Google Sheets

Durée : une quinzaine de minutes. Il faut un compte Google, avec la validation
en deux étapes (2FA) activée : le Sheet contiendra des données sensibles.

## 1. Créer le Google Sheet

1. Se connecter avec le compte du collectif **viacitadina@gmail.com** (propriétaire
   du Sheet et du script), ouvrir https://sheets.google.com et créer une feuille vide.
2. La renommer « Via Citadina – Contributions ».
3. Récupérer son **ID** dans l'adresse :
   `https://docs.google.com/spreadsheets/d/`**`CET_IDENTIFIANT`**`/edit`

Pas besoin de créer les onglets à la main : le script s'en charge.

## 2. Coller le script

1. Dans le Sheet : **Extensions › Apps Script**.
2. Supprimer le contenu de `Code.gs` et coller celui de [`Code.gs`](Code.gs).
3. Remplacer `REMPLACER_PAR_ID_DU_SHEET` par l'ID copié à l'étape 1.
4. Enregistrer (icône disquette).

## 3. Créer les onglets

1. Dans la liste déroulante des fonctions (en haut), choisir **`initialiser`**.
2. Cliquer sur **Exécuter**.
3. Google demande une autorisation : choisir votre compte, puis
   « Paramètres avancés › Accéder au projet (non sécurisé) » — c'est votre
   propre script, l'avertissement est normal.
4. Revenir au Sheet : les onglets **Contributions** et **Contacts** existent,
   avec leurs en-têtes.

## 4. Déployer en application web

1. **Déployer › Nouveau déploiement**.
2. Type (roue dentée) : **Application Web**.
3. Description : `Formulaire site`.
4. Exécuter en tant que : **Moi**.
5. Qui a accès : **Tout le monde**.
6. **Déployer**, puis copier l'**URL de l'application Web** (elle finit par `/exec`).

Vérification : ouvrir cette URL dans un navigateur doit afficher
`{"ok":true,"service":"via-citadina"}`.

## 5. Brancher le site

1. À la racine du projet, copier `.env.example` en `.env`.
2. Y coller l'URL :
   ```
   PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
   ```
3. Relancer `npm run dev` et envoyer une contribution de test.
4. Pour la mise en ligne sur OVH, l'URL est intégrée au site au moment du build :
   relancer `npm run build` puis renvoyer le dossier `dist/` (voir [DEPLOIEMENT-OVH.md](../DEPLOIEMENT-OVH.md)).

> Cette URL n'est pas un mot de passe (elle est visible dans le code du site
> publié), mais elle n'a pas à traîner sur GitHub : `.env` est exclu par `.gitignore`.

## Modifier le script plus tard

Après toute modification de `Code.gs` : **Déployer › Gérer les déploiements ›
(crayon) › Version : Nouvelle version › Déployer**. L'URL reste la même.
Si vous créez un *nouveau* déploiement à la place, l'URL change : il faut
mettre à jour `.env`, refaire `npm run build` et renvoyer `dist/` sur OVH.

## Sécurité et RGPD

- Propriétaire : viacitadina@gmail.com. Accès réservé aux **deux membres habilités**
  désignés par le bureau (partage nominatif, jamais « tous les utilisateurs disposant du
  lien »). La 2FA est obligatoire sur ces comptes et sur le compte propriétaire.
- Toute nouvelle personne ayant accès doit être reportée dans la politique de
  confidentialité (« deux membres habilités »).
- L'onglet **Contacts** contient les données identifiantes : on peut le protéger
  (clic droit sur l'onglet › Protéger la feuille) pour en limiter l'édition.
- Les contributions sont enregistrées sans identité ; la colonne **ID** permet,
  si besoin, de retrouver le contact correspondant.
- Supprimer les contacts 3 ans après le dernier échange (voir la politique de
  confidentialité), et traiter les demandes de suppression en effaçant la ligne
  dans **Contacts** et la contribution associée si la personne le demande.

## En cas de problème

| Symptôme | Cause probable |
| --- | --- |
| « Le formulaire n'est pas encore relié… » | `PUBLIC_SHEETS_ENDPOINT` absent : vérifier `.env`, relancer le serveur. |
| « L'envoi a échoué » | Déploiement pas en accès « Tout le monde », ou ancienne version déployée. |
| Rien n'arrive dans le Sheet | `SHEET_ID` incorrect : voir **Exécutions** dans Apps Script pour l'erreur. |
