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
  className?: string;
};

/**
 * Service card, shared by the Home preview and the future /services page.
 *
 * Not a link: services do not have detail routes yet, so the card stays a plain
 * region and avoids an empty clickable target.
 */
export function ServiceCard({
  service,
  locale,
  size = 'default',
  className,
}: ServiceCardProps) {
  const isFeature = size === 'feature';
  const highlights = localizeList(service.highlights, locale);

  return (
    <Card
      as="article"
      interactive
      className={cn('h-full', isFeature && 'bg-surface-elevated', className)}
    >
      <div
        className={cn(
          'flex h-full flex-col p-6',
          isFeature && 'gap-8 p-8 lg:flex-row lg:items-start lg:gap-12',
        )}
      >
        <div className={cn(isFeature && 'lg:max-w-md')}>
          <span
            className={cn(
              'mb-4 inline-flex items-center justify-center rounded-md',
              isFeature
                ? 'text-secondary bg-secondary-subtle size-12'
                : 'text-primary bg-primary-subtle size-11',
            )}
          >
            <Icon name={service.icon} className={isFeature ? 'size-6' : undefined} />
          </span>

          <h3 className={isFeature ? 'text-h2' : 'text-h3'}>
            {localize(service.title, locale)}
          </h3>

          <p className={cn('text-muted-foreground mt-3', isFeature ? 'text-lead' : 'text-sm')}>
            {isFeature
              ? localize(service.description, locale)
              : localize(service.summary, locale)}
          </p>
        </div>

        {isFeature && highlights.length > 0 ? (
          <ul className="flex flex-1 flex-col gap-3 lg:pt-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-sm font-medium">
                <Icon name="check" className="text-secondary mt-0.5 size-4" />
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  );
}
