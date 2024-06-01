import compact from 'lodash/compact';
import get from 'lodash/get';
import type { PageReference } from '../data/types/page.types';
import type { Link } from '../data/types/link.types';

// todo resolve prepr page-refs/links if needed/possible?
function resolveSlug(document: PageReference | Link) {
  const slug = get(document, ['slug'], get(document, ['current'], document));
  if (slug !== 'home') {
    return slug;
  }
}

export function resolveInternalLinkUrl(doc: PageReference | Link) {
  const parts = compact([resolveSlug(doc)]);
  return `${compact(parts).join('/')}`;
}
// todo resolve prepr page-refs/links if needed/possible?
export function resolveLink(linkOrPage: Link | PageReference): {
  text?: string;
  url?: string;
} | null {
  if (!linkOrPage) return null;
  if ((linkOrPage as Link).linkType) {
    if ((linkOrPage as Link).linkType === 'external') {
      return linkOrPage as Link;
    }
    return {
      text: get(linkOrPage, ['text'], get(linkOrPage, ['page', 'pageTitle'])),
      url: (linkOrPage as Link).page
        ? resolveInternalLinkUrl((linkOrPage as Link).page as PageReference)
        : (linkOrPage as Link).url,
    };
  }
  return {
    text: get(linkOrPage, ['pageTitle']),
    url: resolveInternalLinkUrl(linkOrPage),
  };
}

export function resolveLinkText(linkOrPage: Link | PageReference) {
  return get(linkOrPage, ['text'], get(linkOrPage, ['page', 'pageTitle']));
}
