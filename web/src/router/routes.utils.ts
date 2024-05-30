import type { StaticPaths } from 'data/types/next';
import config from 'locale.config';

export const formatPath = (
  slug: string | Array<string>, //  | boolean
  locales?: Array<string>,
): StaticPaths => {
  const paths: StaticPaths = [];
  if (config.localeEnabled && locales && locales.length > 0) {
    const newSlug = slug;
    if (newSlug && (newSlug as Array<string>).length > 0) {
      // if ((newSlug as Array<string>)[0] === 'home') newSlug = false;
    }
    locales.forEach((locale) => paths.push({ params: { slug: newSlug }, locale }));
  } else {
    paths.push({ params: { slug } });
  }

  return paths;
};

export const formatPaths = (
  links: Array<string>,
  // paramName: string = ParamName.Slug,
  catchAllRoute: boolean = true,
  // excludePaths: Array<string> = [''],
): StaticPaths => {
  let paths: StaticPaths = [];
  links.forEach((slug: string) => {
    if (slug.startsWith('/')) {
      // eslint-disable-next-line no-param-reassign
      slug = slug.replace('/', '');
    }

    // if (excludePaths.includes(`${slug}`)) {
    //   return;
    // }

    // Get Array for slug because of catch-all-routes (https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
    const pathSlug: Array<string> | string | boolean = catchAllRoute ? slug.split('/') : slug;
    const { locales } = config;
    paths = paths.concat(formatPath(pathSlug, locales as unknown as Array<string>));
  });

  return paths;
};
