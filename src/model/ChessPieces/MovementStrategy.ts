import { BoardPosition } from "../Helper/BoardPosition";

export abstract class MovementStrategy {
  public abstract getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition
  ): BoardPosition[];
}
