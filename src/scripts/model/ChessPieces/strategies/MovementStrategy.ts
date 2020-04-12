import { BoardPosition } from "../../BoardPosition";
import { Movement } from "../Movement";

export abstract class MovementStrategy {
  public abstract getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    originalCaller?: boolean
  ): Movement[];
}
