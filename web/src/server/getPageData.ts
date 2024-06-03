import fileCacheMiddleware from './fileCacheMiddleware';
import type { Page } from '../data/types/page.types';

// todo integrate prepr?
async function getPageData(slug: string, preview?: boolean): Promise<Page> {
  console.log(preview);
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
    blocks: [
      {
        _type: 'primaryHero',
        _key: '1',
        // @ts-ignore
        title: 'This is my title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
        cta: {
          text: 'my label',
          linkType: 'internal',
          url: '/about',
        },
      },
      {
        _type: 'relatedArticles',
        _key: '2',
        // @ts-ignore
        title: 'This is my title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
        cta: {
          text: 'my label',
          linkType: 'internal',
          url: '/',
        },
      },
      {
        _type: 'primaryHero',
        _key: '3',
        // @ts-ignore
        title: 'This is my title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
        cta: {
          text: 'my label',
          linkType: 'internal',
          url: '/',
        },
      },
    ],
  };
}

async function getPageDataCached(slug: string, preview?: boolean): Promise<Page> {
  return fileCacheMiddleware(slug, async () => getPageData(slug, preview));
}

export default getPageDataCached;
