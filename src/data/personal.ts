import type { PersonalInfo } from '@/types/content';

/**
 * TODO: Replace with final portfolio content.
 * Placeholder copy lives here — never inside components — so the real content
 * can be dropped in from one place.
 */
export const personal: PersonalInfo = {
  name: {
    en: 'Abdullah',
    ar: 'عبد الله',
  },
  role: {
    en: 'Front-End Developer',
    ar: 'مطوّر واجهات أمامية',
  },
  specialization: {
    en: 'React.js & Next.js',
    ar: 'React.js و Next.js',
  },
  tagline: {
    en: 'Ideas into Interfaces.',
    ar: 'من الفكرة إلى الواجهة.',
  },
  headline: {
    en: 'Crafting modern web experiences.',
    ar: 'أصنع تجارب ويب حديثة.',
  },
  intro: {
    en: 'React.js and Next.js interfaces built for speed, accessibility and clear business outcomes.',
    ar: 'واجهات بـ React.js و Next.js مبنية للسرعة وسهولة الوصول ونتائج واضحة لأعمالك.',
  },
  location: {
    en: 'Palestine — working with clients worldwide',
    ar: 'فلسطين — أعمل مع عملاء حول العالم',
  },
  email: 'abdullah.m.sh100@gmail.com',
  /* Readable form. The `wa.me` digits live in `social-links.ts`. */
  phone: '+972 59-923-6195',
  /*
   * Hero portrait. The source photo already carries the brand treatment — a
   * deep navy backdrop with a blue-to-teal orbit arc — so the frame around it
   * stays plain rather than layering a second orbit on top of the motif.
   */
  avatar: {
    src: '/images/abdullah-portrait.webp',
    width: 1145,
    height: 1374,
    alt: {
      en: 'Abdullah, front-end developer, arms folded against a deep navy backdrop.',
      ar: 'عبد الله، مطوّر واجهات أمامية، واقفًا أمام خلفية كحلية داكنة.',
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
