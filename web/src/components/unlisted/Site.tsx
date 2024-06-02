import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import ScrollProvider from './ScrollProvider';
import SiteHeader from '../layout/site-header/SiteHeader';
import SiteFooter from '../layout/site-footer/SiteFooter';
import GridChecker from '../utils/grid-checker/GridChecker';
import ClientSiteController from './ClientSiteController';

type SiteProps = {
  children: ReactNode;
};

const Site: NextPage<SiteProps> = ({ children }) => (
  <>
    <ClientSiteController />
    <SiteHeader />
    <ScrollProvider root type="Lenis">
      {children}
      <SiteFooter />
    </ScrollProvider>
    {process.env.NODE_ENV === 'development' && <GridChecker />}
  </>
);
export default Site;
