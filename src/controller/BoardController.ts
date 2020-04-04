import { BoardView } from "../view/BoardView";
import { BoardModel } from "../model/BoardModel";

export class BoardController {
  constructor() {
    const bModel: BoardModel = new BoardModel();
    const bView: BoardView = new BoardView("chessboard");
    bView.renderBoard();
    bView.drawChessPieces(bModel.positions);
    bView.addEventListenerForSquares(function () {
      console.log(bModel.getPositionOccupant(this.id[0],this.id[1]));
      bView.selectSquare(this.id[0],this.id[1]);
    })

  }
}
