import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';

type WorkHeroProps = {
  /** Localized, already pluralized count string, e.g. "3 projects". */
  countLabel: string;
};

/**
 * /work introduction.
 *
 * Deliberately quieter than the Home hero: one decorative layer (the grid)
 * instead of three, no CTA pair, no interface panel. Home stays the site's
 * main visual entry point — this page's job is to get out of the way of the
 * listing below it.
 */
export async function WorkHero({ countLabel }: WorkHeroProps) {
  const t = await getTranslations('work.hero');

  return (
    <Section spacing="compact" className="relative isolate overflow-hidden" aria-labelledby="work-hero-title">
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 id="work-hero-title" className="mt-4 text-h1">
            {t('title')}
          </h1>
        </Reveal>

        <Reveal index={1}>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lead">{t('description')}</p>
        </Reveal>

        <Reveal index={2}>
          <p className="text-subtle-foreground mt-6 text-label ltr:uppercase">{countLabel}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
