import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { localize, localizeList } from '@/i18n/localize';
import { cn } from '@/lib/utils/cn';
import type { Locale, Service } from '@/types/content';

type ServiceCardProps = {
  service: Service;
  locale: Locale;
  /**
   * `feature` uses the wide layout and shows the full description plus the
   * highlight list. That is a content difference, not a skin, which is why it
   * earns a prop rather than a caller-supplied class.
   */
  size?: 'default' | 'feature';
  /** Zero-padded ordinal in the corner, for callers that number their cards. */
  index?: number;
  className?: string;
};

/**
 * Service card, shared by the Home preview and the /services page.
 *
 * The `feature` layout answers to the card's *own* width (a container query),
 * not the viewport's. The same card is full-width on Home and half-width in the
 * two-column grid on /services; a viewport breakpoint cannot tell those apart,
 * and at half width the side-by-side split squeezed the title onto three lines
 * and the highlights into a sliver. Below ~48rem of card width it stacks.
 *
 * It carries its slug as an `id`, so the jump list in the services hero can
 * link straight to it.
 *
 * Not a link: services do not have detail routes yet, so the card stays a plain
 * region and avoids an empty clickable target.
 */
export function ServiceCard({
  service,
  locale,
  size = 'default',
  index,
  className,
}: ServiceCardProps) {
  const isFeature = size === 'feature';
  const highlights = localizeList(service.highlights, locale);

  return (
    <Card
      as="article"
      id={service.slug}
      interactive
      className={cn('@container group h-full', isFeature && 'bg-surface-elevated', className)}
    >
      <div
        className={cn(
          'flex h-full flex-col p-6 sm:p-7',
          isFeature && 'gap-6 @3xl:grid @3xl:grid-cols-12 @3xl:items-center @3xl:gap-12 @3xl:p-10',
        )}
      >
        <div className={cn('flex flex-1 flex-col', isFeature && '@3xl:col-span-7')}>
          <div className="mb-5 flex items-center justify-between">
            <span
              className={cn(
                'text-secondary bg-secondary-subtle inline-flex items-center justify-center rounded-md',
                'transition-transform duration-(--duration-base) ease-out motion-safe:group-hover:-translate-y-0.5',
                // Size marks the feature card; colour does not — copper is kept
                // for the card's own link, which is the focal element here.
                isFeature ? 'size-12' : 'size-11',
              )}
            >
              <Icon name={service.icon} className={isFeature ? 'size-6' : undefined} />
            </span>
            {index !== undefined ? (
              <span aria-hidden="true" className="text-subtle-foreground text-label tabular-nums">
                {String(index).padStart(2, '0')}
              </span>
            ) : null}
          </div>

          <h3 className={isFeature ? 'text-h3 @3xl:text-h2' : 'text-h3'}>
            {localize(service.title, locale)}
          </h3>

          <p className={cn('text-muted-foreground mt-3', isFeature ? 'text-lead' : 'text-sm')}>
            {isFeature
              ? localize(service.description, locale)
              : localize(service.summary, locale)}
          </p>
        </div>

        {/*
          The highlights sit in their own recessed panel. Beside a short
          description they used to float at the top of an otherwise empty half
          of the card; as a panel they balance the two columns at any length.
        */}
        {isFeature && highlights.length > 0 ? (
          <ul className="bg-surface-muted border-hairline border-border flex flex-col gap-4 rounded-lg p-6 @3xl:col-span-5">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-sm font-medium">
                <span className="text-secondary bg-secondary-subtle mt-px inline-flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Icon name="check" className="size-3" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}
