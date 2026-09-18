import { getLocale, getTranslations } from 'next-intl/server';

import { SocialIcon } from '@/components/brand/social-icon';
import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconLink } from '@/components/ui/icon-button';
import { TextLink } from '@/components/ui/text-link';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getSocialLinks } from '@/lib/content/profile';

/**
 * Contact information beside the form — every value comes from
 * `portfolioData.contact` / `.socialLinks`, the same source the footer and
 * `ContactCta` already read from, so this never drifts into its own copy of
 * the email address or social URLs.
 */
export async function ContactDetails() {
  const locale = await getLocale();
  const t = await getTranslations('contact.details');
  const { contact } = portfolioData;
  const socialLinks = getSocialLinks();

  return (
    <Reveal variant="slide-start" index={1}>
      <Card tone="muted" className="p-8">
        <h2 className="text-h3">{t('title')}</h2>

        <dl className="mt-6 flex flex-col gap-6">
          <div>
            <dt className="text-subtle-foreground flex items-center gap-2 text-label ltr:uppercase">
              <Icon name="mail" className="size-4" />
              {t('emailLabel')}
            </dt>
            <dd className="mt-1.5">
              <TextLink href={`mailto:${contact.email}`} tone="foreground" className="text-sm">
                <span dir="ltr">{contact.email}</span>
              </TextLink>
            </dd>
          </div>

          <div>
            <dt className="text-subtle-foreground flex items-center gap-2 text-label ltr:uppercase">
              <Icon name="clock" className="size-4" />
              {t('availabilityLabel')}
            </dt>
            <dd className="text-muted-foreground mt-1.5 text-sm">
              {localize(contact.availability, locale)}
            </dd>
          </div>

          <div>
            <dt className="text-subtle-foreground flex items-center gap-2 text-label ltr:uppercase">
              <Icon name="map-pin" className="size-4" />
              {t('locationLabel')}
            </dt>
            <dd className="text-muted-foreground mt-1.5 text-sm">
              {localize(contact.location, locale)}
            </dd>
          </div>
        </dl>

        {socialLinks.length > 0 ? (
          <div className="border-border mt-8 border-t pt-6">
            <h3 className="text-subtle-foreground text-label ltr:uppercase">{t('socialLabel')}</h3>
            <ul aria-label={t('socialLabel')} className="mt-4 flex items-center gap-2">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <IconLink
                    href={link.url}
                    label={localize(link.label, locale)}
                    external={link.platform !== 'email'}
                  >
                    <SocialIcon platform={link.platform} />
                  </IconLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>
    </Reveal>
  );
}
