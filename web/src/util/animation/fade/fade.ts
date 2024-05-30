import gsap from 'gsap';
import type { FadeFromToOptions, FadeToOptions } from './fade.types';
import { defaultFadeFromToOptions, defaultFadeToOptions } from './fade.config';

export function fadeFromTo(
  element: Element | HTMLElement | Array<HTMLElement>,
  options: FadeFromToOptions = {},
): gsap.core.Tween | gsap.core.Timeline {
  const { autoAlpha, from, to, ease, duration, clearProps, stagger, disablePointerEvents } = {
    ...defaultFadeFromToOptions,
    ...options,
  };

  let fromPointerEvents = {};
  let toPointerEvents = {};
  if (disablePointerEvents) {
    fromPointerEvents = {
      pointerEvents: 'none',
    };
    toPointerEvents = {
      pointerEvents: 'all',
    };
  }

  return gsap.fromTo(
    element,
    {
      [autoAlpha ? 'autoAlpha' : 'opacity']: from,
      ...fromPointerEvents,
    },

    {
      duration,
      stagger,
      ease,
      ...toPointerEvents,
      [autoAlpha ? 'autoAlpha' : 'opacity']: to,
      clearProps: clearProps || '',
    },
  );
}

export function fadeTo(
  element: Element | HTMLElement | Array<HTMLElement>,
  options: FadeToOptions = {},
): gsap.core.Tween | gsap.core.Timeline {
  const { autoAlpha, to, ease, duration, clearProps, stagger, onStart, disablePointerEvents } = {
    ...defaultFadeToOptions,
    ...options,
  };

  let toPointerEvents = {};
  if (disablePointerEvents) {
    toPointerEvents = {
      pointerEvents: 'none',
    };
  }

  return gsap.to(element, {
    stagger,
    duration,
    ease,
    ...toPointerEvents,
    [autoAlpha ? 'autoAlpha' : 'opacity']: to,
    clearProps: clearProps || '',
    onStart,
  });
}
