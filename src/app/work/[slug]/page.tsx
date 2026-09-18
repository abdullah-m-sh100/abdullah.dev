import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import { AdjacentProjects } from '@/components/work/adjacent-projects';
import { CaseStudyCta } from '@/components/work/case-study-cta';
import { CaseStudyHero } from '@/components/work/case-study-hero';
import { ProjectFeatures } from '@/components/work/project-features';
import { ProjectGallery } from '@/components/work/project-gallery';
import { ProjectOverview } from '@/components/work/project-overview';
import { ProjectStory } from '@/components/work/project-story';
import { localize } from '@/i18n/localize';
import { getAdjacentProjects, getProjectBySlug, getProjectSlugs } from '@/lib/content/projects';
import { buildMetadata } from '@/lib/seo/metadata';
import { buildProjectBreadcrumbJsonLd, serializeJsonLd } from '@/lib/seo/structured-data';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

/** Every project slug is known at build time. */
export function generateStaticParams(): { slug: string }[] {
  return getProjectSlugs().map((slug) => ({ slug }));
}

/** An unknown slug is a 404 rather than an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const locale = await getLocale();

  if (!project) {
    const t = await getTranslations('metadata.notFound');
    return buildMetadata({
      title: t('title'),
      description: t('description'),
      path: `/work/${slug}`,
      locale,
    });
  }

  return buildMetadata({
    title: localize(project.title, locale),
    description: localize(project.summary, locale),
    path: `/work/${project.slug}`,
    locale,
    image: project.image ?? project.coverImage.src,
    type: 'article',
  });
}

/**
 * /work/[slug] — the case-study page.
 *
 * Every section past the hero is conditional on real data: `ProjectStory`
 * renders challenge/solution/technical-decisions/responsibilities/results
 * only where each exists, `ProjectFeatures` and `ProjectGallery` mount only
 * when a project actually has features or gallery images, and
 * `AdjacentProjects` collapses to nothing when there is no other project to
 * link to. Nothing here fabricates content — see `src/data/projects.ts` for
 * what is still TODO placeholder copy.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const locale = await getLocale();
  const t = await getTranslations();
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildProjectBreadcrumbJsonLd(project, locale)),
        }}
      />

      <CaseStudyHero project={project} locale={locale} />

      <ProjectOverview
        project={project}
        locale={locale}
        labels={{
          title: t('work.caseStudy.overview.title'),
          factsTitle: t('work.caseStudy.overview.factsTitle'),
          category: t('work.caseStudy.overview.category'),
          year: t('work.caseStudy.overview.year'),
          technologies: t('common.labels.technologies'),
          links: t('work.caseStudy.overview.links'),
          liveLink: t('work.caseStudy.overview.liveLink'),
          githubLink: t('work.caseStudy.overview.githubLink'),
          opensNewTab: t('common.labels.opensNewTab'),
        }}
      />

      <ProjectStory
        project={project}
        locale={locale}
        labels={{
          challenge: t('work.caseStudy.challenge.title'),
          solution: t('work.caseStudy.solution.title'),
          technicalApproach: t('work.caseStudy.technicalApproach.title'),
          responsibilities: t('work.caseStudy.responsibilities.title'),
          results: t('work.caseStudy.results.title'),
        }}
      />

      {project.features?.length ? (
        <ProjectFeatures
          features={project.features}
          locale={locale}
          title={t('work.caseStudy.features.title')}
          description={t('work.caseStudy.features.description')}
        />
      ) : null}

      {project.gallery?.length ? (
        <ProjectGallery
          images={project.gallery}
          locale={locale}
          title={t('work.caseStudy.gallery.title')}
        />
      ) : null}

      <AdjacentProjects
        previous={previous}
        next={next}
        locale={locale}
        labels={{
          previous: t('work.caseStudy.adjacent.previous'),
          next: t('work.caseStudy.adjacent.next'),
        }}
      />

      <CaseStudyCta />
    </>
  );
}
