import { BoardPosition } from "../model/BoardPosition";

export class BoardView {
  private readonly board: HTMLElement;
  private selectedSquare: Element;
  private highlightedSquares: Element[] = [];

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

  public selectSquare(position: BoardPosition): void {
    this.selectedSquare = this.getSquare(position.x, position.y);
    this.selectedSquare.classList.add("selected");
  }

  public unselectSquare(): void {
    this.selectedSquare.classList.remove("selected");
  }

  public highlightSquares(positions: BoardPosition[]) {
    for (const position of positions) {
      const square = this.getSquare(position.x, position.y);
      if (position.chessPiece) {
        square.classList.add("highlighted-enemy");
      } else {
        square.classList.add("highlighted");
      }
      this.highlightedSquares.push(square);
    }
  }

  public unhighlightSquares() {
    while (this.highlightedSquares.length !== 0) {
      const square = this.highlightedSquares.pop();
      square.classList.remove("highlighted");
      square.classList.remove("highlighted-enemy");
    }
  }

  public replaceFigure(source: BoardPosition, target: BoardPosition) {
    const sourceSquare = this.getSquare(source.x, source.y);
    const targetSquare = this.getSquare(target.x, target.y);
    sourceSquare.classList.remove(source.chessPiece.toString());
    if (target.chessPiece) {
      targetSquare.classList.remove(target.chessPiece.toString());
    }
    targetSquare.classList.add(source.chessPiece.toString());
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
