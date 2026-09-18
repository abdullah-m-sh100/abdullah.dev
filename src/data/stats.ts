import type { Stat } from '@/types/content';

/**
 * TODO: Replace with verified numbers before launch.
 *
 * The brand guidelines forbid fabricated metrics — keep every value here
 * factual and update it from this file only.
 */
export const stats: Stat[] = [
  {
    id: 'experience',
    value: 3,
    suffix: '+',
    label: { en: 'Years of experience', ar: 'سنوات الخبرة' },
    icon: 'calendar',
  },
  {
    id: 'projects',
    value: 12,
    suffix: '+',
    label: { en: 'Completed projects', ar: 'مشاريع مكتملة' },
    icon: 'briefcase',
  },
  {
    id: 'technologies',
    value: 15,
    suffix: '+',
    label: { en: 'Technologies used', ar: 'تقنيات مستخدمة' },
    icon: 'layers',
  },
  {
    id: 'production',
    value: 6,
    suffix: '',
    label: { en: 'Products in production', ar: 'منتجات في بيئة الإنتاج' },
    icon: 'rocket',
  },
];
