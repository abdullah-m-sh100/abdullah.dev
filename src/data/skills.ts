import type { SkillCategory } from '@/types/content';

/** TODO: Confirm the final skill list. Technology names are never translated. */
export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    order: 1,
    title: { en: 'Core front-end', ar: 'أساسيات الواجهة الأمامية' },
    description: {
      en: 'The foundation every interface is built on.',
      ar: 'الأساس الذي تُبنى عليه كل واجهة.',
    },
    icon: 'code',
    skills: [
      { id: 'react', name: 'React', level: 'core', highlighted: true },
      { id: 'nextjs', name: 'Next.js', level: 'core', highlighted: true },
      { id: 'typescript', name: 'TypeScript', level: 'core', highlighted: true },
      { id: 'javascript', name: 'JavaScript', level: 'core', highlighted: true },
      { id: 'html', name: 'HTML', level: 'core' },
      { id: 'css', name: 'CSS', level: 'core' },
    ],
  },
  {
    id: 'styling',
    order: 2,
    title: { en: 'Styling & UI', ar: 'التنسيق وواجهات المستخدم' },
    description: {
      en: 'Design systems translated into consistent, responsive UI.',
      ar: 'تحويل أنظمة التصميم إلى واجهات متّسقة ومتجاوبة.',
    },
    icon: 'palette',
    skills: [
      { id: 'tailwind', name: 'Tailwind CSS', level: 'core', highlighted: true },
      { id: 'responsive', name: 'Responsive Design', level: 'core' },
      { id: 'design-systems', name: 'Design Systems', level: 'strong' },
      { id: 'accessibility', name: 'Accessibility (WCAG)', level: 'strong' },
    ],
  },
  {
    id: 'data',
    order: 3,
    title: { en: 'Data & integration', ar: 'البيانات والتكامل' },
    description: {
      en: 'Connecting interfaces to real back-end services.',
      ar: 'ربط الواجهات بخدمات خلفية حقيقية.',
    },
    icon: 'plug',
    skills: [
      { id: 'rest', name: 'REST APIs', level: 'core', highlighted: true },
      { id: 'laravel', name: 'Laravel Integration', level: 'working', highlighted: true },
      { id: 'react-query', name: 'Data Fetching & Caching', level: 'strong' },
      { id: 'forms', name: 'Forms & Validation', level: 'strong' },
    ],
  },
  {
    id: 'workflow',
    order: 4,
    title: { en: 'Workflow & quality', ar: 'سير العمل والجودة' },
    description: {
      en: 'Tooling that keeps delivery predictable.',
      ar: 'أدوات تجعل التسليم متوقّعًا ومنضبطًا.',
    },
    icon: 'refresh',
    skills: [
      { id: 'git', name: 'Git', level: 'core', highlighted: true },
      { id: 'performance', name: 'Performance Optimization', level: 'strong' },
      { id: 'seo', name: 'Technical SEO', level: 'strong' },
      { id: 'testing', name: 'Testing', level: 'working' },
    ],
  },
];
