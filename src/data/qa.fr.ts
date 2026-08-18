import type { QaOverlay } from './content'

// French side of the assistant's question bank.
//
// Keyed by the English entry's id, so ids and followups live in qa.ts alone.
// Every number, date and claim matches qa.ts exactly.
//
// The keywords are NOT translated: they are what a French speaker would actually
// type. Accents are folded by the normaliser, so "developpeur" finds
// "développeur" and neither spelling needs listing twice.
export const qaFr: { bank: QaOverlay; fallback: string } = {
  fallback:
    "Ça, c'est au-delà de mon script. Je ne connais que ce que Mahamat m'a appris. Pour tout le reste, écrivez-lui directement depuis la section Contact : il sera ravi de vous lire.",
  bank: {
    greeting: {
      chip: 'Dire bonjour',
      keywords: ['bonjour', 'salut', 'bonsoir', 'coucou', 'hello'],
      answer:
        "Bonjour ! Je suis l'assistant de Mahamat. Je peux vous parler de son stage chez Awesomeree en Malaisie, de son projet de fin d'études, ou des sites qu'il a construits.",
    },
    salam: {
      chip: 'Salam',
      keywords: ['salam', 'salam aleykoum', 'assalamu alaykum', 'aleykoum salam'],
      answer:
        "Wa aleykoum salam. Je suis l'assistant de Mahamat. Posez-moi vos questions sur son stage, son projet de fin d'études, ou les sites qu'il a construits.",
    },
    howareyou: {
      chip: 'Comment allez-vous ?',
      keywords: ['comment vas tu', 'comment allez vous', 'ca va', 'comment ca va'],
      answer:
        'Tout tourne bien, c\'est gentil de demander. Je suis là pour répondre à vos questions sur Mahamat.',
    },
    thanks: {
      chip: 'Merci',
      keywords: ['merci', 'merci beaucoup', 'nickel', 'parfait'],
      answer: 'Avec plaisir. Autre chose que vous aimeriez savoir sur lui ?',
    },
    bye: {
      chip: 'Au revoir',
      keywords: ['au revoir', 'a bientot', 'bonne journee', 'salut a plus', 'adieu'],
      answer:
        "Merci de votre passage. Si vous voulez parler à Mahamat directement, un formulaire de contact vous attend en bas de la page. Bonne journée.",
    },
    who: {
      chip: 'Qui est Mahamat ?',
      // "qui es tu" belongs to the bot entry, not here: someone typing it is
      // addressing the assistant, and a keyword listed twice always resolves to
      // whichever entry happens to come first.
      keywords: ['qui est', 'presentation', 'parlez moi de lui', 'son parcours'],
      answer:
        "Mahamat Youssouf Taher Adam est ingénieur logiciel, installé à Kuala Lumpur en Malaisie. Il termine une licence en informatique, spécialité génie logiciel, avec mention, à UTHM, et a passé les mois de février à août 2026 en stage de développement web front-end chez Awesomeree Sdn. Bhd., où il a mis en production des applications web. Il se concentre sur le front-end, les expériences web 3D interactives et l'ingénierie de solutions.",
    },
    internship: {
      chip: "Qu'a-t-il construit en stage ?",
      keywords: ['stage', 'awesomeree', 'stagiaire', 'experience professionnelle', 'son travail'],
      answer:
        "En six mois chez Awesomeree, il a mis en production 8 applications web : quatre créées de zéro et quatre plateformes existantes refondues. Il a participé à une bibliothèque de composants React et TypeScript adoptée sur une vingtaine de pages, contribué à une couche intermédiaire de conversation reliée à des modèles de langage, et construit une surveillance complète pour un parc de services automatisés. Au total, 161 tickets livrés.",
    },
    infofort: {
      chip: "A-t-il travaillé avant l'université ?",
      keywords: [
        'avant universite',
        'premier emploi',
        'infofort',
        'arabie saoudite',
        'qassim',
        'hopitaux',
        'equipe de 20',
        'covid',
      ],
      answer:
        "Oui. D'avril 2021 à mai 2022, il a travaillé avec Infofort dans la région de Qassim, en Arabie saoudite, sur le recensement des actifs fixes du ministère de la Santé. Il a débuté comme agent de terrain et s'est vu confier au bout de deux mois une équipe de 20 personnes, couvrant 9 hôpitaux et 20 centres médicaux. Il coordonnait l'accès aux sites avec les services d'inventaire, répartissait l'équipe, gérait les terminaux de scan et l'approvisionnement en étiquettes, et a travaillé pendant le Covid en tenue d'isolement complète. Une fiche avec photos lui est consacrée dans la section Parcours.",
    },
    designsystem: {
      chip: 'Parlez-moi de la bibliothèque de composants',
      keywords: ['bibliotheque de composants', 'design system', 'composants', 'migration'],
      answer:
        "Il a participé à la conception d'une bibliothèque de composants React et TypeScript, avec tableaux, filtres, cartes et champs de formulaire, puis migré une vingtaine de pages vers elle, bureau et mobile ensemble. Une seule migration a supprimé environ 5 000 lignes d'interface dupliquée. Il a aussi écrit la première suite de tests automatisés de la bibliothèque.",
    },
    chatplatform: {
      chip: "Et l'automatisation des conversations ?",
      keywords: ['conversation', 'chatbot', 'automatisation', 'modeles de langage', 'llm'],
      answer:
        "Il a contribué à une couche intermédiaire qui relie des plateformes de conversation à des traitements automatisés par modèles de langage, en Node.js : construction du contexte, validation des données, limites de consommation et règles de transfert vers un humain. Il a aussi aidé à garder en bon état un parc de services automatisés en production.",
    },
    monitoring: {
      chip: 'Et le travail de supervision ?',
      keywords: ['supervision', 'surveillance', 'alertes', 'fiabilite', 'incidents'],
      answer:
        "Il a construit une chaîne d'alerte de bout en bout : des contrôles de santé alimentent une interface REST protégée, les résultats sont stockés en base, puis remontés en notifications immédiates avec son et relais par messagerie, et clôturés par un endpoint de résolution automatique. Le but était qu'une tâche de nuit en échec se voie tout de suite, et non le lendemain matin.",
    },
    tickets: {
      chip: "Combien a-t-il livré ?",
      keywords: ['tickets', 'combien de tickets', 'productivite', 'volume de travail'],
      answer:
        "Sur les six mois de stage, il a livré 161 tickets, entre fonctionnalités, migrations, corrections et automatisation, en suivant le même chemin à chaque fois : relecture, validation sur un environnement de test, puis mise en production propre.",
    },
    stack: {
      chip: 'Quelles technologies utilise-t-il ?',
      keywords: [
        'technologies',
        'competences',
        'outils',
        'langages',
        'react',
        'typescript',
        'laravel',
        'python',
        'flutter',
        'mysql',
      ],
      answer:
        "Front-end : React, TypeScript, Tailwind CSS, Three.js via React Three Fiber et Framer Motion. Back-end et données : PHP, Laravel, Python, Node.js, MySQL et conception d'interfaces REST. Mobile : Flutter. Méthode : Git, GitHub, Jira et la documentation complète du cycle de vie logiciel.",
    },
    threed: {
      chip: 'Parlez-moi des sites 3D',
      keywords: ['3d', 'trois dimensions', 'webgl', 'sites interactifs', 'animation'],
      answer:
        "Il a construit une série de sites produit interactifs en 3D : des séquences commandées par le défilement où des modèles entièrement générés par le code, trottinettes, tables de jeu, poubelles et fauteuils, réagissent à la lecture, avec des configurateurs en direct et des vues que l'on fait tourner à la souris. La page Awesomeree AI est en production, et toutes sont présentées dans la section Projets.",
    },
    fyp: {
      chip: "Parlez-moi du projet de fin d'études",
      keywords: ['projet de fin', 'memoire', 'sahel', 'tchad', 'multi boutiques'],
      answer:
        "Son projet de fin d'études, noté A+, est un système de gestion multi-boutiques construit pour Sahel Retail Ltd, une chaîne de magasins au Tchad qui fonctionnait sur registres papier. Il a développé une application client en Flutter et des interfaces web d'administration et de vendeur en Laravel sur une même base MySQL : droits par rôle pour trois types d'utilisateurs, stock en temps réel, suivi des commandes et paiements par Stripe.",
    },
    fyptech: {
      chip: 'Comment le projet est-il architecturé ?',
      keywords: ['architecture', 'comment est construit', 'technique du projet'],
      answer:
        "Une application mobile Flutter en Dart pour les clients consomme une interface REST en Laravel, tandis que les panneaux d'administration et de vendeur sont des applications web Laravel, toutes sur un même schéma MySQL. Firebase gère les notifications et les rapports d'incident, Stripe les paiements par carte, et des contrôles de rôle encadrent la validation des vendeurs et l'ouverture des boutiques.",
    },
    fypresults: {
      chip: 'Quels résultats a obtenu le projet ?',
      // Bare "tests" goes to the quality entry, where a recruiter asking how he
      // works is far more likely to land than on this project's test count.
      keywords: ['resultats du projet', 'cas de test', 'note', 'article', 'publication', 'aitcs'],
      answer:
        "Les 49 cas de test sont passés, soit 100 %, et le test d'acceptation a réuni 31 participants dont la direction du client. Le projet a obtenu la note A+, et un article co-écrit sur le système a été accepté pour publication dans la revue AITCS de l'université UTHM.",
    },
    education: {
      chip: "Où a-t-il étudié ?",
      // "diplome" is left to the graduation entry: on its own the word is almost
      // always asking when, not where.
      keywords: ['etudes', 'universite', 'uthm', 'formation', 'licence'],
      answer:
        "Il étudie l'informatique, spécialité génie logiciel, avec mention, à Universiti Tun Hussein Onn Malaysia, de mars 2023 à décembre 2026, avec une moyenne de 3,99 sur 4,0 au dernier semestre et deux inscriptions consécutives au tableau d'honneur.",
    },
    deanslist: {
      chip: "Qu'est-ce que le tableau d'honneur ?",
      keywords: ['tableau d honneur', 'distinction', 'excellence academique'],
      answer:
        "Le tableau d'honneur récompense les meilleurs résultats du semestre. Mahamat y a figuré deux fois de suite : second semestre 2024/2025 avec 3,67 de moyenne, et premier semestre 2025/2026 avec 3,99. Le certificat et la photo sont dans la section Distinctions.",
    },
    certs: {
      chip: 'A-t-il des certifications ?',
      keywords: ['certification', 'certificat', 'formations', 'sas', 'power bi', 'ccna'],
      answer:
        "Trois à ce jour : Machine Learning Using SAS Viya, Power BI Data Modelling Basics, et CCNAv7: Introduction to Networks de Cisco. Elles couvrent son intérêt pour les données et les outils d'intelligence artificielle, ainsi que les bases des réseaux.",
    },
    languages: {
      chip: 'Quelles langues parle-t-il ?',
      keywords: ['langues', 'parle', 'anglais', 'arabe', 'francais'],
      answer: "L'anglais et l'arabe, tous les deux couramment.",
    },
    location: {
      chip: 'Où habite-t-il ?',
      keywords: ['ou habite', 'ou est il', 'malaisie', 'kuala lumpur', 'teletravail', 'demenager'],
      answer:
        "Il vit à Kuala Lumpur, en Malaisie. Pour toute question de mobilité ou de travail à distance, mieux vaut le lui demander directement : la section Contact comporte un formulaire qui lui parvient.",
    },
    availability: {
      chip: 'Est-il disponible ?',
      keywords: ['disponible', 'recrutement', 'embauche', 'offre', 'poste a pourvoir'],
      answer:
        "Oui, il est ouvert aux postes en génie logiciel, front-end et ingénierie de solutions. Le plus rapide est le formulaire de contact ou LinkedIn, tous deux dans la section Contact.",
    },
    cv: {
      chip: 'Puis-je voir son CV ?',
      keywords: ['cv', 'curriculum', 'telecharger', 'pdf'],
      answer:
        "Bien sûr. Cliquez sur Mon CV en haut de la page pour le lire ici même, et utilisez le bouton de téléchargement dans la visionneuse. Un bouton CV se trouve aussi dans la section Contact.",
    },
    contact: {
      chip: 'Comment le contacter ?',
      keywords: ['contact', 'contacter', 'joindre', 'ecrire', 'email', 'linkedin'],
      answer:
        "Rendez-vous dans la section Contact en bas de page : vous y trouverez un court formulaire qui lui envoie un message, ainsi que son LinkedIn. Il lit tout ce qui arrive dans sa boîte.",
    },
    football: {
      chip: 'A-t-il une vie en dehors du code ?',
      keywords: ['football', 'foot', 'milan', 'ac milan', 'sport'],
      answer:
        "Il joue au football dès qu'il peut, et suit l'AC Milan sans faillir depuis 2008, dans les bonnes années comme dans celles qui forgent le caractère. Si le rouge de ce site vous semble familier, ce n'est pas un hasard. Forza Milan.",
    },
    hobbies: {
      chip: 'Que fait-il de son temps libre ?',
      keywords: ['loisirs', 'temps libre', 'jeux video', 'natation', 'plage', 'passe temps'],
      answer:
        "Beaucoup de choses. Il joue au football, nage, et se détend à la plage. C'est aussi un joueur : en ce moment sur Red Dead Redemption 2, et il regarde le streamer Caseoh sur Twitch quand il veut quelque chose en fond.",
    },
    whyhire: {
      chip: 'Pourquoi le recruter ?',
      keywords: ['pourquoi le recruter', 'pourquoi lui', 'ses atouts', 'ce qui le distingue'],
      answer:
        "En six mois, il a livré 161 tickets et mis en production 8 applications web, participé à une bibliothèque de composants adoptée sur une vingtaine de pages, et pris en charge des services automatisés en production. Il assure aussi le côté humain : ateliers avec des équipes non techniques, démonstrations en direct, et explications claires des compromis. C'est la vitesse d'exécution doublée de la communication.",
    },
    rolewanted: {
      chip: 'Quel poste recherche-t-il ?',
      keywords: ['quel poste', 'recherche', 'quel type de travail', 'objectif de carriere'],
      answer:
        "Des postes en génie logiciel, front-end et ingénierie de solutions : construire des produits que les gens utilisent, en restant proche de ceux qui s'en servent. Les équipes qui font du web interactif ou très orienté produit l'intéressent particulièrement.",
    },
    startdate: {
      chip: 'Quand peut-il commencer ?',
      keywords: ['quand peut il commencer', 'disponibilite', 'preavis', 'date de debut'],
      answer:
        "Immédiatement. Son stage se termine le 21 août 2026 et son statut passe à diplômé fin août, son relevé de notes officiel étant disponible à partir de là. La cérémonie a lieu en décembre 2026, mais elle ne retarde pas sa prise de poste.",
    },
    graduation: {
      chip: 'Quand obtient-il son diplôme ?',
      keywords: ['diplome', 'obtention', 'fin des etudes', 'ceremonie', 'remise'],
      answer:
        "Il termine son cursus avec la fin de son stage le 21 août 2026, et il passe au statut de diplômé fin août ou début septembre 2026. La cérémonie officielle se tient en décembre 2026.",
    },
    cpa: {
      chip: 'Quels sont ses résultats ?',
      keywords: ['moyenne', 'notes', 'resultats scolaires', 'releve'],
      answer:
        "Sa moyenne générale est de 3,49 sur 4,0, et celle de son dernier semestre de 3,99 sur 4,0, ce qui lui a valu une seconde inscription consécutive au tableau d'honneur.",
    },
    teamwork: {
      chip: 'Comment travaille-t-il en équipe ?',
      keywords: ['equipe', 'travail en equipe', 'collaboration', 'communication'],
      answer:
        "Il a animé des ateliers techniques avec le marketing et le service client, traduit leurs façons de travailler en spécifications d'interface, et présenté des maquettes fonctionnelles aux non-techniciens avant les mises en ligne. Il est à l'aise dans le rôle de passerelle entre l'ingénierie et le reste de l'entreprise.",
    },
    realexperience: {
      chip: "Est-ce une vraie expérience professionnelle ?",
      keywords: ['vraie experience', 'experience reelle', 'juste etudiant', 'professionnelle'],
      answer:
        "Oui. Le travail de stage est allé en production : 8 applications web en ligne, une bibliothèque de composants utilisée sur une vingtaine de pages, des synchronisations de plus de 37 000 lignes, et des services automatisés qui tournent chaque jour. Son projet de fin d'études a lui aussi été construit pour un vrai client.",
    },
    proudest: {
      chip: 'De quel projet est-il le plus fier ?',
      keywords: ['plus fier', 'meilleur projet', 'projet prefere'],
      answer:
        "Deux ressortent. La page Awesomeree AI, parce qu'elle est passée en ligne et est devenue la page d'accueil de l'entreprise, et son projet de fin d'études, parce qu'il a résolu un vrai problème d'exploitation pour un vrai commerçant et a obtenu un A+.",
    },
    hardest: {
      chip: "Qu'est-ce qui a été le plus difficile ?",
      keywords: ['plus difficile', 'plus dur', 'defi', 'difficulte'],
      answer:
        "Migrer une vingtaine de pages en production vers une nouvelle bibliothèque de composants sans rien casser de ce qui fonctionnait déjà, bureau et mobile dans le même mouvement. Juste derrière : faire tourner des scènes 3D commandées par le défilement de façon fluide sur téléphone, sans sacrifier l'expérience.",
    },
    learning: {
      chip: "Qu'apprend-il en ce moment ?",
      keywords: ['apprend', 'apprentissage', 'se forme', 'prochaine competence'],
      answer:
        "Il approfondit la 3D interactive sur le web avec Three.js et React Three Fiber, et va plus loin dans l'ingénierie de solutions : recueil des besoins, intégration d'API et avant-vente technique.",
    },
    backend: {
      chip: 'Fait-il aussi du back-end ?',
      keywords: ['backend', 'back end', 'serveur', 'api', 'base de donnees', 'full stack'],
      answer:
        "Oui. Il a construit l'interface REST en Laravel et le schéma MySQL derrière son projet de fin d'études, écrit de l'automatisation en Python pendant son stage, et développé l'application mobile Flutter du même projet. Le front-end reste son point fort, mais il travaille sur toute la chaîne.",
    },
    testing: {
      chip: 'Comment assure-t-il la qualité ?',
      keywords: ['qualite', 'tests', 'relecture', 'mise en production', 'deploiement'],
      answer:
        "Chaque modification passe par une relecture et un environnement de test avant la production, avec vérification de l'état de la base et du déploiement plutôt que supposition. Son projet de fin d'études a passé ses 49 cas de test et un test d'acceptation avec 31 participants.",
    },
    aiexp: {
      chip: "A-t-il travaillé avec l'intelligence artificielle ?",
      keywords: ['intelligence artificielle', 'ia', 'apprentissage automatique'],
      answer:
        "Il a contribué à une couche intermédiaire reliant des plateformes de conversation à des traitements automatisés par modèles de langage : construction du contexte, validation des données, limites de consommation et règles de transfert vers un humain. Il détient aussi le certificat Machine Learning Using SAS Viya.",
    },
    unknowntech: {
      chip: 'Connaît-il telle autre technologie ?',
      keywords: ['angular', 'vue', 'java', 'kotlin', 'swift', 'rust', 'docker', 'kubernetes', 'aws', 'azure', 'devops'],
      answer:
        "Cela ne figure pas sur son CV, et je ne vais pas deviner. Ses outils documentés sont React, TypeScript, JavaScript, Tailwind CSS, Three.js, Framer Motion, PHP, Laravel, Python, Flutter, MySQL et les interfaces REST. Pour le reste, demandez-le-lui directement via le formulaire de contact.",
    },
    thissite: {
      chip: 'Comment ce site a-t-il été construit ?',
      keywords: ['ce site', 'ce portfolio', 'comment fait', 'site actuel'],
      answer:
        "Mahamat l'a construit avec React, TypeScript, Tailwind CSS et Framer Motion, en site statique hébergé sur GitHub Pages. Moi-même j'en fais partie : un petit assistant scripté livré avec la page, sans aucun service externe.",
    },
    code: {
      chip: 'Puis-je voir son code ?',
      keywords: ['code', 'source', 'github', 'depot', 'open source'],
      answer:
        "Les sites construits pendant son stage appartiennent à l'entreprise et à ses clients : ce n'est pas à lui de publier ce code. Deux d'entre eux sont toutefois en ligne publiquement, Awesomeree AI et ROAR Commerce, tous deux liés dans la section Projets. Son compte personnel est github.com/Mahamat-Adam, avec un bouton GitHub dans la section Contact.",
    },
    visa: {
      chip: "Et l'autorisation de travail ?",
      keywords: ['visa', 'permis de travail', 'autorisation', 'nationalite', 'parrainage'],
      answer:
        "C'est une question à poser à Mahamat lui-même, pas à moi. Envoyez-lui un message depuis la section Contact et il y répondra comme il se doit.",
    },
    salary: {
      chip: 'Quelles sont ses prétentions salariales ?',
      keywords: ['salaire', 'remuneration', 'pretentions', 'combien'],
      answer:
        "La rémunération se discute avec Mahamat directement. Écrivez-lui depuis la section Contact et il en parlera avec vous.",
    },
    projects: {
      chip: "Qu'a-t-il construit ?",
      keywords: ['projets', 'realisations', 'portfolio', 'roar', 'ses travaux'],
      answer:
        "Sept projets sont présentés sur cette page : le site ROAR Commerce et la page Awesomeree AI, tous deux en ligne publiquement, quatre sites produit interactifs en 3D couvrant trottinettes, tables de jeu, poubelles et fauteuils de course, et une page casque portée par la photographie. Descendez à la section Projets et cliquez sur une carte.",
    },
    bot: {
      chip: 'Vous êtes quoi exactement ?',
      // Both word orders: without "tu es une ia" the bare "ia" in the AI entry
      // wins the sentence and the visitor gets an answer about Mahamat's work
      // instead of about me.
      keywords: ['qui es tu', 'es tu une ia', 'tu es une ia', 'chatgpt', 'robot', 'comment tu marches'],
      answer:
        "Je suis MahamatBot, un petit assistant scripté, pas une intelligence artificielle en direct. Mahamat a écrit mes réponses lui-même et je rapproche votre question des mots-clés qu'il a prévus. Demandez-moi ce que vous voulez sur lui ; si je ne sais pas, je vous orienterai vers le formulaire de contact.",
    },
  },
}
