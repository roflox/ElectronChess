import { BoardPosition } from "../model/BoardPosition";
import { Movement } from "../model/ChessPieces/Movement";
import { MovementType } from "../model/ChessPieces/MovementType";
import { Color } from "../model/ChessPieces/Color";
import {PieceType} from "../model/ChessPieces/PieceType";

export class BoardView {
  private readonly board: HTMLElement;
  private selectedSquare: Element;
  private highlightedSquares: Element[] = [];
  private readonly modal: HTMLElement;
  private readonly queen: HTMLElement = document.getElementById("modal-queen");
  private readonly rook: HTMLElement = document.getElementById("modal-rook");
  private readonly bishop: HTMLElement = document.getElementById(
    "modal-bishop"
  );
  private readonly knight: HTMLElement = document.getElementById(
    "modal-knight"
  );
  private upgradingPawn: BoardPosition;

  constructor(boardElement: string, modalElement: string) {
    this.board = document.getElementById(boardElement);
    this.modal = document.getElementById(modalElement);
  }

  public restart(): void {
    for (let x = 1; x < 9; x++) {
      for (let y = 1; y < 9; y++) {
        this.removeAllPieces(this.getSquare(x - 1, y - 1));
      }
    }
  }

  public addEventListenerForElement(id: string, listener: EventListener): void {
    document.getElementById(id).addEventListener("click", listener);
  }

  public addEventListenerForUpgradeButtons(listener: EventListener): void {
    this.rook.addEventListener("click", listener);
    this.queen.addEventListener("click", listener);
    this.knight.addEventListener("click", listener);
    this.bishop.addEventListener("click", listener);
  }

  //this renders game board
  public renderBoard(): void {
    const alphabet = " abcdefgh ";
    const alphabetRow = document.createElement("tr");
    for (const letter of alphabet) {
      const letterColumn = document.createElement("td");
      letterColumn.innerText = letter;
      alphabetRow.appendChild(letterColumn);
    }
    this.board.appendChild(alphabetRow);

    for (let y = 7; y > -1; y--) {
      const row = document.createElement("tr");
      const number = document.createElement("td");
      number.innerText = (y + 1).toString();
      row.appendChild(number);
      for (let x = 0; x < 8; x++) {
        const cell = document.createElement("td");
        cell.id = `${x}${y}`;
        if ((y + x) % 2 == 0) {
          cell.classList.add("white");
        } else {
          cell.classList.add("black");
        }
        row.appendChild(cell);
      }
      row.appendChild(number.cloneNode(true));
      this.board.appendChild(row);
    }
    this.board.appendChild(alphabetRow.cloneNode(true));
  }

  public addEventListenerForSquares(eventListener: EventListener): void {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.addListenerForSquare(x + 1, y + 1, eventListener);
      }
    }
  }

  public getSquare(x: number, y: number): Element {
    return this.board.children[8 - y].children[x + 1];
  }

  private addListenerForSquare(
    x: number,
    y: number,
    eventListener: EventListener
  ): void {
    this.board.children[x].children[y].addEventListener("click", eventListener);
  }

  public selectSquare(position: BoardPosition): void {
    this.selectedSquare = this.getSquare(position.x, position.y);
    this.selectedSquare.classList.add("selected");
  }

  public unselectSquare(): void {
    this.selectedSquare.classList.remove("selected");
  }

  public highlightSquares(movements: Movement[]) {
    for (const movement of movements) {
      if (
        movement.type === MovementType.normal ||
        movement.type === MovementType.casting ||
        movement.type === MovementType.en_passant ||
        movement.type === MovementType.pawn_movement
      ) {
        const square = this.getSquare(movement.to.x, movement.to.y);
        if (movement.type === MovementType.casting) {
          square.classList.add("highlighted-casting");
        } else if (
          movement.to.chessPiece ||
          movement.type === MovementType.en_passant
        ) {
          square.classList.add("highlighted-enemy");
        } else {
          square.classList.add("highlighted");
        }
        this.highlightedSquares.push(square);
      }
    }
  }

  public displayModal(movement: Movement) {
    this.modal.style.display = "block";
    if (movement.to.occupantColor === Color.white) {
      this.knight.classList.replace("knight-black", "knight-white");
      this.queen.classList.replace("queen-black", "queen-white");
      this.rook.classList.replace("rook-black", "rook-white");
      this.bishop.classList.replace("bishop-black", "bishop-white");
    } else {
      this.knight.classList.replace("knight-white", "knight-black");
      this.queen.classList.replace("queen-white", "queen-black");
      this.rook.classList.replace("rook-white", "rook-black");
      this.bishop.classList.replace("bishop-white", "bishop-black");
    }
    this.upgradingPawn = movement.to;
  }

  public hideModal() {
    this.modal.style.display = null;
  }

  public unhighlightSquares() {
    while (this.highlightedSquares.length !== 0) {
      const square = this.highlightedSquares.pop();
      square.classList.remove("highlighted");
      square.classList.remove("highlighted-enemy");
      square.classList.remove("highlighted-casting");
    }
  }

  public upgradePawn(type: PieceType) {
    this.upgradingPawn.upgradePawn(type);
    const square = this.getSquare(this.upgradingPawn.x,this.upgradingPawn.y);
    this.removeAllPieces(square);
    square.classList.add(this.upgradingPawn.chessPiece.toString());
  }

  public movePiece(movement: Movement) {
    if (movement.type !== MovementType.casting) {
      const sourceSquare = this.getSquare(movement.from.x, movement.from.y);
      const targetSquare = this.getSquare(movement.to.x, movement.to.y);
      sourceSquare.classList.remove(movement.from.chessPiece.toString());
      if (movement.to.chessPiece) {
        targetSquare.classList.remove(movement.to.chessPiece.toString());
      } else if (movement.type === MovementType.en_passant) {
        if (movement.to.y === 5) {
          this.getSquare(movement.to.x, 4).classList.remove(
            movement.enpassant.chessPiece.toString()
          );
        } else {
          this.getSquare(movement.to.x, 3).classList.remove(
            movement.enpassant.chessPiece.toString()
          );
        }
      }
      targetSquare.classList.add(movement.from.chessPiece.toString());
    } else {
      const oldKingSquare = this.getSquare(movement.from.x, movement.from.y);
      const newKingSquare = this.getSquare(
        movement.kingCasting.x,
        movement.kingCasting.y
      );
      const oldRookSquare = this.getSquare(movement.to.x, movement.to.y);
      const newRookSquare = this.getSquare(
        movement.rookCasting.x,
        movement.rookCasting.y
      );
      oldKingSquare.classList.remove(movement.from.chessPiece.toString());
      oldRookSquare.classList.remove(movement.to.chessPiece.toString());
      newRookSquare.classList.add(movement.to.chessPiece.toString());
      newKingSquare.classList.add(movement.from.chessPiece.toString());
    }
  }

  private removeAllPieces(square: Element): void {
    if (square) {
      square.classList.remove(
        "pawn-white",
        "pawn-black",
        "queen-black",
        "queen-white",
        "rook-black",
        "rook-white",
        "bishop-black",
        "bishop-white",
        "knight-black",
        "knight-white",
        "king-black",
        "king-white"
      );
    }
  }

  public drawChessPieces(positions: Readonly<BoardPosition[][]>): void {
    for (let y = 0; y < positions.length; y++) {
      for (let x = 0; x < positions[y].length; x++) {
        const position = positions[x][y];
        if (position.chessPiece) {
          const square = this.getSquare(x, y);
          square.classList.add(position.chessPiece.toString());
        }
      }
    }
  }
}
