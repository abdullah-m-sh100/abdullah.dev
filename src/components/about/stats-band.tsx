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
 * Every icon chip is Sage, and the alternation that used to run through them
 * is gone. The identity has one warm tone and allows it on a single focal
 * element per screen, so four chips taking turns at it would spend that budget
 * on decoration — and these chips are decoration. Sage is the guide's colour
 * for exactly this ("الحالة والتفاصيل الهادئة"), which also removes the need to
 * justify an arbitrary two-colour rhythm.
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
          {stats.map((stat, index) => (
            <Reveal key={stat.id} index={index} className={cn(cardTones.elevated, 'p-6')}>
              <span className="text-secondary bg-secondary-subtle inline-flex size-11 items-center justify-center rounded-md">
                <Icon name={stat.icon} />
              </span>

              <dt className="text-muted-foreground mt-4 text-sm">
                {localize(stat.label, locale)}
              </dt>
              <dd className="text-foreground font-brand-display mt-1 text-h1 tabular-nums">
                {stat.value}
                {stat.suffix ? <span className="text-secondary">{stat.suffix}</span> : null}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
