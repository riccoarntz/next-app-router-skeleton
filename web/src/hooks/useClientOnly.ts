import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useClientOnly(): boolean {
  const [isClientOnly, setIsClientOnly] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsClientOnly(true);
  }, []);

  return isClientOnly;
}
