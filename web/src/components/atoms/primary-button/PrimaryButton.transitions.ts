import type { RefObject } from 'react';
import type { BaseButtonRef } from 'components/atoms/base-button/BaseButton.data';
import { fadeFromTo, fadeTo } from 'util/animation/fade/fade';
import { findTransitionController } from '../../../util/core-transition-component';
import type { TextRef } from '../text/Text.data';
import gsap from 'gsap';

interface PrimaryButtonRefs {
  elementRef: RefObject<BaseButtonRef>;
  labelRef: RefObject<TextRef>;
}

export function setupTransitionInTimeline(
  timeline: gsap.core.Timeline,
  { elementRef, labelRef }: PrimaryButtonRefs,
): void {
  if (elementRef?.current) {
    timeline.fromTo(
      elementRef.current,
      { scaleX: 0.4 },
      { duration: 0.5, scaleX: 1, ease: 'Expo.easeOut', clearProps: 'scale' },
      0,
    );
    timeline.add(fadeFromTo(elementRef.current as HTMLElement), 0);
  }

  const labelController = findTransitionController(labelRef);
  if (labelController) {
    timeline.add(labelController.getTimeline('in') as gsap.core.Timeline, 0);
  }
}

export function setupTransitionOutTimeline(
  timeline: gsap.core.Timeline,
  { elementRef }: PrimaryButtonRefs,
): void {
  timeline.add(fadeTo(elementRef.current as HTMLElement) as gsap.core.Timeline);
}

export function mouseLeaveAnimation({
  backgroundHoverRef,
  labelRef,
  hoverLabelRef,
}: {
  backgroundHoverRef: RefObject<HTMLDivElement>;
  labelRef: RefObject<HTMLSpanElement>;
  hoverLabelRef: RefObject<HTMLDivElement>;
}): void {
  gsap.killTweensOf(backgroundHoverRef.current);
  gsap.killTweensOf(labelRef.current);

  gsap.to(backgroundHoverRef.current, 0.8, {
    ease: 'Power3.easeOut',
    y: '60%',
    scale: 0.35,
  });
  gsap.to(labelRef.current, 0.5, {
    ease: 'Power3.easeOut',
    scale: 1,
    yPercent: 0,
    opacity: 1,
  });
  gsap.to(hoverLabelRef.current, 0.5, {
    ease: 'Power3.easeOut',
    yPercent: 100,
    opacity: 0,
    scale: 0.35,
  });
}

export function mouseEnterAnimation({
  backgroundHoverRef,
  labelRef,
  hoverLabelRef,
}: {
  backgroundHoverRef: RefObject<HTMLDivElement>;
  labelRef: RefObject<HTMLSpanElement>;
  hoverLabelRef: RefObject<HTMLDivElement>;
}): void {
  gsap.killTweensOf(backgroundHoverRef.current);
  gsap.killTweensOf(labelRef.current);

  gsap.to(backgroundHoverRef.current, 0.8, {
    ease: 'Power2.easeOut',
    startAt: { y: '60%', x: '-50%', scale: 0.35, visibility: 'visible' },
    y: '-50%',
    x: '-50%',
    scale: 1,
  });
  gsap.to(labelRef.current, 0.5, {
    ease: 'Power2.easeOut',
    scale: 1.1,
    opacity: 0,
    yPercent: -120,
  });

  gsap.to(hoverLabelRef.current, 0.4, {
    ease: 'Power2.easeOut',
    startAt: { yPercent: 100, opacity: 0, scale: 0.35 },
    scale: 1,
    opacity: 1,
    yPercent: 0,
    delay: 0.1,
  });
}
