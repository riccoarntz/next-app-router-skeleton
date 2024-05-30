// import bowser from 'bowser';
import useWindowSize from '../hooks/useWindowSize';
import useMount from '../hooks/useMount';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

export default function useViewportCustomProperties(): void {
  const windowSize = useWindowSize();

  useMount(() => {
    // (document as HTMLDocument).documentElement.style.setProperty('--vh', `${windowSize.height * 0.01}px`);
    // (document as HTMLDocument).documentElement.style.setProperty('--vw', `${windowSize.width * 0.01}px`);
  });

  useIsomorphicLayoutEffect(() => {
    // if (!bowser.ios)
    (document as HTMLDocument).documentElement.style.setProperty(
      '--vh',
      `${windowSize.height * 0.01}px`,
    );
    (document as HTMLDocument).documentElement.style.setProperty(
      '--vw',
      `${document.body.clientWidth * 0.01}px`,
    );

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`);

    // );
  }, [windowSize.height, windowSize.width]);
}
