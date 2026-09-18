import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectShowcase } from '@/components/work/project-showcase';
import type { Project } from '@/types/content';

type FeaturedWorkProps = {
  projects: Project[];
};

/**
 * Featured work — the page's second focal point after the hero.
 *
 * Each project gets a full editorial row with large media, alternating sides so
 * the eye zig-zags down the section instead of scanning a uniform grid. The
 * project list is passed in rather than selected here, because the Home page
 * decides once which projects are featured and which are "also recent", and
 * both sections must agree.
 */
export async function FeaturedWork({ projects }: FeaturedWorkProps) {
  const locale = await getLocale();
  const t = await getTranslations();

  const labels = {
    featured: t('home.featuredWork.badge'),
    caseStudy: t('home.featuredWork.caseStudy'),
    technologies: t('common.labels.technologies'),
  };

  return (
    <Section spacing="spacious" aria-labelledby="home-featured-work">
      <Container>
        <SectionHeading
          id="home-featured-work"
          eyebrow={t('home.featuredWork.eyebrow')}
          title={t('home.featuredWork.title')}
          description={t('home.featuredWork.description')}
          action={
            <ButtonLink href="/work" variant="secondary" size="sm">
              {t('home.featuredWork.action')}
              <ButtonArrow />
            </ButtonLink>
          }
        />

        {projects.length > 0 ? (
          <div className="mt-16 flex flex-col gap-20 lg:gap-28">
            {projects.map((project, index) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                locale={locale}
                reversed={index % 2 === 1}
                labels={labels}
              />
            ))}
          </div>
        ) : (
          <Reveal className="mt-12">
            <EmptyState
              icon="briefcase"
              title={t('common.states.emptyTitle')}
              description={t('common.states.emptyDescription')}
            />
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
