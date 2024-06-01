import type { TransitionComponentProps } from 'util/react-transition-component/types/transitionComponent.types';
import type { CmsModuleData } from 'data/types/module.types';
import type { Link } from '../../../data/types/link.types';

export type PrimaryHeroRef = HTMLElement;
export type PrimaryHeroData = {
  title: string;
  description?: string;
  cta?: Link;
} & CmsModuleData;
export type PrimaryHeroProps = {
  data: PrimaryHeroData;
} & TransitionComponentProps;
