import type { PortfolioData } from '@/types/content';

import { about } from './about';
import { certificates } from './certificates';
import { experience } from './experience';
import { personal } from './personal';
import { services } from './services';
import { skillCategories } from './skills';
import { socialLinks } from './social-links';
import { stats } from './stats';
import { projects } from './projects';
import { contact, cta, navigation } from './site';

/**
 * The single source of truth for all portfolio content.
 *
 * Content is authored in focused sibling files for readability, then composed
 * here into one typed object. Every page — Home previews included — reads from
 * this object through the selectors in `src/lib/content`. There must never be a
 * second dataset such as `homeProjects` or `featuredProjectsData`.
 *
 * The `PortfolioData` annotation keeps every content file structurally checked
 * against one shared contract.
 */
export const portfolioData: PortfolioData = {
  personal,
  about,
  stats,
  skillCategories,
  services,
  projects,
  certificates,
  experience,
  socialLinks,
  contact,
  navigation,
  cta,
};

export type { PortfolioData };
