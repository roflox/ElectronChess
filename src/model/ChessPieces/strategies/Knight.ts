import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export class Knight extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    return [];
  }
}
