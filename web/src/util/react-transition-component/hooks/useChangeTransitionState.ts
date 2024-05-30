import useMount from '../../../hooks/useMount';
import useUpdateEffect from '../../../hooks/useUpdateEffect';
import type { TransitionController } from 'util/core-transition-component/types/transition.types';

/**
 * Creates gsap.core.Timeline that trigger transitionIn/Out onMount and or on change of the isVisible object.
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
 * useChangeTransitionState(controller, isVisible);
 *
 * @parent template
 * <Block
 *  isVisible={{ // ChangeTransitionState
 *    onMount: true,
 *     value: showBlock,
 *  }}
 * />
 *
 */

export type ChangeTransitionState = {
  onMount?: boolean;
  value?: boolean;
};

export function useChangeTransitionState(
  transitionController: TransitionController,
  isVisible?: ChangeTransitionState,
): void {
  useMount(() => {
    if (isVisible?.onMount && isVisible?.value) transitionController.transitionIn();
  });

  useUpdateEffect(() => {
    if (isVisible?.value) {
      transitionController.transitionIn();
    } else {
      transitionController.transitionOut();
    }
  }, [isVisible?.value]);
}
