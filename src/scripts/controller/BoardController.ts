import { BoardView } from "../view/BoardView";
import { BoardModel } from "../model/BoardModel";

export class BoardController {
  constructor() {
    const bModel: BoardModel = new BoardModel();
    const bView: BoardView = new BoardView("chessboard", "upgradeModal");
    bView.renderBoard();
    bView.drawChessPieces(bModel.positions);
    bView.addEventListenerForSquares(function() {
      const x = this.id[0];
      const y = this.id[1];
      const result = bModel.selectPosition(x, y);
      if (result.selected && !result.unchanged) {
        if (result.unselected) {
          bView.unhighlightSquares();
          bView.unselectSquare();
        } else if (result.moving === false) {
          bView.highlightSquares(bModel.getReachableForPosition(x, y).reachable);
          bView.selectSquare(result.selected);
        } else if (result.moving) {
          bView.replaceFigure(result.selected, bModel.getPosition(x, y));
          if (bModel.movePiece(x, y)?.upgrading) {
            console.log("upgrading");
            bView.upgradePawn(x, y);
          }
          bView.unhighlightSquares();
          bView.unselectSquare();
          //tady prohozeni hrace
        }
      }
    });

    bView.addEventListenerForElement("restart-button", function() {
      bView.restart();
      bModel.restart();
      bView.drawChessPieces(bModel.positions);
    });
  }
}
