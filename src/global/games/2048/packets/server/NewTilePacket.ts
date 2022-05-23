import ServerPacket from "./ServerPacket";
import { ServerPacketType } from "./ServerPacketType";

export default class NewTilePacket extends ServerPacket {
  public type: ServerPacketType = ServerPacketType.NewTile;
  public row: number;
  public column: number;
  public number: number;

  constructor(row: number, column: number, number: number) {
    super();

    this.row = row;
    this.column = column;
    this.number = number;
  }
}