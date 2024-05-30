import type { BaseButtonRef } from 'components/atoms/base-button/BaseButton.data';
import type { Link } from './types/link.types';
import type { FocusEventHandler } from 'react';

export const customButtonAction = [''] as const;
export type CustomButtonAction = (typeof customButtonAction)[number];

export type ButtonType = 'button' | 'submit';
export type LinkTarget = '_self' | '_blank';

export type CtaEvent = React.MouseEvent<BaseButtonRef, MouseEvent>;
export type CtaClickEvent = (event?: CtaEvent) => void;

export type AbstractCtaProps = {
  onClick?: CtaClickEvent;
  onMouseEnter?: CtaClickEvent;
  onMouseLeave?: CtaClickEvent;
  onMouseMove?: CtaClickEvent;
  onFocus?: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
  label?: string;
  rel?: string;
  link?: Link;

  href?: string | CustomButtonAction;
  type?: ButtonType;
  target?: LinkTarget;
  scroll?: boolean;
  download?: string | boolean;
};
