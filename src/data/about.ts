import type { AboutInfo } from '@/types/content';

/**
 * The About narrative.
 *
 * `summary` is the full biography on /about; `preview` is the shorter pair of
 * paragraphs Home shows. They are separate fields rather than a slice, because
 * the Home version has to stand alone beside the stats panel.
 *
 * Deliberately no year counts or seniority labels in either — the verified
 * numbers live in `stats.ts`, and prior front-end years are not restated as
 * full-stack or MERN years anywhere on the site.
 */
export const about: AboutInfo = {
  summary: [
    {
      en: 'I am a full-stack web developer working with the MERN stack — MongoDB, Express.js, React.js and Node.js. I build the interface, the API behind it and the database underneath, and I connect the three into one working application.',
      ar: 'أنا مطور ويب متكامل أعمل بـ MERN Stack — MongoDB و Express.js و React.js و Node.js. أبني الواجهة وواجهة API خلفها وقاعدة البيانات تحتها، وأربط الثلاثة في تطبيق واحد يعمل.',
    },
    {
      en: 'On the front end I work with React.js and Next.js, and I use TypeScript where it keeps a growing codebase safe to change. On the back end I build REST APIs with Node.js and Express.js, model the data in MongoDB around the queries the application actually makes, and handle the authentication, validation and error states in between.',
      ar: 'في الواجهة الأمامية أعمل بـ React.js و Next.js، وأستخدم TypeScript حيث يجعل الكود المتنامي آمنًا للتعديل. وفي الباك إند أبني واجهات REST API بـ Node.js و Express.js، وأصمّم البيانات في MongoDB حسب الاستعلامات التي ينفّذها التطبيق فعليًا، وأتولّى المصادقة والتحقق من المدخلات ومعالجة الأخطاء بينهما.',
    },
    {
      en: 'I care about code that the next person can read and extend — clear structure, reusable components, and typed contracts between the layers. I am based in Palestine and work remotely with startups, e-commerce brands and project owners who need an application they can keep building on.',
      ar: 'يهمّني أن يكون الكود مفهومًا وقابلًا للتطوير من بعدي: بنية واضحة ومكوّنات قابلة لإعادة الاستخدام وعقود محدّدة الأنواع بين الطبقات. أعمل من فلسطين عن بُعد مع شركات ناشئة ومتاجر إلكترونية وأصحاب مشاريع يحتاجون تطبيقًا يمكنهم البناء عليه مستقبلًا.',
    },
  ],
  preview: [
    {
      en: 'I am a full-stack web developer working with the MERN stack — I build React.js interfaces, Node.js and Express.js APIs, and the MongoDB data layer underneath them.',
      ar: 'مطور ويب متكامل أعمل بـ MERN Stack — أبني واجهات بـ React.js، وواجهات API بـ Node.js و Express.js، وطبقة بيانات MongoDB تحتها.',
    },
    {
      en: 'Clean code, clear structure, and applications that keep performing as the product grows.',
      ar: 'كود نظيف وبنية واضحة وتطبيقات تحافظ على أدائها مع نمو المنتج.',
    },
  ],
  values: [
    {
      id: 'clarity',
      title: { en: 'Clarity first', ar: 'الوضوح أولًا' },
      description: {
        en: 'Readable structure and predictable components beat clever abstractions.',
        ar: 'البنية الواضحة والمكوّنات المتوقّعة أفضل من التجريدات المعقّدة.',
      },
      icon: 'eye',
    },
    {
      id: 'performance',
      title: { en: 'Performance as a feature', ar: 'الأداء ميزة أساسية' },
      description: {
        en: 'Fast interfaces and efficient queries are part of the deliverable, not an afterthought.',
        ar: 'الواجهات السريعة والاستعلامات الفعّالة جزء من التسليم وليست خطوة لاحقة.',
      },
      icon: 'gauge',
    },
    {
      id: 'accessibility',
      title: { en: 'Accessible by default', ar: 'سهولة الوصول افتراضيًا' },
      description: {
        en: 'Keyboard support, semantics and contrast are built in from the start.',
        ar: 'دعم لوحة المفاتيح والدلالات والتباين مبنية من البداية.',
      },
      icon: 'accessibility',
    },
    {
      id: 'maintainability',
      title: { en: 'Built to be extended', ar: 'قابلية التوسّع' },
      description: {
        en: 'Typed contracts between the interface, the API and the data keep future work cheap.',
        ar: 'العقود محدّدة الأنواع بين الواجهة وواجهة API والبيانات تقلّل تكلفة التطوير لاحقًا.',
      },
      icon: 'layers',
    },
  ],
  workflow: [
    {
      id: 'discover',
      order: 1,
      title: { en: 'Understand', ar: 'الفهم' },
      description: {
        en: 'Clarify the goal, the audience and the constraints before writing code.',
        ar: 'توضيح الهدف والجمهور والقيود قبل كتابة أي كود.',
      },
    },
    {
      id: 'structure',
      order: 2,
      title: { en: 'Structure', ar: 'البناء الهيكلي' },
      description: {
        en: 'Define the data model, the API surface and the component tree up front.',
        ar: 'تحديد نموذج البيانات وواجهات API وشجرة المكوّنات منذ البداية.',
      },
    },
    {
      id: 'build',
      order: 3,
      title: { en: 'Build', ar: 'التنفيذ' },
      description: {
        en: 'Implement the interface and the API together, against real data.',
        ar: 'تنفيذ الواجهة وواجهة API معًا، باستخدام بيانات حقيقية.',
      },
    },
    {
      id: 'refine',
      order: 4,
      title: { en: 'Measure & refine', ar: 'القياس والتحسين' },
      description: {
        en: 'Audit performance, accessibility and SEO, then tighten what matters.',
        ar: 'مراجعة الأداء وسهولة الوصول وتحسين محركات البحث ثم تحسين ما يهم فعلًا.',
      },
    },
  ],
  audience: [
    { en: 'Startups shipping their first web application', ar: 'شركات ناشئة تطلق أول تطبيق ويب لها' },
    { en: 'E-commerce brands that need a faster storefront', ar: 'متاجر إلكترونية تحتاج واجهة أسرع' },
    { en: 'Project owners who need both a front end and an API', ar: 'أصحاب مشاريع يحتاجون واجهة وواجهة API معًا' },
    { en: 'Teams modernizing a legacy web application', ar: 'فرق تُحدّث تطبيق ويب قديمًا' },
  ],
};
