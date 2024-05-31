'use client';

import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import ScrollProvider, { useScroller } from './ScrollProvider';
import useGlobalStore from '../../stores/globalStore';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import SiteHeader from '../layout/site-header/SiteHeader';
import SiteFooter from '../layout/site-footer/SiteFooter';
import GridChecker from '../utils/grid-checker/GridChecker';
import { sansSerif, serif } from '../../assets/font';
import { useDeviceStateTracker } from '../../hooks/useDeviceStateTracker';
import useViewportCustomProperties from '../../util/setViewportCustomProperties';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';
import { isDesktop } from '../../util/deviceUtil';

type SiteProps = {
  children: ReactNode;
};

const Site: NextPage<SiteProps> = ({ children }) => {
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
      <SiteHeader />
      <ScrollProvider root type='Lenis'>
        {children}
        <SiteFooter />
      </ScrollProvider>
      {process.env.NODE_ENV === 'development' && <GridChecker />}
    </>
  );
};
export default Site;
