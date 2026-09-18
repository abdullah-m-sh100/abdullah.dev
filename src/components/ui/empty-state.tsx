import type { ReactNode } from 'react';

import { Icon } from '@/components/ui/icon';
import type { IconName } from '@/lib/icons';
import { cn } from '@/lib/utils/cn';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: IconName;
  action?: ReactNode;
  className?: string;
};

/**
 * Graceful fallback for any section whose content list is empty — required for
 * projects, certificates and every other data-driven section.
 */
export function EmptyState({
  title,
  description,
  icon = 'sparkles',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-border bg-surface-muted flex flex-col items-center rounded-lg border border-dashed px-6 py-16 text-center',
        className,
      )}
    >
      <span className="border-border bg-surface text-muted-foreground mb-4 inline-flex size-12 items-center justify-center rounded-full border">
        <Icon name={icon} />
      </span>
      <p className="text-base font-semibold">{title}</p>
      {description ? (
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
