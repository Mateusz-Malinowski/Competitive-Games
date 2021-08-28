import ClientPacket from "./ClientPacket";
import { ClientPacketType } from "./ClientPacketType";

export default class StartGamePacket extends ClientPacket {
  public type: ClientPacketType = ClientPacketType.StartGame;
  public gameModeIndex: number;

  constructor(gameModeIndex: number) {
    super();

    this.gameModeIndex = gameModeIndex;
  }
}