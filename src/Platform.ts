export class Platform {
  private x: number;
  private y: number;
  private height: number;
  private width: number;
  private color: string;
  private ctx: CanvasRenderingContext2D;
  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.ctx = ctx;
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

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += 1;
  }
}
