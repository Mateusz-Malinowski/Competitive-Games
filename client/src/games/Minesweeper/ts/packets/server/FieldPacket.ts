import { FieldState } from "../../FieldState";
import ServerPacket from "./ServerPacket";
import { ServerPacketType } from "./ServerPacketType";

export default class FieldPacket extends ServerPacket {
  public type: ServerPacketType = ServerPacketType.Field;
  public row: number;
  public column: number;
  public state: FieldState;
  public number?: number; // for FieldState.Number
  public clicked?: Boolean; // for FieldState.Mine

  constructor(row: number, column: number, state: FieldState, number?: number, clicked?: Boolean) {
    super();

    this.row = row;
    this.column = column;
    this.state = state;
    this.number = number;
    this.clicked = clicked;
  }
}