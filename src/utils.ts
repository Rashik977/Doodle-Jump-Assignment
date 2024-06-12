import { Player } from "./Player";
import { Platform } from "./Platform";

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function collisionDetection(player: Player, platform: Platform) {
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
