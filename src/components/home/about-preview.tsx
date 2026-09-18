import { getLocale, getTranslations } from 'next-intl/server';

import { OrbitBackground } from '@/components/effects/orbit-background';
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
 * one bordered panel with the orbit framing it.
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
          <Reveal variant="slide-end" index={1} className="lg:col-span-5">
            <div className="group border-border bg-surface relative overflow-hidden rounded-xl border">
              {/* Framing only — the travelling node is reserved for the hero and the closing CTA. */}
              <OrbitBackground
                rings={2}
                animated={false}
                className="absolute -top-20 -inset-e-24 h-80 w-128 opacity-50 rtl:-scale-x-100"
              />

              <div className="relative p-8">
                <h3 className="text-label text-subtle-foreground ltr:uppercase">
                  {t('stats.title')}
                </h3>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                  {stats.map((stat, index) => {
                    const isPrimary = index % 2 === 0;

                    return (
                      <div key={stat.id}>
                        <span
                          className={cn(
                            'inline-flex size-9 items-center justify-center rounded-md',
                            isPrimary
                              ? 'bg-primary-subtle text-primary'
                              : 'bg-secondary-subtle text-secondary',
                          )}
                        >
                          <Icon name={stat.icon} className="size-4" />
                        </span>

                        <dt className="text-muted-foreground mt-3 text-sm">
                          {localize(stat.label, locale)}
                        </dt>
                        <dd className="text-foreground mt-1 text-h1">
                          {stat.value}
                          {stat.suffix ? (
                            <span className={isPrimary ? 'text-primary' : 'text-secondary'}>
                              {stat.suffix}
                            </span>
                          ) : null}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
