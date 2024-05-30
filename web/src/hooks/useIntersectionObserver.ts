import type { RefObject } from 'react';
import { useEffect, useState } from 'react';
import useMount from './useMount';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const getIntersectionObserverInstance = (
  threshold: number | Array<number>,
  rootMargin?: string,
  root?: HTMLElement | null,
) => {
  const callbackMap = new Map<
    Element,
    { onEnterViewport: () => void; onLeaveViewport: () => void }
  >();

  return {
    callbackMap,
    observer: new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const entryCallbacks = callbackMap.get(entry.target);
          if (entry.isIntersecting) entryCallbacks?.onEnterViewport();
          if (!entry.isIntersecting) entryCallbacks?.onLeaveViewport();
        });
      },
      // note: rootMargin + root seems not to work as I imagined yet. (need to test)
      { threshold, rootMargin, root },
    ),
  };
};

// We have a global object that holds all our intersection observers, this way we can avoid creating
// an excessive amount of observers that all use the same threshold.
const intersectionObserverInstances: {
  [thresholdKey: string]: ReturnType<typeof getIntersectionObserverInstance>;
} = {};

/**
 * Hook that can be used to detect if an element enters or leaves the viewport
 *
 * @param elementRef
 * @param options
 */
export function useIntersectionObserver(
  elementRef: RefObject<HTMLDivElement>,
  options: {
    onEnterViewport?: () => void;
    onLeaveViewport?: () => void;
    threshold?: number | Array<number>;
    rootMargin?: string;
  } = {},
  enable: boolean = true,
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const threshold = options.threshold ?? 0.5;
  // We generate a key out of the threshold so we can keep the amount of IntersectionObservers to a minimal.
  const thresholdKey = Array.isArray(threshold)
    ? `${threshold.join('|')}_${options.rootMargin}`
    : `${threshold.toString()}_${options.rootMargin}`;

  // const { scroller } = useScroller();
  const root: HTMLElement | null = null;
  // if (scrollProvider) {
  //   root = scrollProvider.scrollWrapperRef.current;
  // }

  useEffect(() => {
    if (enable) {
      if (isIntersecting) options.onEnterViewport?.();
      if (!isIntersecting) options.onLeaveViewport?.();
    }
  }, [isIntersecting, options, enable]);

  useMount(() => {
    if (elementRef.current && enable) {
      // Check if we already have an intersection observer for the provided threshold.
      let intersectionObserverInstance = intersectionObserverInstances[thresholdKey];

      // Create a new intersection observer instance for the `new` threshold
      if (!intersectionObserverInstance) {
        intersectionObserverInstance = getIntersectionObserverInstance(
          threshold,
          options.rootMargin,
          root,
        );
        intersectionObserverInstances[thresholdKey] = intersectionObserverInstance;
      }

      intersectionObserverInstance.callbackMap.set(elementRef.current, {
        onEnterViewport: () => setIsIntersecting(true),
        onLeaveViewport: () => setIsIntersecting(false),
      });

      intersectionObserverInstance.observer.observe(elementRef.current);
    }
  });

  useIsomorphicLayoutEffect(
    () => () => {
      if (enable) {
        const intersectionObserverInstance = intersectionObserverInstances[thresholdKey];

        if (elementRef.current && intersectionObserverInstance) {
          intersectionObserverInstance.callbackMap.delete(elementRef.current);
          intersectionObserverInstance.observer.unobserve(elementRef.current);

          // If we have no more callbacks for the threshold we remove the entire observer
          if (intersectionObserverInstance.callbackMap.size === 0) {
            intersectionObserverInstance.observer.disconnect();
            delete intersectionObserverInstances[thresholdKey];
          }
        }
      }
    },
    [elementRef, enable, thresholdKey],
  );

  return isIntersecting;
}
