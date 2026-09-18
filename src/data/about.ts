import type { AboutInfo } from '@/types/content';

/** TODO: Replace with final portfolio content. */
export const about: AboutInfo = {
  summary: [
    {
      en: 'I am a front-end developer focused on React.js and Next.js. I turn design systems and product ideas into interfaces that are fast, accessible and straightforward to maintain.',
      ar: 'أنا مطوّر واجهات أمامية أركّز على React.js و Next.js. أحوّل أنظمة التصميم وأفكار المنتجات إلى واجهات سريعة وسهلة الوصول وقابلة للصيانة.',
    },
    {
      en: 'My work sits between design and engineering: translating layouts into resilient components, connecting them to real APIs, and keeping the result measurable through performance and accessibility budgets.',
      ar: 'يقع عملي بين التصميم والهندسة: أترجم التصاميم إلى مكوّنات متينة، وأربطها بواجهات برمجية حقيقية، وأحافظ على قابلية القياس عبر معايير الأداء وسهولة الوصول.',
    },
    {
      en: 'I am based in Palestine and work remotely with clients worldwide — startups, e-commerce brands and product teams that need an interface layer they can keep building on.',
      ar: 'أعمل من فلسطين عن بُعد مع عملاء حول العالم — شركات ناشئة ومتاجر إلكترونية وفرق منتجات تحتاج طبقة واجهة يمكن البناء عليها مستقبلًا.',
    },
  ],
  preview: [
    {
      en: 'I am a front-end developer focused on React.js and Next.js, turning product ideas and design systems into fast, accessible interfaces.',
      ar: 'مطوّر واجهات أمامية أركّز على React.js و Next.js، أحوّل أفكار المنتجات وأنظمة التصميم إلى واجهات سريعة وسهلة الوصول.',
    },
    {
      en: 'Clean code, clear structure, and interfaces that keep performing as the product grows.',
      ar: 'كود نظيف وبنية واضحة وواجهات تحافظ على أدائها مع نمو المنتج.',
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
        en: 'Core Web Vitals are part of the deliverable, not an afterthought.',
        ar: 'مؤشرات الأداء الأساسية جزء من التسليم وليست خطوة لاحقة.',
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
        en: 'Typed contracts and reusable primitives keep future work cheap.',
        ar: 'العقود المكتوبة بأنواع واضحة والمكوّنات القابلة لإعادة الاستخدام تقلّل تكلفة التطوير لاحقًا.',
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
        en: 'Define the component model, data contracts and routing up front.',
        ar: 'تحديد نموذج المكوّنات وعقود البيانات ومسارات التنقّل منذ البداية.',
      },
    },
    {
      id: 'build',
      order: 3,
      title: { en: 'Build', ar: 'التنفيذ' },
      description: {
        en: 'Implement responsive, accessible interfaces against real content.',
        ar: 'تنفيذ واجهات متجاوبة وسهلة الوصول باستخدام محتوى حقيقي.',
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
    { en: 'Startups shipping their first product interface', ar: 'شركات ناشئة تطلق أول واجهة لمنتجها' },
    { en: 'E-commerce brands that need faster storefronts', ar: 'متاجر إلكترونية تحتاج واجهات أسرع' },
    { en: 'Product teams modernizing a legacy front-end', ar: 'فرق منتجات تُحدّث واجهة قديمة' },
    { en: 'Agencies looking for a reliable implementation partner', ar: 'وكالات تبحث عن شريك تنفيذ موثوق' },
  ],
};
