import { debounce } from 'lodash';
import { useState } from 'react';
import useEventListener from './useEventListener';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { useIsMounted } from './useIsMounted';

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(wait = 100): WindowSize {
  const isMounted = useIsMounted();
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleSize = () => {
    if (isMounted()) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEventListener('resize', debounce(handleSize, wait));
  useEventListener('orientationchange', debounce(handleSize, wait));

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}

export default useWindowSize;
