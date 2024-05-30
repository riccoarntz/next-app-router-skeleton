'use client';

import { useMemo } from 'react';
import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';
import type { SetupTransitionOptions, TransitionController } from '../../core-transition-component';
import {
  createTransitionController,
  registerTransitionController,
  unregisterTransitionController,
} from '../../core-transition-component';

/**
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
 */

export function useTransitionController<T>(
  setupOptions: () => SetupTransitionOptions<T>,
  dependencies: ReadonlyArray<unknown> = [],
  skipSetupTimeline: boolean = false,
): TransitionController {
  const controller = useMemo(
    () => createTransitionController(setupOptions()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  );

  useIsomorphicLayoutEffect(() => {
    registerTransitionController(controller);

    if (!skipSetupTimeline) {
      // todo add/wrapp a usePageLoad/canAnimateIn hook
      controller.setupTimeline({
        direction: 'in',
      });
    }

    return () => {
      controller.dispose();
      unregisterTransitionController(controller);
    };
  }, [controller]);

  return controller;
}
