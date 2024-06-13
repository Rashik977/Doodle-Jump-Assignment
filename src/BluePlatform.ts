import { Platform } from "./Platform";

export class BluePlatform extends Platform {
  private direction: number;
  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    ctx: CanvasRenderingContext2D,
    speed: number
  ) {
    super(x, y, height, width, "blue", ctx, speed, "blueplatform.png");
    this.direction = 1;
  }

  // Draw blue platform
  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.X, this.Y, this.Width, this.Height);
  }

  // Move blue platform
  move(deltaTime: number) {
    super.move(deltaTime);
    this.X += this.direction * this.speed * deltaTime * 0.01;
    if (this.X < 0 || this.X + this.Width > this.ctx.canvas.width) {
      this.direction *= -1;
    }
  }
}
