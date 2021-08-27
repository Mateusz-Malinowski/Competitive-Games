import { FieldState } from "../../../global/games/Minesweeper/FieldState";

export default class Field {
  public state: FieldState = FieldState.Empty;
  public isFirst: Boolean = false;
  public isRevealed: Boolean = false;
  public number: number = 0;
}