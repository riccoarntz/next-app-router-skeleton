import { DisposableManager } from 'seng-disposable-manager';
import { addEventListener } from 'seng-disposable-event-listener';
import debounce from 'lodash/debounce';
import { WheelDirection } from 'util/scroll/WheelGesture';

export type ScrollStatus = { offset: { x: number; y: number }; limit: { x: number; y: number } };

export default class BaseScroller {
  public contentHeight: number = 0;
  public contentWidth: number = 0;
  public wrapperHeight: number = 0;
  public wrapperWidth: number = 0;

  public scrollDirection!: WheelDirection;

  public disposables: DisposableManager;
  public lockPosition!: number | undefined;
  private onScrollUpdateCallbacks: Array<{
    callback: (status: ScrollStatus, direction: WheelDirection) => void;
    priority: number;
  }> = [];

  public getInstance() {}

  public previousScrollStatus: ScrollStatus = {
    offset: {
      x: 0,
      y: 0,
    },
    limit: {
      x: 0,
      y: 0,
    },
  };

  public scrollStatus: ScrollStatus = {
    offset: {
      x: 0,
      y: 0,
    },
    limit: {
      x: 0,
      y: 0,
    },
  };

  public constructor() {
    this.disposables = new DisposableManager();
    this.disposables.add(
      addEventListener(window, 'resize', debounce(this.onResize.bind(this), 100)),
    );
  }

  public onResize(): void {}

  public getScrollStatus(): { offset: { x: number; y: number }; limit: { x: number; y: number } } {
    return this.scrollStatus;
  }

  // public lock(): void {
  // }
  //
  // public unLock(): void {
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public scrollIntoView(element: HTMLElement, options?: any): void {}

  private checkScrollDirection(): void {
    if (this.previousScrollStatus.offset.y < this.scrollStatus.offset.y) {
      this.scrollDirection = WheelDirection.Forward;
    } else if (this.previousScrollStatus.offset.y > this.scrollStatus.offset.y) {
      this.scrollDirection = WheelDirection.Backward;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public scrollTo(x: number, y: number, duration?: number, options?: any): Promise<void> {
    return Promise.resolve();
  }

  public addScrollListener(scrollListener: {
    callback: (status: ScrollStatus, direction: WheelDirection) => void;
    priority: number;
  }): void {
    this.onScrollUpdateCallbacks.push(scrollListener);
    this.onScrollUpdateCallbacks.sort((a, b) => a.priority - b.priority);
  }

  public removeScrollListener(
    callback: (status: ScrollStatus, direction: WheelDirection) => void,
  ): void {
    this.onScrollUpdateCallbacks = this.onScrollUpdateCallbacks.filter(
      (cb) => cb.callback !== callback,
    );
  }

  public onScroll(): void {
    this.checkScrollDirection();

    for (let i = 0; i < this.onScrollUpdateCallbacks.length; i++) {
      this.onScrollUpdateCallbacks[i].callback(this.scrollStatus, this.scrollDirection);
    }
  }

  public getScroller(): HTMLElement | undefined | Window {
    return undefined;
  }

  public scrollToTop(duration?: number): void {
    this.scrollTo(0, 0, duration);
  }

  public dispose(): void {
    if (this.disposables) {
      this.scrollToTop();
      this.disposables.dispose();
    }
  }
}
