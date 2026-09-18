import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type ContainerSize = 'prose' | 'content' | 'wide';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /**
   * `prose` for long-form reading, `content` for standard sections,
   * `wide` for full-bleed visual compositions.
   */
  size?: ContainerSize;
  as?: ElementType;
};

const sizes: Record<ContainerSize, string> = {
  prose: 'max-w-prose-comfortable',
  content: 'max-w-content',
  wide: 'max-w-wide',
};

/**
 * Horizontal gutter and max width for every section.
 *
 * Padding is inline-logical, so the gutter is identical in LTR and RTL. No
 * section should re-declare `mx-auto max-w-… px-…` by hand.
 */
export function Container({
  children,
  className,
  size = 'content',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full px-6 sm:px-8', sizes[size], className)}>
      {children}
    </Component>
  );
}
