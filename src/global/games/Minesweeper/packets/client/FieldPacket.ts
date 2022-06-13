import PacketValidationSchema from "../../../../PacketValidationSchema";
import ClientPacket from "./ClientPacket";
import { ClientPacketType } from "./ClientPacketType";

export default class FieldPacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.Field;
  public row: number;
  public column: number;

  public constructor(row: number, column: number) {
    super();

    this.row = row;
    this.column = column;
  }

  public static getValidationSchema(): PacketValidationSchema {
    return {
      type: { required: true, type: 'number' },
      row: { required: true, type: 'number' },
      column: { required: true, type: 'number' },
    }
  }
}