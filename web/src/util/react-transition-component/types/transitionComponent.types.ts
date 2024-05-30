import type { ChangeTransitionState } from '../hooks/useChangeTransitionState';
import type { TransitionController } from '../../core-transition-component';

export type TransitionComponentProps = {
  canTransitionIn?: boolean;
  transitionInDelay?: number;

  isVisible?: ChangeTransitionState;
  className?: string;

  transitionOnMount?: boolean;
  transitionOnUnMount?: boolean;

  disableTriggerInOnScroll?: boolean;
  scrollVariables?: ScrollTrigger.Vars;
};

export const defaultCanTransitionIn = true;
export const defaultDisableTriggerInOnScroll = true;

export type TransitionComponentRef = {
  transitionController: TransitionController;
};
