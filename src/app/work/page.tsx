import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { ContactCta } from '@/components/home/contact-cta';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Section } from '@/components/ui/section';
import { WorkHero } from '@/components/work/work-hero';
import { ProjectCard } from '@/components/work/project-card';
import { getAllProjects } from '@/lib/content/projects';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata.work');

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/work',
    locale,
  });
}

/**
 * /work — the full project listing.
 *
 * `ProjectCard` (built but unused in Sprint 2) is the grid unit here. There is
 * no interactive filter: every current project sits in a different category,
 * so a filter control would only ever narrow the grid to one card. The
 * category set is already collected by `getProjectCategories()` for when the
 * project count justifies adding one — see the Sprint 3 report for the
 * reasoning. The closing CTA reuses Home's `ContactCta` unchanged, since /work
 * is a top-level hub page like Home rather than a long single-project read.
 */
export default async function WorkPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const projects = getAllProjects();

  const countLabel = t('work.listing.countLabel', { count: projects.length });
  const labels = { technologies: t('common.labels.technologies') };

  return (
    <>
      <WorkHero countLabel={countLabel} />

      <Section spacing="compact" aria-labelledby="work-listing-title">
        <Container>
          <h2 id="work-listing-title" className="sr-only">
            {t('metadata.work.title')}
          </h2>

          {projects.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} as="li" index={index % 3}>
                  <ProjectCard project={project} locale={locale} labels={labels} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="briefcase"
              title={t('common.states.emptyTitle')}
              description={t('common.states.emptyDescription')}
            />
          )}
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
