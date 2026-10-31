import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * `tailwind-merge` knows Tailwind's own utilities and nothing about the custom
 * ones declared with `@utility` in `globals.css`. It read `border-hairline` as
 * a border *colour* (anything `border-<word>` it does not recognise is one), so
 * whenever it sat next to a real colour — `border-hairline border-border` — the
 * later class won and `border-hairline` was silently dropped. The result was a
 * border width of 0 on every `Card`, input and panel that combined them, which
 * is why the 1.5px hairlines the identity specifies were not being drawn.
 *
 * Registering it in the border-width group puts it where it belongs, so it
 * merges with `border`, `border-0` and `border-2` and no longer collides with
 * colours.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'border-w': ['border-hairline'],
    },
  },
});

/** Merges conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
