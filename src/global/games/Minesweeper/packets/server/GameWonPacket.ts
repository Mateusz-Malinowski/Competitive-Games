import ServerPacket from "./ServerPacket";
import { ServerPacketType } from "./ServerPacketType";

export default class GameWonPacket extends ServerPacket {
  public type: ServerPacketType = ServerPacketType.GameWon;
  public time: string;

  constructor(time: string) {
    super();

    this.time = time;
  }
}