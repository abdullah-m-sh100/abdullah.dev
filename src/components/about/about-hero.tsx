import { getLocale, getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { HeroPortrait } from '@/components/home/hero-portrait';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';

/**
 * /about introduction.
 *
 * Quieter than the Home hero — one decorative layer and no CTA pair — matching
 * the restraint already established by `WorkHero`. The one addition is the
 * portrait, on desktop only: "About" is the page where a face earns its place,
 * and without it the right half of a wide band was simply empty. It reuses
 * `HeroPortrait` rather than a second frame, so the two pages stay identical.
 * Below `md` it is not rendered at all (and not preloaded), which keeps the
 * phone layout as short as it was.
 *
 * A Midnight band, like every page hero on the site: the guide weights Midnight
 * at half the palette against Bone's 30%, and spending it on the header-and-hero
 * field at the top of each page is what gets that balance without a dark mode.
 * Copper becomes the accent inside it automatically.
 */
export async function AboutHero() {
  const locale = await getLocale();
  const t = await getTranslations('about.hero');
  const { personal } = portfolioData;

  return (
    <Section
      tone="midnight"
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="about-hero-title"
    >
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 id="about-hero-title" className="mt-4 text-h1">
                {t('title')}
              </h1>
            </Reveal>

            <Reveal index={1}>
              <p className="text-muted-foreground mt-5 max-w-2xl text-lead">{t('description')}</p>
            </Reveal>
          </div>

          {personal.avatar ? (
            <Reveal
              variant="slide-end"
              index={1}
              className="hidden pb-6 md:col-span-5 md:block lg:col-span-4 lg:col-start-9"
            >
              <HeroPortrait
                image={personal.avatar}
                locale={locale}
                name={localize(personal.name, locale)}
                role={localize(personal.role, locale)}
                location={localize(personal.place, locale)}
                preload={false}
                sizes="(min-width: 1024px) 20rem, 28vw"
                className="w-full max-w-72 md:ms-auto"
              />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
