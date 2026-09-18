import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import { ProjectCover } from '@/components/work/project-cover';
import { TechnologyList } from '@/components/work/technology-list';
import { localize } from '@/i18n/localize';
import { formatYear, toDateTimeAttribute } from '@/lib/utils/dates';
import type { Locale, Project } from '@/types/content';

type ProjectRowProps = {
  project: Project;
  locale: Locale;
  labels: { technologies: string };
};

/**
 * Compact list row for a project.
 *
 * The deliberately lighter counterpart to `ProjectShowcase`: a small thumbnail,
 * the essentials, and a trailing arrow. A list also degrades gracefully to a
 * single entry, which a three-column grid does not.
 *
 * Direction handling is structural — the thumbnail leads, the arrow trails, and
 * both follow the writing direction because the row is a flex line with logical
 * spacing rather than fixed left/right positions.
 */
export function ProjectRow({ project, locale, labels }: ProjectRowProps) {
  return (
    <article className="group border-border relative border-b last:border-b-0">
      <div className="flex items-center gap-5 py-6 transition-colors duration-(--duration-base) ease-out sm:gap-8">
        <ProjectCover
          image={project.coverImage}
          overrideSrc={project.image}
          locale={locale}
          sizes="160px"
          className="hidden w-32 shrink-0 sm:block lg:w-40"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-secondary text-label ltr:uppercase">
              {localize(project.category, locale)}
            </span>
            <time
              dateTime={toDateTimeAttribute(project.date)}
              className="text-subtle-foreground text-label ltr:uppercase"
            >
              {formatYear(project.date, locale)}
            </time>
          </div>

          <h3 className="mt-2 text-h3">
            <Link
              href={`/work/${project.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring"
            >
              {localize(project.title, locale)}
            </Link>
          </h3>

          <p className="text-muted-foreground mt-2 text-sm">
            {localize(project.summary, locale)}
          </p>

          <TechnologyList
            technologies={project.technologies}
            label={labels.technologies}
            max={3}
            className="mt-4"
          />
        </div>

        <Icon
          name="arrow-right"
          className="cta-arrow text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-colors duration-(--duration-base)"
        />
      </div>
    </article>
  );
}
