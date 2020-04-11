import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export class KnightStrategy extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): { reachable: BoardPosition[]; reachableAfterMovement?: BoardPosition[] } {
    const reachable: BoardPosition[] = [];
    const x = piecePosition.x;
    const y = piecePosition.y;
    let position;
    if (x >= 2) {
      if (y > 0) {
        position = board[x - 2][y - 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
      if (y < 7) {
        position = board[x - 2][y + 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
    }
    if (x < 6) {
      if (y > 0) {
        position = board[x + 2][y - 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
      if (y < 7) {
        position = board[x + 2][y + 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
    }
    if (y < 6) {
      if (x > 0) {
        // toAdd = board.selectPosition(x - 1, y + 2);
        // this.addReachablePosition(toAdd);
        position = board[x - 1][y + 2];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
      if (x < 7) {
        position = board[x + 1][y + 2];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
    }
    if (y >= 2) {
      if (x > 0) {
        position = board[x - 1][y - 2];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
      if (x < 7) {
        position = board[x + 1][y - 2];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        }
      }
    }

    return { reachable: reachable };
  }
}
