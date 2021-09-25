import ServerPacket from "./ServerPacket";
import { ServerPacketType } from "./ServerPacketType";

export default class GameOverPacket extends ServerPacket {
  public type: ServerPacketType = ServerPacketType.GameOver;
  public time: number;

  constructor(time: number) {
    super();
    
    this.time = time;
  }
}