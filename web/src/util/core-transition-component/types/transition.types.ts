export type GuardFunction = (release: () => void) => void;
export type TransitionDirection = 'in' | 'out';

export interface SetupTimelineOptions {
  direction: TransitionDirection;
  reset?: boolean;
}

export interface TransitionOptionEventHandlers<T = TransitionDirection> {
  onStart?: (direction: T) => void;
  onComplete?: (direction: T) => void;
  onUpdate?: (timeline: gsap.core.Timeline) => void;
}

export interface TransitionOptions extends TransitionOptionEventHandlers {
  reset?: boolean;
}

export interface TransitionOptionsWithDirection extends TransitionOptions {
  direction: TransitionDirection;
}

export interface TransitionController {
  ref?: unknown;
  isHidden: boolean;
  getTimeline(direction?: TransitionDirection): gsap.core.Timeline | undefined;
  setupTimeline(options?: SetupTimelineOptions): gsap.core.Timeline | undefined;
  transition(options: TransitionOptionsWithDirection): Promise<void>;
  transitionIn(options?: TransitionOptions): Promise<void>;
  transitionOut(options?: TransitionOptions): Promise<void>;
  killOldTimeline(direction: TransitionDirection): void;
  dispose(): void;
}

export interface SetupTransitionOptions<T> extends TransitionOptionEventHandlers {
  ref?: unknown;
  refs?: T;
  timelineVars?: () => gsap.TimelineVars;
  setupTransitionInTimeline?: (timeline: gsap.core.Timeline, refs: T) => void;
  setupTransitionOutTimeline?: (timeline: gsap.core.Timeline, refs: T) => void;
}
