import { useImperativeHandle } from 'react';
import type { ForwardedRef } from 'react';
import type { TransitionController } from '../../core-transition-component';
import type { TransitionComponentRef } from '../types/transitionComponent.types';

/**
 * This will expose the TransitionComponentRef to the parent.
 * 1: With this you can either call transitionIn/Out manually via the parent if needed.
 * 2: Or you can choose to nest it's child-component timeline to the parent-component timeline,
 * so you can build larger components with complex timelines using smaller components as building-blocks.
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
 * useExposeTransitionComponentRef(transitionController, ref);
 */
export function useExposeTransitionComponentRef(
  transitionController: TransitionController,
  ref: ForwardedRef<TransitionComponentRef>,
): void {
  useImperativeHandle(
    ref,
    () => ({
      transitionController,
    }),
    [transitionController],
  );
}
