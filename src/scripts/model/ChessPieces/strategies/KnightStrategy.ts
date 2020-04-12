import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";

export class KnightStrategy extends MovementStrategy {
  getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    const availableMovements: Movement[] = [];
    const x = piecePosition.x;
    const y = piecePosition.y;
    let position;
    if (x >= 2) {
      if (y > 0) {
        position = board[x - 2][y - 1];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
      if (y < 7) {
        position = board[x - 2][y + 1];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
    }
    if (x < 6) {
      if (y > 0) {
        position = board[x + 2][y - 1];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
      if (y < 7) {
        position = board[x + 2][y + 1];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
    }
    if (y < 6) {
      if (x > 0) {
        position = board[x - 1][y + 2];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
      if (x < 7) {
        position = board[x + 1][y + 2];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
    }
    if (y >= 2) {
      if (x > 0) {
        position = board[x - 1][y - 2];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
      if (x < 7) {
        position = board[x + 1][y - 2];
        if (!position.samePieceColor(piecePosition)) {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(piecePosition, position, MovementType.potential)
          );
        }
      }
    }

    return availableMovements;
  }
}
