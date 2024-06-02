import classNames from 'clsx';
import styles from '../../../app/page.module.css';
import DynamicComponent from '../../molecules/dynamic-component/DynamicComponent';
import type { Page } from '../../../data/types/page.types';

export default function PageContentRenderer({
  page,
  className,
}: {
  page: Page;
  className?: string;
}) {
  return (
    <main className={classNames(styles.main, className)}>
      {page?.blocks?.map((module) =>
        module._key ? <DynamicComponent canTransitionIn data={module} key={module._key} /> : null,
      )}
    </main>
  );
}
