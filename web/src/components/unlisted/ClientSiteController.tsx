'use client';

import { useScroller } from './ScrollProvider';
import useGlobalStore from '../../stores/globalStore';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import { isDesktop } from '../../util/deviceUtil';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { sansSerif, serif } from '../../assets/font';
import { useDeviceStateTracker } from '../../hooks/useDeviceStateTracker';
import useViewportCustomProperties from '../../util/setViewportCustomProperties';

export default function ClientSiteController() {
  useDeviceStateTracker();
  useViewportCustomProperties();
  const { setLocked } = useScroller();
  const menuIsOpen = useGlobalStore((state) => state.menuIsOpen);
  const body = useRef(typeof window !== 'undefined' ? document : null);
  // const cleanPath = stripHashFromUrl(stripQueriesFromUrl(usePathname()));

  useIsomorphicLayoutEffect(() => {
    (body?.current as HTMLDocument).documentElement.classList.add(
      isDesktop ? 'no-touch' : 'is-touch',
    );
  }, [body]);

  useUpdateEffect(() => {
    setLocked(menuIsOpen);
  }, [setLocked, menuIsOpen]);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-serif: ${serif.style.fontFamily};
          --font-sans: ${sansSerif.style.fontFamily};
        }
      `}</style>
    </>
  );
}
