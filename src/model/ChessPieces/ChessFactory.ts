import { BoardPosition } from "../BoardPosition";
import { ChessPiece } from "./ChessPiece";
import { PieceType } from "./PieceType";
import { Color } from "./Color";
import { Player } from "../Player";

export class ChessFactory {
  public static newGamePreset(
    positions: BoardPosition[][],
    whitePlayer: Player,
    blackPlayer: Player
  ): void {
    const rows: Array<number> = [0, 1, 6, 7];
    for (const row of rows) {
      for (let x = 0; x < 8; x++) {
        if (row === 1 || row == 6) {// creates pawns
          // positions[x][row].chessPiece = new ChessPiece(
          //   PieceType.Pawn,
          //   row === 6 ? blackPlayer : whitePlayer
          // );
        } else {
          switch (x) {
            case 0:
            case 7:
              positions[x][row].chessPiece = new ChessPiece(
                PieceType.Rook,
                row === 7 ? blackPlayer : whitePlayer
              );
              break;
            case 1:
            case 6:
              positions[x][row].chessPiece = new ChessPiece(
                PieceType.Knight,
                row === 7 ? blackPlayer : whitePlayer
              );
              break;
            case 2:
            case 5:
              positions[x][row].chessPiece = new ChessPiece(
                PieceType.Bishop,
                row === 7 ? blackPlayer : whitePlayer
              );
              break;
            case 3:
              positions[x][row].chessPiece = new ChessPiece(
                PieceType.Queen,
                row === 7 ? blackPlayer : whitePlayer
              );
              break;
            case 4:
              positions[x][row].chessPiece = new ChessPiece(
                PieceType.King,
                row === 7 ? blackPlayer : whitePlayer
              );
              break;
          }
        }
      }
    }
  }
}
