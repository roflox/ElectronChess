import { BoardPosition } from "../BoardPosition";
import { MovementType } from "./MovementType";

export class Movement {
  constructor(
    private readonly _from: BoardPosition,
    private readonly _to: BoardPosition,
    private readonly _type: MovementType,
    private readonly _enpassant?: BoardPosition
  ) {}

  public doMovement(): boolean {
    if (this.type === MovementType.en_passant) {
      this.enpassant.chessPiece = null;
    }
    this.to.chessPiece = this.from.chessPiece;
    this.to.chessPiece.addMove(this);
    this.from.chessPiece = null;
    return false;
  }

  get from(): BoardPosition {
    return this._from;
  }

  get to(): BoardPosition {
    return this._to;
  }

  get enpassant(): BoardPosition {
    return this._enpassant;
  }

  get type(): MovementType {
    return this._type;
  }
}
