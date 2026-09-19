import type { Locale } from '@/i18n/config';
import type { IconName } from '@/lib/icons';

export type { Locale };

/** A single piece of bilingual copy. Every visible content string uses this. */
export type LocalizedText = Record<Locale, string>;

/** Bilingual copy that may be absent (optional fields in content files). */
export type OptionalLocalizedText = LocalizedText | undefined;

/** ISO 8601 date string, e.g. `2025-04-01`. */
export type IsoDate = string;

/** Routes of the site. The locale is never part of a route. */
export type AppRoute =
  | '/'
  | '/about'
  | '/services'
  | '/work'
  | '/certificates'
  | '/contact';

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
};

export type LinkTarget = {
  label: LocalizedText;
  href: string;
  external?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Profile                                                                     */
/* -------------------------------------------------------------------------- */

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable';

export type PersonalInfo = {
  name: LocalizedText;
  role: LocalizedText;
  specialization: LocalizedText;
  /** The core brand line: "Ideas into Interfaces." */
  tagline: LocalizedText;
  headline: LocalizedText;
  /** Supporting hero paragraph. */
  intro: LocalizedText;
  location: LocalizedText;
  email: string;
  phone?: string;
  resumeUrl?: string;
  avatar?: ImageAsset;
  availability: {
    status: AvailabilityStatus;
    label: LocalizedText;
  };
};

export type AboutInfo = {
  /** Long-form professional summary, one entry per paragraph. */
  summary: LocalizedText[];
  /** Condensed version reused by the Home page preview. */
  preview: LocalizedText[];
  values: ProfessionalValue[];
  workflow: WorkflowStep[];
  /** Who Abdullah works with. */
  audience: LocalizedText[];
};

export type ProfessionalValue = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: IconName;
};

export type WorkflowStep = {
  id: string;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
};

export type Stat = {
  id: string;
  value: number;
  /** Rendered after the value, e.g. `+`. */
  suffix?: string;
  label: LocalizedText;
  icon: IconName;
};

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export type SkillLevel = 'core' | 'strong' | 'working';

export type Skill = {
  id: string;
  /** Technology names are not translated. */
  name: string;
  level: SkillLevel;
  /** Shown in the Home technology strip. */
  highlighted?: boolean;
};

export type SkillCategory = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: IconName;
  order: number;
  skills: Skill[];
};

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  icon: IconName;
  highlights: LocalizedText[];
  featured: boolean;
  order: number;
};

/* -------------------------------------------------------------------------- */
/* Work                                                                        */
/* -------------------------------------------------------------------------- */

export type Project = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  /** Framework and library names are not translated. */
  technologies: string[];
  coverImage: ImageAsset;
  /**
   * Optional path to a real screenshot, e.g. `/images/projects/commerce.jpg`.
   * Takes priority over `coverImage` when set. If it fails to load in the
   * browser, or is left unset, the cover falls back to `coverImage`.
   */
  image?: string;
  gallery?: ImageAsset[];
  /** Completion date, used for sorting. */
  date: IsoDate;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  challenge?: LocalizedText;
  solution?: LocalizedText;
  responsibilities?: LocalizedText[];
  /**
   * Notable product/engineering decisions worth calling out — e.g. why
   * Server Components were used, how state was scoped, how RTL was handled.
   * Rendered as part of the case-study story, right after the solution.
   */
  technicalDecisions?: LocalizedText[];
  /** Named, described capabilities — shown as the case study Key Features. */
  features?: ProjectFeature[];
  results?: LocalizedText[];
};

export type ProjectFeature = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

/* -------------------------------------------------------------------------- */
/* Certificates                                                                */
/* -------------------------------------------------------------------------- */

export type Certificate = {
  id: string;
  slug: string;
  title: LocalizedText;
  issuer: LocalizedText;
  description?: LocalizedText;
  /**
   * Optional because some real certificates do not print an issue date.
   * Never invent one — the card hides the "Issued" line when this is unset,
   * and sorting pushes undated certificates after dated ones.
   */
  issueDate?: IsoDate;
  expiryDate?: IsoDate;
  doesNotExpire?: boolean;
  credentialId?: string;
  credentialUrl?: string;
  image?: ImageAsset;
  pdf?: string;
  /** Topics/skills covered — rendered as tags, distinct from `Project.technologies`. */
  skills?: string[];
  featured: boolean;
  order: number;
};

/* -------------------------------------------------------------------------- */
/* Experience                                                                  */
/* -------------------------------------------------------------------------- */

/** `training` covers structured programs, bootcamps and internships — never mislabeled as employment. */
export type EmploymentType = 'full-time' | 'part-time' | 'freelance' | 'contract' | 'training';

export type Experience = {
  id: string;
  role: LocalizedText;
  company: LocalizedText;
  employmentType: EmploymentType;
  /** Optional — omit rather than guess when a program's location isn't verifiable. */
  location?: LocalizedText;
  /**
   * Optional — some real training programs (e.g. hour-based courses without a
   * published calendar) do not have a verifiable start date. Never invent one;
   * the timeline hides the date row and sorts undated entries after dated ones.
   */
  startDate?: IsoDate;
  endDate?: IsoDate;
  current: boolean;
  summary: LocalizedText;
  achievements: LocalizedText[];
  technologies: string[];
};

/* -------------------------------------------------------------------------- */
/* Contact & social                                                            */
/* -------------------------------------------------------------------------- */

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'upwork'
  | 'x'
  | 'facebook'
  | 'whatsapp'
  | 'email';

export type SocialLink = {
  id: string;
  platform: SocialPlatform;
  label: LocalizedText;
  url: string;
  handle?: string;
};

export type ContactInfo = {
  email: string;
  phone?: string;
  location: LocalizedText;
  /** e.g. "Usually replies within 24 hours". */
  responseTime: LocalizedText;
  availability: LocalizedText;
};

/* -------------------------------------------------------------------------- */
/* Navigation & calls to action                                                */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  id: string;
  href: AppRoute;
  label: LocalizedText;
};

export type CallToAction = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  primary: LinkTarget;
  secondary?: LinkTarget;
};

/* -------------------------------------------------------------------------- */
/* Root content model                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The single shape of all portfolio content. Every page reads from one object
 * of this type — there are no page-specific duplicate datasets.
 */
export type PortfolioData = {
  personal: PersonalInfo;
  about: AboutInfo;
  stats: Stat[];
  skillCategories: SkillCategory[];
  services: Service[];
  projects: Project[];
  certificates: Certificate[];
  experience: Experience[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  navigation: NavItem[];
  cta: CallToAction;
};
