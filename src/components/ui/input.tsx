import type { InputHTMLAttributes, Ref } from 'react';

import { cn } from '@/lib/utils/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  ref?: Ref<HTMLInputElement>;
};

/**
 * Single-line text input.
 *
 * Uncontrolled by design: the contact form reads values from `FormData` on
 * submit rather than mirroring every keystroke into React state, so this
 * component needs no `value`/`onChange` wiring — just a `name`.
 */
export function Input({ hasError, className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn(
        'border-border bg-surface text-foreground placeholder:text-subtle-foreground h-11 w-full rounded-lg border px-4 text-sm',
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
