// import useIsomorphicLayoutEffect from '../../../hooks/useIsomorphicLayoutEffect';
// import type { GuardFunction, TransitionController } from '../../core-transition-component';
// // import { useFlowProviderContext } from '../components/FlowProvider';
// // import type { FlowProviderContextType } from '../components/FlowProvider';
// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
// import useGlobalStore from '../../../stores/globalStore';
// import { guard } from 'util/core-transition-component/utils/navigation.utils';
//
// /**
//  * Creates gsap.core.Timeline that will start as soon the page is mounted && entire-flow is not hijacked && have executed an optional function before this.
//  *
//  * @example
//  * const myRef = useRef<HTMLDivElement>(null);
//  *
//  * const transitionController = useTransitionController(() => ({
//  *   ref: myRef,
//  *   refs: {
//  *     myRef,
//  *   },
//  *   setupTransitionInTimeline(timeline, { myRef }) { ... },
//  *   setupTransitionInTimeline(timeline, { myRef }) { ... },
//  * }));
//  *
//  *  useRouteEnterTransition(transitionController, {
//  *     beforeTransitionIn: [your GuardFunction],
//  *  });
//  */
// export function useRouteEnterTransition(
//   transitionController: TransitionController,
//   options?: {
//     beforeTransitionIn?: GuardFunction;
//   },
//   onDispose?: () => void,
// ): void {
//   // const { flowHijacked } = useFlowProviderContext() as FlowProviderContextType;
//   const setPageIsMounted = useGlobalStore((state) => state.setPageIsMounted);
//
//   useIsomorphicLayoutEffect(() => {
//     setPageIsMounted(true);
//
//     (async () => {
//       // Refresh scrollTriggers that were already created but need an update, such as a site-footer below the page
//       ScrollTrigger.refresh();
//
//       guard(async () => {
//         // await flowHijacked.current;
//         transitionController?.transitionIn();
//       }, options?.beforeTransitionIn);
//     })();
//
//     return () => {
//       if (onDispose) {
//         onDispose();
//       }
//     };
//   }, [transitionController]);
// }
