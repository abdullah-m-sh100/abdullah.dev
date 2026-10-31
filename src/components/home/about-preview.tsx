import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';
import { TextLink } from '@/components/ui/text-link';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getStats } from '@/lib/content/profile';
import { cn } from '@/lib/utils/cn';

/**
 * About preview, with the statistics panel folded into the same section.
 *
 * An editorial 7/5 grid rather than heading-paragraph-button: the prose column
 * ends on a pull-quote carrying the brand line, and the stats sit beside it in
 * one bordered panel, divided into cells by hairlines.
 *
 * Numbers are rendered statically with a staggered reveal. A count-up would add
 * client JavaScript and a moving target for screen readers for no real gain.
 */
export async function AboutPreview() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  const { about, personal } = portfolioData;
  const stats = getStats();

  return (
    <Section surface="muted" aria-labelledby="home-about">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------- prose */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{t('about.eyebrow')}</Eyebrow>
              <h2 id="home-about" className="mt-4 text-h2">
                {t('about.title')}
              </h2>
            </Reveal>

            <div className="mt-6 flex flex-col gap-4">
              {about.preview.map((paragraph, index) => (
                <Reveal key={paragraph.en} index={index + 1}>
                  <p className="text-muted-foreground text-lead">
                    {localize(paragraph, locale)}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal index={3}>
              <blockquote className="border-secondary mt-8 border-s-2 ps-5">
                <p className="text-foreground text-h3">
                  {localize(personal.tagline, locale)}
                </p>
              </blockquote>
            </Reveal>

            <Reveal index={4}>
              <TextLink href="/about" className="mt-8">
                {t('about.action')}
                <Icon name="arrow-right" className="cta-arrow size-4" />
              </TextLink>
            </Reveal>
          </div>

          {/* ------------------------------------------------------- stats */}
          {/*
            The cells are divided by hairlines rather than floated in space, so
            the panel reads as one instrument. The flow line that used to frame
            it ran straight through the numbers at most widths; the motif is
            already carried by the hero, the closing CTA and the footer.
          */}
          <Reveal variant="slide-end" index={1} className="lg:col-span-5 lg:self-center">
            <div className="border-hairline border-border bg-surface-elevated overflow-hidden rounded-xl shadow-(--shadow-elevated)">
              <h3 className="text-label text-subtle-foreground px-6 pt-6 sm:px-8 sm:pt-7 ltr:uppercase">
                {t('stats.title')}
              </h3>

              <dl className="border-border mt-5 grid grid-cols-2 border-t">
                {stats.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={cn(
                      'border-border flex flex-col p-5 sm:p-7',
                      index % 2 === 0 && 'border-e',
                      index < stats.length - 2 && 'border-b',
                    )}
                  >
                    {/* Sage, like every decorative chip — see `StatsBand`. */}
                    <span className="text-secondary bg-secondary-subtle inline-flex size-9 items-center justify-center rounded-md">
                      <Icon name={stat.icon} className="size-4" />
                    </span>

                    {/* `dd` first visually, `dt` first in the source, so the label still leads for screen readers. */}
                    <dt className="text-muted-foreground order-last mt-1 text-sm">
                      {localize(stat.label, locale)}
                    </dt>
                    <dd className="text-foreground font-brand-display mt-4 text-h1 tabular-nums">
                      {stat.value}
                      {stat.suffix ? <span className="text-secondary">{stat.suffix}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
