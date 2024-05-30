import type { RefObject } from 'react';
import { textTransition } from 'util/animation/text/text';
import type { TextTransitionType } from 'util/animation/text/text.types';

interface TextRefs {
  elementRef: RefObject<HTMLElement>;
  transitionInType?: TextTransitionType;
  transitionOutType?: TextTransitionType;
}

export function setupTransitionInTimeline(
  timeline: gsap.core.Timeline,
  { elementRef, transitionInType }: TextRefs,
): void {
  if (elementRef?.current) {
    timeline.add(textTransition(elementRef.current as HTMLElement, transitionInType));
  }
}

export function setupTransitionOutTimeline(
  timeline: gsap.core.Timeline,
  { elementRef, transitionOutType }: TextRefs,
): void {
  if (elementRef?.current) {
    timeline.add(textTransition(elementRef.current as HTMLElement, transitionOutType));
  }
}
