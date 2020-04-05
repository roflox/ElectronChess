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

  public selectPosition(x: number, y: number): boolean {
    const position = this._positions[x][y];
    if (!this._selected) {
      if (position.chessPiece !== null) {
        this._selected = position;
        return true;
      }
      return false;
    } else if (this._selected.x == position.x && this._selected.y == y) {
      this._selected = null;
      return true;
    } else {
      if (
        this.canMoveTo(
          this._selected.x,
          this._selected.y,
          position.x,
          position.y
        )
      ) {
        this._selected.movePiece(position);
        this._selected = null;
      }
      //todo tohle se mmožná dosere, a bude to dělat mrdky
      return true;
      // return false;
    }
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
