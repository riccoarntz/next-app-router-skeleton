import type { ReactElement } from 'react';
import { differenceBy, uniqBy } from 'lodash';

export function hasDifference(
  children: Array<ReactElement<unknown>>,
  oldArray: Array<ReactElement<unknown>>,
): boolean {
  const difference = differenceBy(children, oldArray, 'key');
  return difference.length > 0 || oldArray.length !== children.length;
}

export function onlyNewElements(
  children: Array<ReactElement<unknown>>,
  oldArray: Array<ReactElement<unknown>>,
): Array<ReactElement<unknown>> {
  let filtered: Array<ReactElement<unknown>> = [];
  filtered = differenceBy(children, oldArray, 'key');

  if (oldArray.length === 0) {
    filtered = children;
  }

  filtered = uniqBy(filtered, 'key');

  return filtered;
}
