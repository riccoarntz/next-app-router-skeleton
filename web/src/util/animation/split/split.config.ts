import type {
  SplitCharFadeInOptions,
  SplitLineSlideUpOptions,
  SplitWordFadeSlideInOptions,
  SplitWordFadeSlideOutOptions,
} from './split.types';
import eases from '../eases';
// import eases from 'util/animation/eases';

const defaultOptions = {
  minStaggerDuration: 0.05,
  maxStaggerDuration: 0.5,
  stagger: 0.05,
};

export const defaultSplitLineSlideUpOptions: SplitLineSlideUpOptions = {
  ...defaultOptions,
  splitType: 'lines',
  y: '100%',
  duration: 0.8,
  stagger: 0.1,
  minStaggerDuration: 0.1,
  maxStaggerDuration: 0.5,
  ease: eases.curve2,
  addInnerChild: true,
};

export const defaultSplitWordFadeSlideInOptions: SplitWordFadeSlideInOptions = {
  ...defaultOptions,
  splitType: 'words',
  // y: 40,
  from: 0,
  // rotateX: -25,
  // rotateY: 0,
  duration: 1.2,
  stagger: 0.05,
  minStaggerDuration: 0.04,
  maxStaggerDuration: 0.5,
  ease: 'expo.out',
  addInnerChild: false,
};

export const defaultSplitWordRotateInOptions: SplitWordFadeSlideInOptions = {
  ...defaultOptions,
  splitType: 'words',
  y: 40,
  from: 0,
  rotateX: -15,
  rotateY: 5,
  duration: 1.9,
  stagger: 0.05,
  minStaggerDuration: 0.04,
  maxStaggerDuration: 0.6,
  ease: 'expo.out',
  addInnerChild: false,
};

export const defaultSplitWordFadeSlideOutOptions: SplitWordFadeSlideOutOptions = {
  ...defaultOptions,
  splitType: 'words',
  // y: '-50%',
  to: 0,
  duration: 0.3,
  stagger: 0.1,
  minStaggerDuration: 0.02,
  maxStaggerDuration: 0.2,
  ease: 'power3.out',
  addInnerChild: false,
};

export const defaultSplitCharFadeInOptions: SplitCharFadeInOptions = {
  ...defaultOptions,
  splitType: 'chars',
  from: 0,
  duration: 0.3,
  stagger: 0.1,
  minStaggerDuration: 0.05,
  maxStaggerDuration: 0.3,
  ease: 'none',
};
