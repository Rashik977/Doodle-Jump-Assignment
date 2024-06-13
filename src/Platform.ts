export class Platform {
  // Position, size, color, and speed properties
  private x: number;
  private y: number;
  private height: number;
  private width: number;
  private color: string;
  public ctx: CanvasRenderingContext2D;
  public speed: number;
  public image: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    speed: number,
    src: string
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.ctx = ctx;
    this.speed = speed;
    this.image = new Image();
    this.image.src = src;
  }

  set X(x: number) {
    this.x = x;
  }

  get X() {
    return this.x;
  }

  set Y(y: number) {
    this.y = y;
  }

  get Y() {
    return this.y;
  }

  get Height() {
    return this.height;
  }

  get Width() {
    return this.width;
  }

  // Draw platform as a rectangle
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Draw platform with an image
  drawWithImg() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // Move platform down the screen
  move(deltaTime: number) {
    this.y += 40 * deltaTime * 0.01;
  }
}
