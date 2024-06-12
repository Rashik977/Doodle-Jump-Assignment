import "./style.css";
import { Platform } from "./Platform";
import { randomNumber } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 300;
canvas.height = 800;
canvas.style.border = "1px solid black";
const platforms: Platform[] = [];

let PlatformSpawnTime = 0;
const PlatformSpawnInterval = 1000;

function generatePlatforms() {
  for (let i = 0; i < 3; i++) {
    const x = randomNumber(0, canvas.width - 50);
    const y = -100 * i;
    const height = 10;
    const width = 40;
    const color = "green";
    platforms.push(new Platform(x, y, height, width, color, ctx));
  }
}

function deletePlatforms() {
  platforms.forEach((platform, index) => {
    if (platform.Y >= canvas.height) {
      platforms.splice(index, 1);
    }
  });
}

generatePlatforms();

function update(timestamp: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((platform) => {
    platform.draw();
    platform.move();
    deletePlatforms();
  });

  const elapsedTime = timestamp - PlatformSpawnTime;
  const enemySpawnInterval = PlatformSpawnInterval;

  if (elapsedTime >= enemySpawnInterval) {
    generatePlatforms();
    PlatformSpawnTime = timestamp;
  }
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
