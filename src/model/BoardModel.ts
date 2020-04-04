import { BoardPosition } from "./BoardPosition";
import { Color } from "./ChessPieces/Color";
import { ChessFactory } from "./ChessPieces/ChessFactory";
import { Player } from "./Player";

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
    this._whitePlayer = new Player(Color.white);
    this._blackPlayer = new Player(Color.black);
    // console.table(this.positions);
    // this.positions[1][1].chessPiece = new ChessPiece(
    //   PieceType.Rook,
    //   Color.black
    // );
    ChessFactory.newGamePreset(
      this._positions,
      this._whitePlayer,
      this._blackPlayer
    );
  }

  public selectPosition(x?: number, y?: number) {
    if (!x || !y) {
      this._selected = null;
    } else {
      this._selected = this._positions[x][y];
    }
  }

  public getReachableForPosition(x: number, y: number) {
    return this._positions[x][y].chessPiece?.getReachablePositions(
      this._positions,
      this._positions[x][y]
    );
  }

  public getPosition(x: number, y: number): BoardPosition {
    return this._positions[x][y];
  }

  public getPositionOccupant(x: number, y: number) {
    return this._positions[x][y].chessPiece;
  }
}
