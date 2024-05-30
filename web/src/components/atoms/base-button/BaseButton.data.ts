import type { AbstractCtaProps } from 'data/button';
import type { ReactNode } from 'react';

export type BaseButtonRef = HTMLAnchorElement | HTMLButtonElement;
export type BaseButtonProps = {
  children?: ReactNode;
  className?: string;
} & AbstractCtaProps;
