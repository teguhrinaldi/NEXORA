"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorage is unavailable during SSR, so the initial render must use
    // `initialValue` to match the server-rendered output. Reading it here, after
    // mount, is the standard way to sync from this external, browser-only source
    // without causing a hydration mismatch.
    try {
      const stored = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above useEffect
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      // ignore corrupted or inaccessible storage
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // ignore write failures (private mode, quota, etc.)
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}
