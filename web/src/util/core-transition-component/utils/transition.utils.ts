import gsap from 'gsap';
import type {
  SetupTimelineOptions,
  SetupTransitionOptions,
  TransitionController,
  TransitionDirection,
  TransitionOptions,
  TransitionOptionsWithDirection,
} from '../types/transition.types';
import { clearTimeline, cloneTimeline } from './timeline.utils';

/**
 * Creates the TransitionController
 *
 * @param setupOptions
 * @returns
 */
export function createTransitionController<T>(
  setupOptions: SetupTransitionOptions<T>,
): TransitionController {
  const timelines: Record<TransitionDirection, gsap.core.Timeline | undefined> = {
    in: undefined,
    out: undefined,
  };

  const controller: TransitionController = {
    ref: setupOptions.ref,
    isHidden: true,

    /**
     * Function to get one of the timelines
     */
    getTimeline(direction: TransitionDirection): gsap.core.Timeline | undefined {
      if (direction === 'out') {
        this.setupTimeline({
          direction,
        });
      }

      if (!timelines[direction]) {
        return undefined;
      }

      return cloneTimeline(timelines[direction] as gsap.core.Timeline, direction).play();
    },

    /**
     * Create timeline for given direction
     */
    setupTimeline({ direction, reset }: SetupTimelineOptions) {
      const setupTimelineFunction =
        direction === 'in'
          ? setupOptions.setupTransitionInTimeline
          : setupOptions.setupTransitionOutTimeline;

      if (setupTimelineFunction == null) {
        // eslint-disable-next-line no-console
        console.warn(
          `Cannot setup timeline because no setup function is defined for '${direction}' direction`,
        );
        return undefined;
      }

      let timelineVariables: gsap.TimelineVars = {
        paused: true,
      };

      if (direction === 'in') {
        // Allow external timeline variables for transition in timeline
        timelineVariables = {
          ...setupOptions.timelineVars?.(),
          ...timelineVariables,
        };
      }

      let timeline = timelines[direction];

      if (timeline == null) {
        timeline = gsap.timeline(timelineVariables);

        // Save new timeline for direction
        timelines[direction] = timeline;

        timeline.eventCallback('onStart', () => {
          this.isHidden = direction === 'out';
          setupOptions.onStart?.(direction);
        });
        timeline.eventCallback('onComplete', () => setupOptions.onComplete?.(direction));

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        timeline.eventCallback('onUpdate', () => setupOptions.onUpdate?.(timeline!));

        if (direction === 'in') {
          timeline.eventCallback('onReverseComplete', () => setupOptions.onComplete?.(direction));
        }
      }
      // Reset timeline when timeline exist and reset option is enabled
      else if (reset) {
        clearTimeline(timeline);
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setupTimelineFunction(timeline, setupOptions.refs!);

      return timeline;
    },

    killOldTimeline(direction: TransitionDirection) {
      // if (!transitionPromise) return;

      const hasOutTimeline = timelines.out && timelines?.out?.getChildren(true).length > 0;
      const timeline = timelines[direction === 'in' && hasOutTimeline ? 'out' : 'in'];

      timeline?.kill();
      // if (resolveTransitionPromise) onTransitionComplete(direction);
    },

    /**
     * Start transition for given direction from options
     */
    async transition(options: TransitionOptionsWithDirection) {
      this.killOldTimeline(options.direction);

      // Transition in timeline is used as a fallback if the out timeline does
      // not exist. The transition in timeline is reversed if the fallback is used
      const noTimelineOutDefined = !timelines.out || timelines?.out?.getChildren(true).length === 0;
      let timeline = timelines[options.direction] ?? timelines.in;
      if (noTimelineOutDefined) {
        timeline = timelines.in;
      }

      if (timeline == null) {
        throw new Error(
          'Timeline is undefined, did you forget to call TransitionController.setupTimeline()?',
        );
      }

      // (opposite)Timeline should be restarted, the old timeline is killed in case it's active
      // timeline.kill();

      options.onStart?.(options.direction);

      // Reverse in transition when out timeline is empty
      if (options.direction === 'out' && noTimelineOutDefined) {
        await timeline.reverse(0, true);
      } else {
        await timeline.restart(true, true);
        // await timeline.play();
      }

      options.onComplete?.(options.direction);
      // setupOptions.onComplete?.(options.direction);
    },

    /**
     * Shorthand to start transition in
     */
    async transitionIn(options?: TransitionOptions) {
      if (options?.reset || !timelines?.in) {
        this.setupTimeline({ direction: 'in', reset: true });
      }

      await this.transition({
        ...options,
        direction: 'in',
      });
    },

    dispose() {
      if (timelines?.in) {
        clearTimeline(timelines?.in);
      }
      if (timelines?.out) {
        clearTimeline(timelines?.out);
      }

      timelines?.in?.clear();
      timelines?.out?.clear();

      timelines?.in?.kill();
      timelines?.out?.kill();

      timelines.in = undefined;
      timelines.out = undefined;
    },

    /**
     * Shorthand to start transition out
     */
    async transitionOut(options?: TransitionOptions) {
      if (options?.reset || timelines?.out?.getChildren(true).length === 0 || !timelines.out) {
        this.setupTimeline({ direction: 'out', reset: true });
      }

      await this.transition({
        ...options,
        direction: 'out',
      });
    },
  } as const;

  return controller;
}
