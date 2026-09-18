'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during SSR and the first render, `true` afterwards.
 *
 * Used by controls whose visual state only exists in the browser (the resolved
 * theme, for example). `useSyncExternalStore` gives the same guarantee as the
 * `useState` + `useEffect` mounted flag without setting state inside an effect.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
