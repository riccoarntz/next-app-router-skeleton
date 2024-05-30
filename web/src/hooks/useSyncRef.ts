import type { ForwardedRef, RefObject } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useSyncRef<T>(ref: RefObject<T>, forwardRef: ForwardedRef<T>): void {
  useIsomorphicLayoutEffect(() => {
    if (forwardRef == null) {
      return;
    }

    if (typeof forwardRef === 'function') {
      forwardRef(ref.current);
      return;
    }

    if ('current' in forwardRef) {
      // eslint-disable-next-line no-param-reassign
      forwardRef.current = ref.current;
    }
  }, [forwardRef]);
}
