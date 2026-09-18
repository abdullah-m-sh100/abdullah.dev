import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import type { Locale, Project } from '@/types/content';

/**
 * Project selectors.
 *
 * All ordering and filtering lives here so components stay declarative and the
 * Home page and /work page can never drift out of sync.
 */

const byNewest = (a: Project, b: Project): number =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

/** Featured first, then newest — the ordering defined in CLAUDE.md §33. */
const byFeaturedThenNewest = (a: Project, b: Project): number => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  return byNewest(a, b);
};

/** Every project, in display order. */
export function getAllProjects(): Project[] {
  return [...portfolioData.projects].sort(byFeaturedThenNewest);
}

/** Projects marked as featured, newest first. */
export function getFeaturedProjects(limit?: number): Project[] {
  const featured = portfolioData.projects.filter((project) => project.featured).sort(byNewest);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

/** Featured first, then newest. Defaults to 3 cards. */
export function getLatestProjects(limit = 3): Project[] {
  return getAllProjects().slice(0, limit);
}

/**
 * Newest projects, strictly by date, with the option to skip projects that are
 * already on screen.
 *
 * The Home page shows "Featured work" and "Latest work" in the same view; this
 * is what keeps the second list from repeating the first, without any ad-hoc
 * filtering in JSX.
 */
export function getRecentProjects(
  limit = 3,
  options: { excludeSlugs?: readonly string[] } = {},
): Project[] {
  const excluded = new Set(options.excludeSlugs ?? []);

  return portfolioData.projects
    .filter((project) => !excluded.has(project.slug))
    .sort(byNewest)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolioData.projects.find((project) => project.slug === slug);
}

/** Feeds `generateStaticParams()` for /work/[slug]. */
export function getProjectSlugs(): string[] {
  return portfolioData.projects.map((project) => project.slug);
}

/**
 * Neighbouring projects for the "next project" link on a detail page.
 * Wraps around so the last project still points somewhere useful.
 */
export function getAdjacentProjects(slug: string): {
  previous: Project | undefined;
  next: Project | undefined;
} {
  const ordered = getAllProjects();
  const index = ordered.findIndex((project) => project.slug === slug);

  if (index === -1 || ordered.length < 2) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: ordered[(index - 1 + ordered.length) % ordered.length],
    next: ordered[(index + 1) % ordered.length],
  };
}

/** Unique technology list — the groundwork for filtering in a later version. */
export function getProjectTechnologies(): string[] {
  const technologies = new Set<string>();
  for (const project of portfolioData.projects) {
    for (const technology of project.technologies) {
      technologies.add(technology);
    }
  }
  return [...technologies].sort((a, b) => a.localeCompare(b));
}

/**
 * Unique project categories, localized and alphabetized.
 *
 * Built for a future category filter on /work — with each of the current
 * projects sitting in a different category, a filter control would only ever
 * narrow the list to a single card, so /work does not render one yet. This
 * selector exists so that filter can be added later purely as UI, without
 * touching how categories are collected.
 */
export function getProjectCategories(locale: Locale): string[] {
  const categories = new Set<string>();
  for (const project of portfolioData.projects) {
    categories.add(localize(project.category, locale));
  }
  return [...categories].sort((a, b) => a.localeCompare(b));
}
