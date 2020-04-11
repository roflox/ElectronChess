import { BoardPosition } from "../../BoardPosition";
import { MovementStrategy } from "./MovementStrategy";
import { Player } from "../../Player";
import { PieceType } from "../PieceType";

export class RookStrategy implements MovementStrategy {
  private wasKing = false;

  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): { reachable: BoardPosition[]; reachableAfterMovement?: BoardPosition[] } {
    let position: BoardPosition;
    const reachable: BoardPosition[] = [];
    const reachableAfterMovement: BoardPosition[] = [];
    const yPos = piecePosition.y;
    const xPos = piecePosition.x;
    this.wasKing = false;
    for (let i = xPos - 1; i > -1; i--) {
      position = board[i][yPos];
      if (
        !this.addIfPossible(
          position,
          piecePosition,
          reachable,
          reachableAfterMovement
        )
      ) {
        break;
      }
    }
    this.wasKing = false;
    for (let i = xPos + 1; i < 8; i++) {
      position = board[i][yPos];
      if (
        !this.addIfPossible(
          position,
          piecePosition,
          reachable,
          reachableAfterMovement
        )
      ) {
        break;
      }
    }
    this.wasKing = false;
    for (let i = yPos - 1; i > -1; i--) {
      position = board[xPos][i];
      if (
        !this.addIfPossible(
          position,
          piecePosition,
          reachable,
          reachableAfterMovement
        )
      ) {
        break;
      }
    }
    this.wasKing = false;
    for (let i = yPos + 1; i < 8; i++) {
      position = board[xPos][i];
      if (
        !this.addIfPossible(
          position,
          piecePosition,
          reachable,
          reachableAfterMovement
        )
      ) {
        break;
      }
    }
    //todo přidat ten další trash
    console.log(reachableAfterMovement);
    // console.log(reachableAfterMovement.length);
    return { reachable: reachable, reachableAfterMovement:reachableAfterMovement };
  }

  private addIfPossible(
    targetPosition: BoardPosition,
    currentPosition: BoardPosition,
    reachable: BoardPosition[],
    reachableAfterMovement: BoardPosition[]
  ): boolean {
    if (!targetPosition.chessPiece) {
      if (this.wasKing) {
        reachableAfterMovement.push(targetPosition);
      } else {
        reachable.push(targetPosition);
      }
      return true;
    } else {
      if (!currentPosition.samePieceColor(targetPosition)) {
        reachable.push(targetPosition);
        // console.log(targetPosition.chessPiece.type === PieceType.King);
        if (targetPosition.chessPiece.type === PieceType.King) {
          this.wasKing = true;
          return true;
        }
      }
      return false;
    }
  }
}
