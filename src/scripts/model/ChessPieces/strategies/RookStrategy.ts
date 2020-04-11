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
  ): { reachable: BoardPosition[]; potentiallyReachable: BoardPosition[] } {
    let position: BoardPosition;
    const reachable: BoardPosition[] = [];
    const potentiallyReachable: BoardPosition[] = [];
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
          potentiallyReachable
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
          potentiallyReachable
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
          potentiallyReachable
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
          potentiallyReachable
        )
      ) {
        break;
      }
    }
    //todo přidat ten další trash
    // console.log(reachableAfterMovement);
    // console.log(reachableAfterMovement.length);
    return { reachable: reachable, potentiallyReachable:potentiallyReachable };
  }

  private addIfPossible(
    targetPosition: BoardPosition,
    currentPosition: BoardPosition,
    reachable: BoardPosition[],
    potentiallyReachable: BoardPosition[]
  ): boolean {
    if (!targetPosition.chessPiece) {
      if (this.wasKing) {
        potentiallyReachable.push(targetPosition);
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
      potentiallyReachable.push(targetPosition);
      return false;
    }
  }
}
