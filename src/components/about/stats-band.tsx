import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { cardTones } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { localize } from '@/i18n/localize';
import { getStats } from '@/lib/content/profile';
import { cn } from '@/lib/utils/cn';

/**
 * Stats, as four separated, elevated cards — matching the `Card` primitive's
 * `elevated` tone used elsewhere (e.g. `ExpertiseStrip`) rather than the
 * earlier hairline-divided band, which read as a table row and gave every
 * number the same weight as its neighbour.
 *
 * The card classes are applied to `Reveal` directly instead of nesting a
 * separate `Card` inside it: `dl`'s content model allows exactly one `div`
 * wrapping each `dt`/`dd` pair, and `Reveal` already renders that div, so a
 * second one from `Card` would sit between them beyond what the element
 * permits — harmless in every browser, but avoidable, and `project-overview`
 * and `contact-details` both keep to the single-wrapper form for the same
 * `dl`. See those for the same convention.
 *
 * The icon chip alternates blue and teal by position rather than using a
 * fixed colour per stat: with only four cells and no inherent category to
 * hang a colour on, alternation is what turns two accents into rhythm instead
 * of an arbitrary pick. The suffix repeats whichever accent its own card uses,
 * so the two colours on each card visibly belong together.
 *
 * Every value here is a real, source-controlled placeholder (see
 * `src/data/stats.ts`), never invented for this page.
 */
export async function StatsBand() {
  const locale = await getLocale();
  const t = await getTranslations('about.stats');
  const stats = getStats();

  return (
    <Section spacing="compact" aria-labelledby="about-stats-title">
      <Container>
        <h2 id="about-stats-title" className="sr-only">
          {t('title')}
        </h2>

        <dl className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const isPrimary = index % 2 === 0;

            return (
              <Reveal
                key={stat.id}
                index={index}
                className={cn(cardTones.elevated, 'p-6')}
              >
                <span
                  className={cn(
                    'inline-flex size-11 items-center justify-center rounded-md',
                    isPrimary ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary',
                  )}
                >
                  <Icon name={stat.icon} />
                </span>

                <dt className="text-muted-foreground mt-4 text-sm">
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
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}
