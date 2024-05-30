import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
): void;

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(eventName: K, handler: (event: HTMLElementEventMap[K]) => void, element: RefObject<T>): void;

// eslint-disable-next-line @typescript-eslint/naming-convention
function useEventListener<
  // eslint-disable-next-line @typescript-eslint/naming-convention
  KW extends keyof WindowEventMap,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
  element?: RefObject<T>,
): void {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && 'addEventListener' in targetElement && targetElement.addEventListener)) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    // eslint-disable-next-line consistent-return
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
