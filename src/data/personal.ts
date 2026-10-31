import type { PersonalInfo } from '@/types/content';

/**
 * Identity and primary messaging.
 *
 * Single source for the professional title, the brand line and the intro
 * paragraph. `role` feeds the header's screen-reader label, the hero portrait
 * caption and the `jobTitle` in the Person JSON-LD, so changing it here changes
 * it everywhere — never restate the title inside a component or a message file.
 *
 * `headline` and `tagline` are rendered as one `<h1>` on Home, with `tagline`
 * in copper. `tagline` is also used standalone — the About pull-quote, the
 * Home stats-panel quote, the footer line and the WebSite JSON-LD description —
 * so it has to read as a complete thought on its own.
 */
export const personal: PersonalInfo = {
  name: {
    en: 'Abdullah',
    ar: 'عبد الله',
  },
  role: {
    en: 'Full-Stack Developer | MERN Stack',
    ar: 'مطور ويب متكامل | MERN Stack',
  },
  specialization: {
    en: 'MERN Stack — MongoDB, Express.js, React.js, Node.js',
    ar: 'MERN Stack — MongoDB و Express.js و React.js و Node.js',
  },
  tagline: {
    en: 'Ideas into Web Applications.',
    ar: 'من الفكرة إلى تطبيق ويب.',
  },
  /*
   * Kept to roughly the length of the line it replaced. `headline` and
   * `tagline` are set as one display-size `<h1>` in a seven-column hero, so
   * every extra ten characters costs a line — and at 1280x900 a fourth line
   * pushed both calls to action below the fold. "MERN" is deliberately not
   * repeated here: it is already in `role`, in the core-stack line under the
   * hero, and in `intro` directly below this heading.
   */
  headline: {
    en: 'Full-stack web development.',
    ar: 'تطوير ويب متكامل.',
  },
  intro: {
    en: 'I help businesses turn ideas into web applications with React.js, Node.js, Express.js and MongoDB — from responsive interfaces to back-end APIs and databases.',
    ar: 'أساعد الشركات وأصحاب المشاريع على تحويل أفكارهم إلى تطبيقات ويب باستخدام React.js و Node.js و Express.js و MongoDB — من الواجهات المتجاوبة إلى الباك إند وواجهات API وقواعد البيانات.',
  },
  location: {
    en: 'Palestine — working with clients worldwide',
    ar: 'فلسطين — أعمل مع عملاء حول العالم',
  },
  place: {
    en: 'Palestine',
    ar: 'فلسطين',
  },
  email: 'abdullah.m.sh100@gmail.com',
  /* Readable form. The `wa.me` digits live in `social-links.ts`. */
  phone: '+972 59-923-6195',
  /*
   * Hero portrait.
   *
   * The photo is composited against Midnight with soft copper light, so it sits
   * inside the Flow palette with no blue or teal. Keep `width`/`height` equal to
   * the file's real pixels (4:5): the hero frame uses the same ratio, so nothing
   * is cropped and no layout shift is possible. If the file is replaced, update
   * them and the alt text together.
   *
   * The frame around it stays plain: the hero band already carries the flow
   * line, and a second instance would overuse the motif.
   */
  avatar: {
    src: '/images/abdullah-portrait.webp',
    width: 1122,
    height: 1402,
    alt: {
      en: 'Portrait of Abdullah, a full-stack developer, smiling slightly in a black hoodie against a deep navy backdrop with soft copper light.',
      ar: 'صورة شخصية لعبد الله، مطوّر ويب متكامل، مبتسمًا ابتسامة خفيفة بسترة سوداء أمام خلفية كحلية داكنة بإضاءة نحاسية ناعمة.',
    },
  },
  availability: {
    status: 'available',
    label: {
      en: 'Available for new projects',
      ar: 'متاح لمشاريع جديدة',
    },
  },
};
