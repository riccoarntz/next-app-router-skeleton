import type { RefObject } from 'react';
import { fadeFromTo, fadeTo } from 'util/animation/fade/fade';
import type { TextRef } from '../../atoms/text/Text.data';
import { findTransitionController } from '../../../util/core-transition-component';
import type { PrimaryButtonRef } from '../../atoms/primary-button/PrimaryButton.data';

interface PrimaryHeroRefs {
  elementRef?: RefObject<HTMLElement>;
  titleRef?: RefObject<TextRef>;
  descriptionRef?: RefObject<TextRef>;
  iconRef?: RefObject<HTMLDivElement>;
  ctaRef?: RefObject<PrimaryButtonRef>;
}

export function setupTransitionInTimeline(
  timeline: gsap.core.Timeline,
  { titleRef, descriptionRef, iconRef, ctaRef }: PrimaryHeroRefs,
): void {
  if (titleRef?.current) {
    const titleController = findTransitionController(titleRef);
    if (titleController) {
      timeline.add(titleController.getTimeline('in') as gsap.core.Timeline);
    }
  }
  if (descriptionRef?.current) {
    const descriptionController = findTransitionController(descriptionRef);
    if (descriptionController) {
      timeline.add(descriptionController.getTimeline('in') as gsap.core.Timeline);
    }
  }

  if (ctaRef?.current) {
    const ctaController = findTransitionController(ctaRef);
    if (ctaController) {
      timeline.add(ctaController.getTimeline('in') as gsap.core.Timeline, '>-1');
    }
  }

  if (iconRef?.current) {
    timeline.add(fadeFromTo(iconRef.current), '>-1');
  }
}

export function setupTransitionOutTimeline(
  timeline: gsap.core.Timeline,
  { elementRef }: PrimaryHeroRefs,
): void {
  if (elementRef?.current) {
    timeline.add(fadeTo(elementRef.current as HTMLElement) as gsap.core.Timeline);
  }
}
