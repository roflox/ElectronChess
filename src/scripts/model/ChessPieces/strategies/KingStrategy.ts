import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export class KingStrategy extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): { reachable: BoardPosition[]; potentiallyReachable: BoardPosition[] } {
    //horizontal
    const reachable: BoardPosition[] = [];
    const y = piecePosition.y;
    const x = piecePosition.x;
    if (x !== 7) {
      KingStrategy.checkPosition(board[x + 1][y], piecePosition, reachable);
      KingStrategy.checkPosition(board[x + 1][y + 1], piecePosition, reachable);
      KingStrategy.checkPosition(board[x + 1][y - 1], piecePosition, reachable);
    }
    if (x !== 0) {
      KingStrategy.checkPosition(board[x - 1][y], piecePosition, reachable);
      KingStrategy.checkPosition(board[x - 1][y + 1], piecePosition, reachable);
      KingStrategy.checkPosition(board[x - 1][y - 1], piecePosition, reachable);
    }
    KingStrategy.checkPosition(board[x][y + 1], piecePosition, reachable);
    KingStrategy.checkPosition(board[x][y - 1], piecePosition, reachable);

    return { reachable: reachable, potentiallyReachable:[] };
  }

  private static checkPosition(
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
