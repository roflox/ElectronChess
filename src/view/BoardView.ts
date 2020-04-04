import { BoardPosition } from "../model/BoardPosition";

export class BoardView {
  private readonly board: HTMLElement;
  private selectedSquare: Element;
  private glowingSquares: Element[];

  constructor(boardElement: string) {
    this.board = document.getElementById(boardElement);
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

  public selectSquare(x: number, y: number): void {
    // console.log(this.board);
    // console.log(`x:${x}, y:${y}`);
    x++;
    if (this.selectedSquare === this.board.children[8 - y].children[x]) {
      this.selectedSquare.classList.remove("selected");
      this.selectedSquare = null;
    }else if(!this.selectedSquare){
      this.selectedSquare = this.board.children[8 - y].children[x];
      this.selectedSquare.classList.add("selected");
    }
    // if (this.selectedSquare) {
    //   this.selectedSquare.classList.remove("selected");
    // }
    // x++; // toto tu musí být, jinak mi to háže nullpointery

  }

  public drawChessPieces(positions: Readonly<BoardPosition[][]>): void {
    for (let y = 0; y < positions.length; y++) {
      for (let x = 0; x < positions[y].length; x++) {
        const position = positions[x][y];
        if (position.chessPiece) {
          this.getSquare(x, y).classList.add(position.chessPiece.toString());
          // const square = this.getSquare(x,y);
        }
      }
    }
  }
}
