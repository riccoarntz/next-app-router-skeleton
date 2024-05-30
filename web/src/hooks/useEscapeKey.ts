import { useCallback, useEffect } from 'react';
import useEventListener from './useEventListener';

export default function useEscapeKey(fn: () => void) {
  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        fn();
      }
    },
    [fn],
  );

  // const element = useRef(document.body);
  useEventListener('keydown', handleKey);

  useEffect(() => {
    document.addEventListener('keydown', handleKey, false);
    return () => document.removeEventListener('keydown', handleKey, false);
  }, [handleKey]);
}
