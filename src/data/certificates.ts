import type { Certificate } from '@/types/content';

/**
 * TODO: Replace with real certificates, issuers, dates and credential URLs.
 * Do not publish unverified credentials.
 */
export const certificates: Certificate[] = [
  {
    id: 'cert-meta-frontend',
    slug: 'front-end-development-professional',
    order: 1,
    featured: true,
    issueDate: '2025-03-10',
    doesNotExpire: true,
    title: {
      en: 'Front-End Development Professional',
      ar: 'محترف تطوير الواجهات الأمامية',
    },
    issuer: {
      en: 'Placeholder Issuer',
      ar: 'جهة إصدار مؤقتة',
    },
    description: {
      en: 'Program covering modern JavaScript, React and production front-end workflows.',
      ar: 'برنامج يغطي JavaScript الحديثة وReact وسير عمل الواجهات في بيئة الإنتاج.',
    },
  },
  {
    id: 'cert-react-advanced',
    slug: 'advanced-react',
    order: 2,
    featured: true,
    issueDate: '2024-12-05',
    doesNotExpire: true,
    title: {
      en: 'Advanced React',
      ar: 'React المتقدّم',
    },
    issuer: {
      en: 'Placeholder Issuer',
      ar: 'جهة إصدار مؤقتة',
    },
    description: {
      en: 'Component patterns, performance and state management in large React applications.',
      ar: 'أنماط المكوّنات والأداء وإدارة الحالة في تطبيقات React الكبيرة.',
    },
  },
  {
    id: 'cert-web-accessibility',
    slug: 'web-accessibility',
    order: 3,
    featured: false,
    issueDate: '2024-07-18',
    doesNotExpire: true,
    title: {
      en: 'Web Accessibility',
      ar: 'سهولة الوصول على الويب',
    },
    issuer: {
      en: 'Placeholder Issuer',
      ar: 'جهة إصدار مؤقتة',
    },
    description: {
      en: 'Practical WCAG techniques for semantic, keyboard-friendly interfaces.',
      ar: 'تقنيات عملية وفق WCAG لبناء واجهات دلالية وصديقة للوحة المفاتيح.',
    },
  },
];
