import bowser from 'bowser';

export function isIpadOs() {
  if (typeof window !== 'undefined') {
    return (
      !!navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform)
    );
  }
  return false;
}

export function isIos() {
  return bowser.ios || isIpadOs();
}

export function isTouch() {
  return bowser.mobile || bowser.tablet || isIpadOs();
}

export const isDesktop: boolean = !isTouch();
export const isTablet: boolean = bowser.tablet || isIpadOs();
export const isMobile: boolean = bowser.mobile;

export function isPortrait() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return h > w;
}

export function isLandscape() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return w > h;
}

export const isClient = typeof window !== 'undefined';
