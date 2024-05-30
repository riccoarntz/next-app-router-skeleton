import debounce from 'lodash/debounce';
import BaseEvent from 'seng-event/lib/BaseEvent';
import EventDispatcher from 'seng-event/lib/EventDispatcher';
import { addEventListener } from 'seng-disposable-event-listener';

export default class DeviceOrientationListener extends EventDispatcher {
  public static orientationChange = 'OrientationManager.orientationChange';
  public static landscape = 'landscape';
  public static portrait = 'portrait';
  private static readonly inputNode: string = 'INPUT';
  private readonly resizeListener!: () => void;
  private readonly focusListener!: () => void;
  private readonly blurListener!: () => void;
  private readonly orientationListener!: () => void;
  private previousWidth = 0;
  private previousHeight = 0;
  private inputFocused = false;
  private orientation?: string;

  public constructor() {
    super();

    if (typeof window !== 'undefined') {
      this.resizeListener = addEventListener(
        window,
        'resize',
        debounce(this.handleResize.bind(this), 200),
      );
      this.orientationListener = addEventListener(
        window,
        'orienationchange',
        debounce(this.handleResize.bind(this), 200),
      );

      this.focusListener = addEventListener(document, 'focus', this.handleFocus.bind(this), true);
      this.blurListener = addEventListener(document, 'blur', this.handleBlur.bind(this), true);
    }
  }

  /**
   * @public
   * @method init
   */
  public init(): void {
    if (typeof window !== 'undefined') {
      this.setOrientation();
    }
  }

  /**
   * @private
   * @method handleResize
   */
  private handleResize(): void {
    this.setOrientation();
  }

  /**
   * @private
   * @method handleFocus
   */
  private handleFocus(event: Event): void {
    if (
      event.target &&
      (event.target as HTMLElement).tagName === DeviceOrientationListener.inputNode
    ) {
      this.inputFocused = true;
    }
  }

  /**
   * @private
   * @method handleBlur
   */
  private handleBlur(event: Event): void {
    if (
      event.target &&
      (event.target as HTMLElement).tagName === DeviceOrientationListener.inputNode
    ) {
      this.inputFocused = false;
    }
  }

  /**
   * @private
   * @method setOrientation
   */
  private setOrientation(): void {
    // eslint-disable-next-line no-restricted-globals
    const height: number = window.innerHeight ? window.innerHeight : screen.availHeight;
    // eslint-disable-next-line no-restricted-globals
    const width: number = window.innerWidth ? window.innerWidth : screen.availWidth;

    if (this.orientation !== undefined) {
      document.body.classList.remove(this.orientation.toLowerCase());
    }

    if ((width !== this.previousWidth || this.previousHeight !== height) && !this.inputFocused) {
      this.previousWidth = window.innerWidth;
      this.previousHeight = window.innerHeight;

      if (height > width) {
        this.orientation = DeviceOrientationListener.portrait;
      } else if (width > height) {
        this.orientation = DeviceOrientationListener.landscape;
      }
    }

    if (this.orientation !== undefined) {
      document.body.classList.add(this.orientation.toLowerCase());
    }

    // if (previousOrientation !== this.orientation) {
    this.dispatchEvent(
      new BaseEvent(DeviceOrientationListener.orientationChange, { orientation: this.orientation }),
    );
    // }
  }

  /**
   * @public
   * @method dispose
   */
  public dispose(): void {
    this.orientationListener();
    this.resizeListener();
    this.focusListener();
    this.blurListener();
  }
}
