const bulletSound = new Audio("sound/arcade-laser.mp3");
export class Bullet {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private color: string;
  private speed: number;
  private ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.color = "yellow";
    this.speed = 5;
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

  set Width(width: number) {
    this.width = width;
  }

  get Width() {
    return this.width;
  }

  set Height(height: number) {
    this.height = height;
  }

  get Height() {
    return this.height;
  }

  // Method to draw the bullet
  draw() {
    bulletSound.play();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Method to move the bullet
  move(deltaTime: number) {
    this.y -= this.speed * deltaTime * 0.01;
  }
}
