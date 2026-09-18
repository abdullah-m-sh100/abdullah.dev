'use client';

import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef, useState } from 'react';

import { clampStaggerIndex, revealViewport } from '@/lib/motion/config';
import type { RevealVariant } from '@/lib/motion/variants';
import { cn } from '@/lib/utils/cn';

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Position in a staggered group; each step adds `--stagger-step`. */
  index?: number;
  /** Element to render. Use `li` inside lists, `section` for landmarks. */
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-reveal wrapper.
 *
 * The animation itself is CSS (see the `[data-reveal]` rules in globals.css).
 * This component's only job is to flip `data-visible` once, when the element
 * first enters the viewport — so there is no scroll handler, no per-frame work,
 * and each observer disconnects as soon as it has fired.
 *
 * It is the one client component in the motion system; everything it wraps
 * stays a Server Component.
 */
export function Reveal({
  children,
  variant = 'fade-up',
  index = 0,
  as: Component = 'div',
  className,
}: RevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Under reduced motion the CSS already pins every reveal to its final
    // state, so there is nothing to observe and no work worth scheduling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          /*
           * An element can reach the observer already *past* the viewport —
           * on a fast scroll, a jump to the end of the page, or a reload
           * restoring a deep scroll position. Those arrive as a non-
           * intersecting entry sitting above the root, and treating them as
           * "not yet" would leave the content invisible for good. Content
           * staying readable outranks playing the animation.
           */
          const hasScrolledPast =
            entry.rootBounds !== null &&
            entry.boundingClientRect.bottom <= entry.rootBounds.top;

          if (!entry.isIntersecting && !hasScrolledPast) continue;

          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: revealViewport.threshold, rootMargin: revealViewport.rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={elementRef}
      data-reveal={variant}
      data-visible={isVisible}
      style={{ '--reveal-index': clampStaggerIndex(index) } as CSSProperties}
      className={className ? cn(className) : undefined}
    >
      {children}
    </Component>
  );
}
