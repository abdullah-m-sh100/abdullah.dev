import type { Experience } from '@/types/content';

/** TODO: Replace with the real employment history. */
export const experience: Experience[] = [
  {
    id: 'exp-freelance',
    current: true,
    startDate: '2023-01-01',
    employmentType: 'freelance',
    role: {
      en: 'Front-End Developer',
      ar: 'مطوّر واجهات أمامية',
    },
    company: {
      en: 'Freelance',
      ar: 'عمل حر',
    },
    location: {
      en: 'Remote',
      ar: 'عن بُعد',
    },
    summary: {
      en: 'Building React and Next.js interfaces for startups, e-commerce brands and product teams.',
      ar: 'بناء واجهات بـ React و Next.js لشركات ناشئة ومتاجر إلكترونية وفرق منتجات.',
    },
    achievements: [
      {
        en: 'Delivered production front-ends from design files to deployment.',
        ar: 'تسليم واجهات إنتاجية من ملفات التصميم حتى النشر.',
      },
      {
        en: 'Introduced typed component systems that reduced duplicated UI code.',
        ar: 'إدخال أنظمة مكوّنات محدّدة الأنواع قلّلت تكرار كود الواجهة.',
      },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
];
