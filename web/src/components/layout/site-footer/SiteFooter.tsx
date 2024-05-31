import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useRef } from 'react';
import styles from './SiteFooter.module.scss';
import type { SiteFooterProps, SiteFooterRef } from './SiteFooter.data';
import Text from '../../atoms/text/Text';

export default forwardRef<SiteFooterRef, SiteFooterProps>(({ ...props }, ref): ReactElement => {
  const localRef = useRef(null);
  const elementRef = (ref || localRef) as RefObject<HTMLDivElement>;

  return (
    <footer ref={elementRef} className={classNames(styles.siteFooter, props.className)}>
      <div className="grid-gutter max-content-width">
        <Text as="p" size="body-10">
          site-footer
        </Text>
      </div>
    </footer>
  );
});
