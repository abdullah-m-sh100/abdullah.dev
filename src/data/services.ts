import type { Service } from '@/types/content';

/** TODO: Replace with final portfolio content. Review wording before launch. */
export const services: Service[] = [
  {
    id: 'nextjs',
    slug: 'nextjs-development',
    order: 1,
    featured: true,
    icon: 'rocket',
    title: { en: 'Next.js Development', ar: 'تطوير بـ Next.js' },
    summary: {
      en: 'Production-ready Next.js applications with the App Router.',
      ar: 'تطبيقات Next.js جاهزة للإنتاج باستخدام App Router.',
    },
    description: {
      en: 'Server Components, streaming, route handlers and static rendering used where each actually pays off — resulting in a site that is fast on first load and cheap to run.',
      ar: 'استخدام Server Components والعرض التدريجي ومعالجات المسارات والعرض الثابت في مواضعها الصحيحة، لينتج موقع سريع منذ التحميل الأول ومنخفض التكلفة في التشغيل.',
    },
    highlights: [
      { en: 'App Router architecture', ar: 'بنية App Router' },
      { en: 'Server Components by default', ar: 'Server Components بشكل افتراضي' },
      { en: 'Static and dynamic rendering strategy', ar: 'استراتيجية عرض ثابت وديناميكي' },
    ],
  },
  {
    id: 'react',
    slug: 'react-application-development',
    order: 2,
    featured: true,
    icon: 'component',
    title: { en: 'React Application Development', ar: 'تطوير تطبيقات React' },
    summary: {
      en: 'Component architecture that scales with the product.',
      ar: 'بنية مكوّنات تتوسّع مع نمو المنتج.',
    },
    description: {
      en: 'Typed, reusable component libraries with clear data contracts, so new features slot in without rewriting what already works.',
      ar: 'مكتبات مكوّنات قابلة لإعادة الاستخدام ومكتوبة بأنواع واضحة وعقود بيانات محدّدة، بحيث تُضاف الميزات الجديدة دون إعادة كتابة ما يعمل بالفعل.',
    },
    highlights: [
      { en: 'Reusable component systems', ar: 'أنظمة مكوّنات قابلة لإعادة الاستخدام' },
      { en: 'Strong TypeScript typing', ar: 'كتابة قوية بـ TypeScript' },
      { en: 'Predictable state handling', ar: 'إدارة حالة متوقّعة' },
    ],
  },
  {
    id: 'responsive-ui',
    slug: 'responsive-ui-implementation',
    order: 3,
    featured: true,
    icon: 'smartphone',
    title: { en: 'Responsive UI Implementation', ar: 'تنفيذ واجهات متجاوبة' },
    summary: {
      en: 'Pixel-accurate interfaces that hold up on every screen.',
      ar: 'واجهات دقيقة التنفيذ تعمل بثبات على كل الشاشات.',
    },
    description: {
      en: 'Designs implemented mobile-first with logical CSS properties, so the same layout works in both LTR and RTL without a second codebase.',
      ar: 'تنفيذ التصاميم بمنهج الجوال أولًا مع خصائص CSS المنطقية، ليعمل التخطيط نفسه في الاتجاهين دون الحاجة إلى نسخة ثانية من الكود.',
    },
    highlights: [
      { en: 'Mobile-first layouts', ar: 'تخطيطات تبدأ من الجوال' },
      { en: 'Full RTL and LTR support', ar: 'دعم كامل للاتجاهين' },
      { en: 'Design-system fidelity', ar: 'التزام دقيق بنظام التصميم' },
    ],
  },
  {
    id: 'api-integration',
    slug: 'api-integration',
    order: 4,
    featured: false,
    icon: 'plug',
    title: { en: 'API Integration', ar: 'تكامل واجهات البرمجة' },
    summary: {
      en: 'Reliable data flow between your interface and back-end.',
      ar: 'تدفّق بيانات موثوق بين الواجهة والخادم.',
    },
    description: {
      en: 'REST integrations with typed responses, sensible caching, and clear loading, error and empty states.',
      ar: 'تكامل REST باستجابات محدّدة الأنواع وتخزين مؤقت مدروس وحالات تحميل وأخطاء وحالات فارغة واضحة.',
    },
    highlights: [
      { en: 'Typed API contracts', ar: 'عقود واجهات برمجية محدّدة الأنواع' },
      { en: 'Caching and revalidation', ar: 'تخزين مؤقت وإعادة تحقّق' },
      { en: 'Robust error handling', ar: 'معالجة قوية للأخطاء' },
    ],
  },
  {
    id: 'performance',
    slug: 'performance-optimization',
    order: 5,
    featured: true,
    icon: 'gauge',
    title: { en: 'Performance Optimization', ar: 'تحسين الأداء' },
    summary: {
      en: 'Measurable Core Web Vitals improvements.',
      ar: 'تحسينات قابلة للقياس في مؤشرات الأداء الأساسية.',
    },
    description: {
      en: 'Bundle analysis, image strategy, font loading and rendering decisions reviewed against real measurements rather than assumptions.',
      ar: 'تحليل حجم الحزم واستراتيجية الصور وتحميل الخطوط وقرارات العرض، مبنية على قياسات حقيقية لا على افتراضات.',
    },
    highlights: [
      { en: 'Bundle size reduction', ar: 'تقليل حجم الحزم' },
      { en: 'Image and font strategy', ar: 'استراتيجية الصور والخطوط' },
      { en: 'Before and after measurement', ar: 'قياس قبل وبعد' },
    ],
  },
  {
    id: 'accessibility',
    slug: 'accessibility-improvements',
    order: 6,
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
    slug: 'seo-focused-front-end',
    order: 7,
    featured: false,
    icon: 'search',
    title: { en: 'SEO-Focused Front-End', ar: 'واجهات مهيّأة لمحركات البحث' },
    summary: {
      en: 'Technical SEO built into the rendering layer.',
      ar: 'تهيئة تقنية لمحركات البحث مدمجة في طبقة العرض.',
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
  {
    id: 'refactoring',
    slug: 'ui-refactoring',
    order: 8,
    featured: false,
    icon: 'refresh',
    title: { en: 'UI Refactoring & Modernization', ar: 'إعادة هيكلة وتحديث الواجهات' },
    summary: {
      en: 'Bringing an existing front-end back under control.',
      ar: 'إعادة السيطرة على واجهة أمامية قائمة.',
    },
    description: {
      en: 'Incremental modernization of legacy interfaces — introducing types, tokens and reusable components without stopping delivery.',
      ar: 'تحديث تدريجي للواجهات القديمة عبر إدخال الأنواع والرموز التصميمية والمكوّنات القابلة لإعادة الاستخدام دون إيقاف التسليم.',
    },
    highlights: [
      { en: 'Incremental migration', ar: 'ترحيل تدريجي' },
      { en: 'Design token adoption', ar: 'اعتماد رموز التصميم' },
      { en: 'Reduced duplication', ar: 'تقليل التكرار' },
    ],
  },
];
