const defaultLocale = 'en';
const otherLocales = [];
const localeEnabled = false;
const locales = [defaultLocale, ...otherLocales];

const getCountryFolderNameByLocale = (locale) => {
  let country = defaultLocale;
  let language = country;
  if (locale !== defaultLocale && locale) {
    [language, country] = locale.split('-');
  }
  return (country || language).toLocaleLowerCase();
};

const getLanguageByLocale = (locale) => {
  let language = defaultLocale;
  if (locale !== defaultLocale && locale) {
    // [language] = locale.split('-');
    language = locale;
  }
  return language.toLocaleLowerCase();
};

const getLocalesByCountryFolder = (countryFolder) =>
  locales.filter(
    (locale) =>
      (locale.split('-')[1] || locale.split('-')[0]).toLowerCase() === countryFolder.toLowerCase(),
  );

const countryFolders = [...new Set(locales.map((locale) => getCountryFolderNameByLocale(locale)))];
const languages = [...new Set(locales.map((locale) => getLanguageByLocale(locale)))];

module.exports = {
  defaultLocale,
  otherLocales,
  locales,
  countryFolders,
  languages,
  localeEnabled,
  getLanguageByLocale,
  getCountryFolderNameByLocale,
  getLocalesByCountryFolder,
};
