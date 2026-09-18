import type { MetadataRoute } from 'next';

import { getAllProjects } from '@/lib/content/projects';
import { absoluteUrl } from '@/lib/site-config';
import type { AppRoute } from '@/types/content';

/**
 * The locale is never part of a URL (see `src/i18n/config.ts`), so each path
 * below is the single canonical URL for both languages — there is no
 * `/en/*` or `/ar/*` variant to list separately.
 */
const staticRoutes: { path: AppRoute; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/work', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/certificates', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: new Date(project.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
