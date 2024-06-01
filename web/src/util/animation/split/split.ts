import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { fadeFromTo } from 'util/animation/fade/fade';
import {
  defaultSplitCharFadeInOptions,
  defaultSplitLineSlideUpOptions,
  defaultSplitWordFadeSlideInOptions,
} from './split.config';
import type {
  SplitLineSlideUpOptions,
  SplitType,
  SplitWordFadeSlideInOptions,
  SplitCharFadeInOptions,
} from './split.types';
import { getMinimumStaggerDuration } from './split.utils';

gsap.registerPlugin(SplitText);

export function splitElement(
  element: HTMLElement,
  splitType: SplitType,
  props?: {
    charsClass?: string;
    wordsClass?: string;
    linesClass?: string;
  },
  addInnerChild?: boolean,
): {
  elements: Array<HTMLElement>;
  split?: SplitText;
} {
  let split;
  let elements: Array<HTMLElement> = element.querySelectorAll(
    `.split-element.split-${splitType}`,
  ) as unknown as Array<HTMLElement>;

  if (elements.length === 0) {
    let type: string = splitType;
    if (splitType === 'chars') {
      type = `${splitType} words`;
    }
    if (splitType === 'lines') {
      type = `${splitType}`;
    }

    split = new SplitText(element, {
      type, // 'chars,words,lines',
      charsClass: `split-element split-chars ${props?.charsClass ?? ''}`,
      wordsClass: `split-element split-words ${props?.wordsClass ?? ''}`,
      linesClass: `split-element split-lines ${props?.linesClass ?? ''}`,
    });

    elements = split[splitType] as Array<HTMLElement>;

    if (addInnerChild) {
      const innerElements: Array<HTMLElement> = [];
      elements.forEach((splitElement) => {
        const div = document.createElement('div');
        div.innerHTML = splitElement.innerHTML;

        // eslint-disable-next-line no-param-reassign
        splitElement.innerHTML = '';
        splitElement.appendChild(div);
        innerElements.push(div);
      });

      elements = innerElements;
    }
  } else if (addInnerChild) {
    const children: Array<HTMLElement> = [];
    elements.forEach((element) => {
      const child = element.querySelector('div') as HTMLElement;
      if (child) {
        children.push(child);
      }
    });

    if (children.length > 0) {
      elements = children;
    }
  }

  return { elements, split };
}

export function splitLinesSlideUp(
  element: HTMLElement,
  options: SplitLineSlideUpOptions = {},
): gsap.core.Timeline {
  const {
    splitType,
    y,
    duration,
    reversed,
    maxStaggerDuration,
    minStaggerDuration,
    addInnerChild,
    ease,
  } = {
    ...defaultSplitLineSlideUpOptions,
    ...options,
  };
  const timeline = gsap.timeline();

  if (splitType) {
    let { elements } = splitElement(
      element,
      splitType,
      {
        linesClass: 'mask-split-line',
      },
      addInnerChild,
    );

    timeline.fromTo(
      element,
      {
        // y,
        opacity: 0,
      },
      {
        // y: 0,
        ease,
        duration,
        opacity: 1,
        // clearProps: 'y',
      },
      0,
    );

    if (reversed) {
      elements = elements.reverse();
    }

    if (elements && elements.length > 0) {
      timeline.fromTo(
        elements,
        {
          y,
        },
        {
          y: 0,
          ease,
          duration,
          clearProps: 'y',
          stagger: getMinimumStaggerDuration(
            elements.length,
            maxStaggerDuration,
            minStaggerDuration,
          ),
        },
        0,
      );
    } else {
      // eslint-disable-next-line no-console
      // console.log(element, element.innerHTML, 'no text');
    }
  }

  return timeline;
}

export function splitLinesSlideOut(
  element: HTMLElement,
  options: SplitLineSlideUpOptions = {},
): gsap.core.Timeline {
  const { splitType, y, duration, maxStaggerDuration, minStaggerDuration, addInnerChild } = {
    ...defaultSplitLineSlideUpOptions,
    ...options,
  };
  const timeline = gsap.timeline();

  if (splitType) {
    const { elements } = splitElement(
      element,
      splitType,
      {
        linesClass: 'mask-split-line',
      },
      addInnerChild,
    );

    timeline.to(
      elements,
      {
        y,
        duration,
        stagger: getMinimumStaggerDuration(elements.length, maxStaggerDuration, minStaggerDuration),
      },
      0,
    );
  }

  return timeline;
}

export function splitWordFadeSlideIn(
  element: HTMLElement,
  options: SplitWordFadeSlideInOptions = {},
): gsap.core.Timeline {
  const { splitType, duration, maxStaggerDuration, minStaggerDuration, addInnerChild, ease, from } =
    {
      ...defaultSplitWordFadeSlideInOptions,
      ...options,
    };
  const timeline = gsap.timeline();

  if (splitType) {
    const { elements } = splitElement(
      element,
      splitType,
      {
        linesClass: '',
      },
      addInnerChild,
    );

    if (element) {
      timeline.add(fadeFromTo(element, { duration: 0.001 }), 0);
    }

    if (elements && elements.length > 0) {
      timeline.add(
        fadeFromTo(elements, {
          from,
          duration,
          stagger: getMinimumStaggerDuration(
            elements.length,
            maxStaggerDuration,
            minStaggerDuration,
          ),
          ease,
        }),
        0,
      );
    } else {
      // eslint-disable-next-line no-console
      // console.log(element, element.innerHTML, 'no text');
    }
  }

  return timeline;
}

export function splitCharFadeIn(
  element: HTMLElement,
  options: SplitCharFadeInOptions = {},
): gsap.core.Timeline {
  const { splitType, duration, maxStaggerDuration, minStaggerDuration, ease, from } = {
    ...defaultSplitCharFadeInOptions,
    ...options,
  };
  const timeline = gsap.timeline();

  if (splitType) {
    const { elements } = splitElement(element, splitType, {
      linesClass: '',
    });

    if (element) {
      timeline.add(fadeFromTo(element, { duration: 0.001 }), 0);
    }

    if (elements && elements.length > 0) {
      timeline.add(
        fadeFromTo(elements, {
          from,
          duration,
          ease,
          stagger: getMinimumStaggerDuration(
            elements.length,
            maxStaggerDuration,
            minStaggerDuration,
          ),
        }),
        0,
      );
    } else {
      // eslint-disable-next-line no-console
      // console.log(element, element.innerHTML, 'no text');
    }
  }

  return timeline;
}
