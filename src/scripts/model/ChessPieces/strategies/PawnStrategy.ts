import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Color } from "../Color";
import { PieceType } from "../PieceType";

export class PawnStrategy extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): BoardPosition[] {
    const reachable: BoardPosition[] = [];
    const direction: number =
      piecePosition.chessPiece.color === Color.black ? -1 : 1;
    const x = piecePosition.x;
    const y = piecePosition.y;

    //2x first movement
    if (!piecePosition.chessPiece.moved) {
      const position = board[x][y + direction * 2];
      if (this.checkVerticalPosition(position)) {
        reachable.push(position);
      }
    }

    //normal movement
    const position = board[x][y - -1 * direction];
    if (this.checkVerticalPosition(position)) {
      reachable.push(position);
    }

    //left diagonal
    if (x > 0) {
      const left = board[x - 1][y - -1 * direction];
      if (this.checkDiagonalPosition(left, piecePosition)) {
        reachable.push(left);
      }
    }
    //right Diagonal
    if (x < 7) {
      const right = board[x + 1][y - -1 * direction];
      if (this.checkDiagonalPosition(right, piecePosition)) {
        reachable.push(right);
      }
    }

    //enPassantLeft
    if (y === 4 || y === 5) {
      //left
      if (x !== 0) {
        const left = board[x - 1][y - -1 * direction];
        if (this.checkForEnPassant(board[x - 1][y], piecePosition)) {
          if (!left.chessPiece) {
            reachable.push(left);
            left.enpassant = board[x - 1][y];
          }
        }
      }
      // right
      if (x !== 7) {
        const right = board[x + 1][y - -1 * direction];
        if (this.checkForEnPassant(board[x + 1][y], piecePosition)) {
          if (!right.chessPiece) {
            console.log("wrong");
            reachable.push(right);
            right.enpassant = board[x + 1][y];
          }
        }
      }
    }
    //enPassantRight
    return reachable;
  }

  private checkDiagonalPosition(
    position: BoardPosition,
    currentPosition: BoardPosition
  ): boolean {
    if (position.chessPiece) {
      return !position.samePieceColor(currentPosition);
    } else {
      return false;
    }
  }

  private checkVerticalPosition(position: BoardPosition): boolean {
    return !position.chessPiece;
  }

  private checkForEnPassant(
    position: BoardPosition,
    currentPosition: BoardPosition
  ): boolean {
    if (
      position.chessPiece &&
      (currentPosition.y === 4 || currentPosition.y === 3)
    ) {
      if (!position.samePieceColor(currentPosition)) {
        if (
          position.chessPiece.moves.length === 1 &&
          position.chessPiece.type === PieceType.Pawn &&
          position.chessPiece._movedLastTurn
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
