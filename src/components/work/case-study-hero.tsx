import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Eyebrow } from '@/components/ui/section-heading';
import { Section } from '@/components/ui/section';
import { ProjectBreadcrumbs } from '@/components/work/project-breadcrumbs';
import { ProjectCover } from '@/components/work/project-cover';
import { localize } from '@/i18n/localize';
import type { Locale, Project } from '@/types/content';

type CaseStudyHeroProps = {
  project: Project;
  locale: Locale;
};

/**
 * Case-study hero: breadcrumbs, then the title and summary, then the cover.
 *
 * Category, year, technologies and links all move to `ProjectOverview` right
 * below — this hero stays focused on the title per CLAUDE.md §10 ("do not show
 * every metadata field if that creates clutter... the project title should
 * dominate"). Only one decorative layer (the grid), no orbit or glow: a case
 * study is a long read, so the visual weight belongs to the project media.
 */
export async function CaseStudyHero({ project, locale }: CaseStudyHeroProps) {
  const t = await getTranslations();

  const breadcrumbItems = [
    { label: t('work.breadcrumbs.home'), href: '/' },
    { label: t('work.breadcrumbs.work'), href: '/work' },
    { label: localize(project.title, locale) },
  ];

  return (
    <Section
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="case-study-title"
    >
      <AnimatedGrid fade="top" className="opacity-50" />

      <Container className="relative">
        <Reveal>
          <ProjectBreadcrumbs items={breadcrumbItems} />
        </Reveal>

        <Reveal index={1} className="mt-8 flex flex-wrap items-center gap-3">
          <Eyebrow>{localize(project.category, locale)}</Eyebrow>
          {project.featured ? (
            <Badge variant="secondary" size="sm">
              {t('work.caseStudy.featuredBadge')}
            </Badge>
          ) : null}
        </Reveal>

        <Reveal index={2}>
          <h1 id="case-study-title" className="mt-4 max-w-3xl text-h1">
            {localize(project.title, locale)}
          </h1>
        </Reveal>

        <Reveal index={3}>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lead">
            {localize(project.summary, locale)}
          </p>
        </Reveal>
      </Container>

      <Reveal index={4} variant="scale-in">
        <Container size="wide" className="relative mt-12">
          <ProjectCover
            image={project.coverImage}
            overrideSrc={project.image}
            locale={locale}
            sizes="(min-width: 1280px) 1152px, 100vw"
            priority
          />
        </Container>
      </Reveal>
    </Section>
  );
}
