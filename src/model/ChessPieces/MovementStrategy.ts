import {BoardState} from "../Helper/BoardState";
import {BoardPosition} from "../Helper/BoardPosition";

export abstract class MovementStrategy {
    public abstract getReachablePositions(boardState:BoardState,piecePosition:BoardPosition):BoardPosition[];
}