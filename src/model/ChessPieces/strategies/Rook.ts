import { BoardPosition } from "../../BoardPosition";
import { MovementStrategy } from "./MovementStrategy";
import { Player } from "../../Player";

export class Rook implements MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    let position: BoardPosition;
    const reachable: BoardPosition[] = [];
    const yPos = piecePosition.coordinates.y;
    const xPos = piecePosition.coordinates.x;
    console.log(`x:${xPos},y:${yPos}`);
    for (let i = xPos - 1; i > -1; i--) {
      position = board[i][yPos];
      if (!position.chessPiece) {
        reachable.push(position);
      } else {
        if (!piecePosition.samePieceColor(position)) {
          reachable.push(position);
        }
        break;
      }
    }
    for (let i = xPos + 1; i < 8; i++) {
      position = board[i][yPos];
      if (!position.chessPiece) {
        reachable.push(position);
      } else {
        if (!piecePosition.samePieceColor(position)) {
          reachable.push(position);
        }
        break;
      }
    }
    for (let i = yPos - 1; i > -1; i--) {
      position = board[xPos][i];
      if (!position.chessPiece) {
        reachable.push(position);
      } else {
        if (!piecePosition.samePieceColor(position)) {
          reachable.push(position);
        }
        break;
      }
    }
    for (let i = yPos + 1; i < 8; i++) {
      position = board[xPos][i];
      if (!position.chessPiece) {
        reachable.push(position);
      } else {
        if (!piecePosition.samePieceColor(position)) {
          reachable.push(position);
        }
        break;
      }
    }
    return reachable;
  }
}
