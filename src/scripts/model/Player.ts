import { Color } from "./ChessPieces/Color";

export class Player {
  public isPlaying: boolean = false;
  public isChecked: boolean = false;
  private _enemy: Player;

  private constructor(public readonly color: Color) {}

  public static getTwoPlayers(): { white: Player; black: Player } {
    const white = new Player(Color.white);
    const black = new Player(Color.black);
    white._enemy = black;
    black._enemy = white;
    return { white: white, black: black };
  }
}
