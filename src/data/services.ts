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
 * Each `summary` is one line — it is the only copy a supporting card shows, so
 * it has to say what the client gets, not what the stack is.
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
      en: 'One team for the interface, the API and the database.',
      ar: 'جهة واحدة تتولّى الواجهة وواجهات API وقاعدة البيانات.',
    },
    description: {
      en: 'A complete web application built end to end — a React.js interface, a Node.js and Express.js API behind it, and MongoDB underneath — so the three layers are designed against each other instead of being stitched together late.',
      ar: 'تطبيق ويب كامل يُبنى من البداية إلى النهاية: واجهة بـ React.js، وواجهة API بـ Node.js و Express.js خلفها، وقاعدة بيانات MongoDB تحتها — بحيث تُصمَّم الطبقات الثلاث معًا لا أن تُجمَع في آخر مرحلة.',
    },
    highlights: [
      { en: 'Interface, API and database in one build', ar: 'الواجهة وواجهات API وقاعدة البيانات في مسار واحد' },
      { en: 'One person accountable for the whole flow', ar: 'مسؤول واحد عن التدفّق بالكامل' },
      { en: 'Deployed and handed over working', ar: 'تسليم المشروع منشورًا وجاهزًا للعمل' },
    ],
  },
  {
    id: 'react-nextjs',
    slug: 'react-nextjs-development',
    order: 2,
    featured: true,
    icon: 'component',
    title: { en: 'React & Next.js Development', ar: 'تطوير بـ React و Next.js' },
    summary: {
      en: 'Responsive, maintainable interfaces that scale with the product.',
      ar: 'واجهات متجاوبة وقابلة للصيانة تتوسّع مع نمو المنتج.',
    },
    description: {
      en: 'Typed, reusable component systems with clear data contracts, built mobile-first with logical CSS so the same layout works in Arabic and English without a second codebase. Next.js is used where server rendering and routing actually pay off.',
      ar: 'أنظمة مكوّنات قابلة لإعادة الاستخدام ومحدّدة الأنواع بعقود بيانات واضحة، تُبنى بمنهج الجوال أولًا مع خصائص CSS المنطقية ليعمل التخطيط نفسه بالعربية والإنجليزية دون نسخة ثانية من الكود. ويُستخدم Next.js حيث يقدّم العرض من الخادم والتوجيه قيمة فعلية.',
    },
    highlights: [
      { en: 'Reusable component systems', ar: 'أنظمة مكوّنات قابلة لإعادة الاستخدام' },
      { en: 'Full RTL and LTR support', ar: 'دعم كامل للاتجاهين' },
      { en: 'Strong TypeScript typing', ar: 'كتابة قوية بـ TypeScript' },
    ],
  },
  {
    id: 'nodejs-express',
    slug: 'nodejs-express-development',
    order: 3,
    featured: true,
    icon: 'code',
    title: { en: 'Node.js & Express.js Development', ar: 'تطوير بـ Node.js و Express.js' },
    summary: {
      en: 'Server logic and REST APIs your front end can rely on.',
      ar: 'منطق الخادم وواجهات REST API يمكن للواجهة الاعتماد عليها.',
    },
    description: {
      en: 'Express.js services with routes grouped by resource, validation at the edge, authentication, and errors that return a useful status and message instead of a generic failure.',
      ar: 'خدمات بـ Express.js بمسارات منظّمة حسب الموارد، مع التحقق من المدخلات عند الطرف، ومعالجة المصادقة، وأخطاء ترجع حالة ورسالة مفيدة بدل فشل عام غير مفهوم.',
    },
    highlights: [
      { en: 'REST endpoints with input validation', ar: 'نقاط REST مع التحقق من المدخلات' },
      { en: 'Authentication and protected routes', ar: 'المصادقة والمسارات المحميّة' },
      { en: 'Predictable error responses', ar: 'استجابات أخطاء متوقّعة' },
    ],
  },
  {
    id: 'mongodb',
    slug: 'mongodb-database-development',
    order: 4,
    featured: true,
    icon: 'database',
    title: { en: 'MongoDB Database Development', ar: 'تطوير قواعد بيانات MongoDB' },
    summary: {
      en: 'Data modelled around how the application actually reads it.',
      ar: 'بيانات مصمّمة حسب الطريقة التي يقرؤها بها التطبيق فعليًا.',
    },
    description: {
      en: 'Collections and schemas shaped around real queries, with the create, read, update and delete operations the application needs, plus indexes on the fields it filters by.',
      ar: 'تصميم المجموعات والمخططات بناءً على الاستعلامات الحقيقية، مع تنفيذ عمليات الإضافة والقراءة والتعديل والحذف التي يحتاجها التطبيق، وفهرسة الحقول المستخدمة في التصفية.',
    },
    highlights: [
      { en: 'Schema and data modelling', ar: 'تصميم المخططات ونماذج البيانات' },
      { en: 'Full CRUD operations', ar: 'عمليات إضافة وقراءة وتعديل وحذف كاملة' },
      { en: 'Indexes on the fields you query', ar: 'فهارس على الحقول التي تُستعلم فعليًا' },
    ],
  },
  {
    id: 'api-integration',
    slug: 'api-integration',
    order: 5,
    featured: true,
    icon: 'plug',
    title: { en: 'API Integration', ar: 'تكامل واجهات البرمجة' },
    summary: {
      en: 'Connecting your interface to a back end or a third-party service.',
      ar: 'ربط الواجهة بالباك إند أو بخدمات خارجية.',
    },
    description: {
      en: 'REST integrations with typed responses, sensible caching, and clear loading, error and empty states — whether the API is mine, yours, or a provider such as a payment or messaging service.',
      ar: 'تكامل REST باستجابات محدّدة الأنواع وتخزين مؤقت مدروس وحالات تحميل وأخطاء وحالات فارغة واضحة — سواء كانت واجهة API من تطويري أو من فريقك أو من مزوّد خارجي مثل خدمات الدفع أو الرسائل.',
    },
    highlights: [
      { en: 'Typed API contracts', ar: 'عقود واجهات برمجية محدّدة الأنواع' },
      { en: 'Third-party service integration', ar: 'التكامل مع الخدمات الخارجية' },
      { en: 'Robust error handling', ar: 'معالجة قوية للأخطاء' },
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
      en: 'Fixing bugs and speeding up an application that already exists.',
      ar: 'إصلاح الأخطاء وتحسين أداء تطبيق قائم بالفعل.',
    },
    description: {
      en: 'Work on a codebase you already have: tracking down bugs, cutting bundle size, fixing image and font loading, and modernizing a legacy interface incrementally — measured before and after rather than assumed.',
      ar: 'العمل على كود قائم لديك فعلًا: تتبّع الأخطاء وإصلاحها، وتقليل حجم الحزم، وإصلاح تحميل الصور والخطوط، وتحديث الواجهات القديمة تدريجيًا — مع قياس قبل وبعد لا مجرد افتراضات.',
    },
    highlights: [
      { en: 'Bug fixing on an existing codebase', ar: 'إصلاح الأخطاء في كود قائم' },
      { en: 'Core Web Vitals improvements', ar: 'تحسين مؤشرات الأداء الأساسية' },
      { en: 'Incremental modernization', ar: 'تحديث تدريجي دون إيقاف العمل' },
    ],
  },

  /* ------------------------------------------------- also available (narrower) */

  {
    id: 'responsive-ui',
    slug: 'responsive-ui-implementation',
    order: 7,
    featured: false,
    icon: 'smartphone',
    title: { en: 'Responsive UI Implementation', ar: 'تنفيذ واجهات متجاوبة' },
    summary: {
      en: 'Design files turned into interfaces that hold up on every screen.',
      ar: 'تحويل ملفات التصميم إلى واجهات تعمل بثبات على كل الشاشات.',
    },
    description: {
      en: 'Designs implemented mobile-first with logical CSS properties, so the same layout works in both LTR and RTL without a second codebase.',
      ar: 'تنفيذ التصاميم بمنهج الجوال أولًا مع خصائص CSS المنطقية، ليعمل التخطيط نفسه في الاتجاهين دون الحاجة إلى نسخة ثانية من الكود.',
    },
    highlights: [
      { en: 'Mobile-first layouts', ar: 'تخطيطات تبدأ من الجوال' },
      { en: 'Design-system fidelity', ar: 'التزام دقيق بنظام التصميم' },
      { en: 'Verified on real device widths', ar: 'مُختبرة على عروض أجهزة حقيقية' },
    ],
  },
  {
    id: 'accessibility',
    slug: 'accessibility-improvements',
    order: 8,
    featured: false,
    icon: 'accessibility',
    title: { en: 'Accessibility Improvements', ar: 'تحسين سهولة الوصول' },
    summary: {
      en: 'Interfaces that work for keyboard and screen-reader users.',
      ar: 'واجهات تعمل لمستخدمي لوحة المفاتيح وقارئات الشاشة.',
    },
    description: {
      en: 'Audits and fixes targeting WCAG 2.2 AA: semantics, focus management, contrast and reduced-motion support.',
      ar: 'مراجعات وإصلاحات تستهدف معيار WCAG 2.2 AA: الدلالات وإدارة التركيز والتباين ودعم تقليل الحركة.',
    },
    highlights: [
      { en: 'WCAG 2.2 AA audits', ar: 'مراجعات وفق WCAG 2.2 AA' },
      { en: 'Keyboard and focus fixes', ar: 'إصلاحات لوحة المفاتيح والتركيز' },
      { en: 'Contrast corrections', ar: 'تصحيح التباين' },
    ],
  },
  {
    id: 'seo',
    slug: 'technical-seo',
    order: 9,
    featured: false,
    icon: 'search',
    title: { en: 'Technical SEO Foundations', ar: 'أساسيات تقنية لمحركات البحث' },
    summary: {
      en: 'Metadata and structured data handled in the rendering layer.',
      ar: 'البيانات الوصفية والمنظّمة مُعالَجة في طبقة العرض.',
    },
    description: {
      en: 'Metadata, canonical URLs, structured data and crawlable rendering handled at the framework level instead of bolted on afterwards.',
      ar: 'البيانات الوصفية والروابط الأساسية والبيانات المنظّمة والعرض القابل للفهرسة، تُعالَج على مستوى الإطار لا كإضافة لاحقة.',
    },
    highlights: [
      { en: 'Localized metadata', ar: 'بيانات وصفية بلغتين' },
      { en: 'Structured data', ar: 'بيانات منظّمة' },
      { en: 'Crawlable rendering', ar: 'عرض قابل للفهرسة' },
    ],
  },
];
