import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export class KingStrategy extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    //horizontal
    const reachable: BoardPosition[] = [];
    const y = piecePosition.y;
    const x = piecePosition.x;
    if (x !== 7) {
      this.checkPosition(board[x + 1][y], piecePosition, reachable);
      this.checkPosition(board[x + 1][y + 1], piecePosition, reachable);
      this.checkPosition(board[x + 1][y - 1], piecePosition, reachable);
    }
    if (x !== 0) {
      this.checkPosition(board[x - 1][y], piecePosition, reachable);
      this.checkPosition(board[x - 1][y + 1], piecePosition, reachable);
      this.checkPosition(board[x - 1][y - 1], piecePosition, reachable);
    }
    this.checkPosition(board[x][y + 1], piecePosition, reachable);
    this.checkPosition(board[x][y - 1], piecePosition, reachable);

    return reachable;
  }

  private checkPosition(
    position: BoardPosition,
    currentPosition: BoardPosition,
    reachable: BoardPosition[]
  ): boolean {
    if (position) {
      if (position.chessPiece) {
        if (!position.samePieceColor(currentPosition)) {
          reachable.push(position);
        }
      } else {
        reachable.push(position);
      }
    }
    return false;
  }
}
