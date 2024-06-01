'use client';

import type { ComponentType, RefObject } from 'react';
import { forwardRef, useRef } from 'react';
import classNames from 'clsx';
import styles from './Icon.module.scss';
import dynamic from 'next/dynamic';

export type IconProps = {
  name: string;
  className?: string;
  transparent?: boolean;
};
const icons: { [key: string]: ComponentType<unknown> } = {
  twitter: dynamic(() => import(`../../../assets/svg/twitter.svg`)),
};
export default forwardRef<HTMLElement, IconProps>(
  ({ name, className, transparent = false, ...rest }, ref): JSX.Element | null => {
    const localRef = useRef(null);
    const elementRef = (ref || localRef) as RefObject<HTMLDivElement>;

    // const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>>>();
    // const [loading, setLoading] = useState(false);
    // useEffect((): (() => void) => {
    //   setLoading(true);
    //   const importIcon = async (): Promise<void> => {
    //     try {
    //       ImportedIconRef.current = (await import(`assets/svg/twitter.svg`)).default;
    //       console.log('load?', ImportedIconRef.current);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //
    //   importIcon();
    //
    //   return () => {
    //     setLoading(false);
    //   };
    // }, [name]);
    //
    // let child;
    // if (!loading && ImportedIconRef.current) {
    //   console.log('set?');
    //   const { current: ImportedIcon } = ImportedIconRef;
    //   child = <ImportedIcon {...rest} />;
    //
    // }

    let Component = icons.twitter;
    if (!Component) {
      Component = icons.twitter;
    }

    return (
      <div
        ref={elementRef}
        className={classNames(styles.icon, className, {
          [styles.transparent]: transparent,
        })}
      >
        <Component {...rest} />
      </div>
    );
  },
);
