import { getTranslations } from 'next-intl/server';

import { GradientGlow } from '@/components/effects/gradient-glow';
import { Reveal } from '@/components/motion/reveal';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';

/**
 * Closing CTA for a case study.
 *
 * Deliberately smaller and quieter than Home's `ContactCta`: a single
 * contained card rather than a full-bleed orbit + glow panel, and its own
 * project-specific copy from the `work.caseStudy.cta` messages rather than
 * `portfolioData.cta`. A visitor who just read a full case study needs one
 * clear next step, not a second hero-scale moment.
 */
export async function CaseStudyCta() {
  const t = await getTranslations('work.caseStudy.cta');

  return (
    <Section spacing="compact" aria-labelledby="case-study-cta-title">
      <Container>
        <Reveal>
          <Card
            tone="elevated"
            className="relative isolate flex flex-col items-start gap-6 overflow-hidden p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <GradientGlow tone="teal" className="inset-y-0 -end-24 -z-10 w-96 opacity-70" />

            <div className="max-w-xl">
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h2 id="case-study-cta-title" className="mt-3 text-h2">
                {t('title')}
              </h2>
              <p className="text-muted-foreground mt-3 text-base">{t('description')}</p>
            </div>

            <ButtonLink href="/contact" size="lg" className="shrink-0">
              {t('action')}
              <ButtonArrow />
            </ButtonLink>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
