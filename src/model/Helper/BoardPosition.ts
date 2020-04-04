import { ChessPiece } from "../ChessPieces/ChessPiece";

export class BoardPosition {
  private _chessPiece: ChessPiece;

  constructor(private x: number, private y: number) {}


  get chessPiece(): ChessPiece {
    return this._chessPiece;
  }

  set chessPiece(value: ChessPiece) {
    this._chessPiece = value;
  }
}
