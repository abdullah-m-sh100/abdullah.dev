import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';

/**
 * /contact introduction — the same restrained hero pattern used across every
 * secondary page (`WorkHero`, `AboutHero`, `ServicesHero`, `CertificatesHero`):
 * one decorative layer, no CTA pair, so the form below is what visitors reach
 * first with their attention.
 */
export async function ContactHero() {
  const t = await getTranslations('contact.hero');

  return (
    <Section
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="contact-hero-title"
    >
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 id="contact-hero-title" className="mt-4 text-h1">
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
