import type { ReactElement } from 'react';
import classNames from 'clsx';
import Text from 'components/atoms/text/Text';

const Placeholder = ({
  componentName,
  className,
}: {
  componentName: string;
  className?: string;
}): ReactElement => (
  <div
    className={classNames('grid-gutter', 'block-margin', className)}
    style={{
      height: `50vh`,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'var(--foreground-color)',
      justifyContent: 'center',
      flexDirection: 'column',
      borderTop: 'solid 1px var(--background-color)',
      color: 'var(--background-color)',
      textAlign: 'center',
    }}
  >
    <Text
      as="h3"
      size="title-80"
      isVisible={{
        onMount: true,
        value: true,
      }}
    >
      Placeholder
    </Text>

    <Text
      as="p"
      size="body-10"
      isVisible={{
        onMount: true,
        value: true,
      }}
    >
      The component <strong>{componentName}</strong> has not been created yet.
    </Text>
  </div>
);

export default Placeholder;
