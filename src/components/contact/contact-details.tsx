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
  const tLabels = await getTranslations('common.labels');
  const { contact } = portfolioData;
  const socialLinks = getSocialLinks();
  /*
   * WhatsApp earns its own row as well as its place in the icon list: it is a
   * direct line rather than a profile to browse. The `wa.me` URL is read back
   * out of the social data instead of being written a second time here, so the
   * number lives in exactly one place.
   */
  const whatsapp = socialLinks.find((link) => link.platform === 'whatsapp');

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

          {whatsapp && contact.phone ? (
            <div>
              <dt className="text-subtle-foreground flex items-center gap-2 text-label ltr:uppercase">
                <Icon name="smartphone" className="size-4" />
                {t('whatsappLabel')}
              </dt>
              <dd className="mt-1.5">
                <TextLink
                  href={whatsapp.url}
                  external
                  externalLabel={tLabels('opensNewTab')}
                  tone="foreground"
                  className="text-sm"
                >
                  {/* A phone number reads left-to-right in Arabic too. */}
                  <span dir="ltr">{contact.phone}</span>
                </TextLink>
              </dd>
            </div>
          ) : null}

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
            <ul aria-label={t('socialLabel')} className="mt-4 flex items-center gap-2 flex-wrap">
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
