'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { useIsMounted } from '@/hooks/use-is-mounted';
import type { ImageAsset } from '@/types/content';

type CertificateImageTriggerProps = {
  image: ImageAsset;
  /** Localized alt text for the full image shown inside the dialog. */
  alt: string;
  /** Localized certificate title, shown in the dialog header. */
  title: string;
  /** Localized issuer name, shown in the dialog header. */
  issuer: string;
  /** e.g. "View full certificate image". */
  viewLabel: string;
  /** e.g. "Close". */
  closeLabel: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Certificate preview tile that opens the full certificate image in a modal
 * on click, so a credential missing a `credentialUrl`/`pdf` — most real
 * certificates only exist as an image — still has a real "view it larger"
 * action instead of only the small, cropped card thumbnail.
 *
 * The dialog mirrors `MobileNav`'s behaviour at a smaller scale: portalled to
 * `<body>` so it escapes the card's own stacking context, `Escape` to close,
 * a focus trap, background scroll lock, and focus moved into the dialog on
 * open and restored to the trigger on close. See `MobileNav` for why each of
 * those is implemented the way it is.
 *
 * The thumbnail keeps the button's accessible name (`viewLabel` + `title`)
 * rather than the image's own descriptive alt text, so the two aren't
 * announced back to back; the full image inside the dialog keeps the real
 * `alt`, since that is the content actually being presented there.
 */
export function CertificateImageTrigger({
  image,
  alt,
  title,
  issuer,
  viewLabel,
  closeLabel,
}: CertificateImageTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useIsMounted();
  const dialogId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Escape closes; Tab is trapped inside the panel.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // Scroll lock while the dialog is open — see `MobileNav` for why this
  // targets the root element rather than `<body>`, and re-applies the
  // scrollbar's width as padding to stop the page shifting sideways.
  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingInlineEnd;

    root.style.overflow = 'hidden';
    if (scrollbarWidth > 0) root.style.paddingInlineEnd = `${scrollbarWidth}px`;

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingInlineEnd = previousPadding;
    };
  }, [isOpen]);

  // Focus moves into the dialog on open and returns to the trigger on close,
  // but never steals focus on the initial render. `preventScroll` stops the
  // browser's default focus-follows-scroll from fighting the lock above.
  useEffect(() => {
    if (isOpen) {
      hasOpened.current = true;
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
    } else if (hasOpened.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 data-[state=closed]:pointer-events-none sm:p-8"
      data-state={isOpen ? 'open' : 'closed'}
      inert={!isOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
        data-state={isOpen ? 'open' : 'closed'}
        className="bg-overlay absolute inset-0 w-full cursor-default opacity-0 backdrop-blur-[2px] transition-opacity duration-(--duration-slow) ease-out data-[state=open]:opacity-100"
      />

      <div
        ref={panelRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-state={isOpen ? 'open' : 'closed'}
        className="border-border bg-surface relative flex max-h-full w-full max-w-3xl scale-95 flex-col overflow-hidden rounded-lg border opacity-0 shadow-raised transition-[opacity,transform] duration-(--duration-slow) ease-out data-[state=open]:scale-100 data-[state=open]:opacity-100"
      >
        <div className="border-border flex items-center justify-between gap-4 border-b px-5 py-4">
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-semibold">{title}</p>
            <p className="text-muted-foreground truncate text-xs">{issuer}</p>
          </div>
          <IconButton label={closeLabel} onClick={close} className="shrink-0">
            <Icon name="x" />
          </IconButton>
        </div>

        <div className="bg-surface-muted flex flex-1 items-center justify-center overflow-auto p-4">
          <Image
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 640px) 720px, 100vw"
            className="h-auto max-h-[75vh] w-auto max-w-full rounded-md object-contain"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        aria-label={`${viewLabel}: ${title}`}
        onClick={() => setIsOpen(true)}
        className="group border-border bg-surface-muted relative flex h-28 w-full items-center justify-center overflow-hidden rounded-t-lg border-b"
      >
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-(--duration-slow) ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="bg-overlay/0 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-(--duration-base) ease-out group-hover:bg-overlay/30 group-hover:opacity-100 group-focus-visible:bg-overlay/30 group-focus-visible:opacity-100"
        >
          <span className="border-border bg-surface text-primary inline-flex size-10 items-center justify-center rounded-full border shadow-elevated">
            <Icon name="eye" className="size-5" />
          </span>
        </span>
      </button>

      {isMounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
