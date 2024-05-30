import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import useRouterPush from './useRouterPush';
import { stripLocaleFromUrl, stripQueriesFromUrl } from 'util/url.utils';
import useGlobalStore from '../stores/globalStore';
import type { GuardFunction } from '../util/core-transition-component/types/transition.types';
import { guard } from '../util/core-transition-component/utils/navigation.utils';

export const history = {
  from: '',
  to: '',
};

export const useBeforeHistoryChange = (beforeRelease?: GuardFunction): void => {
  // const [leaveConfirmed, setLeaveConfirmed] = useState(false);
  const leaveConfirmed = useRef(false);
  const beforeReleaseRef = useRef(beforeRelease);
  const router = useRouter();
  const currentPath = useRef(stripLocaleFromUrl(router.asPath));
  const routerPush = useRouterPush();
  const setBeforeHistoryChangePath = useGlobalStore((state) => state.setBeforeHistoryChangePath);

  useEffect(
    () => {
      const beforeHistoryChange = (url: string) => {
        const cleanUrl = stripLocaleFromUrl(url, router.locale);
        // cleanUrl = stripQueriesFromUrl(cleanUrl);

        if (
          leaveConfirmed.current ||
          stripQueriesFromUrl(cleanUrl) === stripQueriesFromUrl(currentPath.current)
        )
          return;

        router.events.emit('routeChangeError', cleanUrl, currentPath.current);
        // eslint-disable-next-line no-throw-literal
        throw `Route change to "${url}" was aborted (this error can be safely ignored)`;
      };

      const onRouteChangeError = (toPath: string, fromPath: string) => {
        history.to = toPath;
        history.from = fromPath;
        setBeforeHistoryChangePath(toPath, fromPath);

        guard(() => {
          router.events.off('beforeHistoryChange', beforeHistoryChange);
          router.events.off('routeChangeError', onRouteChangeError);
          leaveConfirmed.current = true;
          routerPush(toPath);
        }, beforeReleaseRef.current);
      };

      router.events.on('routeChangeError', onRouteChangeError);
      router.events.on('beforeHistoryChange', beforeHistoryChange);

      return () => {
        router.events.off('beforeHistoryChange', beforeHistoryChange);
        router.events.off('routeChangeError', onRouteChangeError);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};
