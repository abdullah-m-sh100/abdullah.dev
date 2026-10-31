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
      en: "I'm Abdullah, a full-stack developer specializing in MongoDB, Express.js, React.js, and Node.js. I build interfaces, back-end services, and databases, bringing them together into one application.",
      ar: 'أنا عبدالله، مطور ويب متكامل متخصص في MongoDB وExpress.js وReact.js وNode.js. أطوّر واجهات المستخدم والخدمات الخلفية وقواعد البيانات، وأربطها لتعمل كتطبيق واحد.',
    },
    {
      en: 'Based in Palestine, I work remotely with startups, online stores, and business owners. I focus on understanding requirements, communicating clearly, and writing organized code that is easy to maintain and extend.',
      ar: 'أعمل عن بُعد من فلسطين مع الشركات الناشئة والمتاجر وأصحاب المشاريع. أركز على فهم المطلوب، والتواصل الواضح، وكتابة كود منظّم يمكن صيانته وتطويره لاحقًا.',
    },
  ],
  preview: [
    {
      en: 'I bring the interface, back end, and database together in one complete application. I focus on a clear user experience, well-organized code, and room to add features as your project grows.',
      ar: 'أربط واجهة المستخدم والخادم وقاعدة البيانات في تطبيق متكامل. أركز على وضوح تجربة الاستخدام، وتنظيم الكود، وسهولة إضافة الخصائص مع تطور مشروعك.',
    },
  ],
  values: [
    {
      id: 'clarity',
      title: { en: 'Clarity first', ar: 'الوضوح أولًا' },
      description: {
        en: 'An interface users understand and code developers can follow.',
        ar: 'واجهة يفهمها المستخدم وكود يسهل على فريق التطوير قراءته.',
      },
      icon: 'eye',
    },
    {
      id: 'performance',
      title: { en: 'Performance as a feature', ar: 'الأداء ميزة أساسية' },
      description: {
        en: 'Reviewing page speed and application responsiveness to improve the user experience.',
        ar: 'مراجعة سرعة الصفحات واستجابة التطبيق وتحسين ما يؤثر في تجربة المستخدم.',
      },
      icon: 'gauge',
    },
    {
      id: 'accessibility',
      title: { en: 'Accessible by default', ar: 'سهولة الوصول افتراضيًا' },
      description: {
        en: 'Considering keyboard navigation, readable content, contrast, and screen-reader support.',
        ar: 'مراعاة التنقل بلوحة المفاتيح، ووضوح النصوص، والتباين، ودعم قارئات الشاشة.',
      },
      icon: 'accessibility',
    },
    {
      id: 'maintainability',
      title: { en: 'Built to be extended', ar: 'قابلية التطوير' },
      description: {
        en: 'Organizing the application so future features and changes are easier to implement.',
        ar: 'تنظيم التطبيق بحيث تكون إضافة الخصائص والتعديلات اللاحقة أسهل.',
      },
      icon: 'layers',
    },
  ],
  workflow: [
    {
      id: 'discover',
      order: 1,
      title: { en: 'Understand the project', ar: 'فهم المشروع' },
      description: {
        en: 'We define the goals, users, and required features.',
        ar: 'نحدد الهدف والمستخدمين والخصائص المطلوبة.',
      },
    },
    {
      id: 'structure',
      order: 2,
      title: { en: 'Plan', ar: 'التخطيط' },
      description: {
        en: 'We organize the requirements, application structure, and implementation steps.',
        ar: 'ننظم المتطلبات وهيكل التطبيق وخطوات التنفيذ.',
      },
    },
    {
      id: 'build',
      order: 3,
      title: { en: 'Build', ar: 'التطوير' },
      description: {
        en: 'I build the features and share progress for your review.',
        ar: 'أطوّر الخصائص وأشاركك التقدم للمراجعة.',
      },
    },
    {
      id: 'refine',
      order: 4,
      title: { en: 'Test & deliver', ar: 'الاختبار والتسليم' },
      description: {
        en: 'I review functionality, user experience, and performance, then prepare the project for delivery according to the agreed scope.',
        ar: 'أراجع الوظائف وتجربة الاستخدام والأداء، ثم أجهّز المشروع للتسليم وفق النطاق المتفق عليه.',
      },
    },
  ],
  audience: [
    { en: 'Startups launching a new web application', ar: 'شركات ناشئة تطلق تطبيق ويب جديدًا' },
    { en: 'Online stores improving the shopping experience', ar: 'متاجر تطوّر تجربة التسوق' },
    { en: 'Business owners who need a complete application', ar: 'أصحاب مشاريع يحتاجون تطبيقًا متكاملًا' },
    { en: 'Teams improving an existing website or application', ar: 'فرق تطوّر مواقع أو تطبيقات قائمة' },
  ],
};
