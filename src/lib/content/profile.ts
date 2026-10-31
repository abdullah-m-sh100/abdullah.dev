import { portfolioData } from '@/data/portfolio-data';
import { coreStack } from '@/data/skills';
import { type Locale } from '@/i18n/config';
import { localize } from '@/i18n/localize';
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

/** Skills promoted to an emphasized badge inside their own group. */
export function getHighlightedSkills(): Skill[] {
  return getAllSkills().filter((skill) => skill.highlighted);
}

/**
 * The four core-stack technologies, in the order `coreStack` names them —
 * which is MERN order, so the Home hero reads "MongoDB · Express.js ·
 * React.js · Node.js".
 *
 * Resolved by id rather than by filtering on `highlighted`, because
 * highlighting is per-group prominence: the first four highlighted skills are
 * always front-end ones, which is not the stack. Ids that do not resolve are
 * dropped rather than rendered as a blank chip.
 */
export function getCoreStack(): Skill[] {
  const byId = new Map(getAllSkills().map((skill) => [skill.id, skill]));
  return coreStack
    .map((id) => byId.get(id))
    .filter((skill): skill is Skill => skill !== undefined);
}

/**
 * The text a skill chip shows. Descriptive skills carry a `label` with a real
 * Arabic form; technology and brand names have none and render as `name`.
 */
export function getSkillLabel(skill: Skill, locale: Locale): string {
  return skill.label ? localize(skill.label, locale) : skill.name;
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
