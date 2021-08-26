import ClientPacket from "./ClientPacket";
import { ClientPacketType } from "./ClientPacketType";

export default class FieldPacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.Field;
  public row: number;
  public column: number;

  constructor(row: number, column: number) {
    super();

    this.row = row;
    this.column = column;
  }
}