import { Power1 } from 'gsap';
import NativeScroller from 'util/scroll/scroller/NativeScroller';
import type { ScrollStatus } from 'util/scroll/scroller/BaseScroller';
import type { WheelDirection } from 'util/scroll/WheelGesture';
import LenisScroller from './scroller/LenisScroller';

export type Scroller = NativeScroller | LenisScroller;

export enum ScrollerTypes {
  Native = 'Native',
  Lenis = 'Lenis',
}

export type ScrollerType = keyof typeof ScrollerTypes;
export type InitOptions = {
  wrapper?: HTMLDivElement;
  content?: HTMLDivElement;
  type?: ScrollerType;
  disableBodyScroll?: boolean;
  isPopup?: boolean;
};

export default class ScrollInstance {
  private scroller!: Scroller;
  private initOptions!: InitOptions;

  public init(initOptions: InitOptions): void {
    this.initOptions = initOptions;

    if (this.scroller) {
      this.scroller.dispose();
    }

    switch (initOptions.type) {
      case ScrollerTypes.Lenis: {
        this.scroller = new LenisScroller({
          wrapper: initOptions.wrapper,
          content: initOptions.content,
        });
        break;
      }
      default: {
        this.scroller = new NativeScroller({
          wrapper: initOptions.wrapper,
          content: initOptions.content,
          isPopup: initOptions.isPopup,
        });
      }
    }
  }

  public hasTransform(): boolean {
    if (this.checkIfScrollerExist()) {
      return (
        this.initOptions.type !== ScrollerTypes.Native &&
        this.initOptions.type !== ScrollerTypes.Lenis
      );
    }
    return false;
  }

  public getScrollInstance(): Scroller {
    return this.scroller;
  }

  public getScroller(): HTMLElement | Window | undefined {
    if (this.checkIfScrollerExist()) {
      return this.scroller.getScroller();
    }
    return undefined;
  }

  public lock(): void {
    if (this.checkIfScrollerExist()) {
      this.scroller.lock();
    }
  }

  public checkIfScrollerExist() {
    return !!this.scroller;
  }

  public addScrollListener(scrollListener: {
    callback: (status: ScrollStatus, direction: WheelDirection) => void;
    priority: number;
  }) {
    if (this.checkIfScrollerExist()) {
      this.scroller.addScrollListener(scrollListener);
    }
  }

  public removeScrollListener(callback: (status: ScrollStatus, direction: WheelDirection) => void) {
    if (this.checkIfScrollerExist()) {
      this.scroller.removeScrollListener(callback);
    }
  }

  public unLock(): void {
    if (this.checkIfScrollerExist()) {
      this.scroller.unLock();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public scrollIntoView(element: HTMLElement, options?: any): void {
    if (this.checkIfScrollerExist()) {
      this.scroller.scrollIntoView(element, options);
    }
  }

  public scrollToTop(duration?: number): void {
    if (this.checkIfScrollerExist()) {
      this.scroller.scrollToTop(duration);
    }
  }

  public getScrollStatus(): ScrollStatus {
    if (this.checkIfScrollerExist()) {
      return this.scroller.getScrollStatus();
    }
    return {
      offset: {
        x: 0,
        y: 0,
      },
      limit: {
        x: 0,
        y: 0,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public scrollTo(x: number, y: number, duration?: number, options?: any): Promise<void> {
    if (this.checkIfScrollerExist()) {
      return this.scroller.scrollTo(x, y + this.scroller.scrollStatus.offset.y, duration, {
        easing: Power1.easeInOut,
        ...options,
      });
    }
    return Promise.resolve();
  }

  public dispose(): void {
    if (this.scroller) {
      this.scroller.dispose();
    }
  }
}
