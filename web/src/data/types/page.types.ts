import type { Seo } from './seo.types';
import type { CmsModuleData } from './module.types';

// todo prepr page?
export type PageReference = {
  // pageType: PageType;
  pageTitle: string;
  pageDescription?: string;
  slug: string;
  // featureImage: ImageWithMeta;
};

export type Page = {
  seo: Seo;
  slices?: Array<CmsModuleData>;
} & PageReference;
