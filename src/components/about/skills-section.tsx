import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { localize } from '@/i18n/localize';
import { getSkillCategories } from '@/lib/content/profile';

/**
 * Skills & technology, as categorized rows rather than the `ExpertiseStrip`
 * hairline band Home already shows in full — same selector, a deliberately
 * different composition so the two don't repeat each other. Highlighted
 * (core) skills get an emphasized badge; the rest stay a quiet inline list —
 * never a percentage, per CLAUDE.md.
 */
export async function SkillsSection() {
  const locale = await getLocale();
  const t = await getTranslations('about.skills');
  const categories = getSkillCategories();

  return (
    <Section aria-labelledby="about-skills-title">
      <Container>
        <SectionHeading
          id="about-skills-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="border-border divide-border mt-12 flex flex-col divide-y border-t">
          {categories.map((category, index) => {
            const core = category.skills.filter((skill) => skill.highlighted);
            const supporting = category.skills.filter((skill) => !skill.highlighted);

            return (
              <Reveal key={category.id} index={index} className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <span className="text-secondary inline-flex items-center gap-2">
                    <Icon name={category.icon} className="size-5" />
                    <span className="text-label text-foreground ltr:uppercase">
                      {localize(category.title, locale)}
                    </span>
                  </span>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {localize(category.description, locale)}
                  </p>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-8">
                  {core.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {core.map((skill) => (
                        <li key={skill.id}>
                          <Badge variant="primary">{skill.name}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {supporting.length > 0 ? (
                    <p className="text-muted-foreground text-sm">
                      {supporting.map((skill) => skill.name).join(' · ')}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
