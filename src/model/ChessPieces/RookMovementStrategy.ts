import { BoardPosition } from "../Helper/BoardPosition";
import { MovementStrategy } from "./MovementStrategy";

export class RookMovementStrategy implements MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition
  ): BoardPosition[] {
    return null;
  }
}
