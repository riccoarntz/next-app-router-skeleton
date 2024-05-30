import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isMounted = useRef(false);

  useEffect(() => () => {
      isMounted.current = false;
    }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useUpdateEffect;
