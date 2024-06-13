import { Platform } from "./Platform";

export class BrownPlatform extends Platform {
  private breakTime: number;
  private currentTime: number;
  public isBreaking: boolean;

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    ctx: CanvasRenderingContext2D,
    speed: number
  ) {
    super(x, y, height, width, "brown", ctx, speed, "brownplatform.png");
    this.breakTime = 50; // Time in milliseconds before the platform breaks
    this.currentTime = 0;
    this.isBreaking = false;
  }

  // Draw brown platform
  draw() {
    this.ctx.fillStyle = "brown";
    this.ctx.fillRect(this.X, this.Y, this.Width, this.Height);
  }

  // Start breaking platform
  startBreaking() {
    this.isBreaking = true;
    this.currentTime = 0;
  }

  // Update platform breaking logic
  update(deltaTime: number) {
    if (this.isBreaking) {
      this.currentTime += deltaTime;
      if (this.currentTime >= this.breakTime) {
        this.Y += this.speed * deltaTime * 0.01; // Platform falls after breaking
      }
    }
  }
}
