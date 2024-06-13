import { Platform } from "./Platform";
import { Bullet } from "./Bullet";

const jumpSound = new Audio("sound/jump.wav");

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
    super(x, y, height, width, color, ctx, speed, imgSrc);
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
    // if (!this.isGrounded) return;
    this.dy = -7;
    this.isJumping = true;
    // this.isGrounded = false;
    jumpSound.play();
  }

  // Array to store bullets
  public bullets: Bullet[] = [];

  // Method to shoot a bullet
  shoot() {
    this.image.src = "blueT.png";
    const bullet = new Bullet(this.X + this.Width / 2, this.Y, this.ctx);
    this.bullets.push(bullet);
  }

  // Method to update and draw bullets
  updateBullets() {
    this.bullets.forEach((bullet, index) => {
      bullet.move();
      bullet.draw();

      // Remove bullets that are out of screen
      if (bullet.Y < 0) {
        this.bullets.splice(index, 1);
      }
    });
  }
}
