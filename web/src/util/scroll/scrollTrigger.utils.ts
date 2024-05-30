import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import eases from '../animation/eases';

gsap.config({ nullTargetWarn: process.env.NODE_ENV !== 'production' });

ScrollTrigger.config({
  ignoreMobileResize: true,
  // syncInterval: 99999,
});

export const defaultScrollTriggerOptions = {
  start: 'top bottom',
  end: 'bottom top',
  scrub: false,
  // markers: true,
};

export const getDefaultScrollTriggerVariables = (
  options?: ScrollTrigger.StaticVars,
): ScrollTrigger.StaticVars => ({
  ...defaultScrollTriggerOptions,
  ...options,
});

export const createScrollTrigger = (
  trigger: HTMLElement,
  animation: gsap.core.Timeline,
  variables?: ScrollTrigger.Vars,
): ScrollTrigger =>
  ScrollTrigger.create({
    animation,
    trigger,
    ...getDefaultScrollTriggerVariables(variables),
  });

export const scrollToTop = (): gsap.core.Tween => {
  const distance = window.scrollY || document.documentElement.scrollTop;
  const speedPerPixel = 0.02;
  const speed = Math.max(0.01, Math.min(1, Math.abs(speedPerPixel * distance)));
  return gsap.to(window, { duration: speed, ease: eases.easeInOut1, scrollTo: { y: 0 } });
};
