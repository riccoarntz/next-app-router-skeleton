import type { AbstractAnimationTypes } from '../AbstractAnimation.types';

export type RectangleRevealOptions = {
  type: 'in' | 'inOut';
  from: 'center' | 'bottom-center' | 'left' | 'right' | 'top' | 'bottom' | 'center-full';
  clearProps: string;
} & AbstractAnimationTypes;

export type RectangleHideOptions = {
  type: 'out';
  to: 'bottom' | 'left' | 'right' | 'center-full' | 'center' | 'top';
  clearProps: string;
} & AbstractAnimationTypes;
