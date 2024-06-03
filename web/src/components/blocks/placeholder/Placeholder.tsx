import type { ReactElement } from 'react';
import classNames from 'clsx';
import Text from 'components/atoms/text/Text';
import { useMemo } from 'react';

const Placeholder = ({
  componentName,
  className,
  data,
}: {
  componentName: string;
  className?: string;
  data?: unknown;
}): ReactElement => {
  const code = useMemo(() => JSON.stringify(data), [data]);
  return (
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
        variant="sans"
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
        <br />
        <strong>data:</strong>
        <br />
      </Text>
      <code
        style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          padding: '12px',
          marginTop: '12px',
        }}
      >
        {code}
      </code>
    </div>
  );
};

export default Placeholder;
