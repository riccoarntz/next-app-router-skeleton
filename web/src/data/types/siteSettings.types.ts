import type { Seo } from './seo.types';
import type { Link } from './link.types';

// todo prepr global site settings?
export type SiteSettings = {
  siteTitle?: string;
  siteUrl?: string;
  seo?: Seo;
  menuLinks?: Array<Link>;
};
