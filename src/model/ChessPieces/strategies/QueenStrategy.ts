import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import {BishopStrategy, RookStrategy} from "./index";

export class QueenStrategy extends MovementStrategy {
  private _bs = new BishopStrategy();
  private _rs = new RookStrategy();

  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    const bp = this._bs.getReachablePositions(board,piecePosition,player);
    return this._rs.getReachablePositions(board,piecePosition,player).concat(bp);
  }
}
