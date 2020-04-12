import {BoardView} from "../view/BoardView";
import {BoardModel} from "../model/BoardModel";
import {MovementType} from "../model/ChessPieces/MovementType";

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
          bView.highlightSquares(bModel.getAvailableMovesForPosition(x, y));
          bView.selectSquare(result.selected);
        } else if (result.moving) {
          const movement = bModel
            .getAvailableMovesForPosition(result.selected.x, result.selected.y)
            .filter(move => {
              return move.to.x == x && move.to.y == y && move.type!==MovementType.potential;
            })[0];
          bView.replaceFigure(movement);
          bModel.movePiece(movement);
          // if (bModel.movePiece(x, y)?.upgrading) {
          //   console.log("upgrading");
          //   bView.upgradePawn(x, y);
          // }
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
