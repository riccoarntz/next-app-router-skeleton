import { useCallback, useRef } from 'react';
import gsap from 'gsap';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { clearTimeline } from '../util/core-transition-component/utils/timeline.utils';

function useSetupTimeline<T, U>(
  setupTimelineMethod: (timeline: gsap.core.Timeline, refs: T) => void,
  refs: T,
  disable?: boolean,
  deps: Array<U> = [],
  options: {
    onUpdate?: () => void;
    vars?: gsap.TimelineVars;
  } = {},
): {
  timeline: gsap.core.Timeline | undefined;
  create: () => void;
  dispose: () => void;
} {
  const timeline = useRef<gsap.core.Timeline>(
    gsap.timeline({
      paused: true,
      ...options.vars,
      onUpdate: () => {
        if (options?.onUpdate) {
          options?.onUpdate();
        }
      },
    }),
  );

  const dispose = useCallback((tl: gsap.core.Timeline = timeline.current) => {
    clearTimeline(tl);
    tl?.clear();
    tl?.kill();
  }, []);

  const create = useCallback(() => {
    setupTimelineMethod(timeline.current, refs);
  }, [refs, setupTimelineMethod]);

  useIsomorphicLayoutEffect(() => {
    if (disable) return undefined;
    create();
    const tl = timeline.current;

    return () => {
      dispose(tl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? []);

  return {
    timeline: timeline.current,
    dispose,
    create,
  };
}

export default useSetupTimeline;
