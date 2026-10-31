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
      { id: 'responsive', name: 'Responsive Design', level: 'core' },
      { id: 'design-systems', name: 'Design Systems', level: 'strong' },
      { id: 'forms', name: 'Forms & Validation', level: 'strong' },
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
      { id: 'rest', name: 'REST API Development', level: 'core', highlighted: true },
      { id: 'api-integration', name: 'API Integration', level: 'core' },
      { id: 'data-fetching', name: 'Data Fetching & Caching', level: 'strong' },
      /*
       * Integration experience, not a specialization — two shipped projects
       * (SmartSpend, Nervu.AI) have a Laravel back end this front end talks to.
       * Deliberately not `highlighted`, so it never reads as part of the core
       * stack alongside Node and Express.
       */
      { id: 'laravel', name: 'Laravel Integration', level: 'working' },
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
      { id: 'data-modeling', name: 'Data Modeling', level: 'core' },
      { id: 'crud', name: 'CRUD Operations', level: 'core' },
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
      { id: 'performance', name: 'Performance Optimization', level: 'strong' },
      { id: 'accessibility', name: 'Accessibility (WCAG)', level: 'strong' },
      { id: 'seo', name: 'Technical SEO', level: 'strong' },
      { id: 'testing', name: 'Testing', level: 'working' },
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
