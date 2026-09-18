import { portfolioData } from '@/data/portfolio-data';
import type { Locale } from '@/i18n/config';
import { localize } from '@/i18n/localize';
import { getAllSkills, getSocialLinks } from '@/lib/content/profile';
import { absoluteUrl, siteConfig } from '@/lib/site-config';
import type { Project } from '@/types/content';

/**
 * JSON-LD builders.
 *
 * Every value comes from `portfolioData` — nothing here invents a fact,
 * rating or client that is not already shown on the rendered page. This is a
 * single `@graph` (Person + WebSite) rather than two separate scripts, so a
 * page never emits two competing definitions of the same entity.
 */

type JsonLdGraph = Record<string, unknown>;

export function buildSiteJsonLd(locale: Locale): JsonLdGraph {
  const { personal } = portfolioData;
  const personId = absoluteUrl('/#person');
  const siteId = absoluteUrl('/#website');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: localize(personal.name, locale),
        jobTitle: localize(personal.role, locale),
        description: localize(personal.intro, locale),
        email: `mailto:${personal.email}`,
        url: siteConfig.url,
        /*
         * Both of these restate facts the pages already show — the skill list
         * on /about and the location line in the hero — in the form search
         * engines read as entity data. `knowsAbout` is what ties the person to
         * "React" and "Next.js" as topics rather than as loose page text.
         */
        knowsAbout: getAllSkills().map((skill) => skill.name),
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'EG',
        },
        sameAs: getSocialLinks()
          .filter((link) => link.platform !== 'email')
          .map((link) => link.url),
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: siteConfig.url,
        name: localize(personal.name, locale),
        description: localize(personal.tagline, locale),
        publisher: { '@id': personId },
        inLanguage: locale,
      },
    ],
  };
}

/**
 * Serializes JSON-LD for a `<script>` tag, escaping `<` so a value
 * containing `</script>` can never terminate the tag early.
 */
export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function buildProjectBreadcrumbJsonLd(project: Project, locale: Locale): JsonLdGraph {
  const home = portfolioData.navigation.find((item) => item.id === 'home');
  const work = portfolioData.navigation.find((item) => item.id === 'work');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: home ? localize(home.label, locale) : 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: work ? localize(work.label, locale) : 'Work', item: absoluteUrl('/work') },
      { '@type': 'ListItem', position: 3, name: localize(project.title, locale), item: absoluteUrl(`/work/${project.slug}`) },
    ],
  };
}
