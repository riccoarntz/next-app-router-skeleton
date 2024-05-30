import BaseScroller from 'util/scroll/scroller/BaseScroller';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { addEventListener } from 'seng-disposable-event-listener';

gsap.registerPlugin(ScrollToPlugin);

export default class NativeScroller extends BaseScroller {
  // private scrollListener!: any;

  public constructor(
    private readonly options: {
      wrapper?: HTMLDivElement;
      content?: HTMLDivElement;
      isPopup?: boolean;
    },
  ) {
    super();

    const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    this.disposables.add(
      addEventListener(
        !this.options.isPopup ? window : (this.options.wrapper as HTMLElement),
        'scroll',
        this.onScroll.bind(this),
      ),
    );
    this.disposables.add(
      addEventListener(window, wheelEvent, this.onWheelChange.bind(this), { passive: false }),
    );
    this.onResize();
  }

  private onWheelChange(event: Event): void {
    if (this.lockPosition !== undefined) {
      event.preventDefault();
    }
  }

  public onResize(): void {
    this.contentHeight = !this.options.isPopup
      ? document.body.scrollHeight
      : (this?.options?.content?.scrollHeight as number);
    this.wrapperHeight = window.innerHeight;

    this.contentWidth = !this.options.isPopup
      ? document.body.scrollWidth
      : (this.options.content?.scrollWidth as number);
    this.wrapperWidth = window.innerWidth;

    super.onResize();
  }

  public onScroll(): void {
    this.previousScrollStatus = this.scrollStatus;

    this.scrollStatus = {
      offset: {
        x: this.getScrollLeft(),
        y: Math.round(this.getScrollTop()),
      },
      limit: {
        x: this.contentWidth - this.wrapperWidth,
        y: Math.round(this.contentHeight - this.wrapperHeight),
      },
    };

    super.onScroll();
  }

  private getScrollLeft(): number {
    return !this.options.isPopup
      ? window.scrollX || document.documentElement.scrollLeft
      : (this.options.wrapper?.scrollLeft as number);
  }

  private getScrollTop(): number {
    return !this.options.isPopup
      ? window.scrollY || document.documentElement.scrollTop
      : (this.options.wrapper?.scrollTop as number);
  }

  public lock(): void {
    document.documentElement.style.touchAction = 'none';
    document.body.style.touchAction = 'none';
    // document.documentElement.style.setProperty('overscroll-behavior', 'none');

    this.lockPosition = this.getScrollTop();
  }

  public unLock(): void {
    document.body.style.touchAction = 'unset';
    document.documentElement.style.touchAction = 'unset';
    // document.documentElement.style.setProperty('overscroll-behavior', null);

    this.lockPosition = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function, @typescript-eslint/explicit-module-boundary-types,class-methods-use-this
  public scrollIntoView(element: HTMLElement, options?: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types,class-methods-use-this
  public scrollTo(x: number, y: number, duration?: number, options?: any): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(window, {
        duration: duration ? duration / 1000 : 0,
        ease: options?.easing || 'Power1.easeInOut',
        scrollTo: {
          y,
          x,
        },
        onComplete: () => {
          resolve();

          if (options?.callback) {
            options.callback();
          }
        },
      });
    });
  }

  public getScroller(): HTMLElement | undefined {
    return !this.options.isPopup ? document.documentElement : this.options.wrapper;
  }

  public dispose(): void {
    super.dispose();
  }
}
