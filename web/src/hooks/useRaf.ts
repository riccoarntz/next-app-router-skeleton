import { useEffect } from 'react';

function useRaf(callback: () => void, isActive = true): void {
  useEffect(() => {
    if (!isActive) return () => {};

    let raf: number;

    const onTick = () => {
      callback?.();
      raf = requestAnimationFrame(onTick);
    };

    raf = requestAnimationFrame(onTick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [callback, isActive]);
}

export default useRaf;
