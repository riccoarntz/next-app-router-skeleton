import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useCallback, useRef } from 'react';
import styles from './PrimaryButton.module.scss';
import {
  mouseEnterAnimation,
  mouseLeaveAnimation,
  setupTransitionInTimeline,
  setupTransitionOutTimeline,
} from './PrimaryButton.transitions';
// import { useChangeTransitionState } from 'util/react-transition-component/hooks/useChangeTransitionState';
import { useScrollTransition } from 'util/react-transition-component';
import type { PrimaryButtonProps, PrimaryButtonRef } from './PrimaryButton.data';
import type { BaseButtonRef } from 'components/atoms/base-button/BaseButton.data';
import BaseButton from 'components/atoms/base-button/BaseButton';
import {
  defaultCanTransitionIn,
  defaultDisableTriggerInOnScroll,
} from 'util/react-transition-component/types/transitionComponent.types';
import Text from 'components/atoms/text/Text';
import type { Link } from 'data/types/link.types';
import type { TextRef } from '../text/Text.data';
import { isDesktop } from '../../../util/deviceUtil';

export default forwardRef<PrimaryButtonRef, PrimaryButtonProps>(
  (
    {
      disableTriggerInOnScroll = defaultDisableTriggerInOnScroll,
      canTransitionIn = defaultCanTransitionIn,
      ...props
    },
    ref,
  ): ReactElement => {
    const localRef = useRef<BaseButtonRef>();
    const elementRef = (ref || localRef) as RefObject<BaseButtonRef>;
    const labelRef = useRef<TextRef>(null);
    const backgroundHoverRef = useRef<HTMLDivElement>(null);
    const buttonContainerRef = useRef<HTMLDivElement>(null);
    const hoverLabelRef = useRef<HTMLDivElement>(null);

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
          labelRef,
        },
        setupTransitionInTimeline,
        setupTransitionOutTimeline,
      }),
    });

    const onMouseLeave = useCallback(() => {
      if (isDesktop) {
        mouseLeaveAnimation({
          backgroundHoverRef,
          labelRef,
          hoverLabelRef,
        });
      }
    }, []);

    const onMouseEnter = useCallback(() => {
      if (isDesktop) {
        mouseEnterAnimation({
          backgroundHoverRef,
          labelRef,
          hoverLabelRef,
        });
      }
    }, []);

    // useChangeTransitionState(transitionController, isVisible);

    return (
      <BaseButton
        className={classNames(styles.primaryButton, props.className)}
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
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <div ref={buttonContainerRef} className={styles.buttonContainer}>
          <div ref={backgroundHoverRef} className={classNames(styles.backgroundHover)} />
          <Text
            ref={labelRef}
            transitionInType="fadeIn"
            className={classNames(styles.label)}
            as="span"
            size="body-10"
            variant="sans"
          >
            {props.label || (props.link as Link)?.text}
          </Text>
          <div ref={hoverLabelRef} className={classNames(styles.hoverContainer, 'abs-fill')}>
            <Text
              transitionInType="none"
              className={classNames(styles.label, styles.hoverLabel)}
              as="span"
              size="body-10"
              variant="sans"
            >
              {props.label || (props.link as Link)?.text}
            </Text>
          </div>
        </div>
      </BaseButton>
    );
  },
);
