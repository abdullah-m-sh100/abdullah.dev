import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { localize } from '@/i18n/localize';
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
 * A numbered editorial list rather than another three-icon card row — the
 * large faint ordinal is purely decorative (`aria-hidden`), so the real
 * heading hierarchy for screen readers is just "Key features" followed by
 * each feature's own heading.
 *
 * The caller only renders this component when `project.features` exists, so
 * there is no internal empty state to design for.
 */
export function ProjectFeatures({ features, locale, title, description }: ProjectFeaturesProps) {
  return (
    <Section aria-labelledby="case-study-features">
      <Container>
        <SectionHeading id="case-study-features" title={title} description={description} />

        <ul className="border-border mt-12 grid gap-x-8 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.id} as="li" index={index}>
              <span aria-hidden="true" className="text-border-strong text-h1 font-extrabold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h3 -mt-2">{localize(feature.title, locale)}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {localize(feature.description, locale)}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
