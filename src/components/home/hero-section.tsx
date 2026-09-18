import { getLocale, getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { GradientGlow } from '@/components/effects/gradient-glow';
import { OrbitBackground } from '@/components/effects/orbit-background';
import { HeroPortrait } from '@/components/home/hero-portrait';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getHighlightedSkills } from '@/lib/content/profile';

/**
 * Home hero.
 *
 * Asymmetric 7/5 composition on desktop: the message carries the left, the
 * portrait anchors the right. On smaller screens the portrait moves above the
 * message at a compact size — enough to put a face to the site without pushing
 * the headline, the actions and the stack line past the first screen.
 *
 * The three Sprint 1 effect layers appear once each and at low strength: grid
 * for structure, glow for depth, orbit for the brand motif. The background
 * orbit is kept quiet here because the portrait carries an orbit arc of its
 * own — two at full strength would be the motif overused.
 */
export async function HeroSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  const { personal } = portfolioData;

  // Four is enough to signal the stack without turning the hero into badges.
  const coreStack = getHighlightedSkills().slice(0, 4);

  return (
    <Section spacing="spacious" className="relative isolate overflow-hidden">
      <AnimatedGrid fade="top" />
      <GradientGlow tone="brand" className="inset-x-0 -top-48 -z-10 h-160" />
      <OrbitBackground
        rings={2}
        className="absolute -top-32 -inset-e-72 -z-10 hidden h-176 w-256 opacity-45 sm:block rtl:-scale-x-100"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal variant="scale-in" className="inline-block">
              <Badge variant="secondary" dot>
                {localize(personal.availability.label, locale)}
              </Badge>
            </Reveal>

            <Reveal index={1}>
              <h1 className="mt-6 text-display">
                {localize(personal.headline, locale)}{' '}
                <span className="text-gradient-brand">
                  {localize(personal.tagline, locale)}
                </span>
              </h1>
            </Reveal>

            <Reveal index={2}>
              <p className="text-muted-foreground mt-6 max-w-xl text-lead">
                {localize(personal.intro, locale)}
              </p>
            </Reveal>

            <Reveal index={3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/work" size="lg">
                  {t('common.actions.viewWork')}
                  <ButtonArrow />
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="secondary">
                  {t('common.actions.contactMe')}
                </ButtonLink>
              </div>
            </Reveal>

            {/*
              Technical context as a quiet line rather than a badge wall, with
              inline dividers that need no direction handling.
            */}
            <Reveal index={4}>
              <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-subtle-foreground text-label ltr:uppercase">
                  {t('home.hero.technologiesLabel')}
                </span>
                <ul className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
                  {coreStack.map((skill, index) => (
                    <li key={skill.id} className="flex items-center gap-3">
                      {index > 0 ? (
                        <span aria-hidden="true" className="bg-border-strong size-1 rounded-full" />
                      ) : null}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal index={5}>
              <p className="text-subtle-foreground mt-6 flex items-center gap-2 text-sm">
                <Icon name="map-pin" className="size-4" />
                {localize(personal.location, locale)}
              </p>
            </Reveal>
          </div>

          {/*
            On mobile the portrait leads: it is the fastest way to say whose
            site this is, and at this size it costs a fraction of the vertical
            space the old interface panel needed.
          */}
          {personal.avatar ? (
            <Reveal
              variant="slide-end"
              index={2}
              className="order-first lg:order-0 lg:col-span-5"
            >
              <HeroPortrait
                image={personal.avatar}
                locale={locale}
                name={localize(personal.name, locale)}
                role={localize(personal.role, locale)}
              />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
