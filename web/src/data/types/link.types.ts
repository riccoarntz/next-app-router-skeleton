import type { PageReference } from './page.types';

export type Link = {
  // todo prepr custom link?
  linkType: 'internal' | 'external';
  text?: string;
  page?: PageReference;
  url?: string;
};
