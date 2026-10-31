import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ProjectCover } from '@/components/work/project-cover';
import { TechnologyList } from '@/components/work/technology-list';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';
import { formatYear, toDateTimeAttribute } from '@/lib/utils/dates';
import type { Locale, Project } from '@/types/content';

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  labels: { technologies: string; caseStudy: string };
  /**
   * `feature` lays the cover and the story side by side and shows the longer
   * copy. It is for one lead project at full width, not a size for grids.
   */
  layout?: 'card' | 'feature';
};

/**
 * Project card: cover, category, title, summary, technologies.
 *
 * The reusable unit for the Work listing. Featured work on Home uses
 * `ProjectShowcase` instead, because that layout is genuinely different.
 *
 * The title carries the only link, stretched across the card. The trailing
 * "case study" line is a plain label that tells a visitor the card opens
 * somewhere; a lone arrow did not.
 *
 * The category badge is Sage rather than Copper: four copper badges on one
 * screen would spend the identity's single warm tone on labels. Copper appears
 * only on hover, on the label of the card being pointed at.
 */
export function ProjectCard({ project, locale, labels, layout = 'card' }: ProjectCardProps) {
  const isFeature = layout === 'feature';

  return (
    <Card
      as="article"
      interactive
      className={cn(
        'group relative overflow-hidden',
        isFeature ? 'grid lg:grid-cols-12' : 'flex h-full flex-col',
      )}
    >
      <div className={cn(isFeature && 'lg:col-span-7')}>
        <ProjectCover
          image={project.coverImage}
          overrideSrc={project.image}
          locale={locale}
          sizes={
            isFeature
              ? '(min-width: 1024px) 58vw, 100vw'
              : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          }
          className="rounded-none border-0 border-b lg:border-b-0 lg:border-e"
        />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col p-6',
          isFeature && 'lg:col-span-5 lg:justify-center lg:p-10',
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" size="sm">
            {localize(project.category, locale)}
          </Badge>
          <time
            dateTime={toDateTimeAttribute(project.date)}
            className="text-subtle-foreground text-label ltr:uppercase"
          >
            {formatYear(project.date, locale)}
          </time>
        </div>

        <h3 className={cn('mt-3', isFeature ? 'text-h2' : 'text-h3')}>
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring"
          >
            {localize(project.title, locale)}
          </Link>
        </h3>

        <p
          className={cn(
            'text-muted-foreground mt-2',
            isFeature ? 'text-lead mt-4' : 'flex-1 text-sm',
          )}
        >
          {localize(project.summary, locale)}
        </p>

        {isFeature && project.challenge ? (
          <p className="border-border text-muted-foreground mt-5 border-s-2 ps-4 text-sm">
            {localize(project.challenge, locale)}
          </p>
        ) : null}

        <TechnologyList
          technologies={project.technologies}
          label={labels.technologies}
          max={isFeature ? 6 : 3}
          className="mt-5"
        />

        <span className="text-foreground group-hover:text-primary mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors duration-(--duration-base)">
          {labels.caseStudy}
          <Icon name="arrow-right" className="cta-arrow size-4" />
        </span>
      </div>
    </Card>
  );
}
