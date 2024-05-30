import DeviceStateTracker, { DeviceStateEvent } from 'seng-device-state-tracker';
import type IDeviceStateData from 'seng-device-state-tracker/lib/IDeviceStateData';
import { useCallback, useState } from 'react';
import useUnmount from './useUnmount';
import sharedVariables from '../data/shared-variable/shared-variables.json';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export const cleanMediaQueries = Object.keys(sharedVariables.mediaQueries).reduce<{
  [key: string]: string;
}>((result, key: string) => {
  // eslint-disable-next-line no-param-reassign
  result[key] = (
    sharedVariables as {
      mediaQueries: { [key: string]: string };
      deviceState: { [key: string]: number };
    }
  ).mediaQueries[key].replace(/'/g, '');
  return result;
}, {});

let deviceStateTracker: DeviceStateTracker | null = null;

export type DeviceState = IDeviceStateData['state'];
export type DeviceStateName = IDeviceStateData['name'];

/**
 * This hook can be used to access the active device state
 *
 * Example:
 * ```ts
 * const { deviceState, deviceStateName } = useDeviceStateTracker();
 * ```
 * https://www.npmjs.com/package/seng-device-state-tracker
 */
export const useDeviceStateTracker = (
  afterHydration = false,
): {
  deviceState: DeviceState;
  deviceStateName: DeviceStateName;
} => {
  const isClient = typeof window !== 'undefined';
  if (deviceStateTracker === null && isClient) {
    deviceStateTracker = new DeviceStateTracker({
      deviceState: sharedVariables.deviceState,
      mediaQueries: cleanMediaQueries,
      showStateIndicator: process.env.NODE_ENV === 'development',
    });
  }

  const firstDeviceStateKey = Object.keys(sharedVariables.deviceState)[0];
  const [activeDeviceState, setActiveDeviceState] = useState<IDeviceStateData['state']>(
    !afterHydration && deviceStateTracker?.currentDeviceState?.state
      ? deviceStateTracker?.currentDeviceState?.state
      : (sharedVariables.deviceState as { [key: string]: number })[firstDeviceStateKey],
  );

  const [activeDeviceStateName, setActiveDeviceStateName] = useState<IDeviceStateData['name']>(
    !afterHydration && deviceStateTracker?.currentDeviceState?.name
      ? deviceStateTracker?.currentDeviceState?.name
      : firstDeviceStateKey,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDeviceStateChange = useCallback((event: any) => {
    const { data } = event as DeviceStateEvent;
    setActiveDeviceState(data.state);
    setActiveDeviceStateName(data.name);
  }, []);

  useIsomorphicLayoutEffect(() => {
    deviceStateTracker?.addEventListener(DeviceStateEvent.STATE_UPDATE, onDeviceStateChange);

    if (afterHydration) {
      setActiveDeviceState(
        deviceStateTracker?.currentDeviceState?.state ??
          (sharedVariables.deviceState as { [key: string]: number })[firstDeviceStateKey],
      );
      setActiveDeviceStateName(deviceStateTracker?.currentDeviceState?.name ?? firstDeviceStateKey);
    }
  }, []);

  useUnmount(() => {
    deviceStateTracker?.removeEventListener(DeviceStateEvent.STATE_UPDATE, onDeviceStateChange);
  });

  return {
    deviceState: activeDeviceState,
    deviceStateName: activeDeviceStateName,
  };
};
