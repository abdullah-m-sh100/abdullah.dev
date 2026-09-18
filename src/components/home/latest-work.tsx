import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';
import { ProjectRow } from '@/components/work/project-row';
import type { Project } from '@/types/content';

type LatestWorkProps = {
  projects: Project[];
};

/**
 * Latest work — deliberately lighter than the featured showcase.
 *
 * A list rather than another card grid: it creates the hierarchy the featured
 * section needs, and it looks intentional whether there is one entry or six,
 * which a three-column grid would not.
 *
 * The Home page omits this section entirely when every project is already
 * featured above, so the page never shows a section repeating what it just said.
 */
export async function LatestWork({ projects }: LatestWorkProps) {
  const locale = await getLocale();
  const t = await getTranslations();

  const labels = { technologies: t('common.labels.technologies') };

  return (
    <Section surface="muted" divider aria-labelledby="home-latest-work">
      <Container>
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{t('home.latestWork.eyebrow')}</Eyebrow>
            <h2 id="home-latest-work" className="mt-4 text-h2">
              {t('home.latestWork.title')}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-sm">
            {t('home.latestWork.description')}
          </p>
        </Reveal>

        <div className="border-border mt-10 border-t">
          {projects.map((project, index) => (
            <Reveal key={project.id} index={index}>
              <ProjectRow project={project} locale={locale} labels={labels} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
