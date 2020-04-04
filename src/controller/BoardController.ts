import { BoardView } from "../view/BoardView";
import { BoardModel } from "../model/BoardModel";

export class BoardController {
  constructor() {
    const bModel: BoardModel = new BoardModel();
    const bView: BoardView = new BoardView("chessboard");
    bView.renderBoard();
    bView.drawChessPieces(bModel.positions);
    bView.addEventListenerForSquares(function() {
      const x = this.id[0];
      const y = this.id[1];
      if (bModel.selectPosition(x, y)) {
        bView.selectSquare(x, y);
        bView.highlightSquares(bModel.getReachableForPosition(x, y));
      }
    });
  }
}
