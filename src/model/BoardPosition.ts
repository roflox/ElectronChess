import { ChessPiece } from "./ChessPieces/ChessPiece";
import { PieceType } from "./ChessPieces/PieceType";

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

  public movePiece(targetPosition: BoardPosition) {
    targetPosition.chessPiece = this.chessPiece;
    this.chessPiece = null;
    //todo upgrade pawna
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get chessPiece(): ChessPiece {
    return this._chessPiece;
  }

  set chessPiece(value: ChessPiece) {
    this._chessPiece = value;
  }
}
