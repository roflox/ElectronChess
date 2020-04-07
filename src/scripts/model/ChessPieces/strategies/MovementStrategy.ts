import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export abstract class MovementStrategy {
  public abstract getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[];
}
