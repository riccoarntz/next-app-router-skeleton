// todo define type of text-transitions.
export const textTransitionType = [
  'fadeOut',
  'fadeIn',
  'splitLinesSlideUp',
  'splitLinesSlideUpOut',
  'splitLinesSlideDownIn',
  'splitWordFadeSlideUp',
  'splitWordFadeSlideUpOut',
  'splitCharFadeIn',
  'splitWordRotateUp',
  'none',
] as const;

export type TextTransitionType = (typeof textTransitionType)[number];
