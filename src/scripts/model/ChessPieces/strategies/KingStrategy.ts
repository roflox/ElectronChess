import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";
import { Color } from "../Color";
import { PieceType } from "../PieceType";

export class KingStrategy extends MovementStrategy {
  private availableMoves: Movement[] = [];
  private enemyEndangeredPositions: Set<BoardPosition> = new Set();

  public getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    originalCaller?: boolean
  ): Movement[] {
    //horizontal

    this.availableMoves = [];
    const y = piecePosition.y;
    const x = piecePosition.x;
    if (x !== 7) {
      this.checkPosition(board[x + 1][y], piecePosition);
      this.checkPosition(board[x + 1][y + 1], piecePosition);
      this.checkPosition(board[x + 1][y - 1], piecePosition);
    }
    if (x !== 0) {
      this.checkPosition(board[x - 1][y], piecePosition);
      this.checkPosition(board[x - 1][y + 1], piecePosition);
      this.checkPosition(board[x - 1][y - 1], piecePosition);
    }
    this.checkPosition(board[x][y + 1], piecePosition);
    this.checkPosition(board[x][y - 1], piecePosition);
    if (originalCaller) {
      this.checkCasting(piecePosition, board, y);
    }

    return this.availableMoves;
  }

  private checkCasting(
    currentPosition: BoardPosition,
    board: BoardPosition[][],
    y: number
  ) {
    if (!currentPosition.chessPiece.moved && (y === 0 || y === 7)) {
      let casting: boolean = true;
      const color =
        currentPosition.occupantColor === Color.white
          ? Color.black
          : Color.white;
      this.getAllEnemyMovements(board, color);
      const rightRook = board[7][y].chessPiece;
      const leftRook = board[0][y].chessPiece;
      if (!this.enemyEndangeredPositions.has(currentPosition)) {
        if (leftRook) {
          if (
            leftRook.type === PieceType.Rook &&
            !leftRook.moved &&
            leftRook.color === currentPosition.occupantColor
          )
            for (let x = 3; x > 1; x--) {
              if (
                board[x][y].chessPiece ||
                this.enemyEndangeredPositions.has(board[x][y])
              ) {
                casting = false;
                break;
              }
            }
          if (casting) {
            this.availableMoves.push(
              new Movement(
                currentPosition,
                board[0][y],
                MovementType.casting,
                null,
                board[2][y],
                board[3][y]
              )
            );
          }
        }
        casting = true;
        if (rightRook) {
          if (
            rightRook.type === PieceType.Rook &&
            !rightRook.moved &&
            rightRook.color === currentPosition.occupantColor
          ) {
            for (let x = 5; x < 7; x++) {
              if (
                board[x][y].chessPiece ||
                this.enemyEndangeredPositions.has(board[x][y])
              ) {
                casting = false;
                break;
              }
            }
            if (casting) {
              this.availableMoves.push(
                new Movement(
                  currentPosition,
                  board[7][y],
                  MovementType.casting,
                  null,
                  board[5][y],
                  board[6][y]
                )
              );
            }
          }
        }
      }
    }
  }

  private checkPosition(
    position: BoardPosition,
    currentPosition: BoardPosition
  ): void {
    if (position) {
      if (position.chessPiece) {
        if (!position.samePieceColor(currentPosition)) {
          this.availableMoves.push(
            new Movement(currentPosition, position, MovementType.normal)
          );
        } else {
          this.availableMoves.push(
            new Movement(currentPosition, position, MovementType.potential)
          );
        }
      } else {
        this.availableMoves.push(
          new Movement(currentPosition, position, MovementType.normal)
        );
      }
    }
  }

  private getAllEnemyMovements(board: BoardPosition[][], color: Color) {
    this.enemyEndangeredPositions.clear();
    for (const row of board) {
      for (const cell of row) {
        if (cell.occupantColor === color) {
          for (const movement of cell.getAvailableMoves(board, false)) {
            this.enemyEndangeredPositions.add(movement.to);
          }
        }
      }
    }
  }
}
