import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";
import { Movement } from "../Movement";
import { MovementType } from "../MovementType";

export class KingStrategy extends MovementStrategy {
  getAvailableMoves(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): Movement[] {
    //horizontal
    const reachable: BoardPosition[] = [];
    const potentiallyReachable: BoardPosition[] = [];
    const availableMovements: Movement[] = [];
    const y = piecePosition.y;
    const x = piecePosition.x;
    if (x !== 7) {
      KingStrategy.checkPosition(
        board[x + 1][y],
        piecePosition,
        availableMovements
      );
      KingStrategy.checkPosition(
        board[x + 1][y + 1],
        piecePosition,
        availableMovements
      );
      KingStrategy.checkPosition(
        board[x + 1][y - 1],
        piecePosition,
        availableMovements
      );
    }
    if (x !== 0) {
      KingStrategy.checkPosition(
        board[x - 1][y],
        piecePosition,
        availableMovements
      );
      KingStrategy.checkPosition(
        board[x - 1][y + 1],
        piecePosition,
        availableMovements
      );
      KingStrategy.checkPosition(
        board[x - 1][y - 1],
        piecePosition,
        availableMovements
      );
    }
    KingStrategy.checkPosition(
      board[x][y + 1],
      piecePosition,
      availableMovements
    );
    KingStrategy.checkPosition(
      board[x][y - 1],
      piecePosition,
      availableMovements
    );

    return availableMovements;
  }

  private static checkCasting(
    currentPosition: BoardPosition[],
    board: BoardPosition[][]
  ) {}

  private static checkPosition(
    position: BoardPosition,
    currentPosition: BoardPosition,
    availableMovements: Movement[]
  ): void {
    if (position) {
      if (position.chessPiece) {
        if (!position.samePieceColor(currentPosition)) {
          availableMovements.push(
            new Movement(currentPosition, position, MovementType.normal)
          );
        } else {
          availableMovements.push(
            new Movement(currentPosition, position, MovementType.potential)
          );
        }
      } else {
        availableMovements.push(
          new Movement(currentPosition, position, MovementType.normal)
        );
      }
    }
  }
}
