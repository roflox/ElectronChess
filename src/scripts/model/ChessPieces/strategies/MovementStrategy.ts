import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Movement } from "../Movement";

export abstract class MovementStrategy {
  public abstract getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[];
}
