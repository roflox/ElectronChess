import {BoardView} from "../view/BoardView";
import {BoardModel} from "../model/BoardModel";
import {MovementType} from "../model/ChessPieces/MovementType";
import {PieceType} from "../model/ChessPieces/PieceType";

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
              return (
                move.to.x == x &&
                move.to.y == y &&
                move.type !== MovementType.potential
              );
            })[0];
          bView.movePiece(movement);
          if (bModel.movePiece(movement)?.upgrading) {
            // console.log("upgrading");
            bView.displayModal(movement);
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

    bView.addEventListenerForUpgradeButtons(function (){
      switch (this.id) {
        case "modal-bishop":
          bView.upgradePawn(PieceType.Bishop);
          break
        case "modal-queen":
          bView.upgradePawn(PieceType.Queen);
          break;
        case "modal-rook":
          bView.upgradePawn(PieceType.Rook);
          break;
        case "modal-knight":
          bView.upgradePawn(PieceType.Knight);
          break
        default:
          console.error("wtf?");
      }
      bView.hideModal();
    })
  }
}
