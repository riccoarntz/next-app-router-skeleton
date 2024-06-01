import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  const { slug } = params;

  // todo perhaps validate/protect using a hash?
  if (!slug) {
    return new Response('Invalid slug', { status: 401 });
  }

  const path = slug === 'home' ? '/' : `/${slug}`;
  draftMode().enable();
  redirect(path);
}
