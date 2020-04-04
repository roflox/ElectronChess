import { Color } from "./ChessPieces/Color";

export class Player {
  public isPlaying: boolean = false;
  public isChecked: boolean = false;

  constructor(public readonly color: Color) {}
}
