import { MovementStrategy } from "./MovementStrategy";
import { BoardPosition } from "../../BoardPosition";
import { Player } from "../../Player";

export class BishopStrategy extends MovementStrategy {
  private fourthSectorBlocked = false;
  private thirdSectorBlocked = false;
  private secondSectorBlocked = false;
  private firstSectorBlocked = false;

  getReachablePositions(
    board: BoardPosition[][],
    piecePosition: BoardPosition,
    player: Player
  ): { reachable: BoardPosition[]; reachableAfterMovement?: BoardPosition[] } {
    const xPos = piecePosition.x;
    const yPos = piecePosition.y;
    const reachable: BoardPosition[] = [];
    //4th sector
    for (let i = xPos + 1; i < 8; i++) {
      for (let j = yPos + 1; j < 8; j++) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.fourthSectorBlocked) {
            if (this.isReachable(position, piecePosition, 4)) {
              reachable.push(position);
            }
          }
        }
      }
    }
    //3rd sector
    for (let i = xPos-1; i > -1; i--) {
      for (let j = yPos+1; j < 8; j++) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.thirdSectorBlocked) {
            if (this.isReachable(position, piecePosition, 3)) {
              console.log("addable");
              reachable.push(position);
            }
          }
        }
      }
    }
    //2nd sector
    for (let i = xPos-1; i > -1; i--) {
      for (let j = yPos-1; j > -1; j--) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.secondSectorBlocked) {
            if (this.isReachable(position, piecePosition, 2)) {
              reachable.push(position);
            }
          }
        }
      }
    }
    //1st sector
    for (let i = xPos+1; i < 8; i++) {
      for (let j = yPos-1; j > -1; j--) {
        if (Math.abs(i - xPos) === Math.abs(j - yPos)) {
          const position = board[i][j];
          if (!this.firstSectorBlocked) {
            if (this.isReachable(position, piecePosition, 1)) {
              reachable.push(position);
            }
          }
        }
      }
    }

    this.firstSectorBlocked = false;
    this.secondSectorBlocked = false;
    this.thirdSectorBlocked = false;
    this.fourthSectorBlocked = false;
    // console.log(reachable);
    //todo přidat ten trash
    return {reachable:reachable};
  }

  private isReachable(
    position: BoardPosition,
    currentPosition: BoardPosition,
    sector: number
  ): boolean {
    if (position.chessPiece) {
      switch (sector) {
        case 1:
          this.firstSectorBlocked = true;
          break;
        case 2:
          this.secondSectorBlocked = true;
          break;
        case 3:
          this.thirdSectorBlocked = true;
          break;
        case 4:
          this.fourthSectorBlocked = true;
          break;
      }
      return !position.samePieceColor(currentPosition);
    }
    return true;
  }
}
