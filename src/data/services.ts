import type { Service } from '@/types/content';

/**
 * Services offered.
 *
 * `featured: true` is the /services "Core services" group and the pool the Home
 * preview draws its four cards from; `featured: false` is "Also available".
 * Counts are load-bearing for the layout: the core group renders in a
 * two-column grid and the supporting group in a three-column one, so six and
 * three fill both cleanly without an orphan card.
 *
 * Written for a client who is not a developer: each `description` says what
 * they get and what it does for their project, and keeps the technical term
 * (MERN, Node.js, WCAG) only where it names the thing being delivered. Each
 * `summary` is one line — it is the only copy a card outside the feature
 * layout shows. `slug` doubles as the anchor id the Services hero links to, so
 * it is deliberately unchanged.
 *
 * Nothing here promises an outcome that depends on someone else — in
 * particular nothing promises a search ranking.
 */
export const services: Service[] = [
  {
    id: 'fullstack',
    slug: 'full-stack-web-development',
    order: 1,
    featured: true,
    icon: 'layers',
    title: { en: 'Full-Stack Web Development', ar: 'تطوير تطبيقات ويب متكاملة' },
    summary: {
      en: 'An interface, back end, and database built together as one application.',
      ar: 'واجهة وخادم وقاعدة بيانات تُبنى معًا كتطبيق واحد.',
    },
    description: {
      en: "Build a complete MERN stack application with a user interface, back-end services, and database, based on your project's requirements.",
      ar: 'بناء تطبيق يشمل واجهة المستخدم والخادم وقاعدة البيانات باستخدام MERN Stack، وفق الخصائص المطلوبة لمشروعك.',
    },
    highlights: [
      { en: 'A connected interface, back end, and database', ar: 'واجهة وخادم وقاعدة بيانات مترابطة' },
      { en: 'A clear scope and implementation stages', ar: 'نطاق عمل ومراحل تنفيذ واضحة' },
      { en: 'The project prepared for launch and handover', ar: 'تجهيز المشروع للنشر والتسليم' },
    ],
  },
  {
    id: 'react-nextjs',
    slug: 'react-nextjs-development',
    order: 2,
    featured: true,
    icon: 'component',
    title: { en: 'React & Next.js Front-End Development', ar: 'تطوير واجهات بـReact وNext.js' },
    summary: {
      en: 'Responsive interfaces that are easy to use and easy to extend.',
      ar: 'واجهات متجاوبة سهلة الاستخدام وسهلة التطوير لاحقًا.',
    },
    description: {
      en: 'Turn designs into user-friendly, responsive interfaces, with Arabic and English support when needed and reusable components that make future changes easier.',
      ar: 'تحويل التصميم إلى واجهة سهلة الاستخدام ومتوافقة مع الجوال، مع دعم العربية والإنجليزية عند الحاجة، وتنظيم المكونات لتسهيل تطويرها لاحقًا.',
    },
    highlights: [
      { en: 'Reusable components that make later changes easier', ar: 'مكونات قابلة لإعادة الاستخدام تسهّل التعديل لاحقًا' },
      { en: 'Arabic and English, including right-to-left layouts', ar: 'دعم العربية والإنجليزية بما يشمل الاتجاه من اليمين إلى اليسار' },
      { en: 'TypeScript, which helps catch mistakes early', ar: 'استخدام TypeScript لاكتشاف الأخطاء مبكرًا' },
    ],
  },
  {
    id: 'nodejs-express',
    slug: 'nodejs-express-development',
    order: 3,
    featured: true,
    icon: 'code',
    title: { en: 'Back-End & API Development', ar: 'تطوير الخادم وواجهات API' },
    summary: {
      en: "Services that manage your application's data, accounts, and permissions.",
      ar: 'خدمات تدير بيانات التطبيق والحسابات والصلاحيات.',
    },
    description: {
      en: 'Build Node.js and Express.js services for application data, user accounts, and access permissions, and connect them to the interface.',
      ar: 'بناء الخدمات التي تدير بيانات التطبيق وحسابات المستخدمين والصلاحيات باستخدام Node.js وExpress.js، وربطها بالواجهة.',
    },
    highlights: [
      { en: 'Endpoints that check data before it is saved', ar: 'نقاط وصول تتحقق من البيانات قبل حفظها' },
      { en: 'Sign-in and access control for protected pages', ar: 'تسجيل دخول وتحكم في الصلاحيات للصفحات المحمية' },
      { en: 'Clear error messages when something goes wrong', ar: 'رسائل خطأ واضحة عند حدوث مشكلة' },
    ],
  },
  {
    id: 'mongodb',
    slug: 'mongodb-database-development',
    order: 4,
    featured: true,
    icon: 'database',
    title: { en: 'MongoDB Database Design', ar: 'تصميم قواعد بيانات MongoDB' },
    summary: {
      en: 'Organized data and the operations your application needs.',
      ar: 'بيانات منظّمة والعمليات التي يحتاجها تطبيقك.',
    },
    description: {
      en: "Organize application data and relationships, implement data operations, and improve queries based on the project's needs.",
      ar: 'تنظيم بيانات التطبيق والعلاقات بينها، وتطوير عمليات الإضافة والعرض والتعديل والحذف، وتحسين الاستعلامات حسب احتياج المشروع.',
    },
    highlights: [
      { en: 'A data structure planned around how the app uses it', ar: 'هيكل بيانات مبني على طريقة استخدام التطبيق لها' },
      { en: 'Add, view, edit, and delete operations', ar: 'عمليات الإضافة والعرض والتعديل والحذف' },
      { en: 'Faster searches on the fields you use most', ar: 'استعلامات أسرع على الحقول الأكثر استخدامًا في البحث' },
    ],
  },
  {
    id: 'api-integration',
    slug: 'api-integration',
    order: 5,
    featured: true,
    icon: 'plug',
    title: { en: 'Third-Party API Integration', ar: 'ربط الموقع بالخدمات الخارجية' },
    summary: {
      en: 'Connect your application to services such as payments, email, and messaging.',
      ar: 'ربط تطبيقك بخدمات مثل الدفع والبريد والرسائل.',
    },
    description: {
      en: 'Connect your application to payment, email, messaging, and other services, with clear handling of loading states, errors, and data exchange.',
      ar: 'ربط تطبيقك بخدمات الدفع والبريد والرسائل وغيرها، مع التعامل مع حالات التحميل والأخطاء وتبادل البيانات.',
    },
    highlights: [
      { en: 'Connections to the third-party services you use', ar: 'ربط التطبيق بالخدمات الخارجية التي تستخدمها' },
      { en: 'Loading and error states that are clear to users', ar: 'حالات تحميل وأخطاء واضحة للمستخدم' },
      { en: 'Organized data exchange between the interface and services', ar: 'تبادل بيانات منظّم بين الواجهة والخدمات' },
    ],
  },
  {
    id: 'maintenance',
    slug: 'maintenance-and-performance',
    order: 6,
    featured: true,
    icon: 'gauge',
    title: {
      en: 'Maintenance & Performance Improvements',
      ar: 'الصيانة وتحسين الأداء',
    },
    summary: {
      en: 'Fix and improve a project you already have.',
      ar: 'إصلاح وتطوير مشروع تملكه بالفعل.',
    },
    description: {
      en: 'Fix bugs, improve website speed, and develop features in your existing project, with checks to assess the impact of each change.',
      ar: 'إصلاح الأخطاء، وتحسين سرعة الموقع، وتطوير الخصائص في مشروعك الحالي، مع مراجعة أثر التعديلات.',
    },
    highlights: [
      { en: 'Bug fixes in your existing project', ar: 'إصلاح الأخطاء في مشروعك الحالي' },
      { en: 'Faster pages, measured with Core Web Vitals', ar: 'تحسين سرعة الصفحات ومؤشرات الأداء (Core Web Vitals)' },
      { en: 'Step-by-step updates to modernize the interface', ar: 'تحديث الواجهة تدريجيًا على مراحل' },
    ],
  },

  /* ------------------------------------------------- also available (narrower) */

  {
    id: 'responsive-ui',
    slug: 'responsive-ui-implementation',
    order: 7,
    featured: false,
    icon: 'smartphone',
    title: { en: 'Responsive Design Implementation', ar: 'تحويل التصميم إلى واجهة متجاوبة' },
    summary: {
      en: 'Designs that look right on phones, tablets, and desktop screens.',
      ar: 'تصاميم تظهر بصورة سليمة على الجوال والأجهزة اللوحية والكمبيوتر.',
    },
    description: {
      en: 'Implement designs that work clearly and consistently across phones, tablets, and desktop screens.',
      ar: 'تنفيذ ملفات التصميم لتعمل بصورة واضحة ومتناسقة على الجوال والأجهزة اللوحية والكمبيوتر.',
    },
    highlights: [
      { en: 'Layouts that start from the phone screen', ar: 'تخطيطات تبدأ من شاشة الجوال' },
      { en: 'A close match to your approved design', ar: 'مطابقة دقيقة للتصميم المعتمد' },
      { en: 'Checked at real device widths', ar: 'مراجعة على عروض أجهزة حقيقية' },
    ],
  },
  {
    id: 'accessibility',
    slug: 'accessibility-improvements',
    order: 8,
    featured: false,
    icon: 'accessibility',
    title: { en: 'Accessibility Improvements', ar: 'تحسين إمكانية الوصول' },
    summary: {
      en: 'A site that more people can use, including keyboard and screen-reader users.',
      ar: 'موقع يستطيع عدد أكبر من الناس استخدامه، ومنهم مستخدمو لوحة المفاتيح وقارئات الشاشة.',
    },
    description: {
      en: 'Improve keyboard navigation, content clarity, contrast, and screen-reader support.',
      ar: 'تحسين التنقل بلوحة المفاتيح، ووضوح المحتوى، والتباين، ودعم قارئات الشاشة.',
    },
    highlights: [
      { en: 'A review against the WCAG 2.2 AA guidelines', ar: 'مراجعة وفق إرشادات WCAG 2.2 AA' },
      { en: 'Keyboard navigation and focus fixes', ar: 'إصلاح التنقل بلوحة المفاتيح وحركة التركيز' },
      { en: 'Contrast and readability corrections', ar: 'تصحيح التباين ووضوح القراءة' },
    ],
  },
  {
    id: 'seo',
    slug: 'technical-seo',
    order: 9,
    featured: false,
    icon: 'search',
    title: { en: 'Technical SEO', ar: 'تهيئة الموقع لمحركات البحث' },
    summary: {
      en: 'Pages that search engines can understand more easily.',
      ar: 'صفحات يسهل على محركات البحث فهم محتواها.',
    },
    description: {
      en: 'Improve page titles, descriptions, structure, and structured data to help search engines understand the content.',
      ar: 'تحسين عناوين الصفحات وأوصافها وبنيتها والبيانات المنظّمة، لتسهيل فهم محتواها من محركات البحث.',
    },
    highlights: [
      { en: 'Page titles and descriptions in both languages', ar: 'عناوين وأوصاف للصفحات باللغتين' },
      { en: 'Structured data for your pages', ar: 'بيانات منظّمة للصفحات' },
      { en: 'Content that search engines can read', ar: 'محتوى يمكن لمحركات البحث قراءته' },
    ],
  },
];
