import classNames from 'clsx';
import styles from './page.module.scss';
import getPageData from '../../server/getPageData';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import PageContentRenderer from '../../components/layout/page-content-renderer/PageContentRenderer';

export async function generateStaticParams() {
  // todo prepr get all paths?
  // const paths = formatPaths(pageQueries);
  return [];
}

// todo prepr render meta-data?
export async function generateMetadata() {
  return {
    title: 'Create Next App',
    description: 'Generated by create next app',
  };
}

export type DynamicPageProps = {
  params: {
    slug: Array<string>;
  };
};

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = params;
  const { isEnabled: draftEnabled } = draftMode();
  const pageData = await getPageData(slug?.join('/') || 'home', draftEnabled);

  if (!pageData) {
    notFound();
  }

  return (
    <PageContentRenderer
      page={pageData}
      className={classNames(styles.dynamicPage)}
    ></PageContentRenderer>
  );
}
