import { PieceType } from "./PieceType";
import { Color } from "./Color";
import { BoardPosition } from "../BoardPosition";
import { MovementStrategy } from "./strategies/MovementStrategy";
import { Player } from "../Player";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./strategies";

export class ChessPiece {
  private _movementStrategy: MovementStrategy;
  private _pieceType: PieceType;
  private _moved: boolean = false;

  public constructor(
    pieceType: PieceType,
    private readonly _owner: Player // private x: number, // private y: number
  ) {
    this.setStrategy(pieceType);
  }

  public upgrade(pieceType: PieceType) {
    this.setStrategy(pieceType);
  }

  private setStrategy(pieceType: PieceType) {
    this._pieceType = pieceType;
    switch (pieceType) {
      case PieceType.Rook:
        this._movementStrategy = new Rook();
        break;
      case PieceType.Pawn:
        this._movementStrategy = new Pawn();
        break;
      case PieceType.Bishop:
        this._movementStrategy = new Bishop();
        break;
      case PieceType.King:
        this._movementStrategy = new King();
        break;
      case PieceType.Knight:
        this._movementStrategy = new Knight();
        break;
      case PieceType.Queen:
        this._movementStrategy = new Queen();
        break;
    }
  }

  public getReachablePositions(
    board: BoardPosition[][],
    boardPosition: BoardPosition
  ): BoardPosition[] {
    return this._movementStrategy.getReachablePositions(
      board,
      boardPosition,
      this._owner
    );
  }

  get type(): PieceType {
    return this._pieceType;
  }

  get color(): Color {
    return this._owner.color;
  }

  public toString(): string {
    return `${this._pieceType}-${this._owner.color}`;
  }
}
