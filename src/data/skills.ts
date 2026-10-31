import type { SkillCategory } from '@/types/content';

/**
 * Skills, grouped by what each area does for the product.
 *
 * Technology names are never translated. There are deliberately no proficiency
 * percentages and no per-technology year counts — both are unverifiable, and
 * the `level` field exists only to separate a core tool from one used
 * occasionally, never to be rendered as a score.
 *
 * `highlighted` promotes a skill to an emphasized badge in the About skills
 * section. It is about prominence inside its own group; the four technologies
 * that define the stack are listed separately in `coreStack` below.
 *
 * Four groups, matching the four-card grid the Home expertise strip and the
 * About skills rows both render. Adding a fifth would leave an orphan card.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    order: 1,
    title: { en: 'Front-End', ar: 'الواجهة الأمامية' },
    description: {
      en: 'The interface layer users actually touch.',
      ar: 'طبقة الواجهة التي يتعامل معها المستخدم فعليًا.',
    },
    icon: 'component',
    skills: [
      { id: 'react', name: 'React.js', level: 'core', highlighted: true },
      { id: 'nextjs', name: 'Next.js', level: 'core', highlighted: true },
      { id: 'javascript', name: 'JavaScript', level: 'core', highlighted: true },
      { id: 'typescript', name: 'TypeScript', level: 'core', highlighted: true },
      { id: 'tailwind', name: 'Tailwind CSS', level: 'core', highlighted: true },
      { id: 'html', name: 'HTML', level: 'core' },
      { id: 'css', name: 'CSS', level: 'core' },
      { id: 'responsive', name: 'Responsive Design', label: { en: 'Responsive Design', ar: 'تصميم متجاوب' }, level: 'core' },
      { id: 'design-systems', name: 'Design Systems', label: { en: 'Design Systems', ar: 'أنظمة التصميم' }, level: 'strong' },
      { id: 'forms', name: 'Forms & Validation', label: { en: 'Forms & Validation', ar: 'النماذج والتحقق من المدخلات' }, level: 'strong' },
    ],
  },
  {
    id: 'backend',
    order: 2,
    title: { en: 'Back-End', ar: 'الباك إند' },
    description: {
      en: 'Server logic and the APIs the interface runs on.',
      ar: 'منطق الخادم وواجهات API التي تعمل عليها الواجهة.',
    },
    icon: 'code',
    skills: [
      { id: 'nodejs', name: 'Node.js', level: 'core', highlighted: true },
      { id: 'express', name: 'Express.js', level: 'core', highlighted: true },
      { id: 'rest', name: 'REST API Development', label: { en: 'REST API Development', ar: 'تطوير واجهات REST API' }, level: 'core', highlighted: true },
      { id: 'api-integration', name: 'API Integration', label: { en: 'API Integration', ar: 'الربط مع الخدمات الخارجية' }, level: 'core' },
      { id: 'data-fetching', name: 'Data Fetching & Caching', label: { en: 'Data Fetching & Caching', ar: 'جلب البيانات والتخزين المؤقت' }, level: 'strong' },
      /*
       * Integration experience, not a specialization — two shipped projects
       * (SmartSpend, Nervu.AI) have a Laravel back end this front end talks to.
       * Deliberately not `highlighted`, so it never reads as part of the core
       * stack alongside Node and Express.
       */
      { id: 'laravel', name: 'Laravel Integration', label: { en: 'Laravel Back-End Integration', ar: 'الربط مع أنظمة Laravel' }, level: 'working' },
    ],
  },
  {
    id: 'database',
    order: 3,
    title: { en: 'Database', ar: 'قواعد البيانات' },
    description: {
      en: 'Modelling application data and the operations on it.',
      ar: 'تصميم بيانات التطبيق والعمليات التي تُجرى عليها.',
    },
    icon: 'database',
    skills: [
      { id: 'mongodb', name: 'MongoDB', level: 'core', highlighted: true },
      { id: 'data-modeling', name: 'Data Modeling', label: { en: 'Data Modeling', ar: 'تصميم نماذج البيانات' }, level: 'core' },
      { id: 'crud', name: 'CRUD Operations', label: { en: 'CRUD Operations', ar: 'إضافة البيانات وعرضها وتعديلها وحذفها' }, level: 'core' },
    ],
  },
  {
    id: 'workflow',
    order: 4,
    title: { en: 'Workflow & Quality', ar: 'سير العمل والجودة' },
    description: {
      en: 'Tooling and checks that keep delivery predictable.',
      ar: 'أدوات ومعايير تجعل التسليم متوقّعًا ومنضبطًا.',
    },
    icon: 'refresh',
    skills: [
      { id: 'git', name: 'Git', level: 'core', highlighted: true },
      { id: 'github', name: 'GitHub', level: 'core', highlighted: true },
      { id: 'performance', name: 'Performance Optimization', label: { en: 'Performance Optimization', ar: 'تحسين الأداء' }, level: 'strong' },
      { id: 'accessibility', name: 'Accessibility (WCAG)', label: { en: 'Accessibility (WCAG)', ar: 'إمكانية الوصول وفق إرشادات WCAG' }, level: 'strong' },
      { id: 'seo', name: 'Technical SEO', label: { en: 'Technical SEO', ar: 'التهيئة التقنية لمحركات البحث' }, level: 'strong' },
      { id: 'testing', name: 'Testing', label: { en: 'Testing', ar: 'الاختبار' }, level: 'working' },
    ],
  },
];

/**
 * The core stack, in MERN order, as skill ids resolved against the groups above.
 *
 * This is what the Home hero prints under "Core stack", and it is a separate
 * list rather than a slice of the highlighted skills for a reason: highlighting
 * is per-group prominence, so the first four highlighted skills would always be
 * the four front-end ones. Naming the four explicitly is the only way the hero
 * states the actual stack.
 *
 * Every id here must exist in `skillCategories` — `getCoreStack()` drops
 * anything it cannot resolve rather than rendering a blank chip.
 */
export const coreStack: string[] = ['mongodb', 'express', 'react', 'nodejs'];
