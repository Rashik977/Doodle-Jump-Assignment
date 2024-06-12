export class Platform {
  private x: number;
  private y: number;
  private height: number;
  private width: number;
  private color: string;
  public ctx: CanvasRenderingContext2D;
  public speed: number;
  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    ctx: CanvasRenderingContext2D,
    speed: number
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.ctx = ctx;
    this.speed = speed;
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

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawWithImg(image: HTMLImageElement) {
    this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
  }
}
