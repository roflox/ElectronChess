import { BoardPosition } from "./BoardPosition";
import { ChessFactory } from "./ChessPieces/ChessFactory";
import { Player } from "./Player";
import { ChessPiece } from "./ChessPieces/ChessPiece";
import { PieceType } from "./ChessPieces/PieceType";

export class BoardModel {
  private _positions: BoardPosition[][] = new Array(8);
  private readonly _whitePlayer: Player;
  private readonly _blackPlayer: Player;
  private _selected: BoardPosition;

  get positions(): Readonly<BoardPosition[][]> {
    return this._positions;
  }

  constructor() {
    for (let x = 0; x < 8; x++) {
      this._positions[x] = [];
      for (let y = 0; y < 8; y++) {
        this._positions[x].push(new BoardPosition(x, y));
      }
    }
    const players = Player.getTwoPlayers();
    this._blackPlayer = players.black;
    this._whitePlayer = players.white;
    // console.table(this.positions);
    this.positions[0][2].chessPiece = new ChessPiece(
      PieceType.Queen,
      this._whitePlayer
    );
    this.positions[5][3].chessPiece = new ChessPiece(
      PieceType.Knight,
      this._blackPlayer
    );
    this.positions[4][4].chessPiece = new ChessPiece(
      PieceType.Bishop,
      this._blackPlayer
    );
    this.positions[2][3].chessPiece = new ChessPiece(
      PieceType.Rook,
      this._whitePlayer
    );
    ChessFactory.newGamePreset(
      this._positions,
      this._whitePlayer,
      this._blackPlayer
    );
  }

  public selectPosition(
    x: number,
    y: number
  ): { selected: BoardPosition; moving?: boolean; unselected?: boolean } {
    const position = this._positions[x][y];
    // console.log(position);
    if (!this._selected) {
      if (position.chessPiece) {
        this._selected = position;
      }
    } else if (this._selected.x == x && this._selected.y == y) {
      const temp = this._selected;
      this._selected = null;
      return { selected: temp, unselected: true };
    } else if (this.canMoveTo(this._selected.x, this._selected.y, x, y)) {
      return { selected: this._selected, moving: true };
    }
    return { selected: this._selected, moving: false };
  }

  public movePiece(x: number, y: number) {
    const position = this._positions[x][y];
    position.chessPiece = this._selected.chessPiece;
    position.chessPiece.addMove(position);
    this._selected.chessPiece = null;
    this._selected = null;
  }

  public getReachableForPosition(x: number, y: number) {
    if (this._positions[x][y].chessPiece) {
      return this._positions[x][y].chessPiece?.getReachablePositions(
        this._positions,
        this._positions[x][y]
      );
    } else {
      return null;
    }
  }

  public getPosition(x: number, y: number): BoardPosition {
    return this._positions[x][y];
  }

  public getPositionOccupant(x: number, y: number) {
    return this._positions[x][y].chessPiece;
  }

  public canMoveTo(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  ): boolean {
    const positions = this.getReachableForPosition(startX, startY);
    if (!positions) {
      return false;
    }
    for (const p of positions) {
      if (p.x == targetX && p.y == targetY) {
        return true;
      }
    }
    return false;
  }
}
