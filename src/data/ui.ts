import { useLang } from '../lib/lang'

// Interface copy only. Long-form prose still lives in profile.ts, projects.ts and
// qa.ts and is translated separately.
//
// Rules held throughout the Arabic side:
//  - Proper nouns stay in Latin script: Mahamat, Awesomeree, UTHM, MahamatBot, and
//    every technology name. They read as themselves, not as transliterations.
//  - Modern Standard Arabic.
//  - Western numerals wherever the mono font is involved, since IBM Plex Sans
//    Arabic is the fallback there and mixed digit systems read badly in a label.
//  - Arabic punctuation (، and ؟) rather than the Latin equivalents.
const strings = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      fyp: 'FYP',
      awards: 'Awards',
      contact: 'Contact',
      toggleTheme: 'Toggle theme',
      menu: 'Menu',
      changeLanguage: 'Change language',
    },
    hero: {
      kicker: 'Software Engineer · Kuala Lumpur',
      greeting: "Hello, I'm ",
      name: 'Mahamat',
      headline: 'I build web experiences that feel alive.',
      tagline:
        'Frontend engineer with a full-stack backbone, from production React apps and reusable design systems to scroll-driven 3D product films, plus automating processes people used to do by hand. Six months at Awesomeree shipping software that real teams use every day, and available now.',
      viewWork: 'View my work',
      viewCv: 'View my CV',
      scroll: 'scroll',
      messageAria: 'Send me a message',
      cvTitle: 'My CV',
    },
    about: { kicker: 'Who am I?', title: 'A builder at heart' },
    experience: {
      kicker: 'Experience',
      title: "Where I've been building",
      education: 'Education',
      toolbox: 'Toolbox',
      campusAlt: 'Universiti Tun Hussein Onn Malaysia campus',
      hospitalAlt: 'Hospital covered by the asset registration project',
      close: 'Close',
      office: 'At the office',
      onSite: 'On site',
      seeProject: 'See the project',
    },
    projects: {
      kicker: 'Projects',
      title: 'Selected work',
      visitSite: 'Visit site',
      intro:
        'A mix of live production sites and interactive 3D builds. Click any card for the full story.',
      shotAlt: (title: string) => `${title} screenshot`,
      shotAltLarge: (title: string) => `${title} screenshot, enlarged`,
      enlarge: 'Enlarge screenshot',
      close: 'Close',
      closeEnlarged: 'Close enlarged view',
      prev: 'Previous view',
      next: 'Next view',
      tapToEnlarge: 'tap to enlarge',
    },
    fyp: {
      kicker: 'Final Year Project',
      title: 'Multi-Store Management System',
      appKicker: 'Customer app · Flutter',
      appNote: 'tap any screen to enlarge',
      panelKicker: 'Admin & seller panels · Laravel',
      panelNote: 'scroll sideways · tap to enlarge',
      viewer: 'Screenshot viewer',
      closeViewer: 'Close viewer',
      prev: 'Previous screenshot',
      next: 'Next screenshot',
      appScreenAria: (n: number) => `View app screen ${n}`,
      appScreenAlt: (n: number) => `Customer app screen ${n}`,
      panelAria: (n: number) => `View panel screenshot ${n}`,
      panelAlt: (n: number) => `Web panel screenshot ${n}`,
      systemAlt: (n: number) => `System screenshot ${n}`,
      facts: {
        grade: 'final grade',
        tests: 'test cases passed',
        uat: 'UAT participants',
        roles: 'user roles served',
      },
    },
    zoom: { toActual: 'tap the image for actual size', toFit: 'drag to look around · tap to fit' },
    awards: {
      kicker: 'Awards & Certifications',
      title: 'On the record',
      certifications: 'Certifications',
      spokenLanguages: 'Spoken languages',
      deansAlt: "Mahamat holding his Dean's List certificates at UTHM",
      certTitle: "Dean's List certificate",
      viewCertificate: 'View certificate',
    },
    contact: {
      kicker: 'Contact',
      title: "Let's talk",
      intro:
        "Whether it's a role, a project or just a good conversation about the web, my inbox is open.",
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      topic: 'What is it about',
      message: 'Message',
      messagePlaceholder: 'Tell me what you have in mind.',
      send: 'Send message',
      sending: 'Sending...',
      sent: 'Message sent',
      sentBody: (first: string, email: string) =>
        `Thanks ${first}, it landed in my inbox. I'll reply to ${email}.`,
      topicRequired: 'Pick one of these so I know what your message is about.',
      failed: "That didn't go through.",
      fallback: 'Send it by email instead',
      topics: ['Job opportunity', 'Project', 'Collaboration', 'Something else'],
    },
    chat: {
      launcher: 'Chat with MahamatBot',
      invite: 'Questions?',
      title: 'MahamatBot',
      subtitle: 'scripted assistant',
      greeting:
        "Hi! I'm MahamatBot, Mahamat's scripted assistant. Ask me anything about him, or tap a question below.",
      placeholder: 'Ask about Mahamat...',
      inputAria: 'Ask about Mahamat',
      send: 'Send',
    },
    footer: {
      thanks: 'Thank you for passing by.',
      rights: '© 2026 Mahamat Adam. All rights reserved.',
      builtWith: 'Built with React, TypeScript & Tailwind CSS',
    },
    common: { backToTop: 'Back to top', closeViewer: 'Close viewer' },
  },

  ar: {
    nav: {
      about: 'نبذة عني',
      experience: 'الخبرة',
      projects: 'المشاريع',
      fyp: 'مشروع التخرج',
      awards: 'الجوائز',
      contact: 'تواصل',
      toggleTheme: 'تغيير المظهر',
      menu: 'القائمة',
      changeLanguage: 'تغيير اللغة',
    },
    hero: {
      kicker: 'مهندس برمجيات · كوالالمبور',
      greeting: 'مرحبا، أنا ',
      name: 'محمد',
      headline: 'أبني تجارب ويب تنبض بالحياة.',
      tagline:
        'مهندس واجهات أمامية بخبرة تمتد إلى الواجهة الخلفية. أعمالي تتنوع بين تطبيقات React تعمل بين أيدي المستخدمين، وأنظمة تصميم يعاد استخدامها، وعروض ثلاثية الأبعاد تتحرك مع تمرير الصفحة، بالإضافة إلى أتمتة عديد من العمليات التي عادة يقوم بها الموظفون يدويا. أمضيت ستة أشهر في Awesomeree أطلقت خلالها برمجيات تستخدمها فرق حقيقية كل يوم، وأنا متاح للعمل الآن.',
      viewWork: 'تصفح أعمالي',
      viewCv: 'سيرتي الذاتية',
      scroll: 'مرر للأسفل',
      messageAria: 'أرسل لي رسالة',
      cvTitle: 'سيرتي الذاتية',
    },
    about: { kicker: 'من أنا؟', title: 'شغفي أن أبني' },
    experience: {
      kicker: 'الخبرة',
      title: 'محطات في مسيرتي',
      education: 'التعليم',
      toolbox: 'أدواتي',
      campusAlt: 'حرم جامعة Universiti Tun Hussein Onn Malaysia',
      hospitalAlt: 'مستشفى شمله مشروع تسجيل الأصول',
      close: 'إغلاق',
      office: 'في المكتب',
      onSite: 'في الميدان',
      seeProject: 'اقرأ عن المشروع',
    },
    projects: {
      kicker: 'المشاريع',
      title: 'أعمال مختارة',
      visitSite: 'زيارة الموقع',
      intro:
        'مواقع تعمل فعلا على الإنترنت، وأعمال تفاعلية ثلاثية الأبعاد. اضغط أي بطاقة لتقرأ قصتها كاملة.',
      enlarge: 'تكبير الصورة',
      close: 'إغلاق',
      closeEnlarged: 'إغلاق العرض المكبر',
      prev: 'العرض السابق',
      next: 'العرض التالي',
      tapToEnlarge: 'اضغط للتكبير',
      shotAlt: (title: string) => `صورة من ${title}`,
      shotAltLarge: (title: string) => `صورة مكبرة من ${title}`,
    },
    fyp: {
      kicker: 'مشروع التخرج',
      title: 'نظام إدارة متاجر متعددة',
      appKicker: 'تطبيق العملاء · Flutter',
      appNote: 'اضغط على أي شاشة لتكبيرها',
      panelKicker: 'واجهات الإدارة والبائعين · Laravel',
      panelNote: 'مرر أفقيا · اضغط للتكبير',
      viewer: 'عارض الصور',
      closeViewer: 'إغلاق العارض',
      prev: 'الصورة السابقة',
      next: 'الصورة التالية',
      appScreenAria: (n: number) => `عرض شاشة التطبيق ${n}`,
      appScreenAlt: (n: number) => `شاشة تطبيق العملاء ${n}`,
      panelAria: (n: number) => `عرض صورة الواجهة ${n}`,
      panelAlt: (n: number) => `صورة من واجهة الويب ${n}`,
      systemAlt: (n: number) => `صورة من النظام ${n}`,
      facts: {
        grade: 'التقدير النهائي',
        tests: 'حالة اختبار اجتيزت',
        uat: 'مشاركا في اختبار القبول',
        roles: 'أدوار مستخدمين مدعومة',
      },
    },
    zoom: {
      toActual: 'اضغط الصورة لتراها بحجمها الكامل',
      toFit: 'اسحب لتتنقل · اضغط للعودة',
    },
    awards: {
      kicker: 'الجوائز والشهادات',
      title: 'موثق ومعتمد',
      certifications: 'الشهادات',
      spokenLanguages: 'اللغات',
      deansAlt: 'محمد يحمل شهادات قائمة العميد في UTHM',
      certTitle: 'شهادة قائمة العميد',
      viewCertificate: 'اعرض الشهادة',
    },
    contact: {
      kicker: 'تواصل',
      title: 'لنتحدث',
      intro:
        'سواء كانت وظيفة أو مشروعا أو مجرد حديث ممتع عن الويب، بابي مفتوح ولن تنتظر ردا طويلا.',
    },
    form: {
      name: 'الاسم',
      namePlaceholder: 'اسمك',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'you@example.com',
      topic: 'ما موضوع رسالتك',
      message: 'الرسالة',
      messagePlaceholder: 'أخبرني بما يجول في ذهنك.',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      sent: 'تم إرسال الرسالة',
      sentBody: (first: string, email: string) =>
        `شكرا ${first}، وصلتني رسالتك وسأرد عليك على ${email}.`,
      topicRequired: 'اختر موضوعا حتى أعرف كيف أساعدك.',
      failed: 'تعذر إرسال الرسالة.',
      fallback: 'جرب إرسالها بالبريد الإلكتروني',
      topics: ['وظيفة', 'مشروع', 'تعاون', 'شيء آخر'],
    },
    chat: {
      launcher: 'تحدث مع MahamatBot',
      invite: 'لديك سؤال؟',
      title: 'MahamatBot',
      subtitle: 'مساعد مبرمج مسبقا',
      greeting:
        'أهلا! أنا MahamatBot، مساعد محمد المبرمج مسبقا. اسألني عنه ما شئت، أو اختر سؤالا من الأسفل.',
      placeholder: 'اسأل عن محمد...',
      inputAria: 'اسأل عن محمد',
      send: 'إرسال',
    },
    footer: {
      thanks: 'شكراً لمروركم الكريم، نورتونا.',
      rights: '© 2026 محمد آدم. جميع الحقوق محفوظة.',
      builtWith: 'بني باستخدام React و TypeScript و Tailwind CSS',
    },
    common: { backToTop: 'العودة إلى الأعلى', closeViewer: 'إغلاق العارض' },
  },
} as const

export type Ui = (typeof strings)['en']

export function useUi(): Ui {
  const { lang } = useLang()
  return strings[lang] as Ui
}
