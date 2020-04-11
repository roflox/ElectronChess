import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export class KnightStrategy extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): { reachable: BoardPosition[]; potentiallyReachable: BoardPosition[] } {
    const reachable: BoardPosition[] = [];
    const potentiallyReachable: BoardPosition[] = [];
    const x = piecePosition.x;
    const y = piecePosition.y;
    let position;
    if (x >= 2) {
      if (y > 0) {
        position = board[x - 2][y - 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
        }
      }
      if (y < 7) {
        position = board[x - 2][y + 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
        }
      }
    }
    if (x < 6) {
      if (y > 0) {
        position = board[x + 2][y - 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
        }
      }
      if (y < 7) {
        position = board[x + 2][y + 1];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
        }
      }
    }
    if (y < 6) {
      if (x > 0) {
        position = board[x - 1][y + 2];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
        }
      }
      if (x < 7) {
        position = board[x + 1][y + 2];
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(position);
        } else {
          potentiallyReachable.push(position);
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
        } else {
          potentiallyReachable.push(position);
        }
      }
    }

    return { reachable: reachable, potentiallyReachable: potentiallyReachable };
  }
}
