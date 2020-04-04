export class BoardView {
    private readonly board: HTMLElement;
    private selectedSquare: Element;
    private glowingSquares: Element[];

    constructor(boardElement: string) {
        this.board = document.getElementById(boardElement);
    }

    //this renders game board
    public renderBoard() {
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
            number.innerText = (y+1).toString();
            row.appendChild(number);
            for (let x = 0; x < 8; x++) {
                const column = document.createElement("td");
                column.id = `${x}${y}`;
                if ((y + x) % 2 == 0) {
                    column.classList.add("white");
                } else {
                    column.classList.add("black");
                }
                row.appendChild(column);
            }
            row.appendChild(number.cloneNode(true));
            // row.appendChild(number);
            this.board.appendChild(row);
        }
        this.board.appendChild(alphabetRow.cloneNode(true));
    }

    public addEventListenerForSquares(eventListener: EventListener) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                this.addListenerForSquare(x+1, y+1, eventListener);
            }
        }
    }

    private addListenerForSquare(
        x: number,
        y: number,
        eventListener: EventListener
    ) {
        this.board.children[x].children[y].addEventListener("click", eventListener);
    }

    public selectSquare(x:number,y:number){
        // console.log(this.board);
        console.log(`x:${x}, y:${y}`);
        if(this.selectedSquare){
            this.selectedSquare.classList.remove("selected");
        }
        x++;
        this.selectedSquare = this.board.children[8-y].children[x];
        this.selectedSquare.classList.add("selected");
    }
}
