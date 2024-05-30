import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';
import type { TransitionController } from '../../core-transition-component';

/**
 * Creates gsap.core.Timeline that will start as soon the component is mounted
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 *
 * const controller = useTransitionController(() => ({
 *   ref: myRef,
 *   refs: {
 *     myRef,
 *   },
 *   setupTransitionInTimeline(timeline, { myRef }) { ... },
 *   setupTransitionInTimeline(timeline, { myRef }) { ... },
 * }));
 *
 * // Connect the transitionController to the lifecycle
 * useMountTransition(transitionController);
 */
export function useMountTransition(
  transitionController: TransitionController,
  transitionOnMount?: boolean,
): void {
  useIsomorphicLayoutEffect(() => {
    (async () => {
      if (transitionOnMount) {
        await transitionController.transitionIn();
      }
    })();
  }, [transitionController]);
}
