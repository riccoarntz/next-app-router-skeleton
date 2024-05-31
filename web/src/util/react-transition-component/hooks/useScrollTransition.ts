import type { RefObject } from 'react';
import useScrollTrigger from 'hooks/useScrollTrigger';
import { useTransitionController } from './useTransitionController';
import type { SetupTransitionOptions, TransitionController } from 'util/core-transition-component';

/**
 * Creates gsap.core.Timeline that will start as soon the component is mounted and component is in-view.
 *
 * @example
 * const elementRef = useRef<HTMLDivElement>(null);
 *
 * // Connect the transitionController to the lifecycle
 * const { inView, transitionController } = useScrollTransition({
 *   scroll: {
 *     trigger: elementRef,
 *     variables: {
 *       onEnter() {
 *         console.log('enter');
 *       }
 *     }
 *   },
 *   setupOptions: () => ({
 *     refs: {
 *       elementRef,
 *     },
 *     setupTransitionInTimeline,
 *   }),
 * });
 *
 * useEffect(() => {
    console.log(inView);
  }, [inView, elementRef]);
 */

export function useScrollTransition<T>(options: {
  scroll: {
    canTransitionIn?: boolean;
    transitionInDelay?: number;
    trigger: RefObject<HTMLElement>;
    disableTriggerInOnScroll?: boolean;
    variables?: ScrollTrigger.Vars;
    pin?: RefObject<HTMLElement>;
    endTrigger?: RefObject<HTMLElement>;
    reverseOnLeaveBack?: boolean;
    enableInView?: boolean;
  };
  setupOptions: () => SetupTransitionOptions<T>;
}): { inView: boolean | undefined; transitionController: TransitionController } {
  const transitionController = useTransitionController(options.setupOptions);
  const { inView } = useScrollTrigger({
    trigger: options.scroll.trigger,
    transition: {
      controller: transitionController,
    },
    enableInView: options.scroll.enableInView,
    variables: options.scroll.variables,
    canTransitionIn: options.scroll.canTransitionIn,
    transitionInDelay: options.scroll.transitionInDelay,
    pin: options.scroll.pin,
    endTrigger: options.scroll.endTrigger,
    disabled: options?.scroll?.disableTriggerInOnScroll,
    reverseOnLeaveBack: options.scroll.reverseOnLeaveBack,
  });

  return {
    inView,
    transitionController,
  };
}
