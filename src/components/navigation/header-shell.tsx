'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Header chrome that reacts to scroll position.
 *
 * The header starts integrated with the page and lifts into a translucent,
 * blurred surface once the page scrolls. That state comes from an
 * IntersectionObserver watching a zero-height sentinel at the top of the
 * document — there is no scroll listener, so nothing runs per frame.
 *
 * Only the chrome is a Client Component; everything inside `children` is
 * rendered on the server and passed straight through.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isElevated, setIsElevated] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsElevated(entry ? !entry.isIntersecting : false),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Out of flow, so it changes nothing about the layout. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute inset-x-0 top-0 h-px" />

      <header
        data-elevated={isElevated}
        className={[
          'sticky top-0 z-40 border-b border-transparent',
          'transition-[background-color,border-color,box-shadow,backdrop-filter]',
          'duration-(--duration-slow) ease-out',
          'data-[elevated=true]:bg-(--header-surface)',
          'data-[elevated=true]:border-border',
          'data-[elevated=true]:shadow-header',
          'data-[elevated=true]:backdrop-blur-xl',
        ].join(' ')}
      >
        {children}
      </header>
    </>
  );
}
