import { BoardPosition } from "../BoardPosition";
import { MovementType } from "./MovementType";

export class Movement {
  constructor(
    private readonly _from: BoardPosition,
    private readonly _to: BoardPosition,
    private readonly _type: MovementType,
    private readonly _enpassant?: BoardPosition,
    private readonly _rookCasting?: BoardPosition,
    private readonly _kingCasting?: BoardPosition
  ) {}

  public doMovement(): boolean {
    if (this.type === MovementType.casting) {
      this._kingCasting.chessPiece = this.from.chessPiece;
      this._rookCasting.chessPiece = this.to.chessPiece;
      this._rookCasting.chessPiece.addMove(this);
      this._kingCasting.chessPiece.addMove(this);
      this.to.chessPiece = null;
      this.from.chessPiece = null;
      return false;
    }

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

  get rookCasting(): BoardPosition {
    return this._rookCasting;
  }

  get kingCasting(): BoardPosition {
    return this._kingCasting;
  }
}
