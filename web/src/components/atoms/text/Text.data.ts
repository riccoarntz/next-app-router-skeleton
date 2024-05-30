import type { HTMLAttributes, ReactNode } from 'react';
import type { TextTransitionType } from 'util/animation/text/text.types';
import type { TransitionComponentProps } from 'util/react-transition-component/types/transitionComponent.types';

export const textAs = [
  'p',
  'li',
  'legend',
  'span',
  'figcaption',
  'time',
  'blockquote',
  'label',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'span',
  'time',
  'p',
  'div',
] as const;
export const textSizes = ['title-80', 'body-10', 'none'] as const;
export const fontFamily = ['serif', 'sans'] as const;

export type FontFamily = (typeof fontFamily)[number];
export type TextAs = (typeof textAs)[number];
export type TextSize = (typeof textSizes)[number];

export type TextProps = {
  as?: TextAs;
  className?: string;
  children?: ReactNode;
  uppercase?: boolean;
  size?: TextSize;
  variant?: FontFamily;
  transitionInType?: TextTransitionType;
  transitionOutType?: TextTransitionType;
} & TransitionComponentProps &
  HTMLAttributes<never>;

export type TextRef = HTMLElement;
