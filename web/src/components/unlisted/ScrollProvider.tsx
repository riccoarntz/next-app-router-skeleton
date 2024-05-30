import { useRef, useState, createContext, useContext, useEffect, useCallback } from 'react';
import type { ReactElement, ReactNode, SetStateAction, RefObject, Dispatch } from 'react';
import type { ScrollerType } from 'util/scroll/ScrollInstance';
import ScrollInstance from 'util/scroll/ScrollInstance';
import type { ScrollStatus } from 'util/scroll/scroller/BaseScroller';
import type { WheelDirection } from 'util/scroll/WheelGesture';
import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import useGlobalStore from '../../stores/globalStore';

export interface ScrollProviderContextType {
  instance?: ScrollInstance;
  locked: boolean;
  setLocked: Dispatch<SetStateAction<boolean>>;
  addCallback: (
    callback: (status: ScrollStatus, direction: WheelDirection) => void,
    priority: number,
  ) => void;
  removeCallback: (callback: (status: ScrollStatus, direction: WheelDirection) => void) => void;
}

const ScrollProviderContext = createContext<ScrollProviderContextType | undefined>(undefined);

export function useScrollProviderContext(): ScrollProviderContextType | undefined {
  return useContext(ScrollProviderContext);
}

export interface ScrollProviderProps {
  children: ReactNode;
  root?: boolean;
  className?: string;
  contentClassName?: string;
  type?: ScrollerType;
}

const useStore = create(() => ({}));

function useCurrentScroller() {
  const local = useScrollProviderContext() as ScrollProviderContextType;
  const root = useStore();

  return local ?? root;
}

export function useScroller(
  callback?: (status: ScrollStatus, direction: WheelDirection) => void,
  deps: ReadonlyArray<unknown> = [],
  priority = 0,
): {
  scroller?: ScrollInstance;
  setLocked: Dispatch<SetStateAction<boolean>>;
  locked: boolean;
} {
  const {
    instance: scroller,
    addCallback,
    removeCallback,
    setLocked,
    locked,
  } = useCurrentScroller();

  useEffect(() => {
    if (!callback || !addCallback || !removeCallback || !scroller) return undefined;

    addCallback(callback, priority);

    return () => {
      removeCallback(callback);
    };
  }, [scroller, callback, addCallback, removeCallback, priority, deps]);

  return { scroller, setLocked, locked };
}

export default function ScrollProvider({
  root,
  children,
  className,
  contentClassName,
  type,
}: ScrollProviderProps): ReactElement {
  const wrapperRef = useRef<HTMLDivElement | null>();
  const contentRef = useRef<HTMLDivElement | null>();
  const [instance, setInstance] = useState<ScrollInstance>();
  const [locked, setLocked] = useState<boolean>(false);

  const addCallback = useCallback(
    (callback: (status: ScrollStatus, direction: WheelDirection) => void, priority: number) => {
      instance?.addScrollListener({ callback, priority });
    },
    [instance],
  );

  const removeCallback = useCallback(
    (callback: (status: ScrollStatus, direction: WheelDirection) => void) => {
      instance?.removeScrollListener(callback);
    },
    [instance],
  );

  useEffect(() => {
    const scrollInstance = new ScrollInstance();
    scrollInstance.init({
      type,
      wrapper: wrapperRef.current as HTMLDivElement,
      content: contentRef.current as HTMLDivElement,
    });

    setInstance(scrollInstance);

    return () => {
      scrollInstance?.dispose();
      setInstance(undefined);
    };
  }, [type]);

  useEffect(() => {
    if (locked) {
      instance?.lock();
    } else {
      instance?.unLock();
    }
  }, [locked, instance]);

  useEffect(() => {
    if (root && instance) {
      useStore.setState({ instance, setLocked, locked, addCallback, removeCallback });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, root, setLocked, addCallback, removeCallback]);

  // todo move in an hook to app.ts and wait for page-state ready orso before we scroll
  // Hash change listener
  const pageTransitionInCompleted = useGlobalStore((state) => state.pageTransitionInCompleted);
  const [hash, setHash] = useState<string>();
  const router = useRouter();
  useIsomorphicLayoutEffect(() => {
    if (root && instance && hash && pageTransitionInCompleted) {
      if (hash.includes('=')) return;
      try {
        // eslint-disable-next-line no-restricted-properties
        const target = document.querySelector(`[data-anchor="${hash.replace('#', '')}"]`);
        if (target) {
          // const currentY = instance.getScrollStatus().offset.y || window.scrollY;
          const distance = target?.getBoundingClientRect().top as number;
          instance.scrollTo(0, distance, Math.abs(distance) * 0.9);
        }
      } catch {
        // ignore the exception, the hash is probably a query string argument not a anchor link
      }
    }
  }, [instance, hash, root, pageTransitionInCompleted]);

  useIsomorphicLayoutEffect(() => {
    const { hash } = window.location;
    if (hash) {
      // If the has contains a '&', then it is not a valid element id so we just take the first parameter
      setHash(hash?.split('&')?.[0]);
    }
  }, [router]);

  return (
    <ScrollProviderContext.Provider
      value={{
        setLocked,
        locked,
        instance,
        addCallback,
        removeCallback,
      }}
    >
      {root ? (
        children
      ) : (
        <div ref={wrapperRef as RefObject<HTMLDivElement>} className={className}>
          <div ref={contentRef as RefObject<HTMLDivElement>} className={contentClassName}>
            {children}
          </div>
        </div>
      )}
    </ScrollProviderContext.Provider>
  );
}
