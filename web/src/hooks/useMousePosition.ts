import { useRef } from 'react';
import useEventListener from './useEventListener';

const useMousePosition = () => {
  const mousePosition = useRef({
    enabled: true,
    x: 0,
    y: 0,
    hasData: false,
  });

  const handleMouseMove = (ev: MouseEvent) => {
    mousePosition.current.x = ev.clientX || 0;
    mousePosition.current.y = ev.clientY || 0;

    if (!mousePosition.current.hasData) {
      mousePosition.current.x = ev.clientX || 0;
      mousePosition.current.y = ev.clientY || 0;
    }
    mousePosition.current.hasData = true;
  };

  useEventListener('mousemove', handleMouseMove);

  return mousePosition;
};

export default useMousePosition;
