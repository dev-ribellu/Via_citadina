/**
 * Via Citadina – réception du formulaire de contribution.
 *
 * Deux onglets :
 *  - « Contributions » : les propositions, sans aucune donnée d'identité.
 *  - « Contacts »      : les coordonnées, uniquement si le consentement est donné.
 * La colonne « ID » relie une contribution à un contact quand la personne a laissé
 * ses coordonnées. On peut ainsi restreindre l'accès à l'onglet Contacts.
 *
 * Installation : voir apps-script/GUIDE.md.
 */

const SHEET_ID = 'REMPLACER_PAR_ID_DU_SHEET';

const ONGLET_CONTRIBUTIONS = 'Contributions';
const ONGLET_CONTACTS = 'Contacts';

const ENTETES_CONTRIBUTIONS = ['Date', 'ID', 'Thématique', 'Proposition', 'Comment la concrétiser', 'Contact laissé'];
const ENTETES_CONTACTS = [
  'Date', 'ID', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Commune',
  'Recontact', 'Rencontres', 'Consentement',
];

const THEMES = [
  'Langue & culture', 'Économie', 'Logement & foncier', 'Environnement', 'Éducation',
  'Santé', 'Jeunesse', 'Démocratie & institutions', 'Autre',
];

const LIMITES = {
  proposition: 3000, concretisation: 3000, prenom: 100, nom: 100,
  email: 200, telephone: 30, commune: 100,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // Honeypot : on répond « ok » pour ne pas renseigner les robots.
    if (d.website) return reponse({ ok: true });

    const texte = (cle) => String(d[cle] || '').trim().slice(0, LIMITES[cle] || 3000);
    const v = {
      theme: THEMES.indexOf(d.theme) >= 0 ? d.theme : '',
      proposition: texte('proposition'),
      concretisation: texte('concretisation'),
      prenom: texte('prenom'),
      nom: texte('nom'),
      email: texte('email'),
      telephone: texte('telephone'),
      commune: texte('commune'),
      recontact: d.recontact === true,
      rencontres: d.rencontres === true,
      consentement: d.consentement === true,
    };

    if (v.proposition.length < 5) return reponse({ ok: false, error: 'proposition' });
    if (v.email && !EMAIL_RE.test(v.email)) return reponse({ ok: false, error: 'email' });

    const aDesCoordonnees = Boolean(
      v.prenom || v.nom || v.email || v.telephone || v.commune || v.recontact || v.rencontres
    );
    // Donnée sensible (opinions politiques, art. 9 RGPD) : pas de coordonnées sans consentement.
    if (aDesCoordonnees && !v.consentement) return reponse({ ok: false, error: 'consentement' });

    const verrou = LockService.getScriptLock();
    verrou.waitLock(10000);
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const maintenant = new Date();
      const id = Utilities.getUuid().slice(0, 8);

      onglet(ss, ONGLET_CONTRIBUTIONS, ENTETES_CONTRIBUTIONS).appendRow([
        maintenant, id, v.theme, neutraliser(v.proposition), neutraliser(v.concretisation),
        aDesCoordonnees ? 'oui' : 'non',
      ]);

      if (aDesCoordonnees) {
        onglet(ss, ONGLET_CONTACTS, ENTETES_CONTACTS).appendRow([
          maintenant, id, neutraliser(v.prenom), neutraliser(v.nom), neutraliser(v.email),
          neutraliser(v.telephone), neutraliser(v.commune),
          v.recontact ? 'oui' : 'non', v.rencontres ? 'oui' : 'non', 'oui',
        ]);
      }
    } finally {
      verrou.releaseLock();
    }

    return reponse({ ok: true });
  } catch (err) {
    console.error(err);
    return reponse({ ok: false, error: 'serveur' });
  }
}

/** Permet de vérifier dans un navigateur que le déploiement répond. */
function doGet() {
  return reponse({ ok: true, service: 'via-citadina' });
}

/** À lancer une fois depuis l'éditeur pour créer les onglets et leurs en-têtes. */
function initialiser() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  onglet(ss, ONGLET_CONTRIBUTIONS, ENTETES_CONTRIBUTIONS);
  onglet(ss, ONGLET_CONTACTS, ENTETES_CONTACTS);
}

function onglet(ss, nom, entetes) {
  let feuille = ss.getSheetByName(nom);
  if (!feuille) feuille = ss.insertSheet(nom);
  if (feuille.getLastRow() === 0) {
    feuille.appendRow(entetes);
    feuille.getRange(1, 1, 1, entetes.length).setFontWeight('bold');
    feuille.setFrozenRows(1);
  }
  return feuille;
}

/** Empêche l'injection de formules : une cellule commençant par = + - @ devient du texte. */
function neutraliser(valeur) {
  const s = String(valeur || '');
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function reponse(objet) {
  return ContentService.createTextOutput(JSON.stringify(objet)).setMimeType(ContentService.MimeType.JSON);
}
