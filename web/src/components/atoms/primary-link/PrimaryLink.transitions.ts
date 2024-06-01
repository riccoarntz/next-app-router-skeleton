import type { RefObject } from 'react';
import type { BaseButtonRef } from 'components/atoms/base-button/BaseButton.data';
import { fadeTo } from 'util/animation/fade/fade';

interface PrimaryLinkRefs {
  elementRef: RefObject<BaseButtonRef>;
}

export function setupTransitionInTimeline(
  timeline: gsap.core.Timeline,
  { elementRef }: PrimaryLinkRefs,
): void {
  timeline.fromTo(elementRef.current, {}, {});
}

export function setupTransitionOutTimeline(
  timeline: gsap.core.Timeline,
  { elementRef }: PrimaryLinkRefs,
): void {
  timeline.add(fadeTo(elementRef.current as HTMLElement) as gsap.core.Timeline);
}
