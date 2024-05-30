import type { TransitionController } from 'util/core-transition-component/types/transition.types';

export async function transitionOutTransitionControllers(
  transitionControllers: Set<TransitionController>,
): Promise<void> {
  const timelines = Array.from(transitionControllers).map((leaveTransitionController) =>
    leaveTransitionController.transitionOut(),
  );

  await Promise.all(timelines);
}
