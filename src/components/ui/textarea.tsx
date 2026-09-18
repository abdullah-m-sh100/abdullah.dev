import type { Ref, TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  ref?: Ref<HTMLTextAreaElement>;
};

/** Multi-line text input — shares styling with `Input`. Uncontrolled, same reason. */
export function Textarea({ hasError, className, rows = 6, ref, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={hasError || undefined}
      className={cn(
        'border-border bg-surface text-foreground placeholder:text-subtle-foreground w-full resize-y rounded-lg border px-4 py-3 text-sm leading-relaxed',
        'transition-[border-color,box-shadow] duration-(--duration-base) ease-out',
        'focus-visible:outline-(length:--focus-ring-width) focus-visible:outline-offset-(--focus-ring-offset) focus-visible:outline-ring',
        'disabled:pointer-events-none disabled:opacity-55',
        hasError && 'border-danger',
        className,
      )}
      {...props}
    />
  );
}
