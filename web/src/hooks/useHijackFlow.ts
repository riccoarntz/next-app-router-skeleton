import type { RefObject } from 'react';
import { useRef } from 'react';
import type { FlowProviderContextType } from '../util/react-transition-component/components/FlowProvider';
import { useFlowProviderContext } from '../util/react-transition-component/components/FlowProvider';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import useGlobalStore from '../stores/globalStore';

export function useHijackFlow(): {
  fromPathRef?: RefObject<string | undefined>;
} {
  const fromPath = useGlobalStore((state) => state.fromPath);
  const fromPathRef = useRef<string>();

  useIsomorphicLayoutEffect(() => {
    fromPathRef.current = fromPath;
  }, [fromPath]);

  const { hijackFlow } = useFlowProviderContext() as FlowProviderContextType;

  useIsomorphicLayoutEffect(() => {
    if (!fromPathRef.current) {
      hijackFlow();
    }
  }, [hijackFlow, fromPathRef]);

  return {
    fromPathRef,
  };
}
