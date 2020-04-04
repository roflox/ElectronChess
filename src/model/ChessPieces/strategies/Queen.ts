import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import {Bishop, Rook} from "./index";

export class Queen extends MovementStrategy {
  private _bs = new Bishop();
  private _rs = new Rook();

  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    const bp = this._bs.getReachablePositions(board,piecePosition,player);
    return this._rs.getReachablePositions(board,piecePosition,player).concat(bp);
  }
}
