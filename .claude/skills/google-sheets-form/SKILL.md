---
name: google-sheets-form
description: Crée et débogue le pipeline formulaire HTML → Google Apps Script → Google Sheets, avec validation, anti-spam et gestion CORS. À utiliser pour tout ce qui touche au formulaire ou à la réception des données.
---
# Formulaire → Google Sheets

## Côté Google
1. Créer un Google Sheet « Via Citadina – Contributions » avec 2 onglets :
   `Contributions` et `Contacts`.
2. Extensions > Apps Script, coller `apps-script/Code.gs`.
3. Déployer > Nouveau déploiement > Application Web
   - Exécuter en tant que : moi
   - Accès : tout le monde
4. Copier l'URL `/exec` dans `.env` : `PUBLIC_SHEETS_ENDPOINT=...`

## Code.gs (modèle)
```javascript
const SHEET_ID = 'REMPLACER_PAR_ID_DU_SHEET';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return out({ok:true}); // honeypot
    if (!d.proposition || d.proposition.length < 5) return out({ok:false,error:'invalid'});
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const clean = v => String(v||'').replace(/^[=+\-@]/,"'$&").slice(0,3000); // anti formula-injection
    ss.getSheetByName('Contributions').appendRow([
      new Date(), clean(d.theme), clean(d.proposition), clean(d.concretisation),
      clean(d.prenom), clean(d.nom), clean(d.email), clean(d.telephone),
      clean(d.commune), d.recontact?'oui':'non', d.rencontres?'oui':'non',
      d.consentement?'oui':'non'
    ]);
    return out({ok:true});
  } catch(err){ return out({ok:false,error:String(err)}); }
}
function out(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
```

## Côté front
- `fetch(endpoint, {method:'POST', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: JSON.stringify(data)})`
  (utiliser `text/plain` évite le preflight CORS avec Apps Script).
- Désactiver le bouton pendant l'envoi, afficher succès/erreur, vider le formulaire.
- Limiter l'envoi (cooldown 10 s côté client), honeypot `website`.
- Neutraliser les injections de formules (=, +, -, @) côté Apps Script.
