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
      const result = bModel.selectPosition(x, y);
      if (result.selected) {
        if (result.unselected) {
          bView.unhighlightSquares();
          bView.unselectSquare();
        } else if (result.moving === false) {
          bView.highlightSquares(bModel.getReachableForPosition(x, y));
          bView.selectSquare(result.selected);
        } else if (result.moving) {
          bView.replaceFigure(result.selected, bModel.getPosition(x, y));
          bModel.movePiece(x, y);
          bView.unhighlightSquares();
          bView.unselectSquare();
        }
        // if (result.moving === false) {

        // } else  {

        //   // bView.replaceFigure();
        // }
      }
    });
  }
}
