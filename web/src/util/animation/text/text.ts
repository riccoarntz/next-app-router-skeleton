import gsap from 'gsap';
import {
  splitLinesSlideOut,
  splitLinesSlideUp,
  splitWordFadeSlideIn,
} from 'util/animation/split/split';
import { fadeFromTo, fadeTo } from '../fade/fade';
import type { TextTransitionType } from './text.types';

export function textTransition(
  element: HTMLElement,
  type: TextTransitionType | undefined,
): gsap.core.Timeline {
  const timeline = gsap.timeline();

  switch (type) {
    case 'fadeOut':
      timeline.add(fadeTo(element, { duration: 0.3 }));
      break;
    case 'fadeIn':
      timeline.add(fadeFromTo(element));
      break;
    case 'splitLinesSlideDownIn':
      timeline.add(
        splitLinesSlideUp(element, {
          y: '-100%',
          reversed: true,
        }),
      );
      break;
    case 'splitLinesSlideUp':
      timeline.add(splitLinesSlideUp(element));
      break;
    case 'splitLinesSlideUpOut':
      timeline.add(
        splitLinesSlideOut(element, {
          y: '-100%',
        }),
      );
      break;
    case 'splitWordFadeSlideUp':
      timeline.add(splitWordFadeSlideIn(element));
      break;
    case 'none':
    default:
      break;
  }

  return timeline;
}
