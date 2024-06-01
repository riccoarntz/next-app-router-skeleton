/* eslint-disable import/no-cycle */
import type { ReactElement } from 'react';
import { forwardRef } from 'react';
import Placeholder from 'components/utils/Placeholder';
import type { CmsModuleData } from 'data/types/module.types';

/* PLOP_INJECT_TEMPLATE_IMPORT */
import PrimaryHero from 'components/blocks/primary-hero/PrimaryHero';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Components: { [key: string]: ReactElement | any } = {
  /* PLOP_INJECT_TEMPLATE */
  primaryHero: PrimaryHero,
};

export type DynamicComponentProps = { canTransitionIn?: boolean; className?: string } & {
  data: CmsModuleData;
}; // & DefaultCMSBlockProps
export type DynamicComponentRef = HTMLDivElement;

export default forwardRef<DynamicComponentRef, DynamicComponentProps>(
  ({ className, data, canTransitionIn }, ref): ReactElement | null => {
    if (data && typeof Components[data._type] !== 'undefined') {
      const Component = Components[data._type];
      return (
        <Component
          data={data}
          key={data._key}
          className={className}
          ref={ref}
          canTransitionIn={canTransitionIn}
          disableTriggerInOnScroll={false}
        />
      );
    }

    return data && data._type ? (
      <Placeholder className={className} componentName={data._type} key={data._type} />
    ) : null;
  },
);
