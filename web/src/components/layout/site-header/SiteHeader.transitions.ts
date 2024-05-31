import type { RefObject } from 'react';
import { fadeTo } from 'util/animation/fade/fade';

interface SiteHeaderRefs {
  elementRef?: RefObject<HTMLElement>;
}

export function setupTransitionInTimeline(
  timeline: gsap.core.Timeline,
  { elementRef }: SiteHeaderRefs,
): void {
  if (elementRef?.current) {
    // timeline.fromTo(
    //   elementRef.current,
    //   { yPercent: -100 },
    //   { yPercent: 0, ease: 'power2.out', duration: 1 },
    // );
  }
}

export function setupTransitionOutTimeline(
  timeline: gsap.core.Timeline,
  { elementRef }: SiteHeaderRefs,
): void {
  if (elementRef?.current) {
    timeline.add(fadeTo(elementRef.current as HTMLElement) as gsap.core.Timeline);
  }
}
