import styles from './DraftModeBanner.module.scss';
import PrimaryLink from '../../atoms/primary-link/PrimaryLink';
import Text from '../../atoms/text/Text';

export default function DraftModeBanner() {
  return (
    <div className={styles.draftModeBanner}>
      <Text as="p" size="body-10">
        🚧 Draft mode enabled 🚧
      </Text>
      <PrimaryLink href="/api/disable-draft" label="click here to disable" textVariant="sans" />
    </div>
  );
}
