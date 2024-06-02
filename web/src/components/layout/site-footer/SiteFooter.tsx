'use client';

import classNames from 'clsx';
import type { ReactElement } from 'react';
import { forwardRef } from 'react';
import styles from './SiteFooter.module.scss';
import type { SiteFooterProps, SiteFooterRef } from './SiteFooter.data';
import PrimaryLink from '../../atoms/primary-link/PrimaryLink';
import { useGlobalProvider } from '../../unlisted/GlobalProvider';

export default forwardRef<SiteFooterRef, SiteFooterProps>(({ ...props }): ReactElement => {
  const { siteSettings } = useGlobalProvider();

  return (
    <footer className={classNames(styles.siteFooter, props.className)}>
      <div className="grid-gutter max-content-width">
        <ul>
          {siteSettings?.menuLinks?.map((link) => (
            <li key={link.url}>
              <PrimaryLink href={link.url} label={link.text} revertUnderline textVariant="sans" />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
});
