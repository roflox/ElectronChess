import { BoardView } from "../view/BoardView";
import { BoardModel } from "../model/BoardModel";

export class BoardController {
  constructor() {
    const bModel: BoardModel = new BoardModel();
    const bView: BoardView = new BoardView("chessboard");
    bView.renderBoard();
    bView.drawChessPieces(bModel.positions);
    bView.addEventListenerForSquares(function() {
      // console.log(bModel.getPositionOccupant(this.id[0],this.id[1]));

      const x = this.id[0];
      const y = this.id[1];
      // console.log(`x:${x},y:${y}`);
      // console.log(bModel.getPosition(x, y));
      // (() => {
      //   // console.log(bModel.getReachableForPosition(x, y));
      // })();
      // console.log(bModel.getPositionOccupant(x, y));
      // console.log(bModel.getReachableForPosition(x, y));
      bModel.selectPosition(x,y);
      console.log()
      bView.selectSquare(bModel.);
    });
  }
}
