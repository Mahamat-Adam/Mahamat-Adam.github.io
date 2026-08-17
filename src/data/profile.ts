export const profile = {
  name: 'Mahamat Youssouf Taher Adam',
  shortName: 'Mahamat Adam',
  title: 'Software Engineer',
  tagline: 'Frontend, interactive 3D web experiences and solution engineering.',
  location: 'Kuala Lumpur, Malaysia',
  linkedin: 'https://www.linkedin.com/in/mahamat-adam-6803b5265/',
  github: 'https://github.com/Mahamat-Adam',
  cvPath: '/docs/Mahamat-Adam-Resume.pdf',
  // Assembled at runtime so the address never sits in the HTML as plain text.
  // Only used for the fallback if the contact form's service is unreachable.
  emailUser: 'mahammadadam446',
  emailDomain: 'gmail.com',
  // Public by design: this key can only send mail to the inbox it was issued
  // for, so it is safe in client code. Not a secret, not a credential.
  formKey: '23ab7219-7345-4aab-9ec9-9c0d3568cb29',
}

export const contactTopics = ['Job opportunity', 'Project', 'Collaboration', 'Something else']

export const aboutParagraphs = [
  `Hello, I'm Mahamat, a software engineer who likes building things people can
   actually feel: interfaces that move, 3D product experiences that respond to you,
   and systems that quietly do their job in production. I'm completing a Bachelor of
   Computer Science (Software Engineering) with Honours at Universiti Tun Hussein Onn
   Malaysia, and I spent Feb to Aug 2026 as a Frontend Web Developer Intern at
   Awesomeree Sdn. Bhd. in Kuala Lumpur, shipping production web applications used
   every day by real teams.`,
  `I care about the full path an idea travels: from a discovery conversation with a
   non-technical stakeholder, through clean architecture and honest testing, to a
   deployment that lands safely. That mix is why I'm growing towards solution
   engineering alongside hands-on development.`,
  `Away from the keyboard I'm usually on a football pitch or watching AC Milan play.
   I've supported the Rossoneri since 2008.`,
]

export const stats = [
  { value: 6, suffix: 'mo', label: 'production internship' },
  { value: 161, suffix: '', label: 'tickets delivered' },
  { value: 8, suffix: '', label: 'production web apps' },
  { value: 2, suffix: '×', label: "dean's list, consecutive" },
]

export const skillGroups = [
  {
    name: 'Web Stack & Languages',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Three.js',
      'Framer Motion',
      'Node.js',
      'PHP',
      'Laravel',
      'Flutter',
      'Python',
      'HTML5/CSS3',
    ],
  },
  {
    name: 'Databases & Data',
    items: ['MySQL', 'Relational DB Design', 'SQL', 'Data Modelling', 'MySQL Workbench'],
  },
  {
    name: 'Solutions & Integration',
    items: [
      'RESTful APIs',
      'Webhooks',
      'Postman',
      'Requirements Gathering',
      'Technical Discovery',
      'Pre-Production Demos',
    ],
  },
  {
    name: 'Tools & Methods',
    items: ['Git', 'GitHub', 'Jira', 'VS Code', 'SDLC Documentation'],
  },
]

export const experience = {
  company: 'Awesomeree Sdn. Bhd.',
  role: 'Frontend Web Developer Intern',
  period: 'Feb 2026 - Aug 2026',
  location: 'Kuala Lumpur, Malaysia',
  bullets: [
    `Engineered and shipped 8 production web applications (4 built from scratch and 4
     legacy platforms redesigned) using React, TypeScript, Tailwind CSS, Three.js
     (React Three Fiber) and Framer Motion, responsive across desktop and mobile.`,
    `Helped design and build a reusable React/TypeScript component library, then
     migrated around 20 production pages onto it, desktop and mobile in the same
     pass, removing thousands of lines of duplicated interface code.`,
    `Co-engineered middleware connecting conversational platforms with automated LLM
     orchestration: payload validation, token constraints and context-aware
     escalation rules.`,
    `Built end-to-end monitoring and alerting for a fleet of automation services,
     from health checks through a REST intake to live notifications.`,
    `Led discovery sessions with non-technical teams (Marketing, Customer Support)
     and walked stakeholders through proof-of-concept demos ahead of production
     rollouts.`,
    `Followed a staging-to-production release discipline on every change: peer review,
     validation on staging, then a clean production release, tracked in Git and Jira.
     Verified database syncs of 37k+ rows in MySQL Workbench.`,
  ],
}

export const fieldRole = {
  company: 'Infofort',
  role: 'Asset Registration Team Lead',
  period: 'Apr 2021 - May 2022',
  location: 'Qassim Region, Saudi Arabia',
  lead: '/img/infofort/lead.jpg',
  summary: `Led a 20-person field team registering every fixed asset owned by the Ministry
    of Health across 9 hospitals and 20 medical centres, working straight through the
    COVID period.`,
  detail: [
    `Infofort ran the Ministry of Health's fixed-asset registration programme in the
     Qassim region. Every asset, from ventilators and defibrillators down to desks and
     air conditioners, had to be tagged with a QR sticker carrying a unique ID and
     recorded with its name, model, serial number and manufacturer.`,
    `I joined as a field tagger under a team leader. The asset catalogue was entirely
     in English, so being fluent meant I learned it fast: complex medical devices such
     as defibrillators, infusion pumps, ECG machines, vital signs monitors and
     ventilators, alongside furniture and electrical assets. Two months in, I was
     promoted to lead a team of 20.`,
    `As lead I was the direct link between our team and hospital inventory management:
     arranging which sites were ready to receive us, getting clearance into restricted
     areas, and distributing the team across departments and floors so every facility
     was covered from basement to rooftop. I handled tag supply, made sure every
     Android scanning device was working, ran progress meetings with the team, and
     carried their issues up to my supervisor and management.`,
    `We worked through COVID. After vaccination we put on full isolation PPE to enter
     and register the rooms and wings given over to COVID patients.`,
    `The regional project finished in May 2022. The company invited me to continue with
     them into the Eastern Province, but I had already decided to start my bachelor's
     degree.`,
  ],
  highlights: [
    { value: '20', label: 'team members led' },
    { value: '9', label: 'hospitals covered' },
    { value: '20', label: 'medical centres' },
  ],
}

export const education = {
  school: 'Universiti Tun Hussein Onn Malaysia (UTHM)',
  degree: 'Bachelor of Computer Science (Software Engineering) with Honours',
  period: 'Mar 2023 - Aug 2026',
  gpa: 'CPA 3.49/4.0 · GPA 3.99/4.0 (latest semester)',
  note: 'Degree requirements complete Aug 2026; graduation ceremony Dec 2026.',
  coursework:
    'Software Engineering Principles, Requirements Engineering, System Analysis & Design, OOP, Databases, Web Development, Software Testing, Algorithms & Complexity',
}

export const deansList = {
  title: "Dean's List Award: two-time consecutive recipient",
  detail: `Awarded for academic excellence in two consecutive semesters at UTHM:
    Semester 2 2024/2025 (GPA 3.67) and Semester 1 2025/2026 (GPA 3.99).`,
  photo: '/img/awards/deans-list-photo.jpg',
}

export const certifications = [
  { name: 'Machine Learning Using SAS Viya', issuer: 'SAS' },
  { name: 'Power BI Data Modelling Basics', issuer: 'Microsoft Power BI' },
  { name: 'CCNAv7: Introduction to Networks', issuer: 'Cisco Networking Academy' },
]

export const spokenLanguages = ['English (fluent)', 'Arabic (fluent)']
