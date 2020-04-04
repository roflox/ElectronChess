import { BoardPosition } from "./Helper/BoardPosition";
import { PieceType } from "./Helper/PieceType";
import { ChessPiece } from "./ChessPieces/ChessPiece";
import { Color } from "./Helper/Color";
import {ChessFactory} from "./ChessPieces/ChessFactory";

export class BoardModel {
  private positions: BoardPosition[][] = new Array(8);

  constructor() {
    for (let y = 0; y < 8; y++) {
      this.positions[y] = [];
      for (let x = 0; x < 8; x++) {
        this.positions[y].push(new BoardPosition(x, y));
      }
    }
    // console.table(this.positions);
    // this.positions[1][1].chessPiece = new ChessPiece(
    //   PieceType.Rook,
    //   Color.black
    // );
    ChessFactory.newGamePreset(this.positions);
  }

  public getPositionOccupant(x: number, y: number) {
    return this.positions[x][y].chessPiece;
  }
}
