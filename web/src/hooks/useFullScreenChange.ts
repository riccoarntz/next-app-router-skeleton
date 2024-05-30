import { useCallback, useRef, useState } from 'react';
import useEventListener from './useEventListener';

function useFullScreenChange(): boolean {
  const body = useRef(typeof window !== 'undefined' ? document : null);
  const [isFullScreen, setIsFullscreen] = useState(false);

  const handleFullScreenChange = useCallback(() => {
    setIsFullscreen(!!(body.current && body.current?.fullscreenElement));
  }, [body]);

  useEventListener('webkitfullscreenchange' as keyof WindowEventMap, handleFullScreenChange);
  useEventListener('fullscreenchange' as keyof WindowEventMap, handleFullScreenChange);

  return isFullScreen;
}

export default useFullScreenChange;
