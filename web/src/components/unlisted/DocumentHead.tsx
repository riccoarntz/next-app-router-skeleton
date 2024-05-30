import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';
// import builder from '@sanity/image-url';

type DocumentHeadProps = {
  siteTitle?: string;
  pageTitle?: string;
  title?: string;
  description?: string;
  noIndex?: boolean;
  // image?: Image;
};

const DocumentHead: NextPage<DocumentHeadProps> = ({
  siteTitle,
  noIndex,
  pageTitle,
  title,
  description,
  // image,
}) => {
  // const imageBuilder = builder()
  //   .projectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string)
  //   .dataset(process.env.NEXT_PUBLIC_SANITY_DATASET as string);
  const metaImage = undefined; // image && imageBuilder.image(image?.asset).width(1200).height(630).url()

  const renderedTitle = useMemo(() => {
    let t = title || pageTitle || siteTitle;
    if (t !== siteTitle) {
      t = `${t} | ${siteTitle}`;
    }

    return t;
  }, [siteTitle, pageTitle, title]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no"
        />

        {noIndex && (
          <>
            <meta name="robots" content="noindex,nofollow" />
            <meta name="googlebot" content="noindex,nofollow" />
            <meta name="google" content="nositelinkssearchbox" />
          </>
        )}

        <title>{`${renderedTitle}`}</title>

        <meta name="description" content={description} />
        <meta property="og:title" content={`${renderedTitle}`} />
        <meta property="og:description" content={description} />

        <meta property="og:site_name" content={siteTitle} />
        <meta name="twitter:site" content={siteTitle} />

        {metaImage && <meta property="og:image" content={metaImage} />}
        {metaImage && <meta property="og:image:width" content="1200" />}
        {metaImage && <meta property="og:image:height" content="630" />}
        {metaImage && <meta name="twitter:image" content={metaImage} />}

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </Head>
    </>
  );
};

export default DocumentHead;
