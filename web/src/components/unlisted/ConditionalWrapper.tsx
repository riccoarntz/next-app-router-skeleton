import type { ReactNode } from 'react';

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: unknown;
  wrapper: (children: ReactNode) => JSX.Element;
  children: ReactNode;
}): JSX.Element => (condition ? wrapper(children) : (children as JSX.Element));
