'use client';

import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import ScrollProvider, { useScroller } from './ScrollProvider';
import useGlobalStore from '../../stores/globalStore';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import SiteHeader from '../layout/site-header/SiteHeader';
import SiteFooter from '../layout/site-footer/SiteFooter';
import { FlowRoutePresence } from '../../util/react-transition-component/components/FlowRoutePresence';
import Template from '../../app/template';
import GridChecker from '../utils/grid-checker/GridChecker';
import { usePathname } from 'next/navigation';
import { stripHashFromUrl, stripQueriesFromUrl } from '../../util/url.utils';
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
  const pageTransitionInCompleted = useGlobalStore((state) => state.pageTransitionInCompleted);
  const { setLocked } = useScroller();
  const menuIsOpen = useGlobalStore((state) => state.menuIsOpen);
  const body = useRef(typeof window !== 'undefined' ? document : null);
  const cleanPath = stripHashFromUrl(stripQueriesFromUrl(usePathname()));

  useIsomorphicLayoutEffect(() => {
    (body?.current as HTMLDocument).documentElement.classList.add(
      isDesktop ? 'no-touch' : 'is-touch',
    );
  }, [body]);

  useUpdateEffect(() => {
    console.log(menuIsOpen, !pageTransitionInCompleted)
    // setLocked(menuIsOpen || !pageTransitionInCompleted);
  }, [setLocked, menuIsOpen, pageTransitionInCompleted]);

  return (
    <>
      {/* <DocumentHead */}
      {/*    noIndex={page?.seo?.noIndex} */}
      {/*    siteTitle={siteSettings?.siteTitle} */}
      {/*    pageTitle={page?.pageTitle ?? siteSettings?.siteTitle} */}
      {/*    title={page?.seo?.metaTitle ?? page?.pageTitle ?? siteSettings?.seo?.metaTitle} */}
      {/*    description={ */}
      {/*        page?.seo?.metaDescription ?? */}
      {/*        page?.pageDescription ?? */}
      {/*        siteSettings?.seo?.metaDescription */}
      {/*    } */}
      {/*    // image={page?.seo?.metaImage ?? page?.seo?.metaImage ?? siteSettings?.seo?.metaImage} */}
      {/* /> */}
      <style jsx global>{`
        :root {
          --font-serif: ${serif.style.fontFamily};
          --font-sans: ${sansSerif.style.fontFamily};
        }
      `}</style>
      <SiteHeader />
      <ScrollProvider root type="Lenis">
        <FlowRoutePresence>
          <Template key={cleanPath}>{children}</Template>
        </FlowRoutePresence>
        <SiteFooter />
      </ScrollProvider>
      {process.env.NODE_ENV === 'development' && <GridChecker />}
      {/* {!renderPreloader && <PageWipe/>} */}
    </>
  );
};
export default Site;
