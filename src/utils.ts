import { Player } from "./Player";
import { Platform } from "./Platform";
import { Enemy } from "./Enemy";

// Generate a random number between min and max
export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Check if player collides with a platform
export function collisionDetectionPlatform(player: Player, platform: Platform) {
  if (
    player.X < platform.X + platform.Width &&
    player.X + player.Width > platform.X &&
    player.Y + player.Height > platform.Y &&
    player.Y + player.Height < platform.Y + platform.Height &&
    player.dy >= 0
  ) {
    return true;
  }
  return false;
}

// Check if player collides with an enemy
export function collisionDetectionEnemy(player: Player, enemy: Enemy) {
  if (
    player.X < enemy.X + enemy.Width &&
    player.X + player.Width > enemy.X &&
    player.Y < enemy.Y + enemy.Height &&
    player.Y + player.Height > enemy.Y
  ) {
    return true;
  }
  return false;
}
