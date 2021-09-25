import ServerPacket from "./ServerPacket";
import { ServerPacketType } from "./ServerPacketType";

export default class GameWonPacket extends ServerPacket {
  public type: ServerPacketType = ServerPacketType.GameWon;
  public time: number;

  constructor(time: number) {
    super();

    this.time = time;
  }
}