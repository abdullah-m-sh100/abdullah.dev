import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';

/**
 * /about introduction.
 *
 * Quieter than the Home hero — one decorative layer, no CTA pair, no
 * interface panel — matching the restraint already established by `WorkHero`
 * for secondary pages. The rest of the page carries the visual variety.
 */
export async function AboutHero() {
  const t = await getTranslations('about.hero');

  return (
    <Section
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="about-hero-title"
    >
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 id="about-hero-title" className="mt-4 text-h1">
            {t('title')}
          </h1>
        </Reveal>

        <Reveal index={1}>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lead">{t('description')}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
