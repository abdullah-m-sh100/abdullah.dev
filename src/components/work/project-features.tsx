import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { localize } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';
import type { Locale, ProjectFeature } from '@/types/content';

type ProjectFeaturesProps = {
  features: readonly ProjectFeature[];
  locale: Locale;
  title: string;
  description: string;
};

/**
 * Key Features.
 *
 * A numbered grid of cards rather than another three-icon row — the ordinal
 * is purely decorative (`aria-hidden`), so the real heading hierarchy for
 * screen readers is just "Key features" followed by each feature's own heading.
 *
 * The column count follows the item count: a multiple of three takes three
 * columns, anything else that divides by two takes two. Four features in a
 * fixed three-column grid left the fourth alone on a second row.
 *
 * The caller only renders this component when `project.features` exists, so
 * there is no internal empty state to design for.
 */
export function ProjectFeatures({ features, locale, title, description }: ProjectFeaturesProps) {
  return (
    <Section aria-labelledby="case-study-features">
      <Container>
        <SectionHeading id="case-study-features" title={title} description={description} />

        <ul
          className={cn(
            'mt-12 grid gap-6 sm:grid-cols-2',
            features.length % 3 === 0 || features.length % 2 !== 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
          )}
        >
          {features.map((feature, index) => (
            <Reveal key={feature.id} as="li" index={index}>
              <Card interactive className="h-full p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="text-subtle-foreground text-label tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-h3 mt-4">{localize(feature.title, locale)}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {localize(feature.description, locale)}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
