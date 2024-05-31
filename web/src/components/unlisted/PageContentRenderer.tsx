'use client';

import classNames from 'clsx';
import styles from '../../app/page.module.css';
import Text from '../atoms/text/Text';
import Icon from '../atoms/icon/Icon';
import DynamicComponent from '../DynamicComponent';
import type { Page } from '../../data/types/page.types';

export default function PageContentRenderer({ page, className }: {
  page: Page
  className?: string;
}) {
  return (
    <main className={classNames(styles.main, className, 'grid-gutter max-content-width')}>
      <Text
        as='h3'
        size='title-80'
      >
        title-80: lorem ipsum el {page.slug}
      </Text>

      <Text
        as='p'
        size='body-10'
      >
        body 10: lorem ipsum
      </Text>

      <Icon name='twitter' />

      {page?.blocks?.map((module) =>
        module._key ? (
          <DynamicComponent
            canTransitionIn
            data={module}
            key={module._key}
          />
        ) : null,
      )}
    </main>
  );
}
