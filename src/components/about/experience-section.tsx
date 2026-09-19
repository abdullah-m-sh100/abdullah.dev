import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { TechnologyList } from '@/components/work/technology-list';
import { localize, localizeList } from '@/i18n/localize';
import { getExperience } from '@/lib/content/profile';
import { formatMonthYear } from '@/lib/utils/dates';

/**
 * Professional experience as a lightweight chronology.
 *
 * The marker column uses CSS Grid's automatic track order rather than
 * absolute positioning, so it sits on the reading-start side and mirrors
 * correctly under `dir="rtl"` with no logical-property math to get wrong.
 */
export async function ExperienceSection() {
  const locale = await getLocale();
  const t = await getTranslations('about.experience');
  const items = getExperience();

  if (items.length === 0) return null;

  const tCommon = await getTranslations('common.labels');
  const labels = { technologies: tCommon('technologies') };

  return (
    <Section surface="muted" aria-labelledby="about-experience-title">
      <Container>
        <SectionHeading
          id="about-experience-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ol className="mt-12 flex flex-col">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            // `startDate` is optional — some real training programs have no
            // verifiable calendar dates. Never invent one: the row is hidden
            // instead. A start date with no end and not current (e.g. a
            // single-day training completion) renders as one month, not a
            // fake range or a misleading "Present".
            const period = !item.startDate
              ? null
              : item.current
                ? `${formatMonthYear(item.startDate, locale)} – ${t('present')}`
                : item.endDate
                  ? `${formatMonthYear(item.startDate, locale)} – ${formatMonthYear(item.endDate, locale)}`
                  : formatMonthYear(item.startDate, locale);

            return (
              <Reveal key={item.id} as="li" index={index} className="grid grid-cols-[auto_1fr] gap-x-6">
                <div className="flex flex-col items-center">
                  <span className="bg-primary mt-1.5 size-3 shrink-0 rounded-full" />
                  {!isLast ? <span className="bg-border mt-2 w-px flex-1" /> : null}
                </div>

                <div className={isLast ? 'pb-2' : 'pb-12'}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-h3">{localize(item.role, locale)}</h3>
                    <span className="text-muted-foreground text-sm">{localize(item.company, locale)}</span>
                  </div>
                  {period ? (
                    <p className="text-subtle-foreground text-label mt-1 ltr:uppercase">{period}</p>
                  ) : null}
                  <p className="text-muted-foreground mt-4 max-w-prose-comfortable leading-relaxed">
                    {localize(item.summary, locale)}
                  </p>

                  {item.achievements.length > 0 ? (
                    <ul className="mt-4 flex flex-col gap-2">
                      {localizeList(item.achievements, locale).map((achievement) => (
                        <li key={achievement} className="text-muted-foreground flex items-start gap-3 text-sm">
                          <span aria-hidden="true" className="bg-border-strong mt-2 size-1 shrink-0 rounded-full" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <TechnologyList
                    technologies={item.technologies}
                    label={labels.technologies}
                    className="mt-5"
                  />
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
