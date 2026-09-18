import type { SocialLink } from '@/types/content';
import { personal } from './personal';

/**
 * TODO: Replace placeholder profile URLs with the real ones.
 *
 * Only add an entry once the link is real — empty links must never render.
 */
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    platform: 'github',
    url: 'https://github.com/',
    handle: '@abdullah',
    label: { en: 'GitHub', ar: 'GitHub' },
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/',
    handle: 'Abdullah',
    label: { en: 'LinkedIn', ar: 'LinkedIn' },
  },
  {
    id: 'email',
    platform: 'email',
    url: `mailto:${personal.email}`,
    handle: personal.email,
    label: { en: 'Email', ar: 'البريد الإلكتروني' },
  },
];
