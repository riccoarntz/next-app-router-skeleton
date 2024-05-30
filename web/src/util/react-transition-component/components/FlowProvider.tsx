'use client';

import { useRef, useState, createContext, useContext, useCallback } from 'react';
import type { ReactElement, ReactNode, RefObject } from 'react';
import type { TransitionController } from '../../core-transition-component';
import useGlobalStore from '../../../stores/globalStore';

export interface FlowProviderContextType {
  start: (
    transitionController: TransitionController,
    crossTransition: boolean,
    release: () => void,
    fromPath: string,
  ) => void;
  transitionOutPromise: Promise<void> | undefined;
  flowHijacked: RefObject<Promise<void>>;
  crossFlow: boolean;
  disablePointerEvents: (disable: boolean) => void;
  abort: () => void;
  /**
   * Hijacks the transition-in of all pages,
   * could be used for example when we are preloading the entire-app and want to wait with the transition-in of the current route
   */
  hijackFlow: () => void;
  /**
   * This will release the hijacked-flow, page-transition is allowed to start
   */
  releaseHijackFlow: () => void;
}

const FlowProviderContext = createContext<FlowProviderContextType | undefined>(undefined);

export function useFlowProviderContext(): FlowProviderContextType | undefined {
  return useContext(FlowProviderContext);
}

export interface FlowProviderProps {
  children: ReactNode;
}

export function FlowProvider(props: FlowProviderProps): ReactElement {
  const [transitionOutPromise, setTransitionOutPromise] = useState<Promise<void>>();
  const flowHijacked = useRef<Promise<void>>(Promise.resolve());
  const flowHijackResolver = useRef<(value: void | PromiseLike<void>) => void>();
  const [crossFlow, setCrossFlow] = useState<boolean>(false);
  const body = useRef(typeof window !== 'undefined' ? document.body : null);
  const setPageIsMounted = useGlobalStore((state) => state.setPageIsMounted);

  const releaseHijackFlow = useCallback((): void => {
    if (flowHijackResolver?.current) flowHijackResolver?.current();
  }, [flowHijackResolver]);

  const hijackFlow = useCallback((): void => {
    flowHijacked.current = new Promise<void>((resolver) => {
      flowHijackResolver.current = resolver;
    });
  }, []);

  const disablePointerEvents = useCallback(
    (disable?: boolean) => {
      if (body?.current) {
        body.current.style.pointerEvents = disable ? 'none' : 'all';
      }
    },
    [body],
  );

  const onFlowComplete = useCallback(
    (release: () => void) => {
      release();
      disablePointerEvents(false);
      setPageIsMounted(false);
    },
    [disablePointerEvents, setPageIsMounted],
  );

  const abort = useCallback(() => {
    // setTransitionOutPromise(Promise.resolve());
  }, []);

  const start = useCallback(
    async (
      transitionController: TransitionController,
      crossTransition: boolean,
      release: () => void,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fromPath: string,
    ) => {
      disablePointerEvents(true);

      const pageElement = (transitionController?.ref as RefObject<HTMLDivElement>)?.current;
      if (pageElement && crossTransition) {
        pageElement.classList.add('is-leaving');
      }

      const outPromise = transitionController.transitionOut();
      setCrossFlow(crossTransition);
      setTransitionOutPromise(outPromise);

      // Release flow directly new page/route can be rendered directly
      if (crossTransition) {
        onFlowComplete(release);
      }

      // Wait for transition-out of the leaving-page to be completed.
      await outPromise;

      // Release flow once page-transition-out is completed to the new page/route can be rendered.
      if (!crossTransition) {
        onFlowComplete(release);
      }
    },
    [onFlowComplete, disablePointerEvents],
  );

  return (
    <FlowProviderContext.Provider
      value={{
        transitionOutPromise,
        crossFlow,
        start,
        flowHijacked,
        disablePointerEvents,
        abort,
        hijackFlow,
        releaseHijackFlow,
      }}
    >
      {props.children}
    </FlowProviderContext.Provider>
  );
}
