import {BoardPosition} from "../Helper/BoardPosition";
import {ChessPiece} from "./ChessPiece";
import {PieceType} from "../Helper/PieceType";
import {Color} from "../Helper/Color";

export class ChessFactory {
  public static newGamePreset(positions: BoardPosition[][]): void {
    // for (const row of positions) {
    //   for (const square of row) {
    //
    //   }
    // }
    const rows = [0, 1, 6, 7];
    for (const row of rows) {
      for (let x = 0; x < 8; x++) {
         if(row===1 || row == 6){
           positions[x][row].chessPiece = new ChessPiece(PieceType.Pawn, row===6?Color.white:Color.black);
         }
      }
    }
  }
}
