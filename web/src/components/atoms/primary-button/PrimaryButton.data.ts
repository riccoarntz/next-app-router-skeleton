import type { TransitionComponentProps } from 'util/react-transition-component/types/transitionComponent.types';
import type { AbstractCtaProps } from 'data/button';
import type { BaseButtonRef } from '../base-button/BaseButton.data';

export type PrimaryButtonRef = BaseButtonRef;

export const buttonSizes = [
  // 'medium',
] as const;

export type ButtonSize = (typeof buttonSizes)[number];

export type PrimaryButtonProps = {
  // icon?: string;
  size?: ButtonSize;
} & AbstractCtaProps &
  TransitionComponentProps;
