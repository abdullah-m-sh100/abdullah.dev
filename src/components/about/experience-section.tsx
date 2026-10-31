import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
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
              <Reveal
                key={item.id}
                as="li"
                index={index}
                className="grid grid-cols-[auto_1fr] gap-x-5 lg:grid-cols-[13rem_auto_1fr] lg:gap-x-8"
              >
                {/* Desktop date column, on the reading-start side. */}
                <div className="hidden pt-1 lg:block lg:text-end">
                  {period ? (
                    <p className="text-foreground text-label ltr:uppercase">{period}</p>
                  ) : null}
                  <p className="text-muted-foreground mt-1 text-sm">{localize(item.company, locale)}</p>
                </div>

                <div className="flex flex-col items-center">
                  {/* Sage, with the one ongoing role taking the primary tone. */}
                  <span
                    className={
                      item.current
                        ? 'bg-primary ring-primary/25 mt-2 size-3 shrink-0 rounded-full ring-4'
                        : 'bg-secondary mt-2 size-3 shrink-0 rounded-full'
                    }
                  />
                  {!isLast ? <span className="bg-border-strong/50 mt-2 w-px flex-1" /> : null}
                </div>

                <div className={isLast ? 'pb-2' : 'pb-8'}>
                  <Card className="p-6 sm:p-8">
                    <h3 className="text-h3">{localize(item.role, locale)}</h3>
                    {/* Below `lg` the date column is hidden, so company and period sit under the title. */}
                    <p className="text-muted-foreground mt-1 text-sm lg:hidden">
                      {localize(item.company, locale)}
                    </p>
                    {period ? (
                      <p className="text-subtle-foreground text-label mt-1 lg:hidden ltr:uppercase">
                        {period}
                      </p>
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
                  </Card>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
