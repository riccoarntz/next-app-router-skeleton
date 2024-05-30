import config from '../locale.config';

export const cleanUrl = (splittedUrl: Array<string>, endIndex: number): string => {
  splittedUrl.splice(0, endIndex).join('/');
  return `/${splittedUrl.join('/')}`;
};

const containsLanguageOrCountry = (
  urlPart: string,
  currentLanguage: string,
  country?: string,
): boolean =>
  !!(urlPart && urlPart.toLocaleLowerCase() === currentLanguage.toLocaleLowerCase()) ||
  !!(country && urlPart && urlPart.toLocaleLowerCase() === country.toLocaleLowerCase());

// todo refactor as this was based on storyblok outputs
export const stripLocaleFromUrl = (url: string, locale?: string): string => {
  /**
   * When it's un NON-relinked url that is cloned from other country-folder:
   * Clean the country-folder (fr/nl/en) from the URL and use NextLink to set the correct current locale (fr-fr, fr-en, nl-nl, nl-en, etc).
   */
  const currentLanguage = config.getLanguageByLocale(locale);
  const currentCountry = config.getCountryFolderNameByLocale(locale);
  const splittedUrl = url.split('/');
  let newUrl = url;

  /**
   * Example Storyblok output: '/fr/page' - (/{countryFolder}/page)
   */
  if (
    !splittedUrl[0] &&
    containsLanguageOrCountry(splittedUrl[1], currentLanguage, currentCountry)
  ) {
    newUrl = cleanUrl(splittedUrl, 2);
  } else if (containsLanguageOrCountry(splittedUrl[0], currentLanguage, currentCountry)) {
    /**
     * Example Storyblok output: 'fr/page' - ({countryFolder}/page)
     */
    newUrl = cleanUrl(splittedUrl, 1);
  }

  /**
   * Example Storyblok output: /fr-nl/page:
   */
  const localeMatch = config.locales.find((locale: string) => newUrl.startsWith(`/${locale}/`));
  if (localeMatch) {
    newUrl = newUrl.replace(`/${locale}`, '');
  }

  /**
   * Example Storyblok output: /{clonedFromCountryFolder}/{countryFolder}/page:
   * NON-relinked cases(resolved_relations) that are cloned from other country-folder need to be cleaned.
   */
  const match = config.countryFolders.find((country: string) => newUrl.startsWith(`/${country}/`));
  if (match) {
    newUrl = newUrl.replace(`/${match}`, '');
  }

  // if (newUrl.indexOf('/') === 0) {
  //   newUrl = newUrl.replace('/', '');
  // }

  return newUrl;
};

export function stripHashFromUrl(path?: string): string | undefined {
  let newPath = path;
  if (path?.includes('#')) {
    newPath = path.slice(0, path.indexOf('#'));
  }
  return newPath;
}

export function stripQueriesFromUrl(path?: string): string | undefined {
  let newPath = path;
  if (path?.includes('?')) {
    newPath = path.slice(0, path.indexOf('?'));
  }
  return newPath;
}
