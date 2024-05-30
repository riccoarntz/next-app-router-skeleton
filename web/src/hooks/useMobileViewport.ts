import { useState } from 'react';
import { useDeviceStateTracker } from './useDeviceStateTracker';
import sharedVariables from '../data/shared-variable/shared-variables.json';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

// note: always use 'afterHydration' if you are using it to 'change' your DOM,
// as it will otherwise result in a mismatch of your DOM on the client and server-side ( SSR hydration error)
export function useMobileViewport(
  upperLimit = sharedVariables.deviceState.MIN_768,
  afterHydration = false,
): boolean {
  const { deviceState } = useDeviceStateTracker(afterHydration);
  const [isMobileView, setIsMobileView] = useState(deviceState < upperLimit);

  useIsomorphicLayoutEffect(() => {
    setIsMobileView(deviceState < upperLimit);
  }, [deviceState, upperLimit]);

  return isMobileView;
}
