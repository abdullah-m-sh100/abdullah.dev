import { getLocale } from 'next-intl/server';

import { GradientGlow } from '@/components/effects/gradient-glow';
import { OrbitBackground } from '@/components/effects/orbit-background';
import { Reveal } from '@/components/motion/reveal';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';
import { TextLink } from '@/components/ui/text-link';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';

/**
 * Closing call to action.
 *
 * Visually the heaviest section after the hero, and it mirrors it: the same
 * orbit and glow, now centred, so the page opens and closes on the same motif.
 * Sitting on the sunken surface it reads as a distinct closing panel rather
 * than one more content band.
 *
 * All copy comes from `portfolioData.cta`. The form itself belongs to a later
 * sprint — this only routes to /contact.
 */
export async function ContactCta() {
  const locale = await getLocale();
  const { cta, personal, contact } = portfolioData;

  return (
    <Section
      surface="sunken"
      spacing="spacious"
      divider
      className="relative isolate overflow-hidden"
      aria-labelledby="home-contact-cta"
    >
      <GradientGlow tone="brand" className="inset-x-0 top-0 -z-10 h-128" />
      <OrbitBackground
        rings={3}
        className="absolute inset-x-0 -bottom-64 -z-10 mx-auto h-160 w-256 opacity-60"
      />

      <Container size="prose" className="relative text-center">
        <Reveal>
          <Eyebrow className="justify-center">{localize(cta.eyebrow, locale)}</Eyebrow>
          <h2 id="home-contact-cta" className="mt-5 text-h1">
            {localize(cta.title, locale)}
          </h2>
        </Reveal>

        <Reveal index={1}>
          <p className="text-muted-foreground mt-5 text-lead">
            {localize(cta.description, locale)}
          </p>
        </Reveal>

        <Reveal index={2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href={cta.primary.href} size="lg">
              {localize(cta.primary.label, locale)}
              <ButtonArrow />
            </ButtonLink>
            {cta.secondary ? (
              <ButtonLink href={cta.secondary.href} size="lg" variant="secondary">
                {localize(cta.secondary.label, locale)}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex flex-col items-center gap-2">
            <TextLink href={`mailto:${personal.email}`} tone="foreground">
              {personal.email}
            </TextLink>
            <p className="text-subtle-foreground text-sm">
              {localize(contact.responseTime, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
