import { getLocale, getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { GradientGlow } from '@/components/effects/gradient-glow';
import { HeroVisual } from '@/components/home/hero-visual';
import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { ButtonArrow, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getCoreStack } from '@/lib/content/profile';

/**
 * Home hero.
 *
 * A 6/6 split: the message on the reading-start side, and on the other the
 * Flow mark built around the portrait (`HeroVisual`) — the circle, the curve
 * and the three tiers of the stack. That visual is also the hero's one flow
 * motif, so the separate background line this band used to carry is gone: the
 * guide allows one per viewport. On smaller screens it follows the actions:
 * the message is read first, and the picture explains it afterwards.
 *
 * A rule-topped meta bar closes the band: the core stack on one side and the
 * location on the other. Facts like these read as product information in a
 * bar, where as stray lines under the buttons they read as an afterthought.
 *
 * A Midnight band, and the largest one on the site. The guide gives Midnight
 * half the palette and Bone the page, so the dark ground arrives as whole
 * bands rather than as a theme — here, and again at the closing CTA and the
 * footer. Copper becomes the accent inside it automatically.
 */
export async function HeroSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  const { personal } = portfolioData;

  // The four MERN technologies, named explicitly in `data/skills.ts` — not a
  // slice of the highlighted skills, which would be the front-end four.
  const coreStack = getCoreStack();

  return (
    <Section tone="midnight" className="relative isolate overflow-hidden pt-12 pb-10 md:pt-20 md:pb-12">
      <AnimatedGrid fade="top" />
      <GradientGlow tone="warm" className="inset-x-0 -top-48 -z-10 h-160" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal variant="scale-in" className="inline-block">
              <Badge variant="secondary" dot>
                {localize(personal.availability.label, locale)}
              </Badge>
            </Reveal>

            {/*
              The emphasised phrase and the primary CTA below are both copper,
              which is the one place on the site that reads the guide's "one
              warm focal element per screen" as one focal *cluster* rather than
              one element. A headline and the action it leads to are a single
              statement here, and the alternatives are both worse: a headline
              with no emphasis loses the brand line, and a primary button that
              is not the accent colour stops looking primary. The copper server
              node in the visual is the logo's own colour rule, not a fourth
              accent.
            */}
            <Reveal index={1}>
              <h1 className="mt-6 text-display">
                {/* Each sentence starts its own line, so the break is the meaning, not the column width. */}
                <span className="block">{localize(personal.headline, locale)}</span>
                <span className="text-accent-emphasis mt-1 block">{localize(personal.tagline, locale)}</span>
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
          </div>

          {personal.avatar ? (
            <Reveal variant="scale-in" index={2} className="lg:col-span-6">
              <HeroVisual
                image={personal.avatar}
                locale={locale}
                nodes={[
                  { tier: t('home.hero.flow.interface'), tech: 'React.js' },
                  { tier: t('home.hero.flow.server'), tech: 'Node.js · Express' },
                  { tier: t('home.hero.flow.data'), tech: 'MongoDB' },
                ]}
              />
            </Reveal>
          ) : null}
        </div>

        <Reveal index={4}>
          <div className="border-border mt-14 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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

            <p className="text-subtle-foreground flex items-center gap-2 text-sm">
              <Icon name="map-pin" className="size-4" />
              {localize(personal.location, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
