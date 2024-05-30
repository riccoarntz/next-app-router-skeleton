import type { FadeFromToOptions, FadeToOptions } from './fade.types';

const defaultOptions = {
  ease: 'none',
  duration: 0.5,
  autoAlpha: true,
  stagger: 0,
  disablePointerEvents: false,
};

export const defaultFadeToOptions: FadeToOptions = {
  ...defaultOptions,
  to: 0,
};

export const defaultFadeFromToOptions: FadeFromToOptions = {
  ...defaultOptions,
  from: 0,
  to: 1,
  clearProps: 'opacity,visibility,pointerEvents',
};
