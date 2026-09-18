import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { portfolioData } from '@/data/portfolio-data';
import { localize, localizeList } from '@/i18n/localize';

/**
 * Professional introduction.
 *
 * The full biography (all of `about.summary`, not the two-paragraph Home
 * preview) beside a compact "Best fit for" list built from `about.audience` —
 * an editorial narrative-plus-sidebar split, distinct from the stats panel
 * `AboutPreview` uses for the same grid shape on Home, since stats get their
 * own dedicated section further down this page.
 */
export async function AboutIntro() {
  const locale = await getLocale();
  const t = await getTranslations('about.intro');
  const { about, personal } = portfolioData;

  return (
    <Section aria-labelledby="about-intro-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="about-intro-title" className="text-h3">
                {t('title')}
              </h2>
            </Reveal>

            <div className="mt-6 flex flex-col gap-5">
              {about.summary.map((paragraph, index) => (
                <Reveal key={paragraph.en} index={index + 1}>
                  <p className="text-muted-foreground max-w-prose-comfortable leading-relaxed">
                    {localize(paragraph, locale)}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal index={about.summary.length + 1}>
              <blockquote className="border-secondary mt-8 border-s-2 ps-5">
                <p className="text-foreground text-h3">{localize(personal.tagline, locale)}</p>
              </blockquote>
            </Reveal>
          </div>

          <Reveal variant="slide-start" index={1} className="lg:col-span-5">
            <div className="border-border bg-surface-muted rounded-xl border p-8">
              <h3 className="text-subtle-foreground text-label ltr:uppercase">
                {t('audienceTitle')}
              </h3>

              <ul className="mt-5 flex flex-col gap-4">
                {localizeList(about.audience, locale).map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm">
                    <Icon name="check" className="text-secondary mt-0.5 size-4 shrink-0" />
                    <span className="text-muted-foreground">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
