'use client';

import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useRef } from 'react';

import {
  defaultCanTransitionIn,
  defaultDisableTriggerInOnScroll,
} from 'util/react-transition-component/types/transitionComponent.types';
import { useChangeTransitionState } from 'util/react-transition-component/hooks/useChangeTransitionState';
import type { TextProps, TextRef } from './Text.data';
import styles from './Text.module.scss';
import { setupTransitionInTimeline, setupTransitionOutTimeline } from './Text.transitions';
import {
  useMountTransition,
  useScrollTransition,
  useUnMountTransition,
} from '../../../util/react-transition-component';

export default forwardRef<TextRef, TextProps>(
  (
    {
      as = 'p',
      size,
      variant = 'serif',
      uppercase = variant === 'sans',
      className,
      children,
      isVisible,
      transitionInType = 'none',
      transitionOutType = 'fadeOut',
      disableTriggerInOnScroll = defaultDisableTriggerInOnScroll,
      transitionOnMount = false,
      transitionOnUnMount = false,
      canTransitionIn = defaultCanTransitionIn,
      scrollVariables,
      ...props
    },
    ref,
  ): ReactElement => {
    const localRef = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elementRef = (ref || localRef) as RefObject<any>;

    const { transitionController } = useScrollTransition({
      scroll: {
        canTransitionIn,
        disableTriggerInOnScroll,
        enableInView: false,
        trigger: elementRef,
        variables: scrollVariables,
      },
      setupOptions: () => ({
        ref: elementRef,
        refs: {
          elementRef,
          transitionInType,
          transitionOutType,
        },
        setupTransitionInTimeline,
        setupTransitionOutTimeline,
      }),
    });

    useMountTransition(transitionController, transitionOnMount);
    useUnMountTransition(transitionController, transitionOnUnMount);
    useChangeTransitionState(transitionController, isVisible);

    const Tag = as;
    return (
      <Tag
        ref={elementRef}
        className={classNames(
          styles.text,
          size ? styles[size] : null,
          className,
          `font-${variant}`,
          uppercase ? 'text-uppercase' : '',
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
