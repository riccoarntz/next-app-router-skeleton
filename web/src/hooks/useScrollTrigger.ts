'use client';

import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { createScrollTrigger } from 'util/scroll/scrollTrigger.utils';
import { useScroller } from 'components/unlisted/ScrollProvider';
import { findTransitionController } from 'util/core-transition-component/context/TransitionControllers';
import type { TransitionController, TransitionDirection } from 'util/core-transition-component/types/transition.types';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import gsap from 'gsap';

/**
 *
 * @EXAMPLE 1
 * const elementRef = useRef<HTMLDivElement>(null);
 *
 * // Connect the transitionController to the lifecycle
 * const transitionController = useTransitionController(
 *   () => ({
 *     ref: elementRef,
 *     refs: {
 *       elementRef,
 *     },
 *     setupTransitionInTimeline,
 *   }),
 * );
 *
 * const { inView } = useScrollTrigger({
 *   trigger: elementRef,
 *   transition: {
 *     controller: transitionController,
 *   },
 *   vars:{
 *     onEnter(){
 *       console.log('enter');
 *     },
 *   },
 * });
 *
 * @EXAMPLE 2
 * const elementRef = useRef<HTMLDivElement>(null);
 * const timeline = useRef(gsap.timeline({paused: true}));
 *
 * const { inView } = useScrollTrigger({
 *   trigger: elementRef,
 *   animation: timeline.current,
 *   vars:{
 *     onEnter(){
 *       console.log('enter');
 *     },
 *   },
 * });
 *
 * useEffect(() => {
    console.log(inView);
  }, [inView]);
 *
 */

export type TriggerState = 'onEnter' | 'onLeave' | 'onLeaveBack' | 'onEnterBack';

export type OptionsType = {
  trigger: RefObject<HTMLElement>;
  pinSpacer?: RefObject<HTMLElement>;
  animation?: gsap.core.Timeline;
  transition?: {
    ref?: RefObject<HTMLElement>;
    controller?: TransitionController;
    direction?: TransitionDirection;
  };
  pin?: RefObject<HTMLElement>;
  endTrigger?: RefObject<HTMLElement>;
  variables?: ScrollTrigger.Vars;
  disabled?: boolean;
  reverseOnLeaveBack?: boolean;
  canTransitionIn?: boolean;
  transitionInDelay?: number;
  enableInView?: boolean;
};

export default function useScrollTrigger(options: OptionsType): {
  inView: boolean | undefined;
} {
  const [inView, setInView] = useState<boolean>();
  const optionsRef = useRef(options);
  const {
    animation,
    trigger,
    pin,
    endTrigger,
    pinSpacer,
    variables,
    transition,
    disabled,
    reverseOnLeaveBack,
    transitionInDelay,
    enableInView,
  } = optionsRef.current;
  const { scroller } = useScroller();
  // const [triggerState, setTriggerState] = useState<TriggerState>();
  const timeline = useRef<gsap.core.Timeline>();
  const triggerState = useRef<TriggerState>();
  const canTransition = useRef(options.canTransitionIn);

  useIsomorphicLayoutEffect(()=> {
    gsap.registerPlugin(ScrollTrigger);
  }, [])

  // todo add/wrap a usePageLoad/canAnimateIn hook

  const setTriggerState = useCallback(
    (state: TriggerState) => {
      triggerState.current = state;

      // Reset the timeline, so it can be re-triggered again when it hits the viewport from a normal enter flow.
      const reTriggerTimeline = !variables?.scrub && !variables?.once && !reverseOnLeaveBack;

      if (triggerState.current === 'onEnter') {
        if (reTriggerTimeline) {
          timeline?.current?.paused(
            !(typeof canTransition.current === 'boolean' ? canTransition.current : true),
          );
        }
      }

      if (triggerState.current === 'onLeaveBack') {
        if (reTriggerTimeline) timeline?.current?.pause(-(options.transitionInDelay || 0), false);
        if (reverseOnLeaveBack) timeline?.current?.reverse();
      }
    },
    [
      canTransition,
      options.transitionInDelay,
      reverseOnLeaveBack,
      variables?.once,
      variables?.scrub,
    ],
  );

  useEffect(
    () => {
      canTransition.current = options.canTransitionIn;

      if (!variables?.scrub && triggerState.current === 'onEnter') {
        timeline?.current?.paused(
          !(typeof options.canTransitionIn === 'boolean' ? options.canTransitionIn : true),
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.canTransitionIn],
  );

  useEffect(
    () => {
      if (!disabled) {
        if (transition?.ref) {
          const transitionController = findTransitionController(transition.ref);
          if (transitionController) {
            timeline.current = transitionController?.getTimeline(transition?.direction || 'in');
          }
        }

        if (!timeline.current) {
          timeline.current =
            transition?.controller?.getTimeline(transition?.direction || 'in') ?? animation;
        }

        if (timeline.current && typeof transitionInDelay === 'number') {
          timeline.current?.delay(transitionInDelay);
        }

        let pinType: 'fixed' | 'transform' | undefined;
        if (pin?.current && !!pinType) {
          pinType = scroller?.hasTransform() ? 'transform' : 'fixed';
        } else {
          pinType = variables?.pinType;
        }

        const scrollTriggerVars: ScrollTrigger.Vars = {
          scroller: scroller?.getScroller(),
          pin: pin?.current,
          pinSpacer: pinSpacer?.current,
          endTrigger: endTrigger?.current,
          ...variables,
          // scrub,
          pinType,
          // preventOverlaps: true,
        };

        scrollTriggerVars.onEnter = (data) => {
          if (enableInView) {
            setInView(true);
          }
          setTriggerState('onEnter');
          if (variables?.onEnter) variables?.onEnter(data);
        };

        scrollTriggerVars.onLeave = (data) => {
          if (enableInView) {
            setInView(false);
          }
          if (variables?.onLeave) variables?.onLeave(data);
        };

        scrollTriggerVars.onEnterBack = (data) => {
          if (enableInView) {
            setInView(true);
          }
          if (variables?.onEnterBack) variables?.onEnterBack(data);
        };

        scrollTriggerVars.onLeaveBack = (data) => {
          if (enableInView) {
            setInView(false);
          }
          setTriggerState('onLeaveBack');
          if (variables?.onLeaveBack) variables?.onLeaveBack(data);
        };

        const scrollTrigger = createScrollTrigger(
          trigger.current as HTMLElement,
          timeline.current as gsap.core.Timeline,
          scrollTriggerVars,
        );

        return () => {
          scrollTrigger?.kill();
        };
      }

      return undefined;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    inView,
  };
}
