'use client';

import type { GuardFunction, SetupTransitionOptions } from '../../core-transition-component';
import { useTransitionController } from './useTransitionController';
import { useRouteEnterTransition } from './useRouteEnterTransition';


/**
 * Creates gsap.core.Timeline that will start as soon the component is mounted
 *
 * @example
 * const elementRef = useRef<HTMLDivElement>(null);
 *
 * usePageTransition({
 *  beforeTransitionOut: (release) => {
 *    release();
 *  },
 *  beforeTransitionIn: (release) => {
 *    release();
 *  },
 *  crossFlow: true,
 *  setupOptions: () => ({
 *    ref: elementRef,
 *    refs: {
 *      elementRef,
 *    },
 *    setupTransitionInTimeline,
 *    setupTransitionOutTimeline,
 *  }),
 * });
 */
export function usePageTransition<T>(options: {
  setupOptions: () => SetupTransitionOptions<T>;
  beforeTransitionIn?: GuardFunction;
  // beforeTransitionOut?: GuardFunction;
  // crossFlow: () => boolean;
  onDispose?: () => void;
}): void {
  const transitionController = useTransitionController(options.setupOptions);

  useRouteEnterTransition(
    transitionController,
    {
      beforeTransitionIn: options.beforeTransitionIn,
    },
    options.onDispose,
  );
}
