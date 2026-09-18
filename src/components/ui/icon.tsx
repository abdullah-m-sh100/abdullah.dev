import { createElement } from 'react';

import { type IconName, getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils/cn';

type IconProps = {
  name: IconName;
  className?: string;
  /** Icons are decorative by default; pass a label when the icon carries meaning. */
  label?: string;
};

/**
 * Renders a registry icon at the brand stroke width (1.75px).
 *
 * The component is resolved with `createElement` rather than a JSX variable:
 * the registry entry is a stable module-level reference, and this makes that
 * explicit instead of looking like a component defined during render.
 */
export function Icon({ name, className, label }: IconProps) {
  return createElement(getIcon(name), {
    className: cn('size-5 shrink-0', className),
    strokeWidth: 1.75,
    'aria-hidden': label ? undefined : true,
    'aria-label': label,
    role: label ? 'img' : undefined,
  });
}
