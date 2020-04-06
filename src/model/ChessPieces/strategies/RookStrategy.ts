import { BoardPosition } from "../../BoardPosition";
import { MovementStrategy } from "./MovementStrategy";
import { Player } from "../../Player";

export class RookStrategy implements MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    let position: BoardPosition;
    const reachable: BoardPosition[] = [];
    const yPos = piecePosition.y;
    const xPos = piecePosition.x;
    for (let i = xPos - 1; i > -1; i--) {
      position = board[i][yPos];
      if (!this.addIfPossible(position, piecePosition, reachable)) {
        break;
      }
    }
    for (let i = xPos + 1; i < 8; i++) {
      position = board[i][yPos];
      if (!this.addIfPossible(position, piecePosition, reachable)) {
        break;
      }
    }
    for (let i = yPos - 1; i > -1; i--) {
      position = board[xPos][i];
      if (!this.addIfPossible(position, piecePosition, reachable)) {
        break;
      }
    }
    for (let i = yPos + 1; i < 8; i++) {
      position = board[xPos][i];
      if (!this.addIfPossible(position, piecePosition, reachable)) {
        break;
      }
    }
    return reachable;
  }

  private addIfPossible(
    targetPosition: BoardPosition,
    currentPosition: BoardPosition,
    reachable: BoardPosition[]
  ): boolean {
    if (!targetPosition.chessPiece) {
      reachable.push(targetPosition);
      return true;
    } else {
      if (!currentPosition.samePieceColor(targetPosition)) {
        reachable.push(targetPosition);
      }
      return false;
    }
  }
}
