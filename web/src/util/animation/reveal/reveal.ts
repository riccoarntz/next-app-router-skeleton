import gsap from 'gsap';
import type { RectangleHideOptions, RectangleRevealOptions } from './reveal.types';
import { rectangleHideOptions, rectangleRevealOptions } from './reveal.config';

export function revealRectangle(
  element: HTMLElement | Array<HTMLElement>,
  options?: Partial<RectangleRevealOptions>,
): gsap.core.Timeline {
  const timeline = gsap.timeline();
  const { duration, ease, from, stagger, type, clearProps } = {
    ...rectangleRevealOptions,
    ...options,
  };
  let clipFrom = `polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)`;
  let clipTo = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;

  if (from === 'center-full') {
    clipFrom = `polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)`;
  }

  if (from === 'bottom-center') {
    clipFrom = `polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)`;
  }

  if (from === 'bottom') {
    clipFrom = `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`;
  }

  if (from === 'left') {
    clipFrom = `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`;
  }

  if (from === 'right') {
    clipFrom = `polygon(100% 0, 100% 0, 100% 100%, 100% 100%)`;
  }

  if (from === 'top') {
    clipFrom = `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`;
  }

  timeline.fromTo(
    element,
    {
      webkitClipPath: clipFrom,
      clipPath: clipFrom,
      visibility: 'hidden',
    },
    {
      clearProps,
      duration,
      ease,
      stagger,
      webkitClipPath: clipTo,
      clipPath: clipTo,
      visibility: 'visible',
    },
    0,
  );

  if (type === 'inOut') {
    clipTo = `polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)`; // Left

    timeline.add(
      gsap.to(element, {
        stagger,
        duration,
        ease,
        webkitClipPath: clipTo,
        clipPath: clipTo,
      }),
    );
  }

  return timeline;
}

export function hideRectangle(
  element: HTMLElement | Array<HTMLElement>,
  options?: Partial<RectangleHideOptions>,
): gsap.core.Timeline {
  const timeline = gsap.timeline();
  const { duration, ease, stagger } = {
    ...rectangleHideOptions,
    ...options,
  };
  const clipFrom = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;

  // to bottom
  let clipTo = `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`;

  if (options?.to === 'left') {
    clipTo = `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`;
  }

  if (options?.to === 'top') {
    // clipTo = `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`;
    clipTo = `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`;
  }

  if (options?.to === 'right') {
    clipTo = `polygon(100% 0, 100% 0, 100% 100%, 100% 100%)`;
  }

  if (options?.to === 'center-full') {
    clipTo = `polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)`;
  }

  if (options?.to === 'center') {
    clipTo = `polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)`;
  }

  timeline.fromTo(
    element,
    {
      webkitClipPath: clipFrom,
      clipPath: clipFrom,
    },
    {
      webkitClipPath: clipTo,
      clipPath: clipTo,
      duration,
      ease,
      stagger,
    },
    0,
  );

  return timeline;
}
