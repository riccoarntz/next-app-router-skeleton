import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useCreateScrollTrigger<T>(
  {
    variables,
    animation,
    triggerRef,
    scrollerRef,
    pinRef,
    endRef,
  }: {
    variables?: ScrollTrigger.Vars;
    animation?: gsap.core.Timeline;
    triggerRef?: RefObject<HTMLElement>;
    scrollerRef?: RefObject<HTMLElement>;
    pinRef?: RefObject<HTMLElement>;
    endRef?: RefObject<HTMLElement>;
  },
  deps: Array<T> = [],
  disable = false,
) {
  const ref = useRef<ScrollTrigger>();
  useEffect(() => {
    if (disable) return undefined;
    const trigger = ScrollTrigger.create({
      ...variables,
      pin: pinRef?.current ?? null,
      endTrigger: endRef?.current ?? null,
      trigger: triggerRef?.current,
      scroller: scrollerRef?.current ?? null,
      animation: animation ?? undefined,
    });

    ref.current = trigger;

    return () => {
      trigger?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? []);

  return ref;
}

export function useCreateScrollTimeline<T>(
  {
    variables,
    triggerRef,
    scrollerRef,
    pinRef,
    endRef,
    setupTimeline,
  }: {
    variables?: ScrollTrigger.Vars;
    triggerRef?: RefObject<HTMLElement>;
    scrollerRef?: RefObject<HTMLElement>;
    pinRef?: RefObject<HTMLElement>;
    endRef?: RefObject<HTMLElement>;
    setupTimeline: (timeline: gsap.core.Timeline) => void;
  },
  deps: Array<T> = [],
  disable = false,
): RefObject<ScrollTrigger | undefined> {
  const ref = useRef<ScrollTrigger>();

  useIsomorphicLayoutEffect(() => {
    if (disable) return undefined;
    const timeline = gsap.timeline();
    if (setupTimeline) {
      setupTimeline(timeline);
    }

    const trigger = ScrollTrigger.create({
      ...variables,
      pin: pinRef?.current ?? null,
      endTrigger: endRef?.current ?? null,
      trigger: triggerRef?.current,
      scroller: scrollerRef?.current ?? null,
      animation: timeline,
    });

    ref.current = trigger;

    return () => {
      trigger?.kill();
      timeline?.clear();
      timeline?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? []);

  return ref;
}
