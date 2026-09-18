import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { localize } from '@/i18n/localize';
import { getWorkflowSteps } from '@/lib/content/profile';

/**
 * Working principles / approach — the `about.workflow` steps as a numbered
 * editorial list. The large ordinal is `aria-hidden`; the heading hierarchy
 * for assistive tech is just this section's title followed by each step's own
 * heading, same pattern as the case-study "Key features" list in
 * `components/work/project-features.tsx`.
 */
export async function PrinciplesSection() {
  const locale = await getLocale();
  const t = await getTranslations('about.principles');
  const steps = getWorkflowSteps();

  return (
    <Section aria-labelledby="about-principles-title">
      <Container>
        <SectionHeading
          id="about-principles-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <ol className="border-border mt-12 grid gap-x-8 gap-y-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.id} as="li" index={index}>
              <span aria-hidden="true" className="text-border-strong text-h1 font-extrabold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h3 -mt-2">{localize(step.title, locale)}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {localize(step.description, locale)}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
