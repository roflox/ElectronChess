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
  ): {
    reachable: BoardPosition[];
    reachablePawn: BoardPosition[];
    potentiallyReachable: BoardPosition[];
  } {
    const reachable: BoardPosition[] = [];
    const direction: number =
      piecePosition.chessPiece.color === Color.black ? -1 : 1;
    const potentiallyReachable: BoardPosition[] = [];
    const reachablePawn: BoardPosition[] = [];
    const x = piecePosition.x;
    const y = piecePosition.y;

    //2x first movement
    if (!piecePosition.chessPiece.moved) {
      const position = board[x][y + direction * 2];
      if (this.checkVerticalPosition(position)) {
        reachablePawn.push(position);
      }
    }

    //normal movement
    const position = board[x][y - -1 * direction];
    if (this.checkVerticalPosition(position)) {
      reachablePawn.push(position);
    }

    //left diagonal
    if (x > 0) {
      const left = board[x - 1][y - -1 * direction];
      if (left.chessPiece) {
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(left);
        } else {
          potentiallyReachable.push(left);
        }
      } else {
        potentiallyReachable.push(left);
      }
    }
    //right Diagonal
    if (x < 7) {
      const right = board[x + 1][y - -1 * direction];
      if (right.chessPiece) {
        if (!position.samePieceColor(piecePosition)) {
          reachable.push(right);
        } else {
          potentiallyReachable.push(right);
        }
      } else {
        potentiallyReachable.push(right);
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
            reachable.push(right);
            right.enpassant = board[x + 1][y];
          }
        }
      }
    }
    //enPassantRight
    return {
      reachable: reachable,
      reachablePawn: reachablePawn,
      potentiallyReachable: potentiallyReachable
    };
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
