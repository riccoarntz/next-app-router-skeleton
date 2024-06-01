import type { PageReference } from './page.types';

export type LinkType = 'internal' | 'external';

export type Link = {
  // todo prepr custom link?
  linkType: LinkType;
  text?: string;
  page?: PageReference;
  url?: string;
};
