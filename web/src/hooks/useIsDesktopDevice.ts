import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { isDesktop } from 'util/deviceUtil';

// note: always use 'afterHydration' if you are using it to 'change' your DOM,
// as it will otherwise result in a mismatch of your DOM on the client and server-side ( SSR hydration error)
export function useIsDesktopDevice(afterHydration = true): boolean {
  const [isDesktopDevice, setIsDesktopDevice] = useState(!afterHydration ? isDesktop : false);

  useIsomorphicLayoutEffect(() => {
    if (afterHydration) {
      setIsDesktopDevice(isDesktop);
    }
  }, [afterHydration, setIsDesktopDevice]);

  return isDesktopDevice;
}
