import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useRef } from 'react';
import styles from './SiteHeader.module.scss';
import type { SiteHeaderProps, SiteHeaderRef } from './SiteHeader.data';
import Text from '../../atoms/text/Text';

export default forwardRef<SiteHeaderRef, SiteHeaderProps>(({ ...props }, ref): ReactElement => {
  const localRef = useRef(null);
  const elementRef = (ref || localRef) as RefObject<HTMLDivElement>;

  return <header ref={elementRef} className={classNames(styles.siteHeader, props.className)}>
    <div className="grid-gutter max-content-width">
      <Text
        as='p'
        size='body-10'
      >
        site-header
      </Text>
    </div>
  </header>;
});
