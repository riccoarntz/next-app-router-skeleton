import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import useEventListener from './useEventListener';

const getVisibilityPropNames = (): { hidden: string; change: string } => {
  if (
    typeof window !== 'undefined' &&
    typeof (document as Document & { msHidden?: boolean; webkitHidden?: boolean }).msHidden !==
      'undefined'
  ) {
    return {
      hidden: 'msHidden',
      change: 'msvisibilitychange',
    };
  }
  if (
    typeof window !== 'undefined' &&
    typeof (document as Document & { msHidden?: boolean; webkitHidden?: boolean }).webkitHidden !==
      'undefined'
  ) {
    return {
      hidden: 'webkitHidden',
      change: 'webkitvisibilitychange',
    };
  }

  return {
    hidden: 'hidden',
    change: 'visibilitychange',
  };
};

export function useDocumentVisibilityChange(): {
  isHidden: boolean;
  wasActive: boolean;
  setWasActive: Dispatch<SetStateAction<boolean>>;
} {
  // const documentRef = useRef(typeof window !== 'undefined' ? document : null);
  const [isHidden, setIsHidden] = useState(false);
  const [wasActive, setWasActive] = useState(false);

  const onVisibilityChange = useCallback(() => {
    const propNames = getVisibilityPropNames();
    if ((document as never)[propNames.hidden]) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, []);

  useEventListener(getVisibilityPropNames().change as keyof WindowEventMap, onVisibilityChange);

  return {
    isHidden,
    wasActive,
    setWasActive,
  };
}
