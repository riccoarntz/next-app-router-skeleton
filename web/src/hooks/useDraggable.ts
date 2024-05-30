import gsap from 'gsap';
import InertiaPlugin from 'gsap/dist/InertiaPlugin';
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/**
 * Registering the Draggable plugin when there is no Window will throw errors,
 * therefore we create this little proxy method to import draggable dynamically,
 */
export const getDraggable = async (): Promise<typeof Draggable | null> => {
  if (typeof window === 'undefined') return null;

  const { Draggable } = await import('gsap/dist/Draggable');
  gsap.registerPlugin(Draggable, InertiaPlugin);

  return Draggable;
};

/**
 * Hook to easily use draggable in your components
 * @param target
 * @param vars
 */
export const useDraggable = (
  target: RefObject<HTMLDivElement>,
  vars?: Draggable.Vars,
  options?: {
    bounds?: RefObject<HTMLDivElement>;
    trigger?: RefObject<HTMLDivElement>;
  },
): {
  draggableInstance: RefObject<Draggable | null>;
  draggableIsReady: boolean;
} => {
  const [draggableIsReady, setDraggableIsReady] = useState(false);
  const draggableInstance = useRef<Draggable | null>(null);
  const varsRef = useRef(vars);

  useEffect(() => {
    (async () => {
      const Draggable = await getDraggable();

      if (Draggable && target.current) {
        [draggableInstance.current] = Draggable.create(target.current, {
          bounds: options?.bounds?.current ?? null,
          trigger: options?.trigger?.current ?? null,
          ...varsRef.current,
        });
        setDraggableIsReady(true);
      }
    })();

    const draggable = draggableInstance.current;

    return () => {
      draggable?.kill();
    };
  }, [target, varsRef, options?.trigger, options?.bounds]);

  return { draggableInstance, draggableIsReady };
};
