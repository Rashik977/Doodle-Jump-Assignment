import "./style.css";
import { Platform } from "./Platform";
import {
  randomNumber,
  collisionDetectionPlatform,
  collisionDetectionEnemy,
} from "./utils";
import { Player } from "./Player";
import { BrownPlatform } from "./BrownPlatform";
import { Enemy } from "./Enemy";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 500;
canvas.height = 800;
canvas.style.backgroundImage = "url('bg.png')";
canvas.style.border = "1px solid black";

// Game settings
let gamespeed = 3;
let score = 0;
let highScore = Number(localStorage.getItem("highScore"));
let gameRunning = true;
let gameStarted = false;
let gamePaused = false;
let gameDifficulty = 1;

const enemySound = new Audio("sound/monsterblizu.mp3");
const breakSound = new Audio("sound/lomise.mp3");
const fallingSound = new Audio("sound/falling-sound-arcade.mp3");
const playerDeathByMonster = new Audio("sound/jumponmonster-arcade.mp3");
const enemyDeath = new Audio("sound/barrel-explosion.mp3");

fallingSound.volume = 0.4;

// Time variables for platform spawning
let PlatformSpawnTime = 0;
const PlatformSpawnInterval = 500;

// Counter for green platforms
let greenPlatformCount = 0;

// Arrays to store platforms and enemies
const platforms: Platform[] = [];
const enemies: Enemy[] = [];

// Generate platforms
function generatePlatforms() {
  for (let i = 0; i < 3; i++) {
    const x = randomNumber(0, canvas.width - 50);
    const y = -100 * i;
    const height = 20;
    const width = 70;
    // Generate brown platform after a certain number of green platforms
    if (
      greenPlatformCount >=
      randomNumber(1, 50 - (gameDifficulty > 45 ? 45 : gameDifficulty))
    ) {
      platforms.push(new BrownPlatform(x, y, height, width, ctx, 1));
      greenPlatformCount = 0;
    } else {
      platforms.push(
        new Platform(x, y, height, width, "green", ctx, 1, "greenplatform.png")
      );
      greenPlatformCount++;
    }

    if (
      randomNumber(1, 100 - (gameDifficulty > 80 ? 80 : gameDifficulty)) === 1
    ) {
      enemySound.play();
      enemies.push(
        new Enemy(
          randomNumber(0, canvas.width - 150),
          y - 30,
          55,
          100,
          "red",
          ctx,
          1,
          "monster.png"
        )
      );
    }
  }
}

// Generate initial platforms to start the game
function generateInitialPlatforms() {
  const basePlatform = new Platform(
    canvas.width / 2,
    canvas.height - 100,
    20,
    70,
    "green",
    ctx,
    1,
    "greenplatform.png"
  );
  platforms.push(basePlatform);
  for (let i = 0; i < 6; i++) {
    const x = randomNumber(0, canvas.width - 50);
    const y = i * 200;
    const height = 20;
    const width = 70;
    const color = "green";
    platforms.push(
      new Platform(x, y, height, width, color, ctx, 1, "greenplatform.png")
    );
  }
}

generateInitialPlatforms();

// Create player object
const player = new Player(
  canvas.width / 2,
  0,
  70,
  70,
  "red",
  ctx,
  1,
  0.09,
  "blueR.png"
);

// Event listeners for player movement
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
    case "ArrowUp":
      player.shoot();
      break;
    case "Escape":
      gamePaused = !gamePaused;
      if (gamePaused) {
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Paused", canvas.width / 2, canvas.height / 2);
      } else {
        update(0);
      }

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

// Draw the score on the canvas
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 70, 50);
}

// Draw the high score on the canvas
function drawHighScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("High Score: " + highScore, 95, 100);
}

// Game over function
function gameOver() {
  gameRunning = false;
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.75;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 50);
  ctx.font = "20px Arial";
  ctx.fillText(
    "Press Enter to Restart",
    canvas.width / 2,
    canvas.height / 2 + 100
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      gameRunning = true;
      location.reload();
    }
  });
}

