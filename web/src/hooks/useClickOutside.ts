import type { RefObject } from 'react';
import { useEffect } from 'react';

export default function useClickOutside<T>(
  ref: RefObject<HTMLElement | null>,
  handler: (event: T | MouseEvent) => void,
  enabled: boolean = true,
  ignoredClassName: string = '',
) {
  useEffect(() => {
    if (enabled) {
      const listener = (event: MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
          return;
        }

        if (
          ignoredClassName &&
          ((event?.target as HTMLElement)?.classList?.contains(ignoredClassName) ||
            ((event?.target as HTMLElement)?.parentNode as HTMLElement)?.classList?.contains(
              ignoredClassName,
            ))
        ) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      // @ts-ignore
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        // @ts-ignore
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [ref, handler, enabled, ignoredClassName]);
}
