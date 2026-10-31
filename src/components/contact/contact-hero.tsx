import { getLocale, getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';

/**
 * /contact introduction — the same restrained hero pattern used across every
 * secondary page (`WorkHero`, `AboutHero`, `ServicesHero`, `CertificatesHero`):
 * one decorative layer, no CTA pair, so the form below is what visitors reach
 * first with their attention.
 *
 * It carries the same availability badge as the Home hero. On a page whose only
 * job is "get in touch", whether anyone is there to answer is the first thing a
 * visitor wants to know.
 */
export async function ContactHero() {
  const locale = await getLocale();
  const t = await getTranslations('contact.hero');
  const { personal } = portfolioData;

  return (
    <Section
      tone="midnight"
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

        <Reveal index={2} className="mt-6 inline-block">
          <Badge variant="secondary" dot>
            {localize(personal.availability.label, locale)}
          </Badge>
        </Reveal>
      </Container>
    </Section>
  );
}
