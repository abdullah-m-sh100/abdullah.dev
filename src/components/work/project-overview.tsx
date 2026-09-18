import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { ProjectLinks } from '@/components/work/project-links';
import { TechnologyList } from '@/components/work/technology-list';
import { localize } from '@/i18n/localize';
import { formatYear, toDateTimeAttribute } from '@/lib/utils/dates';
import type { Locale, Project } from '@/types/content';

type ProjectOverviewProps = {
  project: Project;
  locale: Locale;
  labels: {
    title: string;
    factsTitle: string;
    category: string;
    year: string;
    technologies: string;
    links: string;
    liveLink: string;
    githubLink: string;
    opensNewTab: string;
  };
};

/**
 * Project overview: the case-study description beside a compact facts card.
 *
 * This is the one place category, year, technologies and external links are
 * gathered — the hero above stays focused on the title and summary rather
 * than repeating this metadata. The facts card's "Links" row only appears
 * when `ProjectLinks` actually renders something.
 */
export function ProjectOverview({ project, locale, labels }: ProjectOverviewProps) {
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <Section aria-labelledby="case-study-overview">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 id="case-study-overview" className="text-h3">
              {labels.title}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-prose-comfortable leading-relaxed">
              {localize(project.description, locale)}
            </p>
          </Reveal>

          <Reveal index={1} variant="slide-start" className="lg:col-span-5">
            <Card tone="muted" className="p-6 sm:p-8">
              <h3 className="text-subtle-foreground text-label ltr:uppercase">
                {labels.factsTitle}
              </h3>

              <dl className="mt-5 flex flex-col gap-5 text-sm">
                <div>
                  <dt className="text-subtle-foreground">{labels.category}</dt>
                  <dd className="text-foreground mt-1 font-medium">
                    {localize(project.category, locale)}
                  </dd>
                </div>

                <div>
                  <dt className="text-subtle-foreground">{labels.year}</dt>
                  <dd className="text-foreground mt-1 font-medium">
                    <time dateTime={toDateTimeAttribute(project.date)}>
                      {formatYear(project.date, locale)}
                    </time>
                  </dd>
                </div>

                <div>
                  <dt className="text-subtle-foreground">{labels.technologies}</dt>
                  <dd className="mt-2">
                    <TechnologyList
                      technologies={project.technologies}
                      label={labels.technologies}
                    />
                  </dd>
                </div>

                {hasLinks ? (
                  <div>
                    <dt className="text-subtle-foreground">{labels.links}</dt>
                    <dd className="mt-2">
                      <ProjectLinks
                        liveUrl={project.liveUrl}
                        githubUrl={project.githubUrl}
                        labels={{
                          live: labels.liveLink,
                          github: labels.githubLink,
                          opensNewTab: labels.opensNewTab,
                        }}
                      />
                    </dd>
                  </div>
                ) : null}
              </dl>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
