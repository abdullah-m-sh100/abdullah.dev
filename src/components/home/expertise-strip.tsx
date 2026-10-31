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
 * A 2×2 grid of cards with each skill as a chip. Two columns rather than four
 * because the categories are very uneven (ten front-end skills, three database
 * ones): at four narrow columns the lists ran to different lengths and left
 * ragged empty space, while a wide card lets the chips flow into a couple of
 * rows. Chips also scan faster than a stacked list and roughly halve the
 * section's height on a phone.
 *
 * The index numeral is decorative and hidden from assistive technology; the
 * list order is already conveyed by the list itself.
 */
export async function ExpertiseStrip() {
  const locale = await getLocale();
  const t = await getTranslations('home.expertise');
  const categories = getSkillCategories();

  return (
    <Section spacing="compact" aria-labelledby="home-expertise">
      <Container>
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 id="home-expertise" className="text-h2">
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-md text-sm">{t('description')}</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {categories.map((category, index) => (
            <Reveal key={category.id} as="li" index={index}>
              <Card tone="elevated" interactive className="group h-full p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-3">
                    <span className="text-secondary bg-secondary-subtle inline-flex size-10 items-center justify-center rounded-md">
                      <Icon name={category.icon} className="size-5" />
                    </span>
                    <h3 className="text-label text-foreground ltr:uppercase">
                      {localize(category.title, locale)}
                    </h3>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-subtle-foreground text-label tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.id}
                      className="border-hairline border-border bg-surface text-foreground rounded-pill px-3 py-1.5 text-sm font-medium transition-colors duration-(--duration-base) group-hover:border-border-strong"
                    >
                      {skill.name}
                    </li>
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
