import { headers, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  draftMode().disable();
  const headersList = headers();
  const referer = headersList.get('referer');

  if (referer) redirect(referer);

  return new Response('Draft mode is disabled');
}