// Start game function
function startGame() {
  ctx.fillStyle = "black";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Press Enter to Start",
    canvas.width / 2,
    canvas.height / 2 - 100
  );
  ctx.font = "20px Arial";
  ctx.fillText(
    "Use Left and Right Arrow keys to move",
    canvas.width / 2,
    canvas.height / 2 + 100
  );
  ctx.fillText(
    "Press Up Arrow to shoot the enemies",
    canvas.width / 2,
    canvas.height / 2 + 150
  );
  ctx.fillText(
    "Press Esc to pause the game",
    canvas.width / 2,
    canvas.height / 2 + 200
  );
  ctx.fillStyle = "red";
  ctx.fillText(
    "Game will get harder as you progress",
    canvas.width / 2,
    canvas.height / 2 + 250
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      gameStarted = true;
      update(0);
    }
  });
}

// main game loop
function update(timestamp: number) {
  // Start the game if not started
  if (!gameStarted) {
    startGame();
    return;
  }

  // Return if game is not running
  if (!gameRunning || gamePaused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Arrays to store platforms and enemies to remove
  const platformsToRemove: number[] = [];
  const enemiesToRemove: number[] = [];

  // Iterate through platforms
  platforms.forEach((platform, index) => {
    platform.drawWithImg();

    // Move platform if player is jumping
    if (player.isJumping) {
      platform.move();
      platform.speed = gamespeed;
    }

    // Update brown platform if it's breaking
    if (platform instanceof BrownPlatform) {
      platform.update(16);
    }

    // Check collision with player
    if (collisionDetectionPlatform(player, platform)) {
      if (!(platform instanceof BrownPlatform)) player.jump();

      // Start breaking brown platform if not already breaking
      if (platform instanceof BrownPlatform && !platform.isBreaking) {
        breakSound.play();
        platform.startBreaking();
      }
    }

    if (platform.Y > canvas.height) {
      platformsToRemove.push(index);
    }
  });

  // Remove platforms
  for (const index of platformsToRemove.reverse()) {
    platforms.splice(index, 1);
    score++;
  }

  if (player.Y < 0) player.Y = 0;

  player.drawWithImg();
  player.move();

  // Game over if player falls out of screen
  if (player.Y + player.Height > canvas.height + 100) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", score.toString());
    }
    fallingSound.play();
    gameOver();
  }

  // Iterate through enemies
  enemies.forEach((enemy, index) => {
    enemy.drawWithImg();
    enemy.move();

    // Move enemies with the platforms
    if (player.isJumping) {
      enemy.move();
    }

    // Check collision with player and game over
    if (collisionDetectionEnemy(player, enemy)) {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", score.toString());
      }
      playerDeathByMonster.play();
      gameOver();
    }

    if (enemy.Y > canvas.height) {
      enemiesToRemove.push(index);
    }
  });

  // Remove enemies
  for (const index of enemiesToRemove.reverse()) {
    enemies.splice(index, 1);
  }

  // Generate new platforms if player is jumping
  if (player.isJumping) {
    const elapsedTime = timestamp - PlatformSpawnTime;
    if (elapsedTime >= PlatformSpawnInterval) {
      generatePlatforms();
      PlatformSpawnTime = timestamp;
    }
  }

  // Update and draw bullets
  player.updateBullets();

  // Check for bullet-enemy collisions
  player.bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.X < enemy.X + enemy.Width &&
        bullet.X + bullet.Width > enemy.X &&
        bullet.Y < enemy.Y + enemy.Height &&
        bullet.Y + bullet.Height > enemy.Y
      ) {
        // Remove the bullet and the enemy on collision
        enemySound.pause();
        enemySound.currentTime = 0;
        enemyDeath.play();
        player.bullets.splice(bulletIndex, 1);
        enemies.splice(enemyIndex, 1);
      }
    });
  });

  // Draw score and high score
  drawScore();
  drawHighScore();

  // Increase game difficulty
  if (score % 40 === 0 && score !== 0) {
    gameDifficulty += 0.5;
  }

  console.log(gameDifficulty);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
