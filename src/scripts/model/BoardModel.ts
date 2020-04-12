import { BoardPosition } from "./BoardPosition";
import { ChessFactory } from "./ChessPieces/ChessFactory";
import { Player } from "./Player";
import { ChessPiece } from "./ChessPieces/ChessPiece";
import { PieceType } from "./ChessPieces/PieceType";
import { Color } from "./ChessPieces/Color";
import { Movement } from "./ChessPieces/Movement";
import { MovementType } from "./ChessPieces/MovementType";

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
        return {
          selected: this._selected,
          unchanged: false,
          moving: false
        };
      }
    } else if (this._selected.x == x && this._selected.y == y) {
      const temp = this._selected;
      this._selected = null;
      return { selected: temp, unselected: true, unchanged: false };
    } else if (this.canMoveTo(this._selected.x, this._selected.y, x, y)) {
      return {
        selected: this._selected,
        moving: true,
        unchanged: false
      };
    }
    return {
      selected: this._selected,
      unchanged: true,
      moving: false
    };
  }

  public movePiece(movement: Movement): { upgrading?: boolean } {
    this._selected = null;
    for (const row of this._positions) {
      for (const rowPosition of row) {
        if (rowPosition.chessPiece) {
          rowPosition.chessPiece._movedLastTurn = false;
        }
      }
    }
    movement.doMovement();
    if (movement.type !== MovementType.casting) {
      if (
        movement.to.chessPiece.type === PieceType.Pawn &&
        (movement.to.y === 0 || movement.to.y === 7)
      ) {
        return { upgrading: true };
      }
    }
    return;
  }

  public getAvailableMovesForPosition(x: number, y: number): Movement[] {
    const position = this._positions[x][y];
    if (!position.chessPiece) {
      return null;
    }
    const result = this._positions[x][y].getAvailableMoves(
      this._positions,
      true
    );
    const player =
      position.chessPiece.color === Color.white
        ? this._blackPlayer
        : this._whitePlayer;
    if (position.chessPiece.type === PieceType.King) {
      const enemyMovements: Set<BoardPosition> = new Set();
      for (const pos of result) {
        const piecePositions = this.getPositionsOfOnePlayer(player);
        for (const pieceP of piecePositions) {
          const tmp = pieceP.getAvailableMoves(this._positions);
          for (const movement of tmp) {
            if (
              movement.type === MovementType.normal ||
              movement.type === MovementType.potential
            ) {
              enemyMovements.add(movement.to);
            }
          }
        }
      }

      return result.filter(move => {
        return !enemyMovements.has(move.to);
      });
    }
    return result;
  }

  public getPosition(x: number, y: number): BoardPosition {
    return this._positions[x][y];
  }

  public canMoveTo(
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  ): boolean {
    const availableMovements = this.getAvailableMovesForPosition(
      startX,
      startY
    );
    if (!availableMovements) {
      return false;
    }
    for (const movement of availableMovements) {
      if (
        movement.to.x == targetX &&
        movement.to.y == targetY &&
        (movement.type === MovementType.normal ||
          movement.type === MovementType.pawn_movement ||
          movement.type === MovementType.en_passant ||
          movement.type === MovementType.casting)
      ) {
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
