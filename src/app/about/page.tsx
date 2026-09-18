import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { AboutHero } from '@/components/about/about-hero';
import { AboutIntro } from '@/components/about/about-intro';
import { ExperienceSection } from '@/components/about/experience-section';
import { PhilosophySection } from '@/components/about/philosophy-section';
import { PrinciplesSection } from '@/components/about/principles-section';
import { SkillsSection } from '@/components/about/skills-section';
import { StatsBand } from '@/components/about/stats-band';
import { ContactCta } from '@/components/home/contact-cta';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata.about');

  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/about',
    locale,
  });
}

/**
 * /about — the editorial deep dive Home only previews.
 *
 * Every section reads from `portfolioData` through the existing selectors;
 * nothing here is page-specific content. `ContactCta` is reused unchanged
 * from Home, the same way `/work` reuses it for its own closing CTA.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <PhilosophySection />
      <StatsBand />
      <SkillsSection />
      <ExperienceSection />
      <PrinciplesSection />
      <ContactCta />
    </>
  );
}
