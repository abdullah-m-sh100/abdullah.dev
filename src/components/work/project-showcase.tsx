import { Reveal } from '@/components/motion/reveal';
import { ProjectCover } from '@/components/work/project-cover';
import { TechnologyList } from '@/components/work/technology-list';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { TextLink } from '@/components/ui/text-link';
import { localize } from '@/i18n/localize';
import { formatYear, toDateTimeAttribute } from '@/lib/utils/dates';
import type { Locale, Project } from '@/types/content';

type ProjectShowcaseProps = {
  project: Project;
  locale: Locale;
  /** Mirrors the media/copy order so consecutive entries alternate. */
  reversed?: boolean;
  labels: {
    featured: string;
    caseStudy: string;
    technologies: string;
  };
};

/**
 * Editorial presentation of one project: large media beside the story.
 *
 * Used for featured work, where a full-width row earns its space. The compact
 * `ProjectRow` handles the lighter "also recent" treatment, and both share
 * `ProjectCover` and `TechnologyList`.
 *
 * Accessibility: the card is not itself a link. One real link sits on the case
 * study action and is stretched over the row with `after:absolute`, so the
 * whole area is clickable while the accessibility tree still sees a single
 * clearly-named link.
 */
export function ProjectShowcase({
  project,
  locale,
  reversed = false,
  labels,
}: ProjectShowcaseProps) {
  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal
        variant={reversed ? 'slide-start' : 'slide-end'}
        className={`lg:col-span-7 ${reversed ? 'lg:order-last' : ''}`}
      >
        <ProjectCover
          image={project.coverImage}
          overrideSrc={project.image}
          locale={locale}
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
      </Reveal>

      <Reveal index={1} className="lg:col-span-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{localize(project.category, locale)}</Badge>
          {project.featured ? (
            <Badge variant="secondary" size="sm">
              {labels.featured}
            </Badge>
          ) : null}
          <time
            dateTime={toDateTimeAttribute(project.date)}
            className="text-subtle-foreground text-label ltr:uppercase"
          >
            {formatYear(project.date, locale)}
          </time>
        </div>

        <h3 className="mt-4 text-h2">{localize(project.title, locale)}</h3>

        <p className="text-muted-foreground mt-4 text-lead">
          {localize(project.summary, locale)}
        </p>

        {project.challenge ? (
          <p className="border-border text-muted-foreground mt-6 border-s-2 ps-4 text-sm">
            {localize(project.challenge, locale)}
          </p>
        ) : null}

        <TechnologyList
          technologies={project.technologies}
          label={labels.technologies}
          className="mt-6"
        />

        <TextLink
          href={`/work/${project.slug}`}
          className="mt-6 after:absolute after:inset-0"
        >
          {labels.caseStudy}
          <Icon name="arrow-right" className="cta-arrow size-4" />
        </TextLink>
      </Reveal>
    </article>
  );
}
