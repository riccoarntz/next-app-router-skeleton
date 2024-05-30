import type { TransitionController } from '../types/transition.types';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const _TRANSITION_CONTROLLERS = new Set<TransitionController>();

/**
 * Export as readonly set to expose TransitionControllers outside of package
 */
export const TRANSITION_CONTROLLERS = _TRANSITION_CONTROLLERS as ReadonlySet<TransitionController>;

/**
 * Saves TransitionController to global TransitionController set
 */
export function registerTransitionController(transitionController: TransitionController): void {
  if (_TRANSITION_CONTROLLERS.has(transitionController)) {
    throw new Error('TransitionController already registered');
  }

  _TRANSITION_CONTROLLERS.add(transitionController);
}

/**
 * Removes TransitionController to global TransitionController set
 */
export function unregisterTransitionController(transitionController: TransitionController): void {
  if (!_TRANSITION_CONTROLLERS.has(transitionController)) {
    throw new Error('TransitionController not found. Did you forget to register it?');
  }

  _TRANSITION_CONTROLLERS.delete(transitionController);
}

/**
 * Finds TransitionController for given ref
 */
export function findTransitionController(ref: unknown): TransitionController | undefined {
  const match = Array.from(_TRANSITION_CONTROLLERS).find(
    (transitionController) => transitionController.ref === ref,
  );

  if (!match) {
    // eslint-disable-next-line no-console
    // console.log(`no match found for TransitionController, ref: [${ref}]`);
  }

  return match;
}

/**
 * @ignore (ONLY USED FOR TESTING)
 */
/* istanbul ignore next */
export function clearTransitionControllers(): void {
  _TRANSITION_CONTROLLERS.clear();
}
