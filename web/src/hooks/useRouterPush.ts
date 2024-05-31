import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
// import type { NextRouter } from 'next/router';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function useRouterPush(): AppRouterInstance['push'] {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push }] = useState<Pick<AppRouterInstance, 'push'>>({
    push: (path) => routerRef.current.push(path),
  });
  return push;
}
