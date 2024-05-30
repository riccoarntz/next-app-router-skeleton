import { useCallback, useRef } from 'react';
import useUnmount from './useUnmount';
import useMount from './useMount';

export function useTimeout(
  callback: () => void,
  interval: number,
  startImmediate = true,
): { start: () => void; stop: () => void } {
  const timer = useRef<NodeJS.Timeout>();

  function stop(): void {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  const start = useCallback(() => {
    stop();

    timer.current = setTimeout(() => {
      callback();
    }, interval);
  }, [interval, callback]);

  useMount(() => {
    if (startImmediate) {
      start();
    }
  });

  useUnmount(() => {
    stop();
  });

  return {
    start,
    stop,
  };
}
