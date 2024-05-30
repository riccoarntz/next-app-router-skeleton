// Components
export { TransitionPresence } from './components/TransitionPresence';

// Hooks
export { useScrollTransition } from './hooks/useScrollTransition';
export { useMountTransition } from './hooks/useMountTransition';
export { useUnMountTransition } from './hooks/useUnMountTransition';
export { useSyncRef } from '../../hooks/useSyncRef';
export { useTransitionController } from './hooks/useTransitionController';

// Lib
export { unwrapRefs } from './lib/unwrapRefs';

export { findTransitionController, TRANSITION_CONTROLLERS } from '../core-transition-component';
export type {
  SetupTimelineOptions,
  SetupTransitionOptions,
  TransitionController,
  TransitionDirection,
  TransitionOptionEventHandlers,
  TransitionOptions,
} from '../core-transition-component';
