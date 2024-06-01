import classNames from 'clsx';
import type { ReactElement, RefObject } from 'react';
import { forwardRef, useRef } from 'react';
import styles from './PrimaryHero.module.scss';
import { setupTransitionInTimeline } from './PrimaryHero.transitions';
import type { PrimaryHeroProps, PrimaryHeroRef } from './PrimaryHero.data';
import { useScrollTransition } from 'util/react-transition-component';
import {
  defaultCanTransitionIn,
  defaultDisableTriggerInOnScroll,
} from 'util/react-transition-component/types/transitionComponent.types';
import Text from '../../atoms/text/Text';
import Icon from '../../atoms/icon/Icon';
import type { TextRef } from '../../atoms/text/Text.data';
import PrimaryButton from '../../atoms/primary-button/PrimaryButton';
import type { PrimaryButtonRef } from '../../atoms/primary-button/PrimaryButton.data';

export default forwardRef<PrimaryHeroRef, PrimaryHeroProps>(
  (
    {
      disableTriggerInOnScroll = defaultDisableTriggerInOnScroll,
      canTransitionIn = defaultCanTransitionIn,
      data,
      ...props
    },
    ref,
  ): ReactElement => {
    const localRef = useRef(null);
    const elementRef = (ref || localRef) as RefObject<HTMLDivElement>;
    const titleRef = useRef<TextRef>(null);
    const descriptionRef = useRef<TextRef>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<PrimaryButtonRef>(null);

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
          descriptionRef,
          titleRef,
          iconRef,
          ctaRef,
        },
        setupTransitionInTimeline,
      }),
    });

    return (
      <div
        ref={elementRef}
        className={classNames(styles.primaryHero, props.className, 'block-margin')}
      >
        <div className={classNames(styles.textContent, 'grid-gutter max-content-width')}>
          <Icon ref={iconRef} name="twitter" className={classNames(styles.icon)} />
          <Text
            ref={titleRef}
            as="h3"
            size="title-80"
            transitionInType="splitLinesSlideUp"
            variant="sans"
          >
            {data.title}
          </Text>
          {data.description && (
            <Text
              ref={descriptionRef}
              as="p"
              size="body-10"
              transitionInType="splitWordFadeSlideUp"
              className={styles.description}
            >
              {data.description}
            </Text>
          )}
          <PrimaryButton ref={ctaRef} link={data.cta} className={styles.cta} />
        </div>
      </div>
    );
  },
);
