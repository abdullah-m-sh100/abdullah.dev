'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

/**
 * Header chrome that reacts to scroll position.
 *
 * A Midnight band, and solid at every scroll position rather than transparent
 * at the top. That is not a style preference: the band inverts its own text to
 * Bone, so a transparent header would put Bone type straight onto the Bone
 * page on every route whose hero it is not sitting over. Painting the ground
 * unconditionally keeps the chrome legible everywhere, and on each page the
 * hero below it is a Midnight band too, so the two read as one dark field at
 * the top of the page.
 *
 * What scroll still changes is elevation: the header gains a hairline and a
 * shadow once the page moves, so it separates from the content scrolling under
 * it. That state comes from an IntersectionObserver watching a zero-height
 * sentinel at the top of the document — there is no scroll listener, so
 * nothing runs per frame.
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
          'tone-midnight bg-background text-foreground',
          'sticky top-0 z-40 border-b border-transparent',
          'transition-[border-color,box-shadow] duration-(--duration-slow) ease-out',
          'data-[elevated=true]:border-border',
          'data-[elevated=true]:shadow-header',
        ].join(' ')}
      >
        {children}
      </header>
    </>
  );
}
