import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { BishopStrategy, RookStrategy } from "./index";
import { Movement } from "../Movement";

export class QueenStrategy extends MovementStrategy {
  private _bs = new BishopStrategy();
  private _rs = new RookStrategy();

  getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    const bp = this._bs.getAvailableMoves(board, piecePosition, player);
    const rp = this._rs.getAvailableMoves(board, piecePosition, player);
    return bp.concat(rp);
  }
}
