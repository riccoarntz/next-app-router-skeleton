import gsap, { Linear } from 'gsap';
import { cloneTimeline } from '../core-transition-component';

export const createLoopingTicker = (
  elements: Array<HTMLElement>,
  container: HTMLElement,
  speed: number = 3,
): gsap.core.Timeline => {
  const masterTimeline = gsap.timeline({ repeat: -1 });

  const timeline = gsap.timeline({ paused: true });
  let totalWidth = 0;
  const containerWidth = container.offsetWidth || 0;

  elements.forEach((element) => {
    totalWidth += element?.offsetWidth || 0;
  });

  let nextStartPosition = 0;
  let firstItemDuration = 0;
  let cycleDuration = 0;
  new Array(3).fill(0).forEach((value, loopIndex) => {
    nextStartPosition = 0;
    elements.forEach((element, index) => {
      const width = element?.offsetWidth || 0;
      const startPosition = nextStartPosition;
      const pixelsPerSecond = speed * Math.min(100, Math.max(30, containerWidth * 0.1));

      const fromPosition = containerWidth - startPosition;
      const endPosition = -width - startPosition;

      const distance = Math.abs(endPosition - fromPosition);
      const duration = distance / pixelsPerSecond;
      const position = (startPosition + totalWidth * loopIndex) / pixelsPerSecond;

      nextStartPosition = (element?.offsetLeft || 0) + width;

      timeline.fromTo(
        element,
        {
          x: `${(fromPosition / width) * 100}%`,
        },
        {
          duration,
          ease: 'none',
          x: `${(endPosition / width) * 100}%`,
        },
        position,
      );

      if (index === 0 && loopIndex === 0) {
        firstItemDuration = Math.abs(fromPosition - startPosition) / pixelsPerSecond; // timeline.duration();
      }
    });

    if (loopIndex === 0) {
      cycleDuration = timeline.duration();
    }
  });

  masterTimeline.fromTo(
    timeline,
    {
      time: cycleDuration,
    },
    {
      time: `+=${cycleDuration - firstItemDuration}`,
      duration: cycleDuration - firstItemDuration,
      ease: Linear.easeNone,
    },
  );

  return masterTimeline;
};

export function getNestedLabelTime(timeline?: gsap.core.Timeline, label?: string) {
  const children = timeline?.getChildren(true, false, true);
  let i = children?.length;
  let tl;
  let time = 0;
  if (children && i) {
    while (i--) {
      // @ts-ignore
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (label in children[i]?.labels) {
        tl = children[i];
        // @ts-ignore
        time = tl?.labels[label];
        break;
      }
    }
    if (tl) {
      while (tl !== timeline) {
        time = (tl?.startTime() || 0) + time / (tl?.timeScale() || 1);
        tl = tl?.parent;
      }
    }
  }
  return time;
}

export const createTimelineSequence = (
  timelines: Array<gsap.core.Timeline>,
  spacing: number,
  timeline?: gsap.core.Timeline,
  startSpacing: number = 0,
): gsap.core.Timeline => {
  let sequence: gsap.core.Timeline;

  if (!timeline) {
    sequence = gsap.timeline({ paused: true });
  } else {
    sequence = timeline;
  }

  timelines.forEach((animation, i) => {
    // Add bit of extra spacing between the featured tile and normal tiles
    const timeOffset = i === 0 ? 0 : i * spacing + startSpacing;
    sequence.add(animation, timeOffset);
    sequence.addLabel(`label-${i}`);
  });

  return sequence;
};

export const createLoopingTimeline = (
  timelines: Array<gsap.core.Timeline>,
  spacing: number,
  masterTimeline?: gsap.core.Timeline,
): gsap.core.Timeline => {
  let masterTl!: gsap.core.Timeline;

  if (!masterTimeline) {
    masterTl = gsap.timeline({
      paused: true,
      repeat: -1,
      onReverseComplete: () => {
        if (masterTl) {
          masterTl.totalTime(masterTl.rawTime() + masterTl.duration() * 100);
        }
      },
    });
  } else {
    masterTl = masterTimeline;
  }

  const sequence = gsap.timeline({ paused: true, immediateRender: true, lazy: false });
  const cycleDuration = spacing * timelines.length;
  let duration: number = 0;

  const items = [...timelines, ...timelines, ...timelines];
  items.forEach((timeline, i) => {
    sequence.add(cloneTimeline(timeline, 'in').play(), i * spacing);
    duration = duration || timeline.duration();
  });

  masterTl.fromTo(
    sequence,
    {
      time: cycleDuration + duration / 2,
    },
    {
      time: `+=${cycleDuration}`,
      duration: cycleDuration,
      ease: Linear.easeNone,
    },
  );

  return masterTl;
};
