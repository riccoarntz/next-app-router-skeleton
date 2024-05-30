import BaseScroller from 'util/scroll/scroller/BaseScroller';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export default class LenisScroller extends BaseScroller {
  private readonly instance: Lenis;
  private readonly scrollListener!: () => void;
  private readonly tick;

  public constructor(
    private readonly options: {
      wrapper?: HTMLDivElement | Window;
      content?: HTMLDivElement;
    },
  ) {
    super();

    this.instance = new Lenis({
      wrapper: this.options.wrapper,
      content: this.options.content,
      // easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      //   easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2, //easeInOutSine
      // easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // outExpo
      easing: (t) =>
        t === 0
          ? 0
          : t === 1
            ? 1
            : t < 0.5
              ? 2 ** (20 * t - 10) / 2
              : (2 - 2 ** (-20 * t + 10)) / 2, // easeInOutExpo

      orientation: 'vertical', // vertical, horizontal
      gestureOrientation: 'vertical', // vertical, horizontal, both
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1,
      // smoothTouch: false,
    });

    this.tick = this.raf.bind(this);
    gsap.ticker.add(this.tick);

    this.scrollListener = this.onScroll.bind(this);
    this.instance.on('scroll', this.scrollListener);
    this.onResize();
  }

  public getInstance(): Lenis {
    return this.instance;
  }

  private raf(time: number): void {
    this.instance.raf(time * 1000);
  }

  public onResize(): void {
    // super.onResize();
  }

  public onScroll(): void {
    ScrollTrigger.update();
    this.previousScrollStatus = this.scrollStatus;

    this.scrollStatus = {
      offset: {
        x: 0,
        y: this.instance.scroll,
      },
      limit: {
        x: this.instance.limit,
        y: this.instance.limit,
      },
    };

    super.onScroll();
  }

  public lock(): void {
    this.instance.stop();
  }

  public unLock(): void {
    this.instance.start();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public scrollTo(x: number, y: number, duration?: number, options?: any): Promise<void> {
    return new Promise((resolve) => {
      this.instance.scrollTo(y, {
        ...options,
        onComplete() {
          resolve();

          if (options?.callback) {
            options.callback();
          }
        },
      });
    });
  }

  public getScroller(): Window | HTMLElement | undefined {
    return this?.instance?.rootElement;
  }

  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  public update(): void {}

  public dispose(): void {
    gsap.ticker.remove(this.tick);
    this.instance.off('scroll', this.scrollListener);
    this.instance.destroy();

    super.dispose();
  }
}
