import type { AbstractCtaProps, ButtonType, LinkTarget } from 'data/button';
import { useRouter } from 'next/router';
import type { MutableRefObject } from 'react';
import { useMemo, useRef } from 'react';
import { stripQueriesFromUrl } from '../util/url.utils';
import { customButtonAction } from 'data/button';
import { resolveLink } from '../util/resolveLink';
import type { Link } from 'data/types/link.types';

export function useCta(props: AbstractCtaProps): {
  target: MutableRefObject<string | undefined>;
  url?: string;
  rel: MutableRefObject<string | undefined>;
  disabled?: boolean;
  buttonType?: ButtonType;
  handleClick: (event: Event) => void;
  ariaLabel?: string;
  title?: string;
  isExternalUrl: MutableRefObject<boolean>;
  isCustomAction: boolean;
  text?: string;
} {
  const router = useRouter();
  // todo resolve Prepr page-references?
  const linkData = useMemo(() => {
    if (props.link) {
      return resolveLink(props.link);
    }
    return null;
  }, [props.link]);

  const buttonType = useMemo(
    () => (!props.href && !linkData?.url ? props.type || 'button' : undefined),
    [linkData?.url, props.href, props.type],
  );

  const isCustomAction = useMemo(() => {
    if (props?.href) {
      return (customButtonAction as unknown as Array<string>).includes(props.href);
    }
    return false;
  }, [props.href]);

  const title = props.title || props.label;
  const ariaLabel = props?.ariaLabel ?? props.label;
  const isExternalUrl = useRef(
    (typeof props.href === 'string' &&
      (props.href.startsWith('http') ||
        props.href.startsWith('www.') ||
        props.href.startsWith('tel:') ||
        props.href.startsWith('mailto:'))) ||
      (props.link as Link)?.linkType === 'external',
  );

  const target = useRef<LinkTarget>(props.target || '_self');

  // Force target=_blank when it's an external URL.
  if (isExternalUrl.current) {
    target.current = '_blank';
  }

  const rel = useRef<string>();
  // Force a noooper rel when it's an external-link
  if (target.current === '_blank') {
    rel.current = 'noopener noreferrer';
  }

  // const url = useRef<string | undefined>(props.href);
  const url = useMemo(() => {
    if (isCustomAction) {
      return undefined;
    }

    let url = props.href;

    if (!isExternalUrl.current && (props.href || linkData?.url)) {
      url = props.href || linkData?.url; // todo localize path?

      if (props.href?.startsWith('?')) {
        url = `${stripQueriesFromUrl(router.asPath)}${props.href}`;
      }
    }
    // Is External URL
    else if (isExternalUrl.current) {
      url = props.href || linkData?.url;

      // Add missing 'https://' at start of URL if it's starting with www.
      if (typeof props?.href === 'string' && props?.href.startsWith('www.')) {
        url = `https://${props.href}`;
      } else if (typeof linkData?.url === 'string' && linkData?.url.startsWith('www.')) {
        url = `https://${linkData?.url}`;
      }
    }

    return url;
  }, [isCustomAction, props.href, router.asPath, linkData?.url]);

  function handleClick(event?: Event): void {
    if (!isExternalUrl.current && url) {
      event?.preventDefault();
      router.push(url as string);
    }
  }

  return {
    target,
    url,
    rel,
    // disabled,
    buttonType,
    handleClick,
    ariaLabel,
    title,
    text: linkData?.text,
    isExternalUrl,
    isCustomAction,
  };
}
