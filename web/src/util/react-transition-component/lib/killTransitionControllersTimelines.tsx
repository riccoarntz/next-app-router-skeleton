import type { TransitionController } from '../../core-transition-component';

export function killTransitionControllersTimelines(
  transitionControllers: Set<TransitionController>,
): void {
  transitionControllers.forEach((transitionController) => {
    transitionController.getTimeline('in')?.kill();
    transitionController.getTimeline('out')?.kill();
  });
}
