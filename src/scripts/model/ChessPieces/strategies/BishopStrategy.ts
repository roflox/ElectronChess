import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";
import { PieceType } from "../PieceType";

export class BishopStrategy extends MovementStrategy {
  private blockedForNormal: boolean;
  private blockedForAll: boolean;

  getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    const xPos = piecePosition.x;
    const yPos = piecePosition.y;
    const availableMovements: Movement[] = [];
    //4th sector
    this.restart();
    for (let i = xPos + 1; i < 8; i++) {
      for (let j = yPos + 1; j < 8; j++) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          this.pushIfReachable(position, piecePosition, availableMovements);
        }
      }
    }
    this.restart();
    //3rd sector
    for (let i = xPos - 1; i > -1; i--) {
      for (let j = yPos + 1; j < 8; j++) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          this.pushIfReachable(position, piecePosition, availableMovements);
        }
      }
    }

    //2nd sector
    this.restart();
    for (let i = xPos - 1; i > -1; i--) {
      for (let j = yPos - 1; j > -1; j--) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          this.pushIfReachable(position, piecePosition, availableMovements);
        }
      }
    }

    //1st sector
    this.restart();
    for (let i = xPos + 1; i < 8; i++) {
      for (let j = yPos - 1; j > -1; j--) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          this.pushIfReachable(position, piecePosition, availableMovements);
        }
      }
    }
    return availableMovements;
  }

  private pushIfReachable(
    position: BoardPosition,
    currentPosition: BoardPosition,
    availableMovements: Movement[]
  ) {
    if (!this.blockedForAll) {
      if (
        !this.blockedForNormal &&
        this.isReachable(position, currentPosition)
      ) {
        availableMovements.push(
          new Movement(currentPosition, position, MovementType.normal)
        );
      } else {
        availableMovements.push(
          new Movement(currentPosition, position, MovementType.potential)
        );
      }
    }
  }

  private isReachable(
    position: BoardPosition,
    currentPosition: BoardPosition
  ): boolean {
    if (position.chessPiece) {
      if (
        position.chessPiece.type === PieceType.King &&
        !position.samePieceColor(currentPosition)
      ) {
        this.blockedForNormal = true;
      } else {
        this.blockedForAll = true;
      }
      return !position.samePieceColor(currentPosition);
    }
    return true;
  }

  private restart() {
    {
      this.blockedForNormal = false;
      this.blockedForAll = false;
    }
  }
}
