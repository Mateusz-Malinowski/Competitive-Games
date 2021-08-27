import ServerPacket from "./ServerPacket";
import { ServerPacketType } from "./ServerPacketType";

export default class GameOverPacket extends ServerPacket {
  public type: ServerPacketType = ServerPacketType.GameOver;
  public time: string;

  constructor(time: string) {
    super();
    
    this.time = time;
  }
}