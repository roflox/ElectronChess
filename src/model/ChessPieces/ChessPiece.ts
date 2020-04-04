import { PieceType } from "../Helper/PieceType";
import { Color } from "../Helper/Color";
import { BoardPosition } from "../Helper/BoardPosition";
import { BoardState } from "../Helper/BoardState";
import { MovementStrategy } from "./MovementStrategy";

export class ChessPiece {
  private readonly _movementStrategy: MovementStrategy;

  public constructor(
    private _pieceType: PieceType,
    private _chessPieceColor: Color
  ) {}

  public getReachablePositions(
    boardState: BoardState,
    boardPosition: BoardPosition
  ): BoardPosition[] {
    return this._movementStrategy.getReachablePositions(
      boardState,
      boardPosition
    );
  }

  //
  // set position(position: Position) {
  //   this._x = position.x;
  //   this._y = position.y;
  // }

  get pieceType(): PieceType {
    return this._pieceType;
  }

  get chessPieceColor(): Color {
    return this._chessPieceColor;
  }
}
