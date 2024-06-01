'use client';

import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useRef } from 'react';
import styles from './SiteHeader.module.scss';
import type { SiteHeaderProps, SiteHeaderRef } from './SiteHeader.data';
import PrimaryLink from '../../atoms/primary-link/PrimaryLink';

export default forwardRef<SiteHeaderRef, SiteHeaderProps>(({ ...props }, ref): ReactElement => {
  const localRef = useRef(null);
  const elementRef = (ref || localRef) as RefObject<HTMLDivElement>;

  return (
    <header ref={elementRef} className={classNames(styles.siteHeader, props.className)}>
      <nav className={classNames(styles.navigation, 'grid-gutter max-content-width')}>
        <PrimaryLink href="/" label="home" revertUnderline textVariant="sans" />
        <PrimaryLink href="/about" label="about" revertUnderline textVariant="sans" />
      </nav>
    </header>
  );
});
