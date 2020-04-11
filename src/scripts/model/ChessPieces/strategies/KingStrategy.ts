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
    const potentiallyReachable: BoardPosition[] = [];
    const y = piecePosition.y;
    const x = piecePosition.x;
    if (x !== 7) {
      KingStrategy.checkPosition(
        board[x + 1][y],
        piecePosition,
        reachable,
        potentiallyReachable
      );
      KingStrategy.checkPosition(
        board[x + 1][y + 1],
        piecePosition,
        reachable,
        potentiallyReachable
      );
      KingStrategy.checkPosition(
        board[x + 1][y - 1],
        piecePosition,
        reachable,
        potentiallyReachable
      );
    }
    if (x !== 0) {
      KingStrategy.checkPosition(
        board[x - 1][y],
        piecePosition,
        reachable,
        potentiallyReachable
      );
      KingStrategy.checkPosition(
        board[x - 1][y + 1],
        piecePosition,
        reachable,
        potentiallyReachable
      );
      KingStrategy.checkPosition(
        board[x - 1][y - 1],
        piecePosition,
        reachable,
        potentiallyReachable
      );
    }
    KingStrategy.checkPosition(
      board[x][y + 1],
      piecePosition,
      reachable,
      potentiallyReachable
    );
    KingStrategy.checkPosition(
      board[x][y - 1],
      piecePosition,
      reachable,
      potentiallyReachable
    );

    return { reachable: reachable, potentiallyReachable: potentiallyReachable };
  }

  private static checkPosition(
    position: BoardPosition,
    currentPosition: BoardPosition,
    reachable: BoardPosition[],
    potentiallyReachable: BoardPosition[]
  ): void {
    if (position) {
      if (position.chessPiece) {
        if (!position.samePieceColor(currentPosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
        }
      } else {
        reachable.push(position);
      }
    }
  }
}
