import { BoardPosition } from "../model/BoardPosition";
import { Movement } from "../model/ChessPieces/Movement";
import { MovementType } from "../model/ChessPieces/MovementType";

export class BoardView {
  private readonly board: HTMLElement;
  private selectedSquare: Element;
  private highlightedSquares: Element[] = [];
  private readonly modal: HTMLElement;

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
    // this.renderBoard();
  }

  public addEventListenerForElement(id: string, listener: EventListener): void {
    document.getElementById(id).addEventListener("click", listener);
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
      // row.appendChild(number);
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
        if (
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

  private displayModal() {
    this.modal.style.display = "block";
    console.log(this.modal.children);
  }

  private hideModal() {
    this.modal.style.display = null;
  }

  public unhighlightSquares() {
    while (this.highlightedSquares.length !== 0) {
      const square = this.highlightedSquares.pop();
      square.classList.remove("highlighted");
      square.classList.remove("highlighted-enemy");
    }
  }

  public upgradePawn(x: number, y: number) {
    const square = this.getSquare(x, y);
    //todo v pripade multiplayeru tak tohle vubec nedelat, a vyckat na upgrade od enemyho
    this.displayModal();
  }

  public replaceFigure(movement: Movement) {
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
          // const square = this.getSquare(x,y);
        }
      }
    }
  }
}
