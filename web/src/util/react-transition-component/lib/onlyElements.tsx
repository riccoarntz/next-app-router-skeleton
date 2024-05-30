import { Children, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

export function onlyElements(children: ReactNode): Array<ReactElement<unknown>> {
  const filtered: Array<ReactElement<unknown>> = [];

  // We use forEach here instead of map as map mutates the component key by preprending `.$`
  Children.forEach(children, (child) => {
    if (isValidElement(child)) filtered.push(child);
  });

  return filtered;
}
