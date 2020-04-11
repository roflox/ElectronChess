import { BoardPosition } from "./BoardPosition";
import { ChessFactory } from "./ChessPieces/ChessFactory";
import { Player } from "./Player";
import { ChessPiece } from "./ChessPieces/ChessPiece";
import { PieceType } from "./ChessPieces/PieceType";
import { Color } from "./ChessPieces/Color";

export class BoardModel {
  private _positions: BoardPosition[][];
  private _whitePlayer: Player;
  private _blackPlayer: Player;
  private _selected: BoardPosition;

  get positions(): Readonly<BoardPosition[][]> {
    return this._positions;
  }

  private newGame(): void {
    this._positions = new Array(8);
    this._selected = null;
    for (let x = 0; x < 8; x++) {
      this._positions[x] = [];
      for (let y = 0; y < 8; y++) {
        this._positions[x].push(new BoardPosition(x, y));
      }
    }
    const players = Player.getTwoPlayers();
    this._blackPlayer = players.black;
    this._whitePlayer = players.white;
    ChessFactory.newGamePreset(
      this._positions,
      this._whitePlayer,
      this._blackPlayer
    );
  }

  constructor() {
    // console.table(this.positions);
    this.newGame();
    //test purposes only
    this.positions[0][2].chessPiece = new ChessPiece(
      PieceType.Queen,
      this._whitePlayer
    );
    this.positions[5][3].chessPiece = new ChessPiece(
      PieceType.King,
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
  }

  public restart() {
    this.newGame();
  }

  public selectPosition(
    x: number,
    y: number
  ): {
    selected: BoardPosition;
    moving?: boolean;
    unselected?: boolean;
    unchanged?: boolean;
  } {
    const position = this._positions[x][y];
    // console.log(position);
    if (!this._selected) {
      if (position.chessPiece) {
        this._selected = position;
        return { selected: this._selected, unchanged: false, moving: false };
      }
    } else if (this._selected.x == x && this._selected.y == y) {
      const temp = this._selected;
      this._selected = null;
      return { selected: temp, unselected: true, unchanged: false };
    } else if (this.canMoveTo(this._selected.x, this._selected.y, x, y)) {
      return { selected: this._selected, moving: true, unchanged: false };
    }
    return {
      selected: this._selected,
      unchanged: true,
      moving: false
    };
  }

  public movePiece(x: number, y: number): { upgrading?: boolean } {
    const position = this._positions[x][y];
    if (
      !position.chessPiece &&
      this._selected.chessPiece.type === PieceType.Pawn &&
      position.enpassant
    ) {
      if (position.enpassant) {
        position.enpassant.chessPiece = null;
      }
    }
    position.chessPiece = this._selected.chessPiece;
    this._selected.chessPiece = null;
    this._selected = null;
    for (const row of this._positions) {
      for (const rowPosition of row) {
        rowPosition.enpassant = null;
        if (rowPosition.chessPiece) {
          rowPosition.chessPiece._movedLastTurn = false;
        }
      }
    }
    position.chessPiece.addMove(position);
    if (
      (position.y === 0 || position.y === 7) &&
      position.chessPiece.type === PieceType.Pawn
    ) {
      return { upgrading: true };
    }
    return;
  }

  public getReachableForPosition(x: number, y: number) {
    const position = this._positions[x][y];
    if (!position.chessPiece) {
      return null;
    }

    const result = this._positions[x][y].getReachablePositionsForChessPiece(
      this._positions
    );
    // console.table(reachable);
    // console.log("before calculating");
    if (position.chessPiece.type === PieceType.King) {
      for (const pos of result.reachable) {
        // this.checkPosition(pos, this._positions);
        const player =
          position.chessPiece.color === Color.white
            ? this._whitePlayer
            : this._blackPlayer;
        const piecePositions = this.getPositionsOfOnePlayer(player);
        for (const pieceP of piecePositions) {
          const temp = pieceP.getReachablePositionsForChessPiece(
            this._positions
          );
          const reachable = temp.reachable.concat(temp.reachableAfterMovement);
        }

        // console.log(pos);
      }
    }
    return result;
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
    for (const p of positions.reachable) {
      if (p.x == targetX && p.y == targetY) {
        return true;
      }
    }
    return false;
  }

  private getPositionsOfOnePlayer(player: Player): BoardPosition[] {
    const owned: BoardPosition[] = [];
    for (const row of this._positions) {
      for (const cell of row) {
        if (cell.chessPiece?.color === player.color) {
          owned.push(cell);
        }
      }
    }
    return owned;
  }
}
