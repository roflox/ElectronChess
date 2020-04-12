import { BoardPosition } from "../../BoardPosition";
import { MovementStrategy } from "./MovementStrategy";
import { Player } from "../../Player";
import { PieceType } from "../PieceType";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";

export class RookStrategy implements MovementStrategy {
  private wasKing = false;

  getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    let position: BoardPosition;
    const availableMovements: Movement[] = [];
    const yPos = piecePosition.y;
    const xPos = piecePosition.x;
    this.wasKing = false;
    for (let i = xPos - 1; i > -1; i--) {
      position = board[i][yPos];
      if (!this.addIfPossible(position, piecePosition, availableMovements)) {
        break;
      }
    }
    this.wasKing = false;
    for (let i = xPos + 1; i < 8; i++) {
      position = board[i][yPos];
      if (!this.addIfPossible(position, piecePosition, availableMovements)) {
        break;
      }
    }
    this.wasKing = false;
    for (let i = yPos - 1; i > -1; i--) {
      position = board[xPos][i];
      if (!this.addIfPossible(position, piecePosition, availableMovements)) {
        break;
      }
    }
    this.wasKing = false;
    for (let i = yPos + 1; i < 8; i++) {
      position = board[xPos][i];
      if (!this.addIfPossible(position, piecePosition, availableMovements)) {
        break;
      }
    }
    return availableMovements;
  }

  private addIfPossible(
    targetPosition: BoardPosition,
    currentPosition: BoardPosition,
    availableMovements: Movement[]
  ): boolean {
    if (!targetPosition.chessPiece) {
      if (this.wasKing) {
        availableMovements.push(
          new Movement(currentPosition, targetPosition, MovementType.potential)
        );
      } else {
        availableMovements.push(
          new Movement(currentPosition, targetPosition, MovementType.normal)
        );
      }
      return true;
    } else {
      if (!currentPosition.samePieceColor(targetPosition)) {
        availableMovements.push(
          new Movement(currentPosition, targetPosition, MovementType.normal)
        );
        if (targetPosition.chessPiece.type === PieceType.King) {
          this.wasKing = true;
          return true;
        }
      }
      availableMovements.push(
        new Movement(currentPosition, targetPosition, MovementType.potential)
      );
      return false;
    }
  }
}
