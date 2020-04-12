import { PieceType } from "./PieceType";
import { Color } from "./Color";
import { BoardPosition } from "../BoardPosition";
import { MovementStrategy } from "./strategies/MovementStrategy";
import { Player } from "../Player";
import {
  BishopStrategy,
  KingStrategy,
  KnightStrategy,
  PawnStrategy,
  QueenStrategy,
  RookStrategy
} from "./strategies";
import { Movement } from "./Movement";

export class ChessPiece {
  private _movementStrategy: MovementStrategy;
  private _pieceType: PieceType;
  public _movedLastTurn: boolean = false;
  private _moves: Movement[] = [];

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
        this._movementStrategy = new RookStrategy();
        break;
      case PieceType.Pawn:
        this._movementStrategy = new PawnStrategy();
        break;
      case PieceType.Bishop:
        this._movementStrategy = new BishopStrategy();
        break;
      case PieceType.King:
        this._movementStrategy = new KingStrategy();
        break;
      case PieceType.Knight:
        this._movementStrategy = new KnightStrategy();
        break;
      case PieceType.Queen:
        this._movementStrategy = new QueenStrategy();
        break;
    }
  }

  public getReachablePositions(
    board: BoardPosition[][],
    boardPosition: BoardPosition
  ): Movement[] {
    return this._movementStrategy.getReachablePositions(
      board,
      boardPosition,
      this._owner
    );
  }

  get moved(): boolean {
    return this._moves.length !== 0;
  }

  public addMove(move: Movement) {
    this._moves.push(move);
    this._movedLastTurn = true;
  }

  get moves(): Movement[] {
    return this._moves;
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
