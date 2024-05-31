'use client';

import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import styles from './SiteHeader.module.scss';
import type { SiteHeaderProps, SiteHeaderRef } from './SiteHeader.data';
import Text from '../../atoms/text/Text';
import BaseButton from '../../atoms/base-button/BaseButton';

export default forwardRef<SiteHeaderRef, SiteHeaderProps>(({ ...props }, ref): ReactElement => {
  const localRef = useRef(null);
  const elementRef = (ref || localRef) as RefObject<HTMLDivElement>;

  useEffect(()=> {
    console.log('site=header');
  }, [])

  return <header ref={elementRef} className={classNames(styles.siteHeader, props.className)}>
    <div className='grid-gutter max-content-width'>
      <Text
        as='p'
        size='body-10'
      >
        site-header
      </Text>

      <BaseButton href='/about' >about</BaseButton>
      <BaseButton href='/' >home</BaseButton>
    </div>
  </header>;
});
