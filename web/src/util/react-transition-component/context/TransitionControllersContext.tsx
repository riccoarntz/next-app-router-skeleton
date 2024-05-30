import { createContext, useContext } from 'react';
import type { TransitionController } from 'util/core-transition-component/types/transition.types';

export type TransitionControllersContextType = Set<TransitionController> | undefined;

export function createTransitionControllerContext(): {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TransitionControllersContext: React.Context<TransitionControllersContextType>;
  useTransitionControllers: () => TransitionControllersContextType;
} {
  const TransitionControllersContext = createContext<TransitionControllersContextType>(undefined);

  function useTransitionControllers(): TransitionControllersContextType {
    return useContext(TransitionControllersContext);
  }

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TransitionControllersContext,
    useTransitionControllers,
  };
}

export const {
  TransitionControllersContext: TransitionPresenceTransitionControllersContext,
  useTransitionControllers: useTransitionPresenceTransitionController,
} = createTransitionControllerContext();
