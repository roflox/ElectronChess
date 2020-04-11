import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { BishopStrategy, RookStrategy } from "./index";

export class QueenStrategy extends MovementStrategy {
  private _bs = new BishopStrategy();
  private _rs = new RookStrategy();

  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): { reachable: BoardPosition[]; potentiallyReachable: BoardPosition[] } {
    const bp = this._bs.getReachablePositions(board, piecePosition, player);
    const rp = this._rs.getReachablePositions(board, piecePosition, player);
    return {
      reachable: bp.reachable.concat(rp.reachable),
      potentiallyReachable: bp.potentiallyReachable.concat(
        rp.potentiallyReachable
      )
    };
  }
}
