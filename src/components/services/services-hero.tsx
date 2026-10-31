import { getLocale, getTranslations } from 'next-intl/server';

import { AnimatedGrid } from '@/components/effects/animated-grid';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/section-heading';
import { localize } from '@/i18n/localize';
import { getFeaturedServices, getSupportingServices } from '@/lib/content/profile';

/**
 * /services introduction — the same restrained hero pattern as `WorkHero` and
 * `AboutHero`: one decorative layer and no CTA pair, so the page's product-
 * oriented structure (the service groups below) carries the visual weight.
 *
 * On desktop the right half holds a numbered index of every service, each one a
 * link to its card further down. It is navigation rather than decoration — the
 * page lists seven services and the hero is the one place a visitor can see the
 * whole catalogue at once — and the numbers match the ordinals printed on the
 * cards, because both are built from the same two selectors in the same order.
 * It is hidden below `lg`, where the page is short enough to scroll.
 */
export async function ServicesHero() {
  const locale = await getLocale();
  const t = await getTranslations('services.hero');
  const services = [...getFeaturedServices(), ...getSupportingServices()];

  return (
    <Section
      tone="midnight"
      spacing="compact"
      className="relative isolate overflow-hidden"
      aria-labelledby="services-hero-title"
    >
      <AnimatedGrid fade="top" className="opacity-60" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 id="services-hero-title" className="mt-4 text-h1">
                {t('title')}
              </h1>
            </Reveal>

            <Reveal index={1}>
              <p className="text-muted-foreground mt-5 max-w-2xl text-lead">{t('description')}</p>
            </Reveal>
          </div>

          {services.length > 0 ? (
            <Reveal variant="slide-end" index={1} className="hidden lg:col-span-5 lg:block">
              <nav aria-label={t('eyebrow')}>
                <ol className="border-hairline border-border bg-surface divide-border divide-y overflow-hidden rounded-xl">
                  {services.map((service, index) => (
                    <li key={service.id}>
                      <a
                        href={`#${service.slug}`}
                        className="group hover:bg-surface-muted flex items-center gap-4 px-5 py-3 transition-colors duration-(--duration-base)"
                      >
                        <span
                          aria-hidden="true"
                          className="text-subtle-foreground text-label w-6 tabular-nums"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-foreground flex-1 text-sm font-medium">
                          {localize(service.title, locale)}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground transition-transform duration-(--duration-base) ease-out group-hover:translate-y-0.5"
                        >
                          ↓
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
