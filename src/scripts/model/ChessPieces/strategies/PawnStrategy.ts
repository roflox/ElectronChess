import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Color } from "../Color";
import { PieceType } from "../PieceType";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";

export class PawnStrategy extends MovementStrategy {
  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    const reachable: BoardPosition[] = [];
    const direction: number =
      piecePosition.chessPiece.color === Color.black ? -1 : 1;
    const potentiallyReachable: BoardPosition[] = [];
    const reachablePawn: BoardPosition[] = [];
    const availableMovement: Movement[] = [];
    const x = piecePosition.x;
    const y = piecePosition.y;

    //2x first movement
    if (!piecePosition.chessPiece.moved) {
      const position = board[x][y + direction * 2];
      if (this.checkVerticalPosition(position)) {
        // reachablePawn.push(position);
        availableMovement.push(
          new Movement(piecePosition, position, MovementType.pawn_movement)
        );
      }
    }

    //normal movement
    const position = board[x][y - -1 * direction];
    if (this.checkVerticalPosition(position)) {
      availableMovement.push(
        new Movement(piecePosition, position, MovementType.pawn_movement)
      );
    }

    //left diagonal
    if (x > 0) {
      const left = board[x - 1][y - -1 * direction];
      if (left.chessPiece) {
        if (!position.samePieceColor(piecePosition)) {
          availableMovement.push(
            new Movement(piecePosition, left, MovementType.normal)
          );
        } else {
          availableMovement.push(
            new Movement(piecePosition, left, MovementType.potential)
          );
        }
      } else {
        availableMovement.push(
          new Movement(piecePosition, left, MovementType.potential)
        );
      }
    }
    //right Diagonal
    if (x < 7) {
      const right = board[x + 1][y - -1 * direction];
      if (right.chessPiece) {
        if (!position.samePieceColor(piecePosition)) {
          availableMovement.push(
            new Movement(piecePosition, right, MovementType.normal)
          );
        } else {
          availableMovement.push(
            new Movement(piecePosition, right, MovementType.potential)
          );
        }
      } else {
        availableMovement.push(
          new Movement(piecePosition, right, MovementType.potential)
        );
      }
    }

    //enPassantLeft
    if (y === 4 || y === 5) {
      //left
      if (x !== 0) {
        const left = board[x - 1][y - -1 * direction];
        if (this.checkForEnPassant(board[x - 1][y], piecePosition)) {
          if (!left.chessPiece) {
              availableMovement.push(
                new Movement(
                  piecePosition,
                  left,
                  MovementType.normal,
                  board[x + 1][y]
                )
              );
            // reachable.push(left);
            // left.enpassant = board[x - 1][y];
          }
        }
      }
      // right
      if (x !== 7) {
        const right = board[x + 1][y - -1 * direction];
        if (this.checkForEnPassant(board[x + 1][y], piecePosition)) {
          if (!right.chessPiece) {
            // reachable.push(right);
            availableMovement.push(
              new Movement(
                piecePosition,
                right,
                MovementType.normal,
                board[x + 1][y]
              )
            );
            // right.enpassant = board[x + 1][y];
          }
        }
      }
    }
    //enPassantRight
    return availableMovement;
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
