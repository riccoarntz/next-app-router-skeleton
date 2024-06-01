import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useRef } from 'react';
import styles from './PrimaryLink.module.scss';
import { setupTransitionInTimeline, setupTransitionOutTimeline } from './PrimaryLink.transitions';
// import { useChangeTransitionState } from 'util/react-transition-component/hooks/useChangeTransitionState';
import { useScrollTransition } from 'util/react-transition-component';
import type { PrimaryLinkProps, PrimaryLinkRef } from './PrimaryLink.data';
import type { BaseButtonRef } from 'components/atoms/base-button/BaseButton.data';
import BaseButton from 'components/atoms/base-button/BaseButton';
import {
  defaultCanTransitionIn,
  defaultDisableTriggerInOnScroll,
} from 'util/react-transition-component/types/transitionComponent.types';
import Text from 'components/atoms/text/Text';

export default forwardRef<PrimaryLinkRef, PrimaryLinkProps>(
  (
    {
      disableTriggerInOnScroll = defaultDisableTriggerInOnScroll,
      canTransitionIn = defaultCanTransitionIn,
      textSize = 'body-10',
      textVariant,
      underline = true,
      revertUnderline = false,
      ...props
    },
    ref,
  ): ReactElement => {
    const localRef = useRef<BaseButtonRef>();
    const elementRef = (ref || localRef) as RefObject<BaseButtonRef>;

    useScrollTransition({
      scroll: {
        trigger: elementRef,
        canTransitionIn,
        enableInView: false,
        disableTriggerInOnScroll,
      },
      setupOptions: () => ({
        ref: elementRef,
        refs: {
          elementRef,
        },
        setupTransitionInTimeline,
        setupTransitionOutTimeline,
      }),
    });

    // useChangeTransitionState(transitionController, isVisible);

    return (
      <BaseButton
        className={classNames(styles.primaryLink, props.className, {
          [styles.hasUnderline]: underline && !revertUnderline,
          [styles.revertUnderline]: revertUnderline,
        })}
        ref={elementRef}
        type={props.type}
        disabled={props.disabled}
        href={props.href}
        target={props.target}
        rel={props.rel}
        link={props.link}
        label={props.label}
        title={props.title}
        ariaLabel={props.ariaLabel}
        onClick={props.onClick}
      >
        <Text
          transitionInType="none"
          className={classNames(styles.label)}
          as="span"
          size={textSize}
          variant={textVariant}
        >
          {props.label || props.link?.text}
        </Text>
        {(underline || revertUnderline) && <span className={classNames(styles.underline)} />}
      </BaseButton>
    );
  },
);
