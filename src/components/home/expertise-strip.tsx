import { getLocale, getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { localize } from '@/i18n/localize';
import { getSkillCategories } from '@/lib/content/profile';

/**
 * Expertise strip.
 *
 * Grouped by what each area does for the product — never as proficiency
 * percentages, which are unverifiable and the brief rules out.
 *
 * Four separated, elevated cards — matching the `Card` primitive used
 * elsewhere (e.g. About's philosophy section) rather than the earlier
 * hairline-divided band.
 */
export async function ExpertiseStrip() {
  const locale = await getLocale();
  const t = await getTranslations('home.expertise');
  const categories = getSkillCategories();

  return (
    <Section spacing="compact" aria-labelledby="home-expertise">
      <Container>
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="home-expertise" className="text-h3">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-md text-sm">{t('description')}</p>
        </Reveal>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} as="li" index={index}>
              <Card tone="elevated" className="h-full p-6">
                <span className="text-secondary inline-flex items-center gap-2">
                  <Icon name={category.icon} className="size-5" />
                  <span className="text-label text-foreground ltr:uppercase">
                    {localize(category.title, locale)}
                  </span>
                </span>

                <ul className="text-muted-foreground mt-4 flex flex-col gap-1.5 text-sm">
                  {category.skills.map((skill) => (
                    <li key={skill.id}>{skill.name}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
