// eslint-disable-next-line max-classes-per-file
import EventDispatcher, { createEventClass } from 'seng-event';

export class DoubleLerpEvent extends createEventClass()('UPDATE') {}

export interface Point {
  x: number;
  y: number;
}

export default class DoubleLerp extends EventDispatcher {
  private isActive: boolean = true;

  private halfwayValue = { x: 0, y: 0 } as Point;
  private currentValue = { x: 0, y: 0 } as Point;
  private targetValue = { x: 0, y: 0 } as Point;

  private animationFrame: number | null = null;

  private readonly lerpValue: number = 0.2;
  private lastTime: number | null = null;

  private readonly useDifference: boolean = false;

  public constructor(
    initialValues: Point = { x: 0, y: 0 },
    lerpValue: number = 0.2,
    isActive: boolean = true,
    useDifference: boolean = false,
  ) {
    super();

    this.currentValue = initialValues;
    this.targetValue = initialValues;
    this.halfwayValue = initialValues;
    this.lerpValue = lerpValue;
    this.useDifference = useDifference;

    this.active = isActive;
  }

  public static lerp(v0: number, v1: number, t: number = 0.2): number {
    return v0 * (1 - t) + v1 * t;
  }

  public get value(): Point {
    const x = this.useDifference ? this.targetValue.x - this.currentValue.x : this.currentValue.x;
    const y = this.useDifference ? this.targetValue.y - this.currentValue.y : this.currentValue.y;
    return {
      x: Math.abs(x) < 0.0005 ? 0 : x,
      y: Math.abs(y) < 0.0005 ? 0 : y,
    };
  }

  public set value(value: Point) {
    this.currentValue = {
      x: value.x,
      y: value.y,
    };
    this.halfwayValue = {
      x: value.x,
      y: value.y,
    };
  }

  public get targetPoint(): Point {
    return this.targetValue;
  }

  public set targetPoint(value: Point) {
    this.targetValue = {
      x: value.x,
      y: value.y,
    };
  }

  public set active(isActive: boolean) {
    this.isActive = isActive;

    if (isActive) {
      this.animationFrame = requestAnimationFrame(this.tick);
    }
  }

  private readonly tick = (now: number): void => {
    if (!this.isActive) return;

    if (!this.lastTime) this.lastTime = now;
    if (this.isDisposed()) return;

    const damping = (1 - this.lerpValue) ** 60;
    const deltaTime = (now - this.lastTime) / 1000;
    const g = 1 - damping ** deltaTime;

    this.lastTime = now;

    this.halfwayValue.x = DoubleLerp.lerp(this.halfwayValue.x, this.targetValue.x, g);
    this.halfwayValue.y = DoubleLerp.lerp(this.halfwayValue.y, this.targetValue.y, g);

    this.currentValue.x = DoubleLerp.lerp(this.currentValue.x, this.halfwayValue.x, g);
    this.currentValue.y = DoubleLerp.lerp(this.currentValue.y, this.halfwayValue.y, g);

    this.dispatchEvent(new DoubleLerpEvent(DoubleLerpEvent.types.UPDATE));

    this.animationFrame = requestAnimationFrame(this.tick);
  };

  public dispose(): void {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
    }
    super.dispose();
  }
}
