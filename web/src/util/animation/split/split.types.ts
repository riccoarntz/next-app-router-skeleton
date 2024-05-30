import type { AbstractAnimationTypes } from '../AbstractAnimation.types';

export type SplitType = 'chars' | 'words' | 'lines';

export type AbstractSplitTypes = {
  splitType?: SplitType;
  minStaggerDuration?: number;
  maxStaggerDuration?: number;
} & AbstractAnimationTypes;

export type SplitLineSlideUpOptions = {
  y?: number | string;
  addInnerChild?: boolean;
  reversed?: boolean;
} & AbstractSplitTypes;

export type SplitWordFadeSlideInOptions = {
  y?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  addInnerChild?: boolean;
  from?: 0;
} & AbstractSplitTypes;

export type SplitWordFadeSlideOutOptions = {
  y?: number | string;
  addInnerChild?: boolean;
  to?: 0;
} & AbstractSplitTypes;

export type SplitCharFadeInOptions = {
  from?: 0;
} & AbstractSplitTypes;
