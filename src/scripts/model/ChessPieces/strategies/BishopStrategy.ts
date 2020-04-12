import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";

export class BishopStrategy extends MovementStrategy {
  private blocked = false;

  getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    const xPos = piecePosition.x;
    const yPos = piecePosition.y;
    const availableMovements: Movement[] = [];
    //4th sector
    this.blocked = false;
    for (let i = xPos + 1; i < 8; i++) {
      for (let j = yPos + 1; j < 8; j++) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.blocked) {
            if (this.isReachable(position, piecePosition)) {
              // reachable.push(position);
              availableMovements.push(
                new Movement(piecePosition, position, MovementType.normal)
              );
            }
          }
        }
      }
    }
    this.blocked = false;
    //3rd sector
    for (let i = xPos - 1; i > -1; i--) {
      for (let j = yPos + 1; j < 8; j++) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.blocked) {
            if (this.isReachable(position, piecePosition)) {
              // console.log("addable");
              availableMovements.push(
                new Movement(piecePosition, position, MovementType.normal)
              );
            }
          }
        }
      }
    }
    this.blocked = false;
    //2nd sector
    for (let i = xPos - 1; i > -1; i--) {
      for (let j = yPos - 1; j > -1; j--) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.blocked) {
            if (this.isReachable(position, piecePosition)) {
              availableMovements.push(
                new Movement(piecePosition, position, MovementType.normal)
              );
            }
          }
        }
      }
    }
    this.blocked = false;
    //1st sector
    for (let i = xPos + 1; i < 8; i++) {
      for (let j = yPos - 1; j > -1; j--) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.blocked) {
            if (this.isReachable(position, piecePosition)) {
              availableMovements.push(
                new Movement(piecePosition, position, MovementType.normal)
              );
            }
          }
        }
      }
    }
    // console.log(reachable);
    //todo přidat ten trash
    return availableMovements;
  }

  private isReachable(
    position: BoardPosition,
    currentPosition: BoardPosition
  ): boolean {
    if (position.chessPiece) {
      this.blocked = true;
      return !position.samePieceColor(currentPosition);
    }
    return true;
  }
}
