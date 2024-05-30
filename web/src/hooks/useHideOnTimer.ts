import { useTimeout } from './useTimeout';
import { useCallback, useState } from 'react';

export function useHideOnTimer(interval: number = 2000): {
  hideOnTime: boolean;
  onMouseEnter: () => void;
  onMouseMove: () => void;
} {
  const [hidden, setHidden] = useState(false);

  const { start: startControlsTimer } = useTimeout(
    () => {
      setHidden(true);
    },
    interval,
    false,
  );

  const onMouseEnter = useCallback(() => {
    if (interval >= 0) {
      setHidden(false);
      startControlsTimer();
    }
  }, [interval, startControlsTimer]);

  const onMouseMove = useCallback(() => {
    if (interval >= 0) {
      setHidden(false);
      startControlsTimer();
    }
  }, [interval, startControlsTimer]);

  return {
    hideOnTime: hidden,
    onMouseEnter,
    onMouseMove,
  };
}
