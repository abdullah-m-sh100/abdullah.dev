import type { PersonalInfo } from '@/types/content';

/**
 * Identity and primary messaging.
 *
 * Single source for the professional title, the brand line and the intro
 * paragraph. `role` feeds the header's screen-reader label, the hero portrait
 * caption and the `jobTitle` in the Person JSON-LD, so changing it here changes
 * it everywhere — never restate the title inside a component or a message file.
 *
 * `heroTitle` is the Home `<h1>`. `tagline` is the standalone brand line — the
 * About pull-quote, the Home stats-panel quote, the footer line and the
 * WebSite JSON-LD description — so it has to read as a complete thought on its
 * own.
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
    en: 'Turning ideas into web applications.',
    ar: 'من الفكرة إلى تطبيق ويب.',
  },
  /*
   * The Home `<h1>`. It names what a visitor gets (websites and web
   * applications, built for their business) instead of the technique, and the
   * stack is stated once directly below in `intro`. Two parts so the closing
   * phrase can take the page's single copper emphasis; each part sits on its
   * own line, so the break is the sentence rather than the column width.
   */
  heroTitle: {
    lead: {
      en: 'Websites and web applications',
      ar: 'أحوّل فكرتك إلى موقع أو تطبيق ويب',
    },
    emphasis: {
      en: 'built for your business.',
      ar: 'يخدم مشروعك.',
    },
  },
  intro: {
    en: "I'm Abdullah, a full-stack developer specializing in the MERN stack. I help businesses build user-friendly websites, dashboards, and web applications, from defining requirements to deployment.",
    ar: 'أنا عبدالله، مطور ويب متكامل متخصص في MERN Stack. أساعد الشركات وأصحاب المشاريع على بناء مواقع ولوحات تحكم وتطبيقات ويب سهلة الاستخدام، من تحديد المتطلبات حتى النشر.',
  },
  footerIntro: {
    en: 'Abdullah, a full-stack MERN developer helping businesses build websites and web applications and improve existing projects.',
    ar: 'عبدالله، مطور ويب متكامل متخصص في MERN Stack. أساعد الشركات وأصحاب المشاريع على بناء مواقع وتطبيقات ويب وتطوير مشاريعهم الحالية.',
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
