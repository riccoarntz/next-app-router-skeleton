'use client';
import { useMemo, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createTransitionControllerContext } from '../context/TransitionControllersContext';
import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';
import type { TransitionController } from '../../core-transition-component';
import { onlyElements } from '../lib/onlyElements';
import { hasDifference, onlyNewElements } from '../lib/onlyNewElements';
import { transitionOutTransitionControllers } from '../lib/transitionOutTransitionControllers';

const { TransitionControllersContext, useTransitionControllers } =
  createTransitionControllerContext();

export const useTransitionPresenceTransitionControllers = useTransitionControllers;

export interface TransitionPresenceProps {
  children: ReactNode;
  crossFlow?: boolean;
}

/**
 * Will transition out old children before replacing with new children
 */
export function TransitionPresence({ children, crossFlow }: TransitionPresenceProps): ReactElement {
  const didMountRef = useRef(false);
  const elements = onlyElements(children);
  const transitionControllers = useMemo(() => new Set<TransitionController>(), []);

  const [displayChildren, setDisplayChildren] = useState<{ items: Array<ReactElement<unknown>> }>({
    items: elements,
  });

  const newItems = onlyNewElements(elements, displayChildren.items);
  const [transitionPromise, setTransitionPromise] = useState<Promise<void>>();
  const [domUpdatedPromise, setDomUpdatedPromise] = useState<Promise<void>>();
  const domUpdatedResolver = useRef<() => void>();
  const oldItems = useRef<Array<ReactElement<unknown>>>();

  useIsomorphicLayoutEffect(() => {
    let aborted = false;

    if (didMountRef.current) {
      if ((newItems.length === 0 && crossFlow) || !hasDifference(elements, displayChildren.items)) {
        // In case we removed the item from the DOM, but while it was still transitioning-out we added it back to the DOM,
        // so there was no 'difference' in children (we want to re-trigger the useMountTransition)
        if (
          !hasDifference(elements, displayChildren.items) &&
          domUpdatedPromise &&
          oldItems.current
        ) {
          (async () => {
            // wait till new-dom is rendered promise.
            await domUpdatedPromise;
            // Compare again and update directly
            if (!hasDifference(elements, oldItems.current as Array<ReactElement<unknown>>)) {
              setDisplayChildren({
                items: elements,
              });
            }
          })();
        }

        return;
      }

      (async () => {
        setDomUpdatedPromise(
          new Promise((resolver) => {
            domUpdatedResolver.current = resolver;
          }),
        );

        if (transitionPromise) {
          await transitionPromise;
          setTransitionPromise(undefined);
        }

        let transitionOutPromise = Promise.resolve();

        if (displayChildren.items.length > 0) {
          transitionOutPromise = transitionOutTransitionControllers(transitionControllers);
        }

        // Abort flow when match changes while awaiting promises
        if (aborted) {
          return;
        }

        if (crossFlow) {
          // Add the new item(s) to current-layout
          setDisplayChildren((previous) => ({
            items: [...previous.items, ...onlyNewElements(elements, previous.items)],
          }));
        }

        setTransitionPromise(transitionOutPromise);
        await transitionOutPromise;
        setTransitionPromise(undefined);

        if (hasDifference(elements, displayChildren.items)) {
          oldItems.current = displayChildren.items;

          setDisplayChildren({
            items: elements,
          });

          if (domUpdatedResolver.current) {
            domUpdatedResolver.current();
          }
        }
      })();
    } else {
      didMountRef.current = true;
    }

    // eslint-disable-next-line consistent-return
    return () => {
      aborted = true;
    };
  }, [children]);

  return (
    <TransitionControllersContext.Provider value={transitionControllers}>
      {displayChildren?.items.map((child) => child)}
    </TransitionControllersContext.Provider>
  );
}
