import fileCacheMiddleware from './fileCacheMiddleware';
import type { Page } from '../data/types/page.types';

// todo integrate prepr?
async function getPageData(slug: string, preview?: boolean): Promise<Page> {
  // todo await connect prepr
  return {
    pageTitle: 'my page title',
    pageDescription: 'pageDescription',
    slug,
    seo: {
      metaDescription: 'metaDescription',
      noIndex: false,
      metaTitle: 'metaTitle',
    },
    blocks: [],
  };
}

async function getPageDataCached(slug: string, preview?: boolean): Promise<Page> {
  return fileCacheMiddleware(slug, async () => getPageData(slug, preview));
}

export default getPageDataCached;
