'use client';

import type { ReactElement, ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';
import { onlyElements } from '../lib/onlyElements';
import { onlyNewElements } from '../lib/onlyNewElements';
import { useFlowProviderContext } from './FlowProvider';
import type { FlowProviderContextType } from './FlowProvider';

export interface FlowRoutePresenceProps {
  children: ReactNode;
}

/**
 * Will transition out old children before replacing with new children unless crossFlow is passed from the page-instance
 */
export function FlowRoutePresence({ children }: FlowRoutePresenceProps): ReactElement {
  const { transitionOutPromise, crossFlow, abort } =
    useFlowProviderContext() as FlowProviderContextType;
  const didMountRef = useRef(false);
  const elements = useMemo(() => onlyElements(children), [children]);
  const [displayChildren, setDisplayChildren] = useState<{ items: Array<ReactElement<unknown>> }>({
    items: elements,
  });
  const newItems = useMemo(
    () => onlyNewElements(elements, displayChildren.items),
    [elements, displayChildren.items],
  );

  useIsomorphicLayoutEffect(() => {
    if (didMountRef.current) {
      if (newItems.length === 0 || displayChildren.items === elements) {
        return undefined;
      }
      (async () => {
        if (crossFlow) {
          // Add the new item(s) to current-layout
          setDisplayChildren((previous) => ({
            items: [...previous.items, ...onlyNewElements(elements, previous.items)],
          }));
        }

        await transitionOutPromise;

        if (displayChildren.items !== elements) {
          setDisplayChildren({
            items: elements,
          });
        }
      })();
    } else {
      didMountRef.current = true;
    }

    return () => {
      abort();
    };
  }, [children]);

  return <>{displayChildren?.items.map((child) => child)}</>;
}
