'use client';

import { useState } from 'react';
import classNames from 'clsx';
import useEventListener from 'hooks/useEventListener';
import styles from './DebugComponentLabel.module.scss';

export default function DebugComponentLabel({ label }: { label: string }): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const onKeydown = ({ key }: KeyboardEvent): void => {
    if (key === 'd' && process.env.NODE_ENV === 'development') {
      setIsActive((prevCheck) => !prevCheck);
    }
  };

  useEventListener('keydown', onKeydown);

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <div
          className={classNames(styles.debugComponentLabel, {
            [styles.isVisible]: isActive,
          })}
        >
          {label}
        </div>
      )}
    </>
  );
}
