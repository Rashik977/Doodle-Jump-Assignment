import "./style.css";
import { Platform } from "./Platform";
import { randomNumber, collisionDetection } from "./utils";
import { Player } from "./Player";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 300;
canvas.height = 800;
canvas.style.backgroundImage = "url('bg.png')";
canvas.style.border = "1px solid black";
const platforms: Platform[] = [];
let gamespeed = 3;

let PlatformSpawnTime = 0;
const PlatformSpawnInterval = 1000;

function generatePlatforms() {
  for (let i = 0; i < 3; i++) {
    const x = randomNumber(0, canvas.width - 50);
    const y = -200 * i;
    const height = 10;
    const width = 40;
    const color = "green";
    platforms.push(new Platform(x, y, height, width, color, ctx, 1));
  }
}

function generateInitialPlatforms() {
  for (let i = 0; i < 6; i++) {
    const x = randomNumber(0, canvas.width - 50);
    const y = i * 200;
    const height = 10;
    const width = 40;
    const color = "green";
    platforms.push(new Platform(x, y, height, width, color, ctx, 1));
  }
}

generateInitialPlatforms();

const player = new Player(150, 100, 70, 70, "red", ctx, 1, 0.09, "blueR.png");

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "a":
      player.moveLeft();
      break;
    case "d":
      player.moveRight();
      break;
    case " ":
      player.jump();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  if (
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "a" ||
    e.key === "d"
  ) {
    player.dx = 0;
  }
});

function update(timestamp: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const platformsToRemove: number[] = [];

  platforms.forEach((platform, index) => {
    platform.draw();

    if (player.isJumping) {
      platform.move();
      platform.speed = gamespeed;
    }

    if (collisionDetection(player, platform)) {
      player.isGrounded = true;
      player.Y = platform.Y - player.Height;
      player.dy = 0;
      player.isJumping = false;
    }

    if (platform.Y > canvas.height) {
      platformsToRemove.push(index);
    }
  });

  for (const index of platformsToRemove.reverse()) {
    platforms.splice(index, 1);
  }

  player.drawWithImg(player.image);
  player.move();

  if (player.isJumping) {
    const elapsedTime = timestamp - PlatformSpawnTime;
    if (elapsedTime >= PlatformSpawnInterval) {
      generatePlatforms();
      PlatformSpawnTime = timestamp;
    }
  }

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
