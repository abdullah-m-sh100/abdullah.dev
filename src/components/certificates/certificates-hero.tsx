import { getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';

/**
 * /certificates introduction — the same restrained hero pattern used by
 * `WorkHero`, `AboutHero` and `ServicesHero`: one decorative layer, no CTA
 * pair, so the credentials grid below carries the page's substance.
 */
export async function CertificatesHero({ countLabel }: { countLabel: string }) {
  const t = await getTranslations('certificates.hero');

  return (
    <Section
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="certificates-hero-title"
    >
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 id="certificates-hero-title" className="mt-4 text-h1">
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
