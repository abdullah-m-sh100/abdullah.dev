import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';

/**
 * Positioning / philosophy: the four outcomes `about.values` commits to.
 *
 * A plain card grid — deliberately different from the hairline band
 * `ExpertiseStrip` and the categorized rows in `SkillsSection` below, so
 * consecutive "grouped concept" sections on this page don't all look alike.
 */
export async function PhilosophySection() {
  const locale = await getLocale();
  const t = await getTranslations('about.philosophy');
  const { values } = portfolioData.about;

  return (
    <Section surface="muted" aria-labelledby="about-philosophy-title">
      <Container>
        <SectionHeading
          id="about-philosophy-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.id} as="li" index={index}>
              <Card className="h-full p-6">
                <span className="text-primary bg-primary-subtle mb-4 inline-flex size-11 items-center justify-center rounded-md">
                  <Icon name={value.icon} />
                </span>
                <h3 className="text-h3">{localize(value.title, locale)}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {localize(value.description, locale)}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
