import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ProjectCover } from '@/components/work/project-cover';
import { TechnologyList } from '@/components/work/technology-list';
import { Badge } from '@/components/ui/badge';
import { localize } from '@/i18n/localize';
import { formatYear, toDateTimeAttribute } from '@/lib/utils/dates';
import type { Locale, Project } from '@/types/content';

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  labels: { technologies: string };
};

/**
 * Standard project card: cover, category, title, summary, technologies.
 *
 * This is the reusable unit for grids — the Work listing and related-project
 * rails will use it unchanged. Featured work on Home uses `ProjectShowcase`
 * instead, because that layout is genuinely different rather than a size
 * variant of this one.
 *
 * The title carries the only link, stretched across the card.
 */
export function ProjectCard({ project, locale, labels }: ProjectCardProps) {
  return (
    <Card
      as="article"
      interactive
      className="group relative flex h-full flex-col overflow-hidden"
    >
      <ProjectCover
        image={project.coverImage}
        overrideSrc={project.image}
        locale={locale}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="rounded-none border-0 border-b"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary" size="sm">
            {localize(project.category, locale)}
          </Badge>
          <time
            dateTime={toDateTimeAttribute(project.date)}
            className="text-subtle-foreground text-label ltr:uppercase"
          >
            {formatYear(project.date, locale)}
          </time>
        </div>

        <h3 className="mt-3 text-h3">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring"
          >
            {localize(project.title, locale)}
          </Link>
        </h3>

        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {localize(project.summary, locale)}
        </p>

        <TechnologyList
          technologies={project.technologies}
          label={labels.technologies}
          max={3}
          className="mt-5"
        />

        <Icon
          name="arrow-right"
          className="cta-arrow text-primary mt-5 size-4 self-start"
        />
      </div>
    </Card>
  );
}
