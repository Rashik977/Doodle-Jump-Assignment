import { Platform } from "./Platform";

export class Enemy extends Platform {
  private direction: number;
  public img: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    speed: number,
    imgSrc: string
  ) {
    super(x, y, height, width, color, ctx, speed, imgSrc);
    this.direction = 1;
    this.img = new Image();
    this.img.src = imgSrc;
  }

  move() {
    super.move();
    this.X += this.speed * this.direction;
    if (this.X <= 0 || this.X + this.Width > this.ctx.canvas.width) {
      this.direction *= -1;
    }
  }
}
