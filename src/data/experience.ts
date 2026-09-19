import type { Experience } from '@/types/content';

/**
 * TODO: Replace `exp-freelance` with the real employment history — left
 * untouched pending a separate review.
 *
 * The three `training` entries below are structured programs sourced from
 * the certificates in `public/Certificates/`, labelled honestly as training
 * rather than employment. `exp-gsg-code2career` has no verifiable calendar
 * dates on its certificate, so `startDate`/`endDate` are left unset instead
 * of guessed — its 100-hour duration is described in `summary` instead.
 */
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
  {
    id: 'exp-code-center-frontend-training',
    current: false,
    startDate: '2026-03-01',
    endDate: '2026-06-02',
    employmentType: 'training',
    role: {
      en: 'Front-End Web Development — Intensive Training Program',
      ar: 'تطوير الواجهات الأمامية — برنامج تدريبي مكثف',
    },
    company: {
      en: 'Code Center for Training and Development',
      ar: 'مركز شيفرة للتدريب والتطوير',
    },
    summary: {
      en: 'An intensive Front-End Web Development training program covering modern web interfaces, responsive design and JavaScript fundamentals — completed with a final grade of Excellent (A+).',
      ar: 'برنامج تدريبي مكثف في تطوير الواجهات الأمامية غطّى بناء واجهات ويب حديثة والتصميم المتجاوب وأساسيات JavaScript، وأُنجز البرنامج بتقدير ممتاز (A+).',
    },
    achievements: [
      {
        en: 'Completed the full intensive program from March to June 2026 with a final grade of Excellent (A+).',
        ar: 'إكمال البرنامج التدريبي المكثف بالكامل من مارس إلى يونيو 2026 بتقدير ممتاز (A+).',
      },
      {
        en: 'Built and practiced modern, responsive front-end interfaces throughout the program.',
        ar: 'بناء والتدرّب على واجهات أمامية حديثة ومتجاوبة طوال فترة البرنامج.',
      },
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
  {
    id: 'exp-gsg-code2career',
    current: false,
    // No calendar dates are printed on the certificate — left unset rather than guessed.
    employmentType: 'training',
    role: {
      en: '100-Hour Code2Career Frontend Path Training',
      ar: 'برنامج Code2Career التدريبي لمسار تطوير الواجهات الأمامية – 100 ساعة',
    },
    company: {
      en: 'Gaza Sky Geeks',
      ar: 'غزة سكاي جيكس',
    },
    summary: {
      en: 'A 100-hour structured frontend development training program run by Gaza Sky Geeks in partnership with Mercy Corps, focused on strengthening practical web development skills and preparing participants for professional software development opportunities.',
      ar: 'برنامج تدريبي مكثف لمدة 100 ساعة نظّمته غزة سكاي جيكس بالشراكة مع ميرسي كور، ركّز على تطوير المهارات العملية في بناء تطبيقات الويب والاستعداد للعمل في بيئات تطوير برمجية احترافية.',
    },
    achievements: [
      {
        en: 'Completed 100 hours of structured frontend development training within the Code2Career path.',
        ar: 'إكمال 100 ساعة تدريبية منظّمة في تطوير الواجهات الأمامية ضمن مسار Code2Career.',
      },
      {
        en: 'Practiced collaborative, team-based development workflows alongside program peers.',
        ar: 'التدرّب على أساليب العمل التطويري الجماعي والتعاوني إلى جانب زملاء البرنامج.',
      },
    ],
    technologies: ['JavaScript', 'React', 'Git'],
  },
  {
    id: 'exp-gazatech-reactjs-training',
    current: false,
    startDate: '2025-11-23',
    employmentType: 'training',
    role: {
      en: 'React.js Training Program',
      ar: 'برنامج تدريبي في React.js',
    },
    company: {
      en: 'GazaTech Builders',
      ar: 'غزة تك بيلدرز',
    },
    summary: {
      en: 'A 120-hour technical training program focused on React.js and modern frontend application development, including component-based UI development and practical web application building.',
      ar: 'برنامج تدريبي تقني لمدة 120 ساعة ركّز على React.js وتطوير تطبيقات الويب الحديثة، بما يشمل بناء الواجهات باستخدام المكونات والتطبيق العملي على تطوير واجهات المستخدم.',
    },
    achievements: [
      {
        en: 'Completed 120 hours of hands-on React.js training, building component-based interfaces.',
        ar: 'إكمال 120 ساعة تدريبية عملية في React.js، شملت بناء واجهات قائمة على المكونات.',
      },
    ],
    technologies: ['React', 'JavaScript'],
  },
];
