import { ChessPiece } from "./ChessPieces/ChessPiece";

export class BoardPosition {
  private _chessPiece: ChessPiece;

  public samePieceColor(boardPosition: BoardPosition): boolean {
    return this.chessPiece?.color === boardPosition.chessPiece?.color;
  }

  constructor(private readonly _x: number, private readonly _y: number) {}

  get coordinates(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  get chessPiece(): ChessPiece {
    return this._chessPiece;
  }

  set chessPiece(value: ChessPiece) {
    this._chessPiece = value;
  }
}
