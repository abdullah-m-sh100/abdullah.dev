import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { AboutPreview } from '@/components/home/about-preview';
import { CertificatesPreview } from '@/components/home/certificates-preview';
import { ContactCta } from '@/components/home/contact-cta';
import { ExpertiseStrip } from '@/components/home/expertise-strip';
import { FeaturedWork } from '@/components/home/featured-work';
import { HeroSection } from '@/components/home/hero-section';
import { LatestWork } from '@/components/home/latest-work';
import { ServicesPreview } from '@/components/home/services-preview';
import { getFeaturedProjects, getRecentProjects } from '@/lib/content/projects';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata.home');

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/',
    locale,
  });
}

/**
 * Home page.
 *
 * A Server Component that composes nine sections and owns exactly one piece of
 * logic: splitting the project list so "Featured work" and "More from the
 * workbench" can never show the same project twice. Everything else — content,
 * ordering, localization — comes from the centralized data and its selectors.
 */
export default function HomePage() {
  const featuredProjects = getFeaturedProjects(2);
  const recentProjects = getRecentProjects(3, {
    excludeSlugs: featuredProjects.map((project) => project.slug),
  });

  return (
    <>
      <HeroSection />
      <ExpertiseStrip />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedWork projects={featuredProjects} />
      {/* Omitted entirely when every project is already featured above. */}
      {recentProjects.length > 0 ? <LatestWork projects={recentProjects} /> : null}
      <CertificatesPreview />
      <ContactCta />
    </>
  );
}
