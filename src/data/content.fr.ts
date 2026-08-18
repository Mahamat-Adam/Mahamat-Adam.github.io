import type { Overlay } from './content'

// French side of the portfolio.
//
// Written as French rather than translated sentence by sentence. Every fact,
// figure and date matches profile.ts and projects.ts exactly; only the phrasing
// differs. Proper nouns stay as they are: Awesomeree, UTHM, Infofort, and every
// product and framework name.
export const fr: Overlay = {
  aboutParagraphs: [
    `Je m'appelle Mahamat et je suis ingénieur logiciel. Ce qui me plaît, c'est
     construire des choses que les gens ressentent vraiment : des interfaces qui
     bougent, des présentations produit en 3D qui réagissent à celui qui les
     manipule, et des systèmes qui font leur travail sans se faire remarquer. Je
     termine actuellement une licence en informatique, spécialité génie logiciel,
     avec mention, à Universiti Tun Hussein Onn Malaysia, et j'ai passé les mois de février à
     août 2026 en stage de développement front-end chez Awesomeree, à Kuala Lumpur,
     où j'ai mis en ligne des applications dont de vraies équipes se servent au
     quotidien.`,
    `Ce n'est pas seulement le code qui m'intéresse, c'est le chemin complet d'une
     idée : une discussion avec quelqu'un qui n'a aucune culture technique, puis une
     architecture claire et des tests qui ne mentent pas, et enfin une mise en
     production qui arrive sans casse. C'est de là que vient mon intérêt pour
     l'ingénierie de solutions autant que pour le développement.`,
    `En dehors du travail, je suis sur un terrain de football ou devant un match de
     l'AC Milan : je suis les Rossoneri depuis 2008.`,
  ],

  fypIntro: [
    `Mon projet de fin d'études n'était pas un exercice académique, mais la réponse
     à un vrai problème chez un vrai client : Sahel Retail Ltd, une chaîne de
     magasins à N'Djamena au Tchad, gérait chaque succursale sur des registres
     papier et des tableurs, sans vision commune du stock et sans aucun moyen pour
     un client d'acheter sans se déplacer en magasin.`,
    `J'ai conçu et construit pour eux une plateforme de commerce complète : une
     application mobile Flutter où le client parcourt le catalogue, paie par carte,
     portefeuille ou à la livraison, et suit sa commande sur une chronologie mise à
     jour en direct, adossée à deux interfaces web Laravel pour l'administration et
     les vendeurs sur une même base MySQL, avec des droits par rôle, une validation
     des vendeurs avant activation, l'ouverture des boutiques, des codes promo et
     des rapports de chiffre d'affaires.`,
    `Le système a passé les 49 cas de test, a été soumis à un test d'acceptation
     avec 31 participants dont la direction du client elle-même, et a obtenu la note
     A+. Un article de recherche que j'ai co-écrit sur ce système a été accepté pour
     publication dans la revue AITCS de l'université UTHM.`,
  ],

  spokenLanguages: ['Anglais - courant', 'Arabe - langue maternelle'],
  location: 'Kuala Lumpur, Malaisie',

  statLabels: {
    internship: 'de stage en production',
    tickets: 'tickets livrés',
    apps: 'applications en ligne',
    deans: "inscriptions consécutives au tableau d'honneur",
  },
  statSuffixes: { internship: ' mois' },

  skillGroupNames: {
    web: 'Web et langages',
    data: 'Bases de données',
    solutions: 'Solutions et intégration',
    tools: 'Outils et méthodes',
  },
  skillItems: {
    'Relational DB Design': 'Conception de bases relationnelles',
    'Data Modelling': 'Modélisation de données',
    'Requirements Gathering': 'Analyse des besoins',
    'Technical Discovery': 'Étude technique',
    'Pre-Production Demos': 'Démonstrations avant mise en ligne',
    'SDLC Documentation': 'Documentation du cycle de vie logiciel',
  },

  experience: {
    role: 'Stagiaire développeur web front-end',
    period: 'Février 2026 - Août 2026',
    location: 'Kuala Lumpur, Malaisie',
    bullets: [
      `Développé et mis en ligne 8 applications web utilisées en production, quatre
       créées de zéro et quatre plateformes existantes refondues, avec React,
       TypeScript, Tailwind CSS, Three.js via React Three Fiber et Framer Motion, en
       versions bureau et mobile.`,
      `Participé à la construction d'une bibliothèque de composants React et
       TypeScript, puis migré une vingtaine de pages vers elle, bureau et mobile dans
       le même mouvement, ce qui a supprimé des milliers de lignes d'interface
       dupliquée.`,
      `Contribué à une couche intermédiaire reliant des plateformes de conversation à
       des modèles de langage : validation des données reçues, limites de
       consommation, et règles de transfert vers un humain selon le contexte.`,
      `Construit une chaîne de surveillance et d'alerte pour un parc de services
       automatisés, du contrôle de santé de chaque service jusqu'aux notifications
       immédiates, en passant par une interface REST.`,
      `Animé des ateliers avec des équipes non techniques, au marketing et au service
       client, et présenté des maquettes fonctionnelles avant toute mise en ligne.`,
      `Suivi le même chemin pour chaque modification : relecture par un collègue,
       validation sur un environnement de test, puis mise en production propre, le
       tout tracé dans Git et Jira. J'ai notamment vérifié la synchronisation de plus
       de 37 000 lignes avec MySQL Workbench avant validation.`,
    ],
  },

  fieldRole: {
    // "Chef d'équipe" is the ordinary French title for a team lead and carries no
    // extra weight; only the second half needed aligning with the body's wording.
    role: "Chef d'équipe, recensement des actifs",
    period: 'Avril 2021 - Mai 2022',
    location: 'Région de Qassim, Arabie saoudite',
    summary: `J'ai dirigé une équipe de terrain de 20 personnes chargée de recenser
      tous les actifs fixes du ministère de la Santé dans 9 hôpitaux et 20 centres
      médicaux, sans interruption pendant la période du Covid.`,
    detail: [
      `Infofort était chargée du recensement des actifs fixes du ministère de la Santé
       dans la région de Qassim. Chaque bien, des respirateurs et défibrillateurs aux
       bureaux et climatiseurs, devait porter une étiquette QR avec un identifiant
       unique et être enregistré avec son nom, son modèle, son numéro de série et son
       fabricant.`,
      `J'ai commencé comme agent de terrain. Le catalogue des actifs était entièrement
       en anglais, et ma maîtrise de la langue m'a permis d'apprendre vite le nom
       d'appareils médicaux précis : défibrillateurs, pompes à perfusion,
       électrocardiographes, moniteurs de signes vitaux et respirateurs, sans compter
       le mobilier et l'équipement électrique. Au bout de deux mois, on m'a confié une
       équipe de 20 personnes.`,
      `Je suis devenu le lien entre l'équipe et les services d'inventaire des
       hôpitaux : organiser les sites prêts à nous recevoir, obtenir les
       autorisations d'accès aux zones réservées, et répartir l'équipe entre services
       et étages pour qu'aucun bâtiment ne soit oublié, du sous-sol au toit. Je
       gérais l'approvisionnement en étiquettes, l'état des terminaux de scan sous
       Android, les réunions de suivi, et je faisais remonter les blocages au
       superviseur et à la direction.`,
      `Nous avons travaillé pendant la période du Covid. Une fois vaccinés, nous
       entrions en tenue d'isolement complète pour recenser les chambres et les ailes
       réservées aux malades.`,
      `Le projet régional s'est terminé en mai 2022. L'entreprise m'a proposé de
       continuer avec elle dans la province orientale, mais j'avais déjà décidé de
       commencer mes études universitaires.`,
    ],
    highlightLabels: {
      team: 'personnes encadrées',
      hospitals: 'hôpitaux',
      centres: 'centres médicaux',
    },
  },

  education: {
    degree: 'Licence en informatique, spécialité génie logiciel, avec mention',
    period: 'Mars 2023 - Août 2026',
    gpa: 'Moyenne générale 3,49 sur 4,0 · dernier semestre 3,99 sur 4,0',
    note: "Cursus terminé en août 2026, cérémonie de remise des diplômes en décembre 2026.",
    coursework:
      'Génie logiciel, analyse des besoins, analyse et conception de systèmes, programmation orientée objet, bases de données, développement web, test logiciel, algorithmique et complexité',
  },

  deansList: {
    title: "Inscrit au tableau d'honneur deux semestres de suite",
    detail: `Distinction pour l'excellence académique sur deux semestres consécutifs
      à UTHM : second semestre 2024/2025 avec une moyenne de 3,67, et premier
      semestre 2025/2026 avec 3,99.`,
  },

  projects: {
    'roar-commerce': {
      category: "Site d'entreprise reconstruit de bout en bout",
      blurb:
        "Refonte complète du site d'une société de logistique e-commerce active en Malaisie et à Singapour, dans un langage visuel industriel : convoyeurs animés, cour d'expédition et carte maritime vivante.",
      detail: [
        `Refonte complète du site d'une société qui gère des opérations de commerce en
         ligne en Malaisie et à Singapour, dans un langage visuel industriel
         assumé. Sur la page d'accueil, un convoyeur en WebGL fait défiler des colis
         étiquetés sous un portique métallique, une cour d'expédition en 3D livre la
         marchandise aux quais des marketplaces, et une carte maritime vivante fait
         voler le fret à travers l'Asie du Sud-Est. Le tout construit par le code,
         sans aucun modèle téléchargé.`,
        `Le travail ne s'est pas arrêté à l'accueil : plus d'une douzaine de pages ont
         été reconstruites dans un système de design unique à composants partagés, et
         livrées sur WordPress. Le site est publié, officiel, et accessible par le
         lien ci-dessous.`,
      ],
      linkLabel: 'Voir le site',
    },
    'awesomeree-ai': {
      category: 'En ligne · page interactive avec mascotte',
      blurb:
        "La page de présentation d'Awesomeree, menée par une mascotte robot interactive en 3D. Elle tourne aujourd'hui sur le site officiel.",
      detail: [
        `La page de présentation officielle d'Awesomeree, l'entreprise où j'ai fait mon
         stage. Une page unique construite autour d'une mascotte robot en pixel art
         rendue en WebGL : elle suit votre curseur, salue, cligne des yeux et réagit,
         pendant que des modèles 3D des produits de l'entreprise défilent derrière
         elle.`,
        `J'ai fait passer la maquette validée par plus d'une douzaine d'itérations de
         finition : recomposition pour mobile, réglage du rythme des animations,
         optimisation du chargement de la scène 3D. Je l'ai ensuite mise en ligne sur
         WordPress, remplaçant l'ancien design par le mien une fois la direction
         d'accord, et j'ai mis en place le référencement ainsi qu'un circuit de
         demandes de démonstration.`,
      ],
      linkLabel: 'Voir le site',
    },
    'scooter-experience': {
      category: 'Expérience de marque en 3D',
      blurb:
        "Une trottinette entièrement construite par le code roule dans une rue elle aussi générée, au fil du défilement, avec 9 parcours, un garage de 13 modèles et une vue 3D dans chaque carte.",
      detail: [
        `La page d'accueil se lit comme une séquence continue commandée par le
         défilement : une trottinette électrique entièrement construite par le code
         traverse un quartier généré, et s'arrête à des étapes choisies qui montrent
         la roue sans air, le moteur, un pliage en trois secondes et un phare qui
         s'allume au clic. À tout moment, le visiteur peut prendre la trottinette en
         main et la faire tourner.`,
        `Dans le garage, le même modèle est reconstruit et repeint en treize versions,
         et chaque carte de la salle d'exposition porte sa propre vue 3D par un moteur
         de rendu dédié, avec bascule vers les vraies photos du produit à la demande.
         Neuf parcours au total, vérifiés sur ordinateur et sur mobile.`,
      ],
    },
    'games-room': {
      category: 'Une table, quatre identités',
      blurb:
        'Une seule table se transforme sous vos yeux en quatre : billard, air hockey, tennis de table et table à manger, entièrement au défilement.',
      detail: [
        `Le cœur de la page est une table de jeu construite par le code qui change de
         forme au fil du défilement : les billes de billard se dispersent et tombent
         dans des poches réellement percées, la surface bascule en patinoire d'air
         hockey, un plateau de tennis de table prend le relais, et une table à manger
         referme l'idée du quatre-en-un. Chaque étape donne le même résultat et se
         parcourt dans les deux sens.`,
        `Autour de cette séquence, j'ai construit un outil qui mesure si la table tient
         dans la pièce du visiteur et donne un verdict franc entre parfaitement,
         juste et impossible, des pages 3D distinctes pour les gammes baby-foot et air
         hockey, un panier qui retient les choix, et un bandeau d'avis et de photos
         d'acheteurs sélectionnés.`,
      ],
    },
    'sensor-bins': {
      category: 'Une démonstration qui répond au geste',
      blurb:
        "Appuyez sur la pédale : le couvercle s'ouvre puis se referme en douceur, avec une vue éclatée au défilement et des couleurs qui changent devant vous.",
      detail: [
        `Une page unique consacrée au fonctionnement d'une gamme de poubelles à capteur
         et à pédale. En tête, un modèle 3D interactif : appuyez sur la pédale, le
         couvercle s'ouvre puis redescend lentement et sans bruit, l'argument
         principal du produit montré par l'usage plutôt que décrit. Choisir une
         finition repeint le modèle sur place, à l'instant même.`,
        `Plus bas, une séquence décompose le produit pièce par pièce pour montrer la
         qualité de fabrication, un guide de dimensions dessiné recommande le modèle
         adapté à l'espace du visiteur, et une section avis réunit les photos
         vérifiées des acheteurs et leurs commentaires tels qu'ils les ont écrits.`,
      ],
    },
    'racing-chair': {
      category: 'Du jour à la nuit, en une séquence',
      blurb:
        "Le défilement incline le fauteuil de 90 à 155 degrés, puis la scène et l'interface basculent ensemble dans la nuit.",
      detail: [
        `Une page unique construite comme une séquence de film, où le défilement
         commande le produit lui-même : le fauteuil construit par le code passe de la
         position droite à l'inclinaison complète pendant la lecture, et la scène
         finit par basculer du jour à la nuit en entraînant toute l'interface avec
         elle.`,
        `Ce sont les détails qui convainquent : un dossier en maille réellement
         ajourée, des surpiqûres capitonnées, un vérin à gaz réglable à la souris dans
         une section en forme de plan technique avec des cotes qui changent sous vos
         yeux, et un présentoir pour changer de coloris.`,
      ],
    },
    'helmet-site': {
      category: 'Une page portée par la photographie',
      blurb:
        "Dix-huit coloris qui reteignent toute la scène, deux positions de visière pour le jour et la nuit, et un guide des tailles qui ne ménage personne.",
      detail: [
        `Une page produit portée par la photographie, pour un casque urbain à double
         visière. Elle repose sur une conviction claire : quand la forme est courbe et
         lisse, une photo bien détourée vaut mieux qu'un modèle 3D approximatif.
         Choisir l'un des dix-huit coloris reteint la scène entière.`,
        `La page comprend plusieurs sections interactives : une démonstration sombre
         qui fait passer la visière du jour à la nuit, un schéma de détails dont les
         repères s'allument au passage de la souris, et un guide des tailles qui
         mesure en centimètres et rend un verdict franc. J'ai également produit cinq
         directions artistiques complètes pour que le client puisse choisir.`,
      ],
    },
  },
}
