import { getLocale, getTranslations } from 'next-intl/server';

import { SocialIcon } from '@/components/brand/social-icon';
import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconLink } from '@/components/ui/icon-button';
import { portfolioData } from '@/data/portfolio-data';
import { localize } from '@/i18n/localize';
import { getSocialLinks } from '@/lib/content/profile';
import type { IconName } from '@/lib/icons';

type ChannelProps = {
  href: string;
  icon: IconName;
  label: string;
  value: string;
  /** Set for links that leave the site. */
  external?: boolean;
  opensNewTab?: string;
};

/**
 * One direct way to reach Abdullah, as a whole-row link.
 *
 * Email and WhatsApp are the two fastest channels, so they are large tappable
 * rows rather than small text: the whole row is the target, which on a phone is
 * the difference between a 44px target and a ~16px line of type. The value is
 * `dir="ltr"` because an address or a phone number reads left-to-right in
 * Arabic too. The arrow is decorative; the link's accessible name is the label
 * plus the value.
 */
function Channel({ href, icon, label, value, external, opensNewTab }: ChannelProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group border-hairline border-border bg-surface hover:border-border-strong flex min-h-16 items-center gap-3 rounded-lg p-3.5 transition-colors sm:gap-4 sm:p-4 duration-(--duration-base) focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring"
    >
      <span className="text-secondary bg-secondary-subtle inline-flex size-10 shrink-0 items-center justify-center rounded-md sm:size-11">
        <Icon name={icon} className="size-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="text-subtle-foreground text-label block ltr:uppercase">{label}</span>
        <span
          dir="ltr"
          className="text-foreground group-hover:text-primary mt-0.5 block text-sm font-semibold break-words transition-colors duration-(--duration-base) rtl:text-end"
        >
          {value}
        </span>
      </span>

      <Icon
        name={external ? 'external-link' : 'arrow-right'}
        className={`text-muted-foreground group-hover:text-primary hidden size-4 shrink-0 transition-colors duration-(--duration-base) sm:block${external ? '' : ' rtl:-scale-x-100'}`}
      />
      {external && opensNewTab ? <span className="sr-only">{opensNewTab}</span> : null}
    </a>
  );
}

/**
 * Contact information beside the form — every value comes from
 * `portfolioData.contact` / `.socialLinks`, the same source the footer and
 * `ContactCta` already read from, so this never drifts into its own copy of
 * the email address or social URLs.
 *
 * Sticky on desktop, so it stays in view beside a long form on a short window.
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
    <Reveal variant="slide-start" index={1} className="lg:sticky lg:top-28">
      <Card tone="muted" className="p-6 sm:p-8">
        <h2 className="text-h3">{t('title')}</h2>

        <div className="mt-6 flex flex-col gap-3">
          <Channel
            href={`mailto:${contact.email}`}
            icon="mail"
            label={t('emailLabel')}
            value={contact.email}
          />

          {whatsapp && contact.phone ? (
            <Channel
              href={whatsapp.url}
              icon="smartphone"
              label={t('whatsappLabel')}
              value={contact.phone}
              external
              opensNewTab={tLabels('opensNewTab')}
            />
          ) : null}
        </div>

        <dl className="border-border mt-6 flex flex-col gap-5 border-t pt-6">
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
          <div className="border-border mt-6 border-t pt-6">
            <ul aria-label={t('socialLabel')} className="flex flex-wrap items-center gap-2">
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
