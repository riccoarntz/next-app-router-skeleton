'use client';

import classNames from 'clsx';
import type { ReactElement, Ref, RefObject } from 'react';
import { forwardRef, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { BaseButtonProps, BaseButtonRef } from './BaseButton.data';
import { useCta } from 'hooks/useCta';
import { usePathname } from 'next/navigation';

export default forwardRef<BaseButtonRef, BaseButtonProps>(
  ({ children, scroll = false, ...props }, ref): ReactElement => {
    const localRef = useRef(null);
    const elementRef = (ref || localRef) as RefObject<HTMLAnchorElement | HTMLButtonElement>;

    const {
      url,
      rel,
      buttonType,
      target,
      title,
      ariaLabel,
      text,
      // isCustomAction,
      /* handleClick, isExternalUrl */
    } = useCta(props);

    const onClick = useCallback(() => {
      if (props?.onClick) {
        props.onClick();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onClick]);

    const pathname = usePathname();

    return (
      <>
        {url ? (
          <Link
            ref={elementRef as Ref<HTMLAnchorElement>}
            className={classNames('button', props.className, {
              'is-active': pathname === url,
            })}
            href={url}
            rel={rel.current}
            title={title}
            scroll={scroll}
            aria-label={ariaLabel || props.label || text}
            // disabled={props.disabled || false}
            target={target.current}
            onMouseEnter={props?.onMouseEnter}
            onMouseLeave={props?.onMouseLeave}
            onMouseMove={props?.onMouseMove}
            download={props.download}
            onClick={onClick}
            onFocus={props?.onFocus}
            onBlur={props?.onBlur}
          >
            {children}
          </Link>
        ) : (
          <button
            ref={elementRef as Ref<HTMLButtonElement>}
            className={classNames('button', props.className)}
            title={title}
            disabled={props.disabled || false}
            aria-label={ariaLabel || props.label || text}
            // eslint-disable-next-line react/button-has-type
            type={buttonType}
            onClick={onClick}
            onMouseEnter={props?.onMouseEnter}
            onMouseLeave={props?.onMouseLeave}
            onMouseMove={props?.onMouseMove}
            onFocus={props?.onFocus}
            onBlur={props?.onBlur}
          >
            {children}
          </button>
        )}
      </>
    );
  },
);
