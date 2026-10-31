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
 * Case-study hero: breadcrumbs, title and summary beside the cover.
 *
 * Category, year, technologies and links all move to `ProjectOverview` right
 * below — this hero stays focused on the title per CLAUDE.md §10 ("do not show
 * every metadata field if that creates clutter... the project title should
 * dominate"). Only one decorative layer (the grid), no orbit or glow: a case
 * study is a long read, so the visual weight belongs to the project media.
 *
 * On desktop the cover sits beside the text rather than under it. The projects
 * are exported at 4:3, and a 4:3 cover at the page's full width stood ~860px
 * tall (centred under left-aligned text, it also lined up with nothing); in a
 * 7-of-12 column it is ~520px, so the title, the summary and the cover are all
 * on the first screen. Below `lg` it stacks, cover last.
 *
 * A Midnight band, like every hero on the site — which here also gives the
 * cover image a dark mount to sit in instead of floating on the page.
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
      tone="midnight"
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="case-study-title"
    >
      <AnimatedGrid fade="top" className="opacity-50" />

      <Container className="relative">
        <Reveal>
          <ProjectBreadcrumbs items={breadcrumbItems} />
        </Reveal>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal index={1} className="flex flex-wrap items-center gap-3">
              <Eyebrow>{localize(project.category, locale)}</Eyebrow>
              {project.featured ? (
                <Badge variant="secondary" size="sm">
                  {t('work.caseStudy.featuredBadge')}
                </Badge>
              ) : null}
            </Reveal>

            <Reveal index={2}>
              <h1 id="case-study-title" className="mt-4 text-h1">
                {localize(project.title, locale)}
              </h1>
            </Reveal>

            <Reveal index={3}>
              <p className="text-muted-foreground mt-5 text-lead">
                {localize(project.summary, locale)}
              </p>
            </Reveal>
          </div>

          <Reveal index={2} variant="scale-in" className="lg:col-span-7">
            <ProjectCover
              image={project.coverImage}
              overrideSrc={project.image}
              locale={locale}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="shadow-raised"
              priority
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
