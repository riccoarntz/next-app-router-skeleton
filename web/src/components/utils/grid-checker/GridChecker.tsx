'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'clsx';
import type { IDeviceState } from 'seng-device-state-tracker/lib/IDeviceStateConfig';
import { useDeviceStateTracker } from 'hooks/useDeviceStateTracker';
import useEventListener from 'hooks/useEventListener';
import styles from './GridChecker.module.scss';
import sharedVariables from 'data/shared-variable/shared-variables.json';

export default function GridChecker(): JSX.Element {
  const [columns, setColumns] = useState<Array<JSX.Element>>([]);
  const [isActive, setIsActive] = useState(false);
  const { deviceState: activeDeviceState } = useDeviceStateTracker();

  const sizes = useRef(
    Object.keys(sharedVariables.grid).map((queryName) => ({
      columnCount: (sharedVariables.grid as { [key: string]: { [key: string]: number } })[queryName]
        .columnCount,
      deviceState: (sharedVariables.deviceState as IDeviceState)[queryName],
    })),
  );

  const match = useMemo(() => {
    const matches = sizes.current.filter((item) => activeDeviceState >= item.deviceState);
    return matches[matches.length - 1];
  }, [activeDeviceState]);

  useEffect(() => {
    const gridColumns = [];
    for (let i = 0; i < match.columnCount; i++) {
      const column = (
        <div
          key={i}
          className={classNames(styles.gridColumn, 'grid-col-1 grid-col-m-1 grid-col-l-1')}
        />
      );
      gridColumns.push(column);
    }
    setColumns(gridColumns);
  }, [match]);

  const onKeydown = ({ key }: KeyboardEvent): void => {
    if (key === 'g') {
      setIsActive((prevCheck) => !prevCheck);
    }
  };

  useEventListener('keydown', onKeydown);

  return (
    <div
      className={classNames(styles.gridChecker, 'max-content-width', {
        [styles.isVisible]: isActive,
      })}
    >
      <div className="grid-row">{columns}</div>
    </div>
  );
}
