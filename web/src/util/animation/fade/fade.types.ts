import type { AbstractAnimationTypes } from 'util/animation/AbstractAnimation.types';

export type FadeToOptions = AbstractAnimationTypes & {
  autoAlpha?: boolean;
  to?: number;
  ease?: string | gsap.EaseFunction;
  onStart?: () => void;
  onComplete?: () => void;
  disablePointerEvents?: boolean;
};

export type FadeFromToOptions = { from?: number } & FadeToOptions;
