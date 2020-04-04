import { BoardState } from "../Helper/BoardState";
import { BoardPosition } from "../Helper/BoardPosition";
import { MovementStrategy } from "./MovementStrategy";

export class RookMovementStrategy implements MovementStrategy {
  getReachablePositions(
    boardState: BoardState,
    piecePosition: BoardPosition
  ): BoardPosition[] {return null};
}
