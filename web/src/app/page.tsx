'use client';

import styles from './page.module.css';
import Text from '../components/atoms/text/Text';
import classNames from 'clsx';
import Icon from '../components/atoms/icon/Icon';
import { useRef } from 'react';

export default function Home() {
  const localRef = useRef(null);

  return (
    <main className={classNames(styles.main, 'grid-gutter max-content-width')}>
      <Text
        as='h3'
        size='title-80'
      >
        title-80: lorem ipsum el
      </Text>

      <Text
        as='p'
        size='body-10'
      >
        body 10: lorem ipsum
      </Text>

      <Icon name='twitter' ref={localRef}/>
    </main>
  );
}
