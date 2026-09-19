import type { SocialLink } from '@/types/content';
import { personal } from './personal';

/**
 * Every profile Abdullah is reachable at, in the order they are shown.
 *
 * `getSocialLinks()` drops any entry whose `url` is empty, so a profile that
 * does not exist yet is simply left out rather than rendering a dead icon.
 * Professional profiles lead; the two direct lines — WhatsApp and email —
 * close the row, which is also the order the footer and the contact panel
 * read in.
 */
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    platform: 'github',
    url: 'https://github.com/Abdullah-m-sh100',
    handle: '@Abdullah-m-sh100',
    label: { en: 'GitHub', ar: 'GitHub' },
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/abdullah-abu-shamla/',
    handle: 'abdullah-abu-shamla',
    label: { en: 'LinkedIn', ar: 'LinkedIn' },
  },
  {
    id: 'upwork',
    platform: 'upwork',
    url: 'https://www.upwork.com/freelancers/~01cb82b8f02f4ecb43',
    label: { en: 'Upwork', ar: 'Upwork' },
  },
  {
    id: 'x',
    platform: 'x',
    url: 'https://x.com/Abdullah_sh_100',
    handle: '@Abdullah_sh_100',
    label: { en: 'X', ar: 'X' },
  },
  {
    id: 'facebook',
    platform: 'facebook',
    url: 'https://www.facebook.com/abdullah.abu.shamluh',
    handle: 'abdullah.abu.shamluh',
    label: { en: 'Facebook', ar: 'فيسبوك' },
  },
  {
    /*
     * `wa.me` needs the number in international form with no `+`, spaces or
     * dashes; the readable form lives in `handle` and in `personal.phone`.
     */
    id: 'whatsapp',
    platform: 'whatsapp',
    url: 'https://wa.me/972599236195',
    handle: personal.phone,
    label: { en: 'WhatsApp', ar: 'واتساب' },
  },
  {
    id: 'email',
    platform: 'email',
    url: `mailto:${personal.email}`,
    handle: personal.email,
    label: { en: 'Email', ar: 'البريد الإلكتروني' },
  },
];
