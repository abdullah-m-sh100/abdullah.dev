import { portfolioData } from '@/data/portfolio-data';
import type {
  Experience,
  Service,
  Skill,
  SkillCategory,
  SocialLink,
  Stat,
  WorkflowStep,
} from '@/types/content';

/* ------------------------------------------------------------------ services */

/** Services in explicit `order`, never array position. */
export function getAllServices(): Service[] {
  return [...portfolioData.services].sort((a, b) => a.order - b.order);
}

/** Home preview and the /services "core" group: featured services in order. */
export function getFeaturedServices(limit?: number): Service[] {
  const featured = getAllServices().filter((service) => service.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

/** The /services "also available" group — every non-featured service. */
export function getSupportingServices(): Service[] {
  return getAllServices().filter((service) => !service.featured);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return portfolioData.services.find((service) => service.slug === slug);
}

/* -------------------------------------------------------------------- skills */

export function getSkillCategories(): SkillCategory[] {
  return [...portfolioData.skillCategories].sort((a, b) => a.order - b.order);
}

export function getAllSkills(): Skill[] {
  return getSkillCategories().flatMap((category) => category.skills);
}

/** Technologies shown in the Home technology strip. */
export function getHighlightedSkills(): Skill[] {
  return getAllSkills().filter((skill) => skill.highlighted);
}

/* --------------------------------------------------------------------- stats */

export function getStats(): Stat[] {
  return portfolioData.stats;
}

/* ---------------------------------------------------------------------- about */

/** Workflow steps in explicit `order`, never array position. */
export function getWorkflowSteps(): WorkflowStep[] {
  return [...portfolioData.about.workflow].sort((a, b) => a.order - b.order);
}

/* ---------------------------------------------------------------- experience */

/** Most recent role first. Entries without a verified start date sort last rather than at a fake position. */
export function getExperience(): Experience[] {
  return [...portfolioData.experience].sort((a, b) => {
    if (!a.startDate && !b.startDate) return 0;
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

/* --------------------------------------------------------------- social links */

/** Only links with a real URL are ever returned, so nothing renders empty. */
export function getSocialLinks(): SocialLink[] {
  return portfolioData.socialLinks.filter((link) => link.url.trim().length > 0);
}
