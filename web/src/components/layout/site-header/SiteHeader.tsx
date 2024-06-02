'use client';

import classNames from 'clsx';
import type { ReactElement } from 'react';
import { forwardRef } from 'react';
import styles from './SiteHeader.module.scss';
import type { SiteHeaderProps, SiteHeaderRef } from './SiteHeader.data';
import PrimaryLink from '../../atoms/primary-link/PrimaryLink';
import { useGlobalProvider } from '../../unlisted/GlobalProvider';

export default forwardRef<SiteHeaderRef, SiteHeaderProps>(({ ...props }): ReactElement => {
  const { siteSettings } = useGlobalProvider();

  return (
    <header className={classNames(styles.siteHeader, props.className)}>
      <nav className={classNames(styles.navigation, 'grid-gutter max-content-width')}>
        {siteSettings?.menuLinks?.map((link) => (
          <PrimaryLink
            key={link.url}
            href={link.url}
            label={link.text}
            revertUnderline
            textVariant="sans"
          />
        ))}
      </nav>
    </header>
  );
});
