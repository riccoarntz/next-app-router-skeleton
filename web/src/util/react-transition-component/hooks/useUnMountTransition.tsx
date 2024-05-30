import { useTransitionPresenceTransitionControllers } from '../components/TransitionPresence';
import { noop } from '../lib/noop';
import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';
import type { TransitionController } from 'util/core-transition-component/types/transition.types';

/**
 * Creates gsap.core.Timeline that will start before component is unmounted
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 *
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
 * useUnMountTransition(transitionController, true);
 */
export function useUnMountTransition(
  transitionController: TransitionController | undefined,
  useUnMountTransition?: boolean,
): void {
  const leaveTransitions = useTransitionPresenceTransitionControllers();

  if (leaveTransitions == null && useUnMountTransition) {
    // console.warn(
    throw new Error(
      'Cannot find leaveTransitions context! Did you forget to wrap the component in a <TransitionPresence />?',
    );
  }

  useIsomorphicLayoutEffect(() => {
    if (transitionController == null) {
      return noop;
    }

    leaveTransitions?.add(transitionController);

    return () => {
      leaveTransitions?.delete(transitionController);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
