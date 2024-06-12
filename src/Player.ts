import { Platform } from "./Platform";

export class Player extends Platform {
  private gravity: number;
  public dx: number;
  public dy: number;
  public isJumping: boolean;
  public isGrounded: boolean;
  public ctx: CanvasRenderingContext2D;
  public image: HTMLImageElement;
  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    speed: number,
    gravity: number,
    imgSrc: string
  ) {
    super(x, y, height, width, color, ctx, speed);
    this.gravity = gravity;
    this.dx = 0;
    this.dy = 0;
    this.isJumping = false;
    this.isGrounded = false;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = imgSrc;
  }

  moveLeft() {
    this.image.src = "blueL.png";
    this.dx = -2;
  }

  moveRight() {
    this.image.src = "blueR.png";
    this.dx = 2;
  }

  move() {
    this.dy += this.gravity;
    this.Y += this.dy;
    this.X += this.dx;
    if (this.X < 0) {
      this.X = this.ctx.canvas.width - this.Width;
    }
    if (this.X + this.Width > this.ctx.canvas.width) {
      this.X = 0;
    }
  }

  jump() {
    if (!this.isGrounded) return;
    this.dy = -8;
    this.isJumping = true;
    this.isGrounded = false;
  }
}
