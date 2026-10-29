// Textes de l'interface. Pour ajouter le corse, créer co.ts avec les mêmes clés
// (à faire relire par un locuteur) et l'exposer dans index.ts.
//   = espace insécable (typographie française avant : ; ! ? et dans « »).

export const fr = {
  meta: {
    titre: 'Via Citadina – Un projet de société pour la Corse',
    description:
      'Après le rejet du processus d’autonomie par le Sénat, Via Citadina appelle à construire ensemble un projet de société pour la Corse. Partagez vos propositions.',
  },
  nav: {
    manifeste: 'Manifeste',
    contribuer: 'Contribuer',
    accueil: 'Retour à l’accueil',
  },
  hero: {
    surtitre: 'Culletivu citadinu', // en corse (lang="co" dans Hero.astro)
    // Titre en langue corse (lang="co" dans Hero.astro), une ligne par entrée.
    titre: ['A Corsica di dumane', 'Si custruì inseme'],
    accroche:
      'Pas de résignation, mais réappropriation démocratique. Le rejet du processus d’autonomie par le Sénat ne referme rien : il nous engage à bâtir, ici et maintenant, un véritable projet de société.',
    ctaContribuer: 'Je contribue',
    ctaManifeste: 'Lire le manifeste',
  },
  manifeste: {
    titre: 'Manifeste',
    vide: 'Le texte du manifeste sera publié très prochainement.',
  },
  form: {
    titre: 'Je contribue',
    intro:
      'Que voudriez-vous pour la Corse de demain ? Quelles propositions ? Comment les concrétiser ? Chaque contribution compte, et vous pouvez rester anonyme.',
    sectionContribution: 'Votre contribution',
    theme: 'Thématique',
    themeChoisir: 'Choisir une thématique',
    themes: [
      'Langue & culture',
      'Économie',
      'Logement & foncier',
      'Environnement',
      'Éducation',
      'Santé',
      'Jeunesse',
      'Démocratie & institutions',
      'Autre',
    ],
    proposition: 'Votre proposition',
    propositionAide: 'Décrivez votre idée pour la Corse de demain.',
    concretisation: 'Comment la concrétiser ?',
    concretisationAide: 'Facultatif : étapes, acteurs, moyens, exemples…',
    requis: 'obligatoire',
    sectionCoordonnees: 'Je rejoins la démarche',
    coordonneesIntro:
      'Facultatif. Laissez vos coordonnées si vous souhaitez être recontacté(e) ou participer à nos rencontres. Sans coordonnées, votre contribution reste anonyme.',
    prenom: 'Prénom',
    nom: 'Nom',
    email: 'Adresse e-mail',
    telephone: 'Téléphone',
    commune: 'Commune',
    recontact: 'Je souhaite être recontacté(e)',
    rencontres: 'Je souhaite participer à des rencontres',
    consentement:
      'J’accepte que Via Citadina conserve mes coordonnées et mes opinions exprimées pour me recontacter dans le cadre de sa démarche. Ces données, qui peuvent révéler des opinions politiques, ne seront jamais cédées. Je peux retirer mon consentement à tout moment.',
    consentementLien: 'Politique de confidentialité',
    envoyer: 'Envoyer ma contribution',
    envoi: 'Envoi en cours…',
    succes: 'Merci ! Votre contribution a bien été reçue. Ensemble, nous construisons la Corse de demain.',
    erreurs: {
      proposition: 'Merci de rédiger votre proposition (au moins 5 caractères).',
      email: 'L’adresse e-mail ne semble pas valide.',
      consentement: 'Pour enregistrer vos coordonnées, merci de cocher la case de consentement.',
      contactRequis: 'Pour être recontacté(e), merci d’indiquer une adresse e-mail ou un téléphone.',
      cooldown: 'Merci de patienter quelques secondes avant un nouvel envoi.',
      reseau: 'L’envoi a échoué. Vérifiez votre connexion et réessayez.',
      configuration: 'Le formulaire n’est pas encore relié à notre base. Merci de réessayer plus tard.',
    },
  },
  footer: {
    slogan: 'Pas de résignation, mais réappropriation démocratique.',
    mentions: 'Mentions légales',
    confidentialite: 'Politique de confidentialité',
    droits: 'Via Citadina',
  },
} as const;
