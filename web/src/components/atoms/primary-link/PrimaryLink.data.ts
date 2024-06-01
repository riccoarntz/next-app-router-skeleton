import type { TransitionComponentProps } from 'util/react-transition-component/types/transitionComponent.types';
import type { AbstractCtaProps } from 'data/button';
import type { BaseButtonRef } from '../base-button/BaseButton.data';
import type { TextSize, FontFamily } from '../text/Text.data';

export type PrimaryLinkRef = BaseButtonRef;

// export const buttonSizes = [
//   // 'medium',
// ] as const;
//
// export type ButtonSize = typeof buttonSizes[number];

export type PrimaryLinkProps = {
  // icon?: string;
  underline?: boolean;
  revertUnderline?: boolean;
  textSize?: TextSize;
  textVariant?: FontFamily;
} & AbstractCtaProps &
  TransitionComponentProps;
