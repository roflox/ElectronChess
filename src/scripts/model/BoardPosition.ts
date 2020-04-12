import { ChessPiece } from "./ChessPieces/ChessPiece";
import { PieceType } from "./ChessPieces/PieceType";
import { Movement } from "./ChessPieces/Movement";
import { Color } from "./ChessPieces/Color";
import { Player } from "./Player";

export class BoardPosition {
  private _chessPiece: ChessPiece;

  public samePieceColor(boardPosition: BoardPosition): boolean {
    return this.chessPiece?.color === boardPosition.chessPiece?.color;
  }

  constructor(private readonly _x: number, private readonly _y: number) {}

  public upgradePawn(type: PieceType) {
    if (
      this.chessPiece.type !== PieceType.Pawn ||
      type === PieceType.King ||
      type === PieceType.Pawn
    ) {
      console.error("error with upgrading pawn");
    } else {
      this.chessPiece.upgrade(type);
    }
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  public getAvailableMoves(
    board: BoardPosition[][],
    originalCaller?: boolean
  ): Movement[] {
    return this.chessPiece.getAvailableMoves(board, this, originalCaller);
  }

  public canBeSeen(board: BoardPosition[][], color: Color): boolean {
    return false;
  }

  get chessPiece(): ChessPiece {
    return this._chessPiece;
  }

  set chessPiece(value: ChessPiece) {
    this._chessPiece = value;
  }

  get occupantColor(): Color {
    return this.chessPiece?.color;
  }
}
